#!/usr/bin/env python3
"""Refreshes the public market data PPA Preflight checks against.

Writes src/data/market-data.json. Every source is fetched on its own; when one
fails, its previous values are kept and marked stale, so an outage at one
agency never wipes good data. Runs weekly in .github/workflows/refresh-data.yml.

Optional environment variables unlock more data:
  PJM_API_KEY    PJM Data Miner key (free): hourly PJM hub prices
  NREL_API_KEY   NREL developer key (free; DEMO_KEY otherwise): solar output by region
"""
from __future__ import annotations

import datetime as dt
import io
import json
import logging
import os
import re
import sys
import traceback
import zipfile
from pathlib import Path

import pandas as pd
import requests

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src" / "data" / "market-data.json"
HEADERS = {"User-Agent": "ppa-preflight market data refresh (github.com/paulmalmquist/sustainability_app)"}

NOW = dt.datetime.now(dt.timezone.utc)
END = (NOW - dt.timedelta(days=4)).date()  # leave room for publication lags
START = END - dt.timedelta(days=364)
SAMPLE_DAYS = [START + dt.timedelta(days=d) for d in range(0, 365, 14)]  # every other week for daily-file sources

log = logging.getLogger("refresh")

# Each market: the hub most VPPAs settle at, its EIA balancing authority code,
# a representative solar site, and the EIA/ICE on-peak price series.
MARKETS = {
    "ERCOT": {"hub": "HB_NORTH", "ba": "ERCO", "site": (31.99, -102.08), "ice": None},
    "CAISO": {"hub": "TH_SP15_GEN-APND", "ba": "CISO", "site": (36.74, -119.79), "ice": "SP15 EZ Gen DA LMP Peak"},
    "PJM": {"hub": "WESTERN HUB", "ba": "PJM", "site": (37.54, -77.43), "ice": "PJM WH Real Time Peak"},
    "MISO": {"hub": "INDIANA.HUB", "ba": "MISO", "site": (39.77, -86.16), "ice": "Indiana Hub RT Peak"},
    "SPP": {"hub": "SPPSOUTH_HUB", "ba": "SWPP", "site": (35.47, -97.52), "ice": None},
    "NYISO": {"hub": "CENTRL", "ba": "NYIS", "site": (43.05, -76.15), "ice": None},
    "ISO-NE": {"hub": ".H.INTERNAL_HUB", "ba": "ISNE", "site": (42.26, -71.80), "ice": "Nepool MH DA LMP Peak"},
}


def get(url: str, **kw) -> requests.Response:
    r = requests.get(url, headers=HEADERS, timeout=180, **kw)
    r.raise_for_status()
    return r


def r4(x) -> float | None:
    return None if x is None or pd.isna(x) else round(float(x), 4)


def sane(values: dict, limits: dict[str, tuple[float, float]]) -> dict:
    """Refuses values outside plausible limits, so a garbled file can't become a benchmark."""
    for key, (lo, hi) in limits.items():
        v = values.get(key)
        if v is not None and not lo <= v <= hi:
            raise ValueError(f"{key}={v} is outside the plausible range {lo} to {hi}")
    return values


# ── FRED (St. Louis Fed): inflation expectations and interest rates ────────


