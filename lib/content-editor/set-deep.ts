/**
 * Immutably sets a value at `path` inside `obj`, cloning only the objects
 * and arrays along the way. Used so a single field edit (e.g. a page's
 * headline) produces a new top-level guide/two-pager object without
 * mutating the original — which keeps React state updates predictable.
 */
export function setDeep<T>(obj: T, path: (string | number)[], value: unknown): T {
  if (path.length === 0) {
    return value as T;
  }

  const [key, ...rest] = path;

  if (Array.isArray(obj)) {
    const copy = obj.slice();
    copy[key as number] = setDeep(copy[key as number], rest, value);
    return copy as unknown as T;
  }

  const source = (obj ?? {}) as Record<string | number, unknown>;
  const copy: Record<string | number, unknown> = { ...source };
  copy[key] = setDeep(copy[key], rest, value);
  return copy as T;
}
