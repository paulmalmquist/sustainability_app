// Turns the single-file build into page content for a claude.ai artifact:
// the host supplies the doctype/html/head/body skeleton, so we keep only the
// title, metas, font links, styles, the inlined script, and the root element.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'dist-single', 'index.html'), 'utf8');

const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? '';
const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1] ?? '';
const keptHead = head
  .replace(/<meta charset[^>]*>\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '')
  .trim();

const outDir = join(root, 'dist-artifact');
mkdirSync(outDir, { recursive: true });
const out = join(outDir, 'ppa-preflight.html');
writeFileSync(out, `${keptHead}\n${body.trim()}\n`);
console.log(`Wrote ${out} (${Math.round((keptHead.length + body.length) / 1024)} KB)`);
