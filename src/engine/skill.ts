import { FACTS, type FactFormat } from './facts.ts';
import { describeCondition, formatFact } from './format.ts';
import { CATEGORIES, type Rule } from './types.ts';

export const SKILL_NAME = 'vppa-rec-assumption-review';

/**
 * Renders the playbook as a Claude skill (SKILL.md). Checks a reviewer adds
 * in the app come out in the same format as the built-in ones, so a lesson
 * learned in one review is applied by Claude in the next one.
 */
export function renderSkill(rules: Rule[], opts: { generatedOn?: string } = {}): string {
  const out: string[] = [];
  const team = rules.filter((r) => r.origin === 'team');

  out.push('---');
  out.push(`name: ${SKILL_NAME}`);
  out.push(
    'description: Give a clear recommendation on a VPPA vs. unbundled REC decision from whatever the user provides (spreadsheet, PDF, deck, email, or pasted numbers). Extracts the assumptions, corrects unrealistic ones against checks written by experienced reviewers, and reports the better option, how sure it is, what would change it, and what to ask the model’s owner. Use for any VPPA, virtual PPA, renewable PPA, or REC procurement analysis.',
  );
  out.push('---');
  out.push('');
  out.push('# VPPA vs. REC advisor');
  out.push('');
  out.push(
    'A procurement model can be arithmetically right and still give the wrong answer because one assumption is off, like wholesale prices rising 7.5% a year for fifteen years. This skill holds the checks experienced reviewers apply and a small calculator that runs them. The user should get one clear piece of advice, not a list of things to work out themselves.',
  );
  out.push('');
  out.push('## Procedure');
  out.push('');
  out.push(
    '1. **Extract.** Read what the user gave you and write the assumptions to `inputs.json` using the keys in "Input keys" below. Convert units: percentages as fractions (7.5% → 0.075), prices in $/MWh, energy in MWh per year. If the source gives annual generation instead of a capacity factor, use `annualGenerationMWh`. Leave out anything the source doesn’t state; the calculator fills gaps and reports them.',
  );
  out.push(
    '2. **Run.** From this skill’s folder: `node scripts/preflight.mjs inputs.json`. It runs every check below (plus any `team-checks.json` in this folder), replaces clearly unrealistic values with benchmarks, runs the cost model both ways, and prints the advice as Markdown. Add `--json` for structured output.',
  );
  out.push(
    '3. **Advise.** Reply with the calculator’s advice: the recommendation and confidence first, then the assumptions it corrected and what each did to the answer, then what would change the answer, then the questions for whoever built the model. Use its numbers; don’t recompute them by hand.',
  );
  out.push(
    '4. **Add your own read.** After the advice, note anything in the source that the checks don’t cover (contract clauses, counterparty, location, market specifics), labeled as your observations. If one of them should be checked every time, propose it as a new check in the format below.',
  );
  out.push(
    '5. **Flag uncertain extraction.** If you had to guess a value (an unlabeled cell, an ambiguous unit), say so, re-run with the other reading, and report whether the recommendation changes.',
  );
  out.push('');
  out.push(
    'If Node isn’t available, apply the checks by hand: evaluate each check’s conditions, swap in the benchmark for every critical or warning finding that has one, compare the corrected cost of each option, and present the result in the same order as step 3.',
  );
  out.push('');
  out.push('Benchmarks are defaults with sources and dates. If you have newer market data, say so and re-run with it.');
  out.push('');
  out.push('## Input keys');
  out.push('');
  out.push('| Key | Meaning | Unit | If missing |');
  out.push('|---|---|---|---|');
  for (const f of FACTS.filter((x) => x.kind === 'input')) {
    out.push(`| \`${f.key}\` | ${f.label}: ${f.help} | ${UNIT[f.format] ?? (f.options ? f.options.join(', ') : '')} | ${MISSING[f.key] ?? 'Benchmark, reported as assumed'} |`);
  }
  out.push('| `annualGenerationMWh` | Annual generation, in place of size or capacity factor | MWh per year | Derived from size × capacity factor |');
  out.push('| `scenarioName`, `assumptionOwner` | Name of the deal; who supplied the assumptions | text | Generic name; questions addressed generically |');
  out.push('');
  out.push('See `example-inputs.json` for a complete example.');
  out.push('');
  out.push(`## Checks (${rules.length})`);
  if (team.length) {
    out.push('');
    out.push(`${team.length} of these were added by reviewers after real reviews.`);
  }

  for (const category of CATEGORIES) {
    const inCategory = rules.filter((r) => r.category === category);
    if (!inCategory.length) continue;
    out.push('');
    out.push(`### ${category}`);
    for (const r of inCategory) {
      out.push('');
      out.push(`#### ${r.id}: ${r.title} (${r.severity})`);
      out.push('');
      out.push(`- **Fires when:** ${r.when.map(describeCondition).join(' AND ')}`);
      out.push(`- **Report:** ${r.message}`);
      out.push(`- **Why:** ${r.why}`);
      if (r.benchmark) {
        out.push(`- **Benchmark:** ${r.benchmark.label} (set \`${r.benchmark.input}\` = ${formatFact(r.benchmark.input, r.benchmark.value)})`);
      }
      if (r.ask) out.push(`- **Ask:** ${r.ask}`);
      if (r.source) out.push(`- **Source:** ${r.source}`);
      if (r.lesson) out.push(`- **Origin:** ${r.lesson}`);
      if (r.origin === 'team') out.push(`- **Added by:** ${r.addedBy || 'a reviewer'}${r.addedOn ? `, ${r.addedOn}` : ''}`);
    }
  }

  out.push('');
  out.push('## Fact reference');
  out.push('');
  out.push('Every value a check can test, including calculated ones. Use these names when proposing a new check. Rates are fractions (0.075 = 7.5%); prices are $/MWh.');
  out.push('');
  out.push('| Fact | Meaning | Kind |');
  out.push('|---|---|---|');
  for (const f of FACTS) out.push(`| \`${f.key}\` | ${f.label}: ${f.help} | ${f.kind} |`);
  out.push('');
  out.push('## Machine-readable checks');
  out.push('');
  out.push('```json');
  out.push(JSON.stringify(rules.map(stripForExport), null, 2));
  out.push('```');
  if (opts.generatedOn) {
    out.push('');
    out.push(`_Generated by PPA Preflight on ${opts.generatedOn}._`);
  }
  out.push('');
  return out.join('\n');
}

