import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { advise, adviceSummary, confidenceText, firmUpList, renderAdvice } from '../src/engine/advice.ts';
import { FACTS, validateInputs } from '../src/engine/facts.ts';
import { reviewedInputs } from '../src/engine/review.ts';
import { completeInputs, readAssumptions } from '../src/engine/inputs.ts';
import { activeRules, applyBenchmarks, parsePlaybook, runPreflight, serializePlaybook } from '../src/engine/rules.ts';
import { BENCHMARK_SCENARIO, EXAMPLE_SCENARIO } from '../src/engine/scenarios.ts';
import type { Rule } from '../src/engine/types.ts';
import { skillFiles } from '../src/skillPackage.ts';
import { crc32, zip } from '../src/zip.ts';

const rules = activeRules({ custom: [], edits: {}, disabled: [] });
const skillDir = new URL('../skill/vppa-rec-assumption-review/', import.meta.url).pathname;

describe('advise', () => {
  const a = advise(EXAMPLE_SCENARIO, rules);

  it('corrects the 7.5% case and recommends RECs with a break-even strike', () => {
    expect(a.submitted.recommendation).toBe('VPPA');
    expect(a.corrected.recommendation).toBe('RECs');
    expect(a.reversed).toBe(true);
    expect(a.corrections.map((f) => f.rule.id)).toEqual(['MKT-ESC-HIGH', 'MKT-CAPTURE-SOLAR', 'PRJ-NO-DEGRADATION']);
    expect(a.headline).toBe('Buy unbundled RECs. At $63.00/MWh, this VPPA costs $14.4M more over 15 years.');
    expect(a.breakEvenStrike).toBeGreaterThan(52);
    expect(a.breakEvenStrike).toBeLessThan(53.5);
    expect(a.premiumPerMWh).toBeGreaterThan(0);
    expect(a.confidence).toBe('high');
    expect(a.summary).toContain('wholesale price escalation far above long-run norms');
  });

  it('leaves notes as notes unless a reviewer applies them', () => {
    expect(a.notes.map((f) => f.rule.id)).toContain('CTR-NO-TXN-COST');
    const withTxn = advise(EXAMPLE_SCENARIO, rules, { review: { decisions: { 'CTR-NO-TXN-COST': { disposition: 'use-benchmark', note: '' } } } });
    expect(withTxn.correctedInputs.transactionCost).toBe(350000);
  });

  it('respects a reviewer who keeps a flagged value', () => {
    const kept = advise(EXAMPLE_SCENARIO, rules, { review: { decisions: { 'MKT-ESC-HIGH': { disposition: 'accept', note: 'Contracted.' } } } });
    expect(kept.correctedInputs.wholesaleEscalation).toBe(0.075);
    expect(kept.kept.map((f) => f.rule.id)).toEqual(['MKT-ESC-HIGH']);
    expect(kept.questions.some((f) => f.rule.id === 'MKT-ESC-HIGH')).toBe(false);
  });

  it('recommends the VPPA when it wins on realistic numbers', () => {
    const cheap = advise({ ...BENCHMARK_SCENARIO, strikePrice: 40 }, rules);
    expect(cheap.corrections).toEqual([]);
    expect(cheap.corrected.recommendation).toBe('VPPA');
    expect(cheap.headline.startsWith('Sign the VPPA.')).toBe(true);
  });

  it('renders Markdown in the order a reader needs', () => {
    const md = renderAdvice(a);
    const order = ['**Buy unbundled RECs', '**Confidence:**', '## Assumptions corrected', '## What would change the answer', '## Questions for Procurement advisor', '## Not in the numbers'];
    const positions = order.map((s) => md.indexOf(s));
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect([...positions].sort((x, y) => x - y)).toEqual(positions);
  });
});

