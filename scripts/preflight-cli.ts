// The advisor as a command-line tool, bundled into the Claude skill as
// scripts/preflight.mjs. Usage:
//   node preflight.mjs inputs.json [--checks team-checks.json] [--json]
// inputs.json may be partial; missing values are filled and reported.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { advise, adviceSummary, renderAdvice } from '../src/engine/advice.ts';
import { completeInputs } from '../src/engine/inputs.ts';
import { activeRules, parsePlaybook } from '../src/engine/rules.ts';
import type { PlaybookState } from '../src/engine/types.ts';

function fail(message: string): never {
  process.stderr.write(`${message}\n\nUsage: node preflight.mjs inputs.json [--checks team-checks.json] [--json]\n`);
  process.exit(1);
}

const args = process.argv.slice(2);
const json = args.includes('--json');
const checksAt = args.indexOf('--checks');
const checksPath = checksAt >= 0 ? args[checksAt + 1] : undefined;
const file = args.find((a, i) => (a === '-' || !a.startsWith('-')) && (checksAt < 0 || i !== checksAt + 1));
if (!file) fail('Give the path to an inputs JSON file, or - to read from stdin.');

let raw: unknown;
try {
  raw = JSON.parse(readFileSync(file === '-' ? 0 : file, 'utf8'));
} catch (e) {
  fail(`Could not read ${file} as JSON: ${(e as Error).message}`);
}
if (!raw || typeof raw !== 'object' || Array.isArray(raw)) fail('The inputs file must contain one JSON object.');

// Team checks: an explicit --checks file, else team-checks.json beside the skill.
let playbook: PlaybookState = { custom: [], edits: {}, disabled: [] };
const here = dirname(fileURLToPath(import.meta.url));
const teamFile = checksPath ?? [join(here, '..', 'team-checks.json'), join(here, 'team-checks.json')].find((p) => existsSync(p));
if (teamFile) {
  try {
    playbook = parsePlaybook(JSON.parse(readFileSync(teamFile, 'utf8')));
  } catch (e) {
    fail(`Could not read team checks from ${teamFile}: ${(e as Error).message}`);
  }
}

const { inputs, assumed, ignored } = completeInputs(raw as Record<string, unknown>);
const advice = advise(inputs, activeRules(playbook), { assumed });

if (json) {
  process.stdout.write(`${JSON.stringify({ ...adviceSummary(advice), ignoredKeys: ignored, teamChecks: playbook.custom.length, markdown: renderAdvice(advice) }, null, 2)}\n`);
} else {
  process.stdout.write(renderAdvice(advice));
  if (ignored.length) process.stdout.write(`\n_Ignored unknown keys: ${ignored.join(', ')}._\n`);
}
