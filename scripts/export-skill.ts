// Writes the built-in playbook as a Claude skill: npm run export-skill
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BUILT_IN_RULES } from '../src/engine/builtinRules.ts';
import { renderSkill, SKILL_NAME } from '../src/engine/skill.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'skill', SKILL_NAME, 'SKILL.md');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, renderSkill(BUILT_IN_RULES));
console.log(`Wrote ${BUILT_IN_RULES.length} checks to ${out}`);
