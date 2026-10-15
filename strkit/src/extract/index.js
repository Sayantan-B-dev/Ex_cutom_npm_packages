/** Extract / search helpers. Deep import: `strkit/extract`. */
import { assertString } from "../_internal/guards.js";

export const CATEGORY = "extract";
export const CATEGORY_LABEL = "Extract / search";

/** Split into words (letters/numbers). */
export function words(value) {
  assertString(value);
  return value.match(/[\p{L}\p{N}']+/gu) ?? [];
}

/** Split into lines (handles \n, \r\n, \r). */
export function lines(value) {
  assertString(value);
  if (value === "") return [];
  return value.split(/\r\n|\r|\n/);
}

/** Split into unicode-aware characters. */
export function chars(value) {
  assertString(value);
  return Array.from(value);
}

/** "John Fitzgerald Kennedy" -> "JFK". */
export function getInitials(value, { max = Infinity } = {}) {
  assertString(value);
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, max)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Extract all e-mail addresses. */
export function extractEmails(value) {
  assertString(value);
  return value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) ?? [];
}

/** Extract all http(s) URLs. */
export function extractUrls(value) {
  assertString(value);
  const matches = value.match(/https?:\/\/[^\s<>"')\]]+/g) ?? [];
  return matches.map((m) => m.replace(/[.,;:!?]+$/, ""));
}

/** Extract #hashtags. */
export function extractHashtags(value) {
  assertString(value);
  return value.match(/#[\p{L}\p{N}_]+/gu) ?? [];
}

/** Extract @mentions. */
export function extractMentions(value) {
  assertString(value);
  return value.match(/@[\p{L}\p{N}_]+/gu) ?? [];
}

/** Extract integers/decimals (as strings). */
export function extractNumbers(value) {
  assertString(value);
  return value.match(/-?\d+(?:\.\d+)?/g) ?? [];
}

/** Text between first `start` and `end` markers ("" if missing). */
export function substringBetween(value, start, end) {
  assertString(value);
  assertString(start, "start");
  assertString(end, "end");
  const i = value.indexOf(start);
  if (i === -1) return "";
  const j = value.indexOf(end, i + start.length);
  if (j === -1) return "";
  return value.slice(i + start.length, j);
}

/** Portion before first occurrence of `delimiter` (whole string if absent). */
export function before(value, delimiter) {
  assertString(value);
  assertString(delimiter, "delimiter");
  const i = value.indexOf(delimiter);
  return i === -1 ? value : value.slice(0, i);
}

/** Portion after first occurrence of `delimiter` ("" if absent). */
export function after(value, delimiter) {
  assertString(value);
  assertString(delimiter, "delimiter");
  const i = value.indexOf(delimiter);
  return i === -1 ? "" : value.slice(i + delimiter.length);
}

export const META = [
  { name: "words", category: CATEGORY, signature: "words(value)", description: "Split into word tokens.", example: `words("hi, you!") // ["hi","you"]` },
  { name: "lines", category: CATEGORY, signature: "lines(value)", description: "Split into lines.", example: `lines("a\\nb") // ["a","b"]` },
  { name: "chars", category: CATEGORY, signature: "chars(value)", description: "Unicode-aware char array.", example: `chars("hé👋") // ["h","é","👋"]` },
  { name: "getInitials", category: CATEGORY, signature: "getInitials(value, {max}?)", description: "First letters of words.", example: `getInitials("John F. Kennedy") // "JFK"` },
  { name: "extractEmails", category: CATEGORY, signature: "extractEmails(value)", description: "Find all emails.", example: `extractEmails("a@b.com") // ["a@b.com"]` },
  { name: "extractUrls", category: CATEGORY, signature: "extractUrls(value)", description: "Find all http(s) URLs.", example: `extractUrls("see https://x.com") // [...]` },
  { name: "extractHashtags", category: CATEGORY, signature: "extractHashtags(value)", description: "Find #hashtags.", example: `extractHashtags("#a #b") // ["#a","#b"]` },
  { name: "extractMentions", category: CATEGORY, signature: "extractMentions(value)", description: "Find @mentions.", example: `extractMentions("@a hi") // ["@a"]` },
  { name: "extractNumbers", category: CATEGORY, signature: "extractNumbers(value)", description: "Find integers/decimals.", example: `extractNumbers("a1 b2.5") // ["1","2.5"]` },
  { name: "substringBetween", category: CATEGORY, signature: "substringBetween(value, start, end)", description: "Text between markers.", example: `substringBetween("[a]", "[", "]") // "a"` },
  { name: "before", category: CATEGORY, signature: "before(value, delimiter)", description: "Portion before delimiter.", example: `before("a=b", "=") // "a"` },
  { name: "after", category: CATEGORY, signature: "after(value, delimiter)", description: "Portion after delimiter.", example: `after("a=b", "=") // "b"` },
];
