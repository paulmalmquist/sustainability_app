import { useState } from 'react';
import { fmtNumber, fmtUSD } from '../engine/format.ts';
import type { ModelResult } from '../engine/types.ts';
import { Segmented } from './ui.tsx';

/** Year-by-year cash flows: the table view behind both charts. */
export function AnnualTable({ submitted, reviewed }: { submitted: ModelResult; reviewed: ModelResult }) {
  const [which, setWhich] = useState<'reviewed' | 'submitted'>('reviewed');
  const rows = (which === 'reviewed' ? reviewed : submitted).rows;

  return (
    <details className="disclosure">
      <summary>Year-by-year table</summary>
      <div style={{ display: 'grid', gap: 10 }}>
        <Segmented
          label="Scenario shown in the table"
          value={which}
          onChange={setWhich}
          options={[
            { value: 'reviewed', label: 'After review' },
            { value: 'submitted', label: 'As submitted' },
          ]}
        />
        <div className="table-scroll" style={{ maxHeight: 420 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Generation (MWh)</th>
                <th scope="col">Hub ($/MWh)</th>
                <th scope="col">Project value ($/MWh)</th>
                <th scope="col">Strike ($/MWh)</th>
                <th scope="col">Settlement</th>
                <th scope="col">REC ($/MWh)</th>
                <th scope="col">VPPA path cost</th>
                <th scope="col">REC path cost</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.year}>
                  <td>{r.year}</td>
                  <td>{fmtNumber(r.generationMWh)}</td>
                  <td>{r.hubPrice.toFixed(2)}</td>
                  <td>{r.settlementPrice.toFixed(2)}</td>
                  <td>{r.strikePrice.toFixed(2)}</td>
                  <td className={r.settlement < 0 ? 'neg' : undefined}>{fmtUSD(r.settlement, { sign: true })}</td>
                  <td>{r.recPrice.toFixed(2)}</td>
                  <td>{fmtUSD(r.vppaCost)}</td>
                  <td>{fmtUSD(r.recCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small muted">
          VPPA path cost = payments to the developer (negative settlement) plus RECs bought for load the project does not
          cover. Transaction costs are counted at signing, outside this table.
        </p>
      </div>
    </details>
  );
}
