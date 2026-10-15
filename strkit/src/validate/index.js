/** Validation / predicate helpers. Deep import: `strkit-sbdev/validate`. */
import { assertString } from "../_internal/guards.js";

export const CATEGORY = "validate";
export const CATEGORY_LABEL = "Validation & checks";

/** True when string is exactly "". */
export function isEmpty(value) {
  assertString(value);
  return value.length === 0;
}

/** True when string is empty or only whitespace. */
export function isBlank(value) {
  assertString(value);
  return value.trim().length === 0;
}

/** Pragmatic e-mail check (not RFC-complete, good for forms). */
export function isEmail(value) {
  assertString(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** True for http/https/ftp URLs and bare domains. */
export function isUrl(value) {
  assertString(value);
  const v = value.trim();
  try {
    const u = new URL(v.includes("://") ? v : `https://${v}`);
    return Boolean(u.hostname.includes(".") && /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(u.hostname));
  } catch {
    return false;
  }
}

/** Letters only (unicode-aware). */
export function isAlpha(value) {
  assertString(value);
  return value.length > 0 && /^\p{L}+$/u.test(value);
}

/** Letters + numbers only (unicode-aware). */
export function isAlphanumeric(value) {
  assertString(value);
  return value.length > 0 && /^[\p{L}\p{N}]+$/u.test(value);
}

/** True for integers/decimals like "42", "-3.14". */
export function isNumeric(value) {
  assertString(value);
  return value.trim() !== "" && /^-?\d+(\.\d+)?$/.test(value.trim());
}

export function isLowerCase(value) {
  assertString(value);
  return value.length > 0 && value === value.toLowerCase() && value !== value.toUpperCase();
}

export function isUpperCase(value) {
  assertString(value);
  return value.length > 0 && value === value.toUpperCase() && value !== value.toLowerCase();
}

/** Case/punctuation-insensitive palindrome check. */
export function isPalindrome(value) {
  assertString(value);
  const clean = value.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean.length > 0 && clean === Array.from(clean).reverse().join("");
}

/** True for kebab slugs like "hello-world-123". */
export function isSlug(value) {
  assertString(value);
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

/** True for UUID v1–v5 strings. */
export function isUuid(value) {
  assertString(value);
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value.trim());
}

/** True for hex strings (optionally 0x-prefixed via option). */
export function isHex(value, { prefix = false } = {}) {
  assertString(value);
  const v = value.trim();
  if (prefix) return /^0x[0-9a-f]+$/i.test(v);
  return v.length > 0 && /^[0-9a-f]+$/i.test(v) && v.length % 2 === 0;
}

/** True when the string is valid base64. */
export function isBase64(value) {
  assertString(value);
  const v = value.trim().replace(/\s+/g, "");
  if (v === "" || v.length % 4 !== 0) return false;
  return /^[A-Za-z0-9+/]*={0,2}$/.test(v);
}

/** True when JSON.parse succeeds. */
export function isJson(value) {
  assertString(value);
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}

/** True for IPv4 like "192.168.0.1". */
export function isIpv4(value) {
  assertString(value);
  const parts = value.trim().split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => /^\d{1,3}$/.test(p) && Number(p) >= 0 && Number(p) <= 255);
}

export function equalsIgnoreCase(a, b) {
  assertString(a, "a");
  assertString(b, "b");
  return a.toLowerCase() === b.toLowerCase();
}

export function containsIgnoreCase(haystack, needle) {
  assertString(haystack, "haystack");
  assertString(needle, "needle");
  return haystack.toLowerCase().includes(needle.toLowerCase());
}

export function startsWithIgnoreCase(value, prefix) {
  assertString(value);
  assertString(prefix, "prefix");
  return value.toLowerCase().startsWith(prefix.toLowerCase());
}

export function endsWithIgnoreCase(value, suffix) {
  assertString(value);
  assertString(suffix, "suffix");
  return value.toLowerCase().endsWith(suffix.toLowerCase());
}

export const META = [
  { name: "isEmpty", category: CATEGORY, signature: "isEmpty(value)", description: "True when exactly empty.", example: `isEmpty("") // true` },
  { name: "isBlank", category: CATEGORY, signature: "isBlank(value)", description: "True when empty or whitespace-only.", example: `isBlank("  ") // true` },
  { name: "isEmail", category: CATEGORY, signature: "isEmail(value)", description: "Pragmatic email check.", example: `isEmail("a@b.com") // true` },
  { name: "isUrl", category: CATEGORY, signature: "isUrl(value)", description: "URL / domain check.", example: `isUrl("https://x.com") // true` },
  { name: "isAlpha", category: CATEGORY, signature: "isAlpha(value)", description: "Letters only (unicode).", example: `isAlpha("abc") // true` },
  { name: "isAlphanumeric", category: CATEGORY, signature: "isAlphanumeric(value)", description: "Letters + digits only.", example: `isAlphanumeric("abc123") // true` },
  { name: "isNumeric", category: CATEGORY, signature: "isNumeric(value)", description: "Integer/decimal string.", example: `isNumeric("-3.14") // true` },
  { name: "isLowerCase", category: CATEGORY, signature: "isLowerCase(value)", description: "True when all-cased chars are lower.", example: `isLowerCase("abc") // true` },
  { name: "isUpperCase", category: CATEGORY, signature: "isUpperCase(value)", description: "True when all-cased chars are upper.", example: `isUpperCase("ABC") // true` },
  { name: "isPalindrome", category: CATEGORY, signature: "isPalindrome(value)", description: "Case/punctuation-insensitive palindrome.", example: `isPalindrome("racecar") // true` },
  { name: "isSlug", category: CATEGORY, signature: "isSlug(value)", description: "Valid kebab slug.", example: `isSlug("hello-world") // true` },
  { name: "isUuid", category: CATEGORY, signature: "isUuid(value)", description: "UUID v1–v5 check.", example: `isUuid(uuid()) // true` },
  { name: "isHex", category: CATEGORY, signature: "isHex(value, {prefix}?)", description: "Hex string check.", example: `isHex("deadbeef") // true` },
  { name: "isBase64", category: CATEGORY, signature: "isBase64(value)", description: "Base64 check.", example: `isBase64("aGk=") // true` },
  { name: "isJson", category: CATEGORY, signature: "isJson(value)", description: "JSON.parse succeeds.", example: `isJson('{"a":1}') // true` },
  { name: "isIpv4", category: CATEGORY, signature: "isIpv4(value)", description: "IPv4 check.", example: `isIpv4("127.0.0.1") // true` },
  { name: "equalsIgnoreCase", category: CATEGORY, signature: "equalsIgnoreCase(a, b)", description: "Case-insensitive equality.", example: `equalsIgnoreCase("Hi", "hi") // true` },
  { name: "containsIgnoreCase", category: CATEGORY, signature: "containsIgnoreCase(haystack, needle)", description: "Case-insensitive includes.", example: `containsIgnoreCase("Hello", "ell") // true` },
  { name: "startsWithIgnoreCase", category: CATEGORY, signature: "startsWithIgnoreCase(value, prefix)", description: "Case-insensitive startsWith.", example: `startsWithIgnoreCase("Hello", "he") // true` },
  { name: "endsWithIgnoreCase", category: CATEGORY, signature: "endsWithIgnoreCase(value, suffix)", description: "Case-insensitive endsWith.", example: `endsWithIgnoreCase("Hello", "LO") // true` },
];