const UNIT: Partial<Record<FactFormat, string>> = {
  pct: 'fraction (0.075 = 7.5%)',
  perMWh: '$/MWh',
  usd: '$',
  mwh: 'MWh per year',
  mw: 'MW (AC)',
  years: 'years',
  bool: 'true / false',
};

const MISSING: Record<string, string> = {
  technology: 'solar',
  market: 'Other',
  settlementPoint: 'hub',
  degradation: 'Treated as not modeled (0), so the check fires',
  captureRate: 'Treated as not modeled (100%), so the check fires',
  transactionCost: 'Treated as not modeled ($0), so the check fires',
  basis: '0',
  strikeEscalation: '0 (flat strike)',
  annualLoadMWh: 'Year-1 generation (project sized to load), reported as assumed',
  accountingReviewed: 'false (unknown), so it becomes a question',
  creditSupportReviewed: 'false (unknown), so it becomes a question',
  negativePriceTermsReviewed: 'false (unknown), so it becomes a question',
  marketBoundaryConfirmed: 'false (unknown), so it becomes a question',
  scope2RevisionConsidered: 'false (unknown), so it becomes a question',
};

function stripForExport(r: Rule) {
  const { id, title, severity, category, when, benchmark } = r;
  return { id, title, severity, category, when, ...(benchmark ? { benchmark: { input: benchmark.input, value: benchmark.value } } : {}) };
}
