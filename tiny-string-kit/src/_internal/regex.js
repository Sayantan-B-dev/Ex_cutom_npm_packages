/** Escape a string for literal use inside RegExp. Lives in _internal so `case` and `mask` can use it without circular imports. */

export function escapeRegExpCore(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
