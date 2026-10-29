import exampleInputs from '../skill/vppa-rec-assumption-review/example-inputs.json?raw';
import preflightScript from '../skill/vppa-rec-assumption-review/scripts/preflight.mjs?raw';
import { activeRules, serializePlaybook } from './engine/rules.ts';
import { renderSkill, SKILL_NAME } from './engine/skill.ts';
import type { PlaybookState } from './engine/types.ts';

/**
 * The Claude skill as a folder of files: instructions with this browser's
 * playbook, the bundled calculator, and the team's own checks so the
 * calculator applies them too.
 */
export function skillFiles(playbook: PlaybookState, today: string): { path: string; content: string }[] {
  const files = [
    { path: `${SKILL_NAME}/SKILL.md`, content: renderSkill(activeRules(playbook), { generatedOn: today }) },
    { path: `${SKILL_NAME}/scripts/preflight.mjs`, content: preflightScript },
    { path: `${SKILL_NAME}/example-inputs.json`, content: exampleInputs },
  ];
  const customized = playbook.custom.length || Object.keys(playbook.edits).length || playbook.disabled.length;
  if (customized) {
    files.push({ path: `${SKILL_NAME}/team-checks.json`, content: `${JSON.stringify(serializePlaybook(playbook, today), null, 2)}\n` });
  }
  return files;
}
