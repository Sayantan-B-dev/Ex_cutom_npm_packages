/** Mask / redact helpers. Deep import: `tiny-string-kit-sbdev/mask`. */
import { assertString } from "../_internal/guards.js";
import { escapeRegExp } from "../escape/index.js";

export const CATEGORY = "mask";
export const CATEGORY_LABEL = "Mask / redact";

/** Mask all but the visible head/tail: mask("password123", {visibleStart:1, visibleEnd:2}). */
export function mask(value, { visibleStart = 0, visibleEnd = 0, maskChar = "*", minMasked = 0 } = {}) {
  assertString(value);
  assertString(maskChar, "maskChar");
  if (maskChar === "") throw new RangeError("maskChar must not be empty");
  const chars = Array.from(value);
  const keepStart = Math.max(0, visibleStart);
  const keepEnd = Math.max(0, visibleEnd);
  if (keepStart + keepEnd >= chars.length) return value;
  let maskedLen = chars.length - keepStart - keepEnd;
  maskedLen = Math.max(maskedLen, minMasked);
  const fill = maskChar.repeat(Math.ceil(maskedLen / maskChar.length)).slice(0, maskedLen);
  if (maskedLen > chars.length - keepStart - keepEnd) return fill;
  return chars.slice(0, keepStart).join("") + fill + chars.slice(chars.length - keepEnd).join("");
}

/** "john.doe@example.com" -> "j***@example.com". */
export function maskEmail(value, maskChar = "*") {
  assertString(value);
  const [user = "", domain = ""] = value.split("@");
  if (!domain) throw new TypeError("Invalid email address");
  if (user.length <= 1) return maskChar + "@" + domain;
  return user[0] + maskChar.repeat(Math.max(3, user.length - 1)) + "@" + domain;
}

/** Replace each occurrence of `words` with `replacement` (case-insensitive). */
export function censor(value, words, replacement = "***") {
  assertString(value);
  assertString(replacement, "replacement");
  const list = Array.isArray(words) ? words : [words];
  let out = value;
  for (const w of list) {
    assertString(w, "censored word");
    if (w === "") continue;
    out = out.replace(new RegExp(escapeRegExp(w), "gi"), replacement);
  }
  return out;
}

export const META = [
  { name: "mask", category: CATEGORY, signature: "mask(value, {visibleStart, visibleEnd, maskChar}?)", description: "Hide middle of secrets.", example: `mask("password", {visibleStart:1, visibleEnd:1})` },
  { name: "maskEmail", category: CATEGORY, signature: "maskEmail(value, maskChar?)", description: "Mask email username.", example: `maskEmail("john@x.com")` },
  { name: "censor", category: CATEGORY, signature: "censor(value, words, replacement?)", description: "Replace banned words.", example: `censor("oh damn", "damn")` },
];
