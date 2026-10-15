/** Cleaning / normalizing helpers. Deep import: `strkit/clean`. */
import { assertString } from "../_internal/guards.js";

export const CATEGORY = "clean";
export const CATEGORY_LABEL = "Cleaning / normalizing";

/**
 * Trim custom characters from both ends (defaults to whitespace).
 * @example trimChars("---hello---", "-") // "hello"
 */
export function trimChars(value, chars) {
  assertString(value);
  if (chars === undefined) return value.trim();
  assertString(chars, "chars");
  if (chars === "") return value;
  const set = new Set(Array.from(chars));
  let start = 0;
  let end = value.length;
  while (start < end && set.has(value[start])) start++;
  while (end > start && set.has(value[end - 1])) end--;
  return value.slice(start, end);
}

/** Collapse all whitespace runs to a single space and trim. */
export function collapseWhitespace(value) {
  assertString(value);
  return value.replace(/\s+/g, " ").trim();
}

/** Remove diacritics/accents: "Café" -> "Cafe". */
export function removeAccents(value) {
  assertString(value);
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Remove every non-ASCII character. */
export function removeNonAscii(value) {
  assertString(value);
  // eslint-disable-next-line no-control-regex
  return value.replace(/[^\x00-\x7F]/g, "");
}

/** Remove punctuation, keeping letters, numbers and spaces. */
export function stripPunctuation(value) {
  assertString(value);
  return value.replace(/[^\p{L}\p{N}\s]/gu, "");
}

/** Remove HTML tags: "<b>hi</b>" -> "hi". */
export function stripHtml(value) {
  assertString(value);
  return value.replace(/<[^>]*>/g, "");
}

/** Remove most emoji / pictographs (keeps plain text). */
export function stripEmojis(value) {
  assertString(value);
  return value.replace(/[🌀-🫿☀-➿️-️🀀-🋿]/gu, "");
}

/** Unicode-normalize a string (NFC, NFD, NFKC, NFKD). */
export function normalizeText(value, form = "NFC") {
  assertString(value);
  const allowed = ["NFC", "NFD", "NFKC", "NFKD"];
  if (!allowed.includes(form)) throw new RangeError(`form must be one of ${allowed.join(", ")}`);
  return value.normalize(form);
}

export const META = [
  { name: "trimChars", category: CATEGORY, signature: "trimChars(value, chars?)", description: "Trim whitespace or custom chars from both ends.", example: `trimChars("---hi---", "-") // "hi"` },
  { name: "collapseWhitespace", category: CATEGORY, signature: "collapseWhitespace(value)", description: "Collapse whitespace runs to one space + trim.", example: `collapseWhitespace("a   b") // "a b"` },
  { name: "removeAccents", category: CATEGORY, signature: "removeAccents(value)", description: "Strip diacritics.", example: `removeAccents("Café") // "Cafe"` },
  { name: "removeNonAscii", category: CATEGORY, signature: "removeNonAscii(value)", description: "Drop every non-ASCII char.", example: `removeNonAscii("héllo→") // "hllo"` },
  { name: "stripPunctuation", category: CATEGORY, signature: "stripPunctuation(value)", description: "Remove punctuation, keep words.", example: `stripPunctuation("hi, you!") // "hi you"` },
  { name: "stripHtml", category: CATEGORY, signature: "stripHtml(value)", description: "Remove HTML tags.", example: `stripHtml("<b>hi</b>") // "hi"` },
  { name: "stripEmojis", category: CATEGORY, signature: "stripEmojis(value)", description: "Remove emoji characters.", example: `stripEmojis("hi 👋") // "hi "` },
  { name: "normalizeText", category: CATEGORY, signature: "normalizeText(value, form?)", description: "Unicode normalize (NFC/NFD/NFKC/NFKD).", example: `normalizeText("é", "NFD")` },
];