describe('reading inputs', () => {
  it('fills gaps and reports them', () => {
    const c = completeInputs({ strikePrice: '58', wholesaleEscalation: '7.5%', technology: 'Wind', foo: 1 });
    expect(c.inputs.technology).toBe('wind');
    expect(c.inputs.wholesaleEscalation).toBe(0.075);
    expect(c.inputs.capacityFactor).toBe(0.36);
    expect(c.assumed).toEqual(expect.arrayContaining(['capacityMW', 'hubPrice', 'discountRate', 'annualLoadMWh']));
    expect(c.assumed).not.toContain('strikePrice');
    expect(c.ignored).toEqual(['foo']);
    expect(c.inputs.degradation).toBe(0); // not modeled, so the check still fires
  });

  it('reads 7.5, "7.5%", and 0.075 the same way', () => {
    for (const v of [7.5, '7.5%', 0.075, '0.075']) expect(completeInputs({ wholesaleEscalation: v }).inputs.wholesaleEscalation).toBe(0.075);
    expect(completeInputs({ degradation: 0.5 }).inputs.degradation).toBe(0.005);
    expect(completeInputs({ captureRate: 1 }).inputs.captureRate).toBe(1);
  });

  it('derives capacity factor from annual generation', () => {
    const c = completeInputs({ capacityMW: 100, annualGenerationMWh: 219000 });
    expect(c.inputs.capacityFactor).toBeCloseTo(0.25, 6);
    expect(c.assumed).not.toContain('capacityFactor');
  });

  it('reads a table pasted from a spreadsheet', () => {
    const { values, lines } = readAssumptions(
      [
        'Project\tSunfield Solar',
        'Market\tERCOT',
        'Project size (MW)\t120',
        'Net capacity factor\t26%',
        'PPA price ($/MWh)\t$58.50',
        'Contract term\t12 years',
        'Year 1 market price\t$42/MWh',
        'Wholesale price inflation 7.5%',
        'REC price escalation: 2%',
        'Legal and advisory fees\t$350K',
        'Annual load\t0.25 TWh',
        'Notes\tsee tab 3',
      ].join('\n'),
    );
    expect(completeInputs(values).inputs).toMatchObject({
      scenarioName: 'Sunfield Solar',
      market: 'ERCOT',
      capacityMW: 120,
      capacityFactor: 0.26,
      strikePrice: 58.5,
      termYears: 12,
      hubPrice: 42,
      wholesaleEscalation: 0.075,
      recEscalation: 0.02,
      transactionCost: 350000,
      annualLoadMWh: 250000,
    });
    expect(lines.find((l) => l.key === 'capacityFactor')?.value).toBe(0.26);
    expect(lines.filter((l) => !l.key).map((l) => l.text)).toEqual(['Notes\tsee tab 3']);
  });
});

describe('team checks travel with the skill', () => {
  const team: Rule = {
    id: 'TEAM-01',
    title: 'Strike escalator above inflation',
    category: 'Contract terms',
    severity: 'warning',
    when: [{ fact: 'strikeEscalation', op: '>', value: 0.02 }],
    message: 'Strike rises {strikeEscalation} a year.',
    why: 'Escalating strikes erode the hedge.',
    ask: 'Can the escalator be removed?',
    benchmark: { input: 'strikeEscalation', value: 0, label: 'flat strike' },
    origin: 'team',
    addedBy: 'Mom',
  };
  const playbook = { custom: [team], edits: {}, disabled: ['CLM-SCOPE2-REVISION'] };

  it('round-trips through the shared file format, old and new', () => {
    expect(parsePlaybook(serializePlaybook(playbook, '2026-10-29'))).toEqual(playbook);
    expect(parsePlaybook({ rules: [team] }).custom[0].id).toBe('TEAM-01');
    expect(() => parsePlaybook({ nothing: true })).toThrow();
  });

  it('packages SKILL.md, the calculator, and team-checks.json', () => {
    const files = skillFiles(playbook, '2026-10-29');
    expect(files.map((f) => f.path)).toEqual([
      'vppa-rec-assumption-review/SKILL.md',
      'vppa-rec-assumption-review/scripts/preflight.mjs',
      'vppa-rec-assumption-review/example-inputs.json',
      'vppa-rec-assumption-review/team-checks.json',
    ]);
    expect(files[0].content).toContain('#### TEAM-01: Strike escalator above inflation (warning)');
    expect(files[0].content).not.toContain('CLM-SCOPE2-REVISION');
  });

  it('writes a valid zip', () => {
    expect(crc32(new TextEncoder().encode('abc'))).toBe(0x352441c2);
    const bytes = zip([{ path: 'a/b.txt', content: 'hello' }]);
    const view = new DataView(bytes.buffer);
    expect(view.getUint32(0, true)).toBe(0x04034b50);
    expect(view.getUint32(bytes.length - 22, true)).toBe(0x06054b50);
    expect(view.getUint16(bytes.length - 22 + 10, true)).toBe(1);
  });
});

describe('bundled calculator in the skill', () => {
  const run = (...args: string[]) => execFileSync(process.execPath, [join(skillDir, 'scripts/preflight.mjs'), ...args], { encoding: 'utf8' });

  it('gives the same advice as the engine (run npm run build:skill after engine changes)', () => {
    const out = JSON.parse(run(join(skillDir, 'example-inputs.json'), '--json'));
    const raw = JSON.parse(readFileSync(join(skillDir, 'example-inputs.json'), 'utf8'));
    const { inputs, assumed } = completeInputs(raw);
    const expected = adviceSummary(advise(inputs, rules, { assumed }));
    expect(out.headline).toBe(expected.headline);
    expect(out.npvAdvantage).toEqual(expected.npvAdvantage);
    expect(out.corrections).toEqual(expected.corrections);
    expect(out.markdown).toBe(renderAdvice(advise(inputs, rules, { assumed })));
  });

  it('applies team checks from a file', () => {
    const dir = mkdtempSync(join(tmpdir(), 'ppa-'));
    writeFileSync(join(dir, 'team.json'), JSON.stringify(serializePlaybook({ custom: [{ id: 'TEAM-01', title: 'Strike above $60', category: 'Contract terms', severity: 'warning', when: [{ fact: 'strikePrice', op: '>', value: 60 }], message: 'High strike.', why: 'x', origin: 'team' }], edits: {}, disabled: [] }, '2026-10-29')));
    writeFileSync(join(dir, 'in.json'), JSON.stringify({ strikePrice: 63 }));
    const out = JSON.parse(run(join(dir, 'in.json'), '--checks', join(dir, 'team.json'), '--json'));
    expect(out.teamChecks).toBe(1);
    expect(out.questions.map((q: { id: string }) => q.id)).toContain('TEAM-01');
    expect(out.markdown).toContain('High strike. _(Strike above $60)_');
    expect(out.markdown).toContain('Filled in for you');
  });
});

