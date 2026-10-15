/** Truncate / pad helpers. Deep import: `tiny-string-kit-sbdev/fit`. */
import { assertString, assertNonNegativeInt } from "../_internal/guards.js";

export const CATEGORY = "fit";
export const CATEGORY_LABEL = "Truncate / pad";

/**
 * Truncate a string to a maximum length.
 *
 * Backward compatible: `truncate("Hello world", 8)` -> `"Hello..."`.
 * Extended: `truncate(str, len, { omission: "…", boundary: "word" })`.
 */
export function truncate(value, maxLength, options = {}) {
  if (typeof value !== "string") {
    throw new TypeError("Expected a string");
  }
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError("maxLength must be a non-negative integer");
  }
  const { omission = "...", boundary } = options ?? {};
  if (typeof omission !== "string") throw new TypeError("omission must be a string");
  if (value.length <= maxLength) return value;
  if (maxLength <= omission.length) return omission.slice(0, maxLength);
  let end = maxLength - omission.length;
  let sliced = value.slice(0, end);
  if (boundary === "word") {
    const lastSpace = sliced.lastIndexOf(" ");
    if (lastSpace > 0) sliced = sliced.slice(0, lastSpace);
  }
  return sliced + omission;
}

/** Truncate to N words: truncateWords("a b c d", 2) -> "a b…". */
export function truncateWords(value, maxWords, omission = "…") {
  assertString(value);
  if (!Number.isInteger(maxWords) || maxWords < 0) throw new RangeError("maxWords must be a non-negative integer");
  assertString(omission, "omission");
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (value.trim() === "" || parts.length <= maxWords) return value;
  if (maxWords === 0) return omission;
  return parts.slice(0, maxWords).join(" ") + omission;
}

/** Truncate the middle: "HelloWorld" -> "He…ld". */
export function truncateMiddle(value, maxLength, omission = "…") {
  assertString(value);
  assertNonNegativeInt(maxLength);
  assertString(omission, "omission");
  if (value.length <= maxLength) return value;
  if (maxLength <= omission.length) return omission.slice(0, maxLength);
  const remaining = maxLength - omission.length;
  const left = Math.ceil(remaining / 2);
  const right = Math.floor(remaining / 2);
  return value.slice(0, left) + omission + value.slice(value.length - right);
}

/** Center-pad a string with `fill` (defaults to space). */
export function padCenter(value, targetLength, fill = " ") {
  assertString(value);
  assertNonNegativeInt(targetLength, "targetLength");
  assertString(fill, "fill");
  if (fill === "") throw new RangeError("fill must not be empty");
  if (value.length >= targetLength) return value;
  const total = targetLength - value.length;
  const left = Math.floor(total / 2);
  const right = total - left;
  const repeatTo = (n) => fill.repeat(Math.ceil(n / fill.length)).slice(0, n);
  return repeatTo(left) + value + repeatTo(right);
}

export const META = [
  { name: "truncate", category: CATEGORY, signature: "truncate(value, maxLength, options?)", description: "Truncate with '...' (or custom omission / word boundary).", example: `truncate("Hello world", 8) // "Hello..."` },
  { name: "truncateWords", category: CATEGORY, signature: "truncateWords(value, maxWords, omission?)", description: "Truncate to N words.", example: `truncateWords("a b c", 2) // "a b…"` },
  { name: "truncateMiddle", category: CATEGORY, signature: "truncateMiddle(value, maxLength, omission?)", description: "Truncate the middle, keep both ends.", example: `truncateMiddle("HelloWorld", 8) // "Hel…rld"` },
  { name: "padCenter", category: CATEGORY, signature: "padCenter(value, targetLength, fill?)", description: "Center-pad to a target length.", example: `padCenter("hi", 6) // "  hi  "` },
];