def fred(series: str) -> pd.Series:
    df = pd.read_csv(io.StringIO(get(f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series}").text))
    df.columns = ["date", "value"]
    df["value"] = pd.to_numeric(df["value"], errors="coerce")
    df = df.dropna()
    return df.set_index(pd.to_datetime(df["date"]))["value"]


def fetch_inflation() -> dict:
    breakeven = fred("T10YIE")
    forward = fred("T5YIFR")
    cpi = fred("CPIAUCSL")
    yoy = (cpi / cpi.shift(12) - 1).dropna()
    return sane({
        "breakeven10y": r4(breakeven.tail(20).mean() / 100),
        "forward5y5y": r4(forward.tail(20).mean() / 100),
        "cpiYoY": r4(yoy.iloc[-1]),
        "cpiYoYMonth": yoy.index[-1].strftime("%Y-%m"),
        "cpiPeak2022": r4(yoy["2022"].max()),
        "asOf": breakeven.index[-1].strftime("%Y-%m-%d"),
        "source": "FRED: 10-year breakeven inflation (T10YIE), 5-year forward inflation expectation (T5YIFR), CPI (CPIAUCSL)",
    }, {"breakeven10y": (0, 0.08), "forward5y5y": (0, 0.08), "cpiYoY": (-0.05, 0.2)})


def fetch_rates() -> dict:
    treasury = fred("DGS10")
    baa = fred("DBAA")
    return sane({
        "treasury10y": r4(treasury.tail(20).mean() / 100),
        "baaCorporate": r4(baa.tail(20).mean() / 100),
        "asOf": treasury.index[-1].strftime("%Y-%m-%d"),
        "source": "FRED: 10-year Treasury yield (DGS10), Moody's Baa corporate bond yield (DBAA)",
    }, {"treasury10y": (0, 0.2), "baaCorporate": (0, 0.25)})


# ── Damodaran (NYU Stern): cost of capital by industry ────────────────────


def fetch_cost_of_capital() -> dict:
    raw = pd.read_excel(io.BytesIO(get("https://pages.stern.nyu.edu/~adamodar/pc/datasets/wacc.xls").content), sheet_name="Industry Averages", header=None)
    header_row = raw.index[raw[0].astype(str).str.strip().eq("Industry Name")][0]
    table = raw.iloc[header_row + 1 :].copy()
    table.columns = [str(c).strip() for c in raw.iloc[header_row]]
    table = table.dropna(subset=["Industry Name"])
    table["Cost of Capital"] = pd.to_numeric(table["Cost of Capital"], errors="coerce")
    total = table.loc[table["Industry Name"].astype(str).str.strip().eq("Total Market"), "Cost of Capital"].iloc[0]
    industries = table.loc[~table["Industry Name"].astype(str).str.startswith("Total Market"), "Cost of Capital"].dropna()
    updated = raw.iloc[0, 1]
    return sane({
        "totalMarket": r4(total),
        "p10": r4(industries.quantile(0.1)),
        "median": r4(industries.median()),
        "p90": r4(industries.quantile(0.9)),
        "industries": int(industries.size),
        "asOf": pd.Timestamp(updated).strftime("%Y-%m-%d") if not isinstance(updated, str) else updated,
        "source": "Aswath Damodaran, NYU Stern: cost of capital by industry, US companies",
    }, {"totalMarket": (0.02, 0.2), "p10": (0.01, 0.2), "p90": (0.02, 0.3)})


# ── EIA Electric Power Monthly: fleet capacity factors ─────────────────────

MONTHS = {m: i for i, m in enumerate(["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"], 1)}


def fetch_capacity_factors() -> dict:
    raw = pd.read_excel(io.BytesIO(get("https://www.eia.gov/electricity/monthly/xls/table_6_07_b.xlsx").content), header=None)
    # Locate the capacity-factor columns under the Solar/Photovoltaic and Wind headings.
    tech_row, sub_row, kind_row = raw.iloc[1].astype(str), raw.iloc[2].astype(str), raw.iloc[3].astype(str)
    solar_col = next(c for c in raw.columns if sub_row[c].strip() == "Photovoltaic" and kind_row[c + 1].strip() == "Capacity Factor") + 1
    wind_col = next(c for c in raw.columns if tech_row[c].strip() == "Wind") + 1
    rows, year = [], None
    for _, row in raw.iterrows():
        label = str(row[0]).strip().lower()
        if m := re.match(r"year (\d{4})", label):
            year = int(m.group(1))
            continue
        month = next((n for name, n in MONTHS.items() if label.startswith(name[:3])), None)
        if year and month:
            solar, wind = pd.to_numeric(row[solar_col], errors="coerce"), pd.to_numeric(row[wind_col], errors="coerce")
            if pd.notna(solar) and pd.notna(wind):
                rows.append((year, month, solar, wind))
    last = rows[-12:]
    return sane({
        "solar": r4(sum(r[2] for r in last) / len(last)),
        "wind": r4(sum(r[3] for r in last) / len(last)),
        "period": f"{last[0][0]}-{last[0][1]:02d} to {last[-1][0]}-{last[-1][1]:02d}",
        "asOf": f"{last[-1][0]}-{last[-1][1]:02d}",
        "source": "EIA Electric Power Monthly, Table 6.07.B (utility-scale fleet, trailing 12 months)",
    }, {"solar": (0.1, 0.4), "wind": (0.15, 0.55)})


# ── EIA-930: hourly solar and wind output by grid operator ─────────────────


def fetch_generation_shapes() -> dict[str, pd.DataFrame]:
    halves = sorted({(d.year, "Jan_Jun" if d.month <= 6 else "Jul_Dec") for d in pd.date_range(START, END, freq="MS")} | {(END.year, "Jan_Jun" if END.month <= 6 else "Jul_Dec")})
    bas = {m["ba"] for m in MARKETS.values()}
    frames = []
    for year, half in halves:
        url = f"https://www.eia.gov/electricity/gridmonitor/sixMonthFiles/EIA930_BALANCE_{year}_{half}.csv"
        log.info("EIA-930 %s", url)
        text = get(url).text
        head = pd.read_csv(io.StringIO(text), nrows=0).columns
        solar = [c for c in head if "Solar" in c and c.endswith("(Adjusted)")]
        wind = [c for c in head if "Wind" in c and c.endswith("(Adjusted)")]
        use = ["Balancing Authority", "UTC Time at End of Hour", *solar, *wind]
        df = pd.read_csv(io.StringIO(text), usecols=use, thousands=",", low_memory=False)
        df = df[df["Balancing Authority"].isin(bas)]
        df["start"] = pd.to_datetime(df["UTC Time at End of Hour"], format="%m/%d/%Y %I:%M:%S %p", utc=True) - pd.Timedelta(hours=1)
        df["solar"] = df[solar].apply(pd.to_numeric, errors="coerce").sum(axis=1, min_count=1)
        df["wind"] = df[wind].apply(pd.to_numeric, errors="coerce").sum(axis=1, min_count=1)
        frames.append(df[["Balancing Authority", "start", "solar", "wind"]])
    all_ = pd.concat(frames)
    return {ba: g.set_index("start")[["solar", "wind"]].sort_index() for ba, g in all_.groupby("Balancing Authority")}


# ── Grid operators: hourly day-ahead prices at each hub ────────────────────


def by_day(fetch, label: str) -> pd.Series:
    parts = []
    for day in SAMPLE_DAYS:
        try:
            parts.append(fetch(day))
        except Exception as e:  # one missing day should not sink the market
            log.warning("%s %s: %s", label, day, str(e)[:160])
    if not parts:
        raise RuntimeError(f"no {label} price days could be fetched")
    return pd.concat(parts).sort_index()


def gs_series(df: pd.DataFrame, location: str) -> pd.Series:
    df = df[df["Location"] == location]
    return pd.Series(df["LMP"].to_numpy(dtype=float), index=pd.to_datetime(df["Interval Start"], utc=True))


def prices_caiso() -> pd.Series:
    import gridstatus

    iso = gridstatus.CAISO()
    hub = MARKETS["CAISO"]["hub"]
    return by_day(lambda d: gs_series(iso.get_lmp(date=d.isoformat(), market="DAY_AHEAD_HOURLY", locations=[hub]), hub), "CAISO")


def prices_nyiso() -> pd.Series:
    import gridstatus

    iso = gridstatus.NYISO()
    zone = MARKETS["NYISO"]["hub"]
    return by_day(lambda d: gs_series(iso.get_lmp(date=d.isoformat(), market="DAY_AHEAD_HOURLY", locations="ALL"), zone), "NYISO")


def prices_isone() -> pd.Series:
    import gridstatus

    iso = gridstatus.ISONE()
    hub = MARKETS["ISO-NE"]["hub"]
    return by_day(lambda d: gs_series(iso.get_lmp(date=d.isoformat(), market="DAY_AHEAD_HOURLY", locations=[hub]), hub), "ISO-NE")


def prices_spp() -> pd.Series:
    import gridstatus

    iso = gridstatus.SPP()
    hub = MARKETS["SPP"]["hub"]
    return by_day(lambda d: gs_series(iso.get_lmp_day_ahead_hourly(date=d.isoformat()), hub), "SPP")


def prices_miso() -> pd.Series:
    hub = MARKETS["MISO"]["hub"]

    def one(day: dt.date) -> pd.Series:
        text = get(f"https://docs.misoenergy.org/marketreports/{day:%Y%m%d}_da_expost_lmp.csv").text
        df = pd.read_csv(io.StringIO(text), skiprows=4)
        row = df[(df["Node"] == hub) & (df["Value"] == "LMP")].iloc[0]
        values = [float(row[f"HE {h}"]) for h in range(1, 25)]
        # MISO reports hour-ending in Eastern Standard Time all year (UTC-5).
        start = pd.Timestamp(day, tz="UTC") + pd.Timedelta(hours=5)
        return pd.Series(values, index=[start + pd.Timedelta(hours=h) for h in range(24)])

    return by_day(one, "MISO")


def prices_ercot() -> pd.Series:
    hub = MARKETS["ERCOT"]["hub"]
    docs = get("https://www.ercot.com/misapp/servlets/IceDocListJsonWS?reportTypeId=13060").json()["ListDocsByRptTypeRes"]["DocumentList"]
    frames = []
    for year in sorted({START.year, END.year}):
        doc = next(d["Document"] for d in docs if d["Document"]["FriendlyName"] == f"DAMLZHBSPP_{year}")
        archive = zipfile.ZipFile(io.BytesIO(get(f"https://www.ercot.com/misdownload/servlets/mirDownload?doclookupId={doc['DocID']}").content))
        workbook = archive.read(archive.namelist()[0])
        for sheet in pd.read_excel(io.BytesIO(workbook), sheet_name=None).values():
            sheet = sheet[sheet["Settlement Point"] == hub]
            frames.append(sheet)
    df = pd.concat(frames)
    hour = df["Hour Ending"].astype(str).str.slice(0, 2).astype(int) - 1
    local = pd.to_datetime(df["Delivery Date"]) + pd.to_timedelta(hour, unit="h")
    # Hours repeated at the fall DST change are flagged; drop them rather than guess.
    idx = local.dt.tz_localize("US/Central", ambiguous="NaT", nonexistent="shift_forward").dt.tz_convert("UTC")
    s = pd.Series(df["Settlement Point Price"].to_numpy(dtype=float), index=idx)
    s = s[s.index.notna()]
    return s[(s.index >= pd.Timestamp(START, tz="UTC")) & (s.index < pd.Timestamp(END, tz="UTC"))]


def prices_pjm() -> pd.Series:
    key = os.environ.get("PJM_API_KEY")
    if not key:
        raise RuntimeError("skipped: set PJM_API_KEY (free from PJM Data Miner) to add hourly PJM prices")
    import gridstatus

    iso = gridstatus.PJM(api_key=key)
    hub = MARKETS["PJM"]["hub"]
    return by_day(lambda d: gs_series(iso.get_lmp(date=d.isoformat(), market="DAY_AHEAD_HOURLY", locations=[hub]), hub), "PJM")


PRICE_FETCHERS = {
    "ERCOT": prices_ercot,
    "CAISO": prices_caiso,
    "PJM": prices_pjm,
    "MISO": prices_miso,
    "SPP": prices_spp,
    "NYISO": prices_nyiso,
    "ISO-NE": prices_isone,
}


def summarize(prices: pd.Series, gen: pd.DataFrame | None) -> dict:
    p = prices.groupby(level=0).mean().dropna()
    out = {
        "atcPrice": round(float(p.mean()), 2),
        "negativeHourShare": r4((p < 0).mean()),
        "hours": int(p.size),
        "period": f"{p.index.min():%Y-%m-%d} to {p.index.max():%Y-%m-%d}",
    }
    if gen is not None:
        joined = pd.concat([p.rename("price"), gen], axis=1, join="inner").dropna(subset=["price"])
        mean_price = joined["price"].mean()
        for tech in ("solar", "wind"):
            g = joined[tech].clip(lower=0).fillna(0)
            # Skip a technology the operator barely has (e.g. utility solar in New York).
            if mean_price > 0 and g.sum() > 0 and g.mean() > 50:
                out[f"{tech}Capture"] = r4((joined["price"] * g).sum() / g.sum() / mean_price)
    if out["hours"] < 200:
        raise ValueError(f"only {out['hours']} hours of prices")
    return sane(out, {"atcPrice": (-20, 400), "negativeHourShare": (0, 0.8), "solarCapture": (-1.5, 2.5), "windCapture": (-1.5, 2.5)})


# ── EIA wholesale (ICE): daily on-peak hub prices ──────────────────────────


def fetch_onpeak() -> dict:
    page = get("https://www.eia.gov/electricity/wholesale/").text
    links = sorted(set(re.findall(r'href="(xls/(?:archive/)?ice_electric-\d{4}(?:final)?\.xlsx)"', page)))
    wanted = [l for l in links if any(str(y) in l for y in {START.year, END.year})]
    frames = [pd.read_excel(io.BytesIO(get(f"https://www.eia.gov/electricity/wholesale/{l}").content)) for l in wanted]
    df = pd.concat(frames)
    df["Delivery start date"] = pd.to_datetime(df["Delivery start date"])
    df = df[(df["Delivery start date"] >= pd.Timestamp(START)) & (df["Delivery start date"] <= pd.Timestamp(END))]
    out = {}
    for market, cfg in MARKETS.items():
        rows = df[df["Price hub"] == cfg["ice"]] if cfg["ice"] else df.iloc[0:0]
        if len(rows):
            out[market] = {"hub": cfg["ice"], "onPeakPrice": round(float(rows["Wtd avg price $/MWh"].mean()), 2), "days": int(len(rows))}
    return out


# ── NREL PVWatts: expected solar output at a representative site ───────────


def fetch_solar_sites() -> dict:
    key = os.environ.get("NREL_API_KEY") or "DEMO_KEY"
    out = {}
    for market, cfg in MARKETS.items():
        lat, lon = cfg["site"]
        params = dict(api_key=key, lat=lat, lon=lon, system_capacity=1000, module_type=0, losses=14, array_type=2, tilt=0, azimuth=180, dc_ac_ratio=1.3)
        data = get("https://developer.nrel.gov/api/pvwatts/v8.json", params=params).json()
        # PVWatts reports capacity factor on DC nameplate; contracts are sized in MW AC.
        out[market] = sane({"site": [lat, lon], "capacityFactorAC": r4(float(data["outputs"]["capacity_factor"]) / 100 * 1.3)}, {"capacityFactorAC": (0.1, 0.45)})
    return out


# ── Assemble ───────────────────────────────────────────────────────────────


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    previous = json.loads(OUT.read_text()) if OUT.exists() else {}
    data: dict = {k: v for k, v in previous.items() if k not in ("generatedAt", "sources")}
    markets: dict = dict(previous.get("markets", {}))
    sources: list[dict] = []

    def run(source_id: str, name: str, url: str, fn, store, had_previous: bool) -> None:
        try:
            store(fn())
            sources.append({"id": source_id, "name": name, "url": url, "status": "ok"})
        except Exception as e:
            detail = str(e).splitlines()[0][:240] if str(e) else type(e).__name__
            status = "skipped" if detail.startswith("skipped") else ("stale" if had_previous else "failed")
            log.warning("%s: %s", source_id, detail)
            if os.environ.get("REFRESH_DEBUG"):
                traceback.print_exc()
            sources.append({"id": source_id, "name": name, "url": url, "status": status, "detail": detail})

    def section(key: str):
        return lambda value: data.__setitem__(key, value)

    run("fred-inflation", "Inflation expectations and CPI (FRED)", "https://fred.stlouisfed.org/series/T10YIE", fetch_inflation, section("inflation"), "inflation" in previous)
    run("fred-rates", "Treasury and corporate bond yields (FRED)", "https://fred.stlouisfed.org/series/DGS10", fetch_rates, section("rates"), "rates" in previous)
    run("damodaran", "Cost of capital by industry (Damodaran, NYU Stern)", "https://pages.stern.nyu.edu/~adamodar/", fetch_cost_of_capital, section("costOfCapital"), "costOfCapital" in previous)
    run("eia-capacity-factors", "Fleet capacity factors (EIA Electric Power Monthly)", "https://www.eia.gov/electricity/monthly/", fetch_capacity_factors, section("capacityFactors"), "capacityFactors" in previous)
    run("eia-ice", "On-peak hub prices (EIA wholesale market data)", "https://www.eia.gov/electricity/wholesale/", fetch_onpeak, section("onPeak"), "onPeak" in previous)
    run("nrel-pvwatts", "Expected solar output by region (NREL PVWatts)", "https://pvwatts.nrel.gov/", fetch_solar_sites, section("solarSites"), "solarSites" in previous)

    shapes: dict[str, pd.DataFrame] = {}
    run("eia-930", "Hourly solar and wind output by grid operator (EIA-930)", "https://www.eia.gov/electricity/gridmonitor/", fetch_generation_shapes, shapes.update, False)

    for market, fetch in PRICE_FETCHERS.items():
        cfg = MARKETS[market]

        def build(fetch=fetch, cfg=cfg) -> dict:
            return {"hub": cfg["hub"], **summarize(fetch(), shapes.get(cfg["ba"]))}

        run(f"prices-{market.lower()}", f"Hourly day-ahead prices, {market} ({cfg['hub']})", "", build, lambda v, m=market: markets.__setitem__(m, v), market in markets)
    data["markets"] = markets

    data["window"] = {"start": START.isoformat(), "end": END.isoformat(), "sampledEveryDays": 14}
    data["generatedAt"] = NOW.strftime("%Y-%m-%dT%H:%M:%SZ")
    data["sources"] = sources
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, indent=2) + "\n")
    ok = sum(s["status"] == "ok" for s in sources)
    log.info("wrote %s: %d of %d sources ok", OUT, ok, len(sources))
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
