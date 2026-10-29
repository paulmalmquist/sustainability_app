// Per-browser persistence. Every access is guarded: storage can be missing
// or throw (private windows, blocked site data), and the app must still work.

const PREFIX = 'ppa-preflight:v1:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage unavailable; the session still works without it.
  }
}
