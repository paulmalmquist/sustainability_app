// Bridges to the claude.ai artifact runtime when the app is published there,
// with plain-browser fallbacks everywhere else.

type Use = (name: string) => Promise<unknown>;

export interface SampleFn {
  (input: string, options?: Record<string, unknown>): Promise<{ text: string; truncated: boolean }>;
  json: <T = unknown>(input: string, options?: Record<string, unknown>) => Promise<T>;
}

interface Downloads {
  save(request: { filename: string; data: string | Blob }): Promise<{ status: string }>;
}

function claudeUse(): Use | null {
  const c = (globalThis as { claude?: { use?: unknown } }).claude;
  return c && typeof c.use === 'function' ? (c.use as Use).bind(c) : null;
}

export function inClaudeViewer(): boolean {
  return claudeUse() !== null;
}

export async function capability<T>(name: string): Promise<T | null> {
  const use = claudeUse();
  if (!use) return null;
  try {
    return ((await use(name)) as T | null) ?? null;
  } catch {
    return null;
  }
}

export type SaveOutcome = 'saved' | 'declined' | 'unavailable';

/** Offers a file to the viewer. Returns 'unavailable' when the host blocks downloads. */
export async function saveFile(filename: string, content: string | Uint8Array): Promise<SaveOutcome> {
  const blob =
    typeof content === 'string'
      ? new Blob([content], { type: 'text/plain;charset=utf-8' })
      : new Blob([content as Uint8Array<ArrayBuffer>], { type: 'application/zip' });
  if (inClaudeViewer()) {
    const downloads = await capability<Downloads>('downloads');
    if (!downloads) return 'unavailable';
    try {
      await downloads.save({ filename, data: typeof content === 'string' ? content : blob });
      return 'saved';
    } catch (e) {
      return (e as { code?: string }).code === 'declined' ? 'declined' : 'unavailable';
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'saved';
}

export const saveTextFile = (filename: string, text: string) => saveFile(filename, text);

/** Copies text; must be called from a click handler. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}
