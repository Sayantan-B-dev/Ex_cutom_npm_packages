/** Case conversion helpers. Deep import: `strkit-sbdev/case`. */
import { assertString } from "../_internal/guards.js";
import { splitIntoWords } from "../_internal/words.js";
import { escapeRegExpCore } from "../_internal/regex.js";

export const CATEGORY = "case";
export const CATEGORY_LABEL = "Case conversion";

/**
 * Convert a string into a URL-friendly slug.
 * @param {string} value
 * @param {string} [separator="-"] word separator
 */
export function slugify(value, separator = "-") {
  if (typeof value !== "string") {
    throw new TypeError("Expected a string");
  }
  if (typeof separator !== "string" || separator.length === 0) {
    throw new TypeError("separator must be a non-empty string");
  }
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^${escapeRegExpCore(separator)}+|${escapeRegExpCore(separator)}+$`, "g"), "");
}

/** Convert to camelCase: "hello world" -> "helloWorld". */
export function camelCase(value) {
  assertString(value);
  const words = splitIntoWords(value).map((w) => w.toLowerCase());
  if (words.length === 0) return "";
  return words[0] + words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
}

/** Convert to PascalCase: "hello world" -> "HelloWorld". */
export function pascalCase(value) {
  assertString(value);
  return splitIntoWords(value)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

/** Convert to snake_case. */
export function snakeCase(value) {
  assertString(value);
  return splitIntoWords(value).map((w) => w.toLowerCase()).join("_");
}

/** Convert to kebab-case. */
export function kebabCase(value) {
  assertString(value);
  return splitIntoWords(value).map((w) => w.toLowerCase()).join("-");
}

/** Convert to Title Case: "hello world" -> "Hello World". */
export function titleCase(value) {
  assertString(value);
  return value
    .toLowerCase()
    .split(/(\s+)/)
    .map((part) => (/^\s+$/.test(part) || part === "" ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

/** Convert to Sentence case: first letter upper, rest lower. */
export function sentenceCase(value) {
  assertString(value);
  const lower = value.toLowerCase();
  return lower.replace(/[a-z]/i, (m) => m.toUpperCase());
}

/** Convert to CONSTANT_CASE. */
export function constantCase(value) {
  assertString(value);
  return splitIntoWords(value).map((w) => w.toUpperCase()).join("_");
}

/** Convert to dot.case. */
export function dotCase(value) {
  assertString(value);
  return splitIntoWords(value).map((w) => w.toLowerCase()).join(".");
}

/** Convert to path/case. */
export function pathCase(value) {
  assertString(value);
  return splitIntoWords(value).map((w) => w.toLowerCase()).join("/");
}

/** Convert to Header-Case. */
export function headerCase(value) {
  assertString(value);
  return splitIntoWords(value)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("-");
}

/** Swap the case of every character: "hELLO" -> "Hello". */
export function swapCase(value) {
  assertString(value);
  return Array.from(value)
    .map((ch) => (ch === ch.toLowerCase() ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

/** Capitalize the first character. */
export function capitalize(value) {
  if (typeof value !== "string") {
    throw new TypeError("Expected a string");
  }
  if (value.length === 0) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Lowercase the first character. */
export function uncapitalize(value) {
  assertString(value);
  if (value.length === 0) return "";
  return value.charAt(0).toLowerCase() + value.slice(1);
}

/** Capitalize the first letter of every word. */
export function capitalizeWords(value) {
  assertString(value);
  return value.replace(/\b\p{L}/gu, (m) => m.toUpperCase());
}

export const META = [
  { name: "slugify", category: CATEGORY, signature: "slugify(value, separator?)", description: "URL-friendly slug: 'Hello World!' -> 'hello-world'.", example: `slugify("Hello, World!") // "hello-world"` },
  { name: "camelCase", category: CATEGORY, signature: "camelCase(value)", description: "Convert to camelCase.", example: `camelCase("hello world") // "helloWorld"` },
  { name: "pascalCase", category: CATEGORY, signature: "pascalCase(value)", description: "Convert to PascalCase.", example: `pascalCase("hello world") // "HelloWorld"` },
  { name: "snakeCase", category: CATEGORY, signature: "snakeCase(value)", description: "Convert to snake_case.", example: `snakeCase("HelloWorld") // "hello_world"` },
  { name: "kebabCase", category: CATEGORY, signature: "kebabCase(value)", description: "Convert to kebab-case.", example: `kebabCase("HelloWorld") // "hello-world"` },
  { name: "titleCase", category: CATEGORY, signature: "titleCase(value)", description: "Convert to Title Case.", example: `titleCase("hello world") // "Hello World"` },
  { name: "sentenceCase", category: CATEGORY, signature: "sentenceCase(value)", description: "First letter upper, rest lower.", example: `sentenceCase("hELLO") // "Hello"` },
  { name: "constantCase", category: CATEGORY, signature: "constantCase(value)", description: "Convert to CONSTANT_CASE.", example: `constantCase("hello world") // "HELLO_WORLD"` },
  { name: "dotCase", category: CATEGORY, signature: "dotCase(value)", description: "Convert to dot.case.", example: `dotCase("hello world") // "hello.world"` },
  { name: "pathCase", category: CATEGORY, signature: "pathCase(value)", description: "Convert to path/case.", example: `pathCase("hello world") // "hello/world"` },
  { name: "headerCase", category: CATEGORY, signature: "headerCase(value)", description: "Convert to Header-Case.", example: `headerCase("hello world") // "Hello-World"` },
  { name: "swapCase", category: CATEGORY, signature: "swapCase(value)", description: "Swap upper/lower of every char.", example: `swapCase("hELLO") // "Hello"` },
  { name: "capitalize", category: CATEGORY, signature: "capitalize(value)", description: "Uppercase first character.", example: `capitalize("hello") // "Hello"` },
  { name: "uncapitalize", category: CATEGORY, signature: "uncapitalize(value)", description: "Lowercase first character.", example: `uncapitalize("Hello") // "hello"` },
  { name: "capitalizeWords", category: CATEGORY, signature: "capitalizeWords(value)", description: "Capitalize each word.", example: `capitalizeWords("hello world") // "Hello World"` },
];
