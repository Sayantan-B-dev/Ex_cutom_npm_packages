/** Measure / count helpers. Deep import: `tiny-string-kit-sbdev/measure`. */
import { assertString } from "../_internal/guards.js";

export const CATEGORY = "measure";
export const CATEGORY_LABEL = "Measure / count";

/** Count words separated by whitespace. */
export function wordCount(value) {
  assertString(value);
  const t = value.trim();
  if (t === "") return 0;
  return t.split(/\s+/).length;
}

/** Count characters; optionally exclude spaces. */
export function charCount(value, { ignoreSpaces = false } = {}) {
  assertString(value);
  if (ignoreSpaces) return value.replace(/\s/g, "").length;
  return Array.from(value).length;
}

/** Count \n-separated lines. */
export function lineCount(value) {
  assertString(value);
  if (value === "") return 0;
  return value.split(/\r\n|\r|\n/).length;
}

/** UTF-8 byte length. */
export function byteSize(value) {
  assertString(value);
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(value).length;
  if (typeof Buffer !== "undefined") return Buffer.byteLength(value, "utf8");
  return Array.from(value).join("").length; // rough fallback
}

/** Count (possibly overlapping) occurrences of `sub`. */
export function countSubstring(value, sub, { overlapping = false, ignoreCase = false } = {}) {
  assertString(value);
  assertString(sub, "sub");
  if (sub === "") return 0;
  let hay = value;
  let needle = sub;
  if (ignoreCase) {
    hay = hay.toLowerCase();
    needle = needle.toLowerCase();
  }
  let count = 0;
  let i = 0;
  while (true) {
    const idx = hay.indexOf(needle, i);
    if (idx === -1) break;
    count++;
    i = overlapping ? idx + 1 : idx + needle.length;
  }
  return count;
}

/** Estimated reading time in minutes (default 200 wpm). */
export function readingTimeMinutes(value, wordsPerMinute = 200) {
  assertString(value);
  if (typeof wordsPerMinute !== "number" || wordsPerMinute <= 0) {
    throw new RangeError("wordsPerMinute must be a positive number");
  }
  return wordCount(value) / wordsPerMinute;
}

/** Map of lowercase word -> frequency. */
export function wordFrequency(value) {
  assertString(value);
  const freq = {};
  for (const w of value.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? []) {
    freq[w] = (freq[w] ?? 0) + 1;
  }
  return freq;
}

export const META = [
  { name: "wordCount", category: CATEGORY, signature: "wordCount(value)", description: "Count whitespace-separated words.", example: `wordCount("a b c") // 3` },
  { name: "charCount", category: CATEGORY, signature: "charCount(value, {ignoreSpaces}?)", description: "Unicode-aware char count.", example: `charCount("a b") // 3` },
  { name: "lineCount", category: CATEGORY, signature: "lineCount(value)", description: "Count lines.", example: `lineCount("a\\nb") // 2` },
  { name: "byteSize", category: CATEGORY, signature: "byteSize(value)", description: "UTF-8 byte length.", example: `byteSize("é") // 2` },
  { name: "countSubstring", category: CATEGORY, signature: "countSubstring(value, sub, opts?)", description: "Count occurrences (overlap / ignoreCase options).", example: `countSubstring("aaa", "aa") // 1` },
  { name: "readingTimeMinutes", category: CATEGORY, signature: "readingTimeMinutes(value, wpm?)", description: "Estimated reading minutes.", example: `readingTimeMinutes("word ".repeat(200)) // ~1` },
  { name: "wordFrequency", category: CATEGORY, signature: "wordFrequency(value)", description: "Word -> count map.", example: `wordFrequency("a a b") // {a:2,b:1}` },
];
