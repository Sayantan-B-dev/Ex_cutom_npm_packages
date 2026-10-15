/** Escaping helpers. Deep import: `tiny-string-kit-sbdev/escape`. */
import { assertString } from "../_internal/guards.js";
import { escapeRegExpCore } from "../_internal/regex.js";

export const CATEGORY = "escape";
export const CATEGORY_LABEL = "Escaping";

/** Escape &, <, >, ", ', ` for safe HTML embedding. */
export function escapeHtml(value) {
  assertString(value);
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;");
}

/** Reverse escapeHtml. */
export function unescapeHtml(value) {
  assertString(value);
  return value
    .replace(/&#96;/g, "`")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

/** Escape a string for literal use inside RegExp. */
export function escapeRegExp(value) {
  assertString(value);
  return escapeRegExpCore(value);
}

/** Quote a value as a single CSV cell (RFC 4180). */
export function escapeCsv(value) {
  assertString(value);
  if (/[",\n\r]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export const META = [
  { name: "escapeHtml", category: CATEGORY, signature: "escapeHtml(value)", description: "Escape for safe HTML.", example: `escapeHtml("<a>") // "&lt;a&gt;"` },
  { name: "unescapeHtml", category: CATEGORY, signature: "unescapeHtml(value)", description: "Reverse escapeHtml.", example: `unescapeHtml("&lt;a&gt;") // "<a>"` },
  { name: "escapeRegExp", category: CATEGORY, signature: "escapeRegExp(value)", description: "Escape for literal RegExp use.", example: `escapeRegExp("a+b") // "a\\+b"` },
  { name: "escapeCsv", category: CATEGORY, signature: "escapeCsv(value)", description: "Quote one CSV cell (RFC 4180).", example: `escapeCsv('a,"b"') // '"a,""b""'` },
];