describe('input ranges, sources, and rule priority', () => {
  it('flags values that cannot be right and drops confidence to low', () => {
    const bad = { ...EXAMPLE_SCENARIO, capacityFactor: 2.4 };
    expect(validateInputs(bad).map((p) => p.key)).toEqual(['capacityFactor']);
    const a = advise(bad, rules);
    expect(a.confidence).toBe('low');
    expect(renderAdvice(a)).toContain('## Fix these inputs first');
    expect(validateInputs(EXAMPLE_SCENARIO)).toEqual([]);
  });

  it('rejects impossible values from a source and says where to get a real one', () => {
    const c = completeInputs({ capacityFactor: 2400, strikePrice: -5, technology: 'solar', market: 'PJM' });
    expect(c.rejected.map((r) => r.key)).toEqual(['capacityFactor', 'strikePrice']);
    expect(c.inputs.capacityFactor).toBe(0.24);
    expect(c.assumed).toEqual(expect.arrayContaining(['capacityFactor', 'strikePrice']));
    expect(c.assumed).not.toContain('technology');
    expect(c.assumed).not.toContain('market');
    const advice = advise(c.inputs, rules, { assumed: c.assumed, rejected: c.rejected });
    expect(advice.confidence).not.toBe('high');
    expect(confidenceText(advice)).toContain('Capacity factor');
    const lines = firmUpList(advice);
    expect(lines[0]).toContain('Capacity factor: the source gave 2400');
    expect(lines[0]).toContain('Get it from: Independent energy yield assessment');
    expect(lines.some((l) => l.startsWith('Discount rate: 8%. Get it from: Treasury'))).toBe(true);
  });

  it('converts pasted percentages exactly once, so impossible ones are still caught', () => {
    for (const [text, expected] of [['Capacity factor\t24', 0.24], ['Capacity factor\t24%', 0.24], ['Capacity factor\t0.24', 0.24]] as const) {
      expect(completeInputs(readAssumptions(text).values).inputs.capacityFactor).toBe(expected);
    }
    expect(completeInputs(readAssumptions('Capacity factor\t2600').values).rejected.map((r) => r.key)).toEqual(['capacityFactor']);
  });

  it('reports technology and market as assumed when the source leaves them out', () => {
    expect(completeInputs({ strikePrice: 60 }).assumed).toEqual(expect.arrayContaining(['technology', 'market']));
  });

  it('lets the more serious check win when two benchmark the same input', () => {
    const softer: Rule = {
      id: 'TEAM-02',
      title: 'Escalation above 4%',
      category: 'Market prices',
      severity: 'warning',
      when: [{ fact: 'wholesaleEscalation', op: '>', value: 0.04 }],
      message: 'x',
      why: 'x',
      benchmark: { input: 'wholesaleEscalation', value: 0.035, label: '3.5%' },
      origin: 'team',
    };
    const both = activeRules({ custom: [softer], edits: {}, disabled: [] });
    const a = advise(EXAMPLE_SCENARIO, both);
    expect(a.correctedInputs.wholesaleEscalation).toBe(0.0275);
    expect(a.corrections.map((f) => f.rule.id)).toContain('MKT-ESC-HIGH');
    expect(a.superseded.map((f) => f.rule.id)).toEqual(['TEAM-02']);
    const findings = runPreflight(EXAMPLE_SCENARIO, both);
    expect(applyBenchmarks(EXAMPLE_SCENARIO, findings).wholesaleEscalation).toBe(0.0275);
    const review = { decisions: { 'MKT-ESC-HIGH': { disposition: 'use-benchmark' as const, note: '' }, 'TEAM-02': { disposition: 'use-benchmark' as const, note: '' } } };
    expect(reviewedInputs(EXAMPLE_SCENARIO, findings, review).wholesaleEscalation).toBe(0.0275);
  });

  it('gives every needed input a valid range and a source', () => {
    for (const f of FACTS.filter((x) => x.kind === 'input')) expect(f.source, f.key).toBeTruthy();
    for (const f of FACTS.filter((x) => x.core && x.format !== 'text')) expect(f.range, f.key).toBeDefined();
  });
});
