/** Transform helpers. Deep import: `tiny-string-kit-sbdev/transform`. */
import { assertString } from "../_internal/guards.js";
import { randomFloat } from "../_internal/random.js";
import { lines } from "../extract/index.js";
import { capitalize } from "../case/index.js";

export const CATEGORY = "transform";
export const CATEGORY_LABEL = "Transform";

/** Reverse (unicode-safe): "abc" -> "cba". */
export function reverse(value) {
  assertString(value);
  return Array.from(value).reverse().join("");
}

/** Randomly shuffle characters (crypto-backed when available). */
export function shuffleChars(value) {
  assertString(value);
  const arr = Array.from(value);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(randomFloat() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join("");
}

/** Randomly shuffle whitespace-separated words. */
export function shuffleWords(value) {
  assertString(value);
  const arr = value.split(/(\s+)/);
  const wordIdx = arr.map((p, i) => (/^\s+$/.test(p) || p === "" ? -1 : i)).filter((i) => i !== -1);
  const wordVals = wordIdx.map((i) => arr[i]);
  for (let i = wordVals.length - 1; i > 0; i--) {
    const j = Math.floor(randomFloat() * (i + 1));
    [wordVals[i], wordVals[j]] = [wordVals[j], wordVals[i]];
  }
  wordIdx.forEach((pos, k) => {
    arr[pos] = wordVals[k];
  });
  return arr.join("");
}

/** Sort lines alphabetically (optionally case-sensitive, deduped). */
export function sortLines(value, { ignoreCase = true, unique = false } = {}) {
  assertString(value);
  let arr = lines(value);
  arr = [...arr].sort((a, b) => {
    if (ignoreCase) return a.localeCompare(b, undefined, { sensitivity: "base" });
    return a < b ? -1 : a > b ? 1 : 0;
  });
  if (unique) arr = [...new Set(arr)];
  return arr.join("\n");
}

/** Remove duplicate whitespace-separated words, keeping first occurrence. */
export function uniqueWords(value) {
  assertString(value);
  const seen = new Set();
  const out = [];
  for (const w of value.split(/(\s+)/)) {
    if (/^\s+$/.test(w) || w === "") {
      out.push(w);
      continue;
    }
    const key = w.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(w);
    }
  }
  return out.join("").replace(/\s+/g, " ").trim();
}

/** "hello_world-test" -> "Hello world test". */
export function humanize(value) {
  assertString(value);
  return capitalize(
    value
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
  );
}

const PLURAL_RULES = [
  [/(quiz)$/i, "$1zes"],
  [/^(ox)$/i, "$1en"],
  [/([ml])ouse$/i, "$1ice"],
  [/(matr|vert|ind)(ix|ex)$/i, "$1ices"],
  [/(x|ch|ss|sh)$/i, "$1es"],
  [/([^aeiouy]|qu)y$/i, "$1ies"],
  [/(hive)$/i, "$1s"],
  [/([^f])fe$/i, "$1ves"],
  [/([lr])f$/i, "$1ves"],
  [/sis$/i, "ses"],
  [/[ti]um$/i, "a"],
  [/(buffal|tomat)o$/i, "$1oes"],
  [/(bus)$/i, "$1es"],
  [/(alias|status)$/i, "$1es"],
  [/(octop|vir)us$/i, "$1i"],
  [/(ax|test)is$/i, "$1es"],
  [/s$/i, "s"],
  [/$/, "s"],
];
const SINGULAR_RULES = [
  [/([^f])ves$/i, "$1fe"],
  [/([lr])ves$/i, "$1f"],
  [/ies$/i, "y"],
  [/(x|ch|ss|sh)es$/i, "$1"],
  [/ses$/i, "sis"],
  [/s$/i, ""],
];
const UNCOUNTABLE = new Set(["sheep", "fish", "deer", "series", "species", "news", "rice", "money"]);

/** Naïve English pluralizer (covers common cases). */
export function pluralize(word, count, { inclusive = false } = {}) {
  assertString(word);
  const plural = toPlural(word);
  if (count === undefined) return plural;
  if (!Number.isFinite(count)) throw new TypeError("count must be a number");
  const form = count === 1 ? word : plural;
  return inclusive ? `${count} ${form}` : form;
}

function toPlural(word) {
  if (UNCOUNTABLE.has(word.toLowerCase())) return word;
  for (const [re, rep] of PLURAL_RULES) {
    if (re.test(word)) return word.replace(re, rep);
  }
  return word + "s";
}

/** Naïve English singularizer. */
export function singularize(word) {
  assertString(word);
  if (UNCOUNTABLE.has(word.toLowerCase())) return word;
  for (const [re, rep] of SINGULAR_RULES) {
    if (re.test(word)) return word.replace(re, rep);
  }
  return word;
}

/** 1 -> "1st", 2 -> "2nd", 3 -> "3rd", 4 -> "4th". */
export function ordinal(num) {
  const n = typeof num === "string" ? Number(num) : num;
  if (!Number.isInteger(n)) throw new TypeError("ordinal expects an integer");
  const mod100 = Math.abs(n) % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (Math.abs(n) % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

/** Wrap in double quotes (unless already quoted). */
export function quote(value, mark = '"') {
  assertString(value);
  assertString(mark, "mark");
  if (value.startsWith(mark) && value.endsWith(mark)) return value;
  return mark + value + mark;
}

/** Remove surrounding quotes/marks. */
export function unquote(value) {
  assertString(value);
  if (value.length >= 2) {
    const a = value[0];
    const b = value[value.length - 1];
    if ((a === '"' || a === "'" || a === "`") && a === b) return value.slice(1, -1);
  }
  return value;
}

/** Indent every line by `prefix` (default two spaces). */
export function indent(value, prefix = "  ") {
  assertString(value);
  assertString(prefix, "prefix");
  return lines(value)
    .map((l) => prefix + l)
    .join("\n");
}

/** Remove common leading indentation (template-literal friendly). */
export function dedent(value) {
  assertString(value);
  const ls = lines(value);
  const nonEmpty = ls.filter((l) => l.trim() !== "");
  if (nonEmpty.length === 0) return value;
  const indents = nonEmpty.map((l) => l.match(/^[\t ]*/)[0].length);
  const min = Math.min(...indents);
  return ls.map((l) => l.slice(min)).join("\n");
}

/** Greedy word-wrap to `width` columns. */
export function wordWrap(value, width = 80) {
  assertString(value);
  if (!Number.isInteger(width) || width <= 0) throw new RangeError("width must be a positive integer");
  const result = [];
  for (const line of lines(value)) {
    if (line.length <= width) {
      result.push(line);
      continue;
    }
    const wrds = line.split(/\s+/);
    let cur = "";
    for (const w of wrds) {
      if ((cur + (cur ? " " : "") + w).length > width) {
        if (cur) result.push(cur);
        cur = w;
      } else {
        cur = cur ? cur + " " + w : w;
      }
    }
    if (cur) result.push(cur);
  }
  return result.join("\n");
}

export const META = [
  { name: "reverse", category: CATEGORY, signature: "reverse(value)", description: "Reverse (emoji-safe).", example: `reverse("abc") // "cba"` },
  { name: "shuffleChars", category: CATEGORY, signature: "shuffleChars(value)", description: "Randomly shuffle characters.", example: `shuffleChars("abcd") // e.g. "cbad"` },
  { name: "shuffleWords", category: CATEGORY, signature: "shuffleWords(value)", description: "Randomly shuffle words.", example: `shuffleWords("a b c") // e.g. "c a b"` },
  { name: "sortLines", category: CATEGORY, signature: "sortLines(value, opts?)", description: "Sort lines alphabetically.", example: `sortLines("b\\na") // "a\\nb"` },
  { name: "uniqueWords", category: CATEGORY, signature: "uniqueWords(value)", description: "Drop duplicate words.", example: `uniqueWords("a a b") // "a b"` },
  { name: "humanize", category: CATEGORY, signature: "humanize(value)", description: "Underscore/camel -> 'Hello world'.", example: `humanize("hello_world") // "Hello world"` },
  { name: "pluralize", category: CATEGORY, signature: "pluralize(word, count?, {inclusive}?)", description: "English plural (common rules).", example: `pluralize("cat") // "cats"` },
  { name: "singularize", category: CATEGORY, signature: "singularize(word)", description: "English singular.", example: `singularize("cats") // "cat"` },
  { name: "ordinal", category: CATEGORY, signature: "ordinal(n)", description: "1 -> '1st'.", example: `ordinal(22) // "22nd"` },
  { name: "quote", category: CATEGORY, signature: "quote(value, mark?)", description: "Wrap in quotes.", example: `quote("hi") // '"hi"'` },
  { name: "unquote", category: CATEGORY, signature: "unquote(value)", description: "Remove surrounding quotes.", example: `unquote('"hi"') // "hi"` },
  { name: "indent", category: CATEGORY, signature: "indent(value, prefix?)", description: "Indent every line.", example: `indent("a\\nb") // "  a\\n  b"` },
  { name: "dedent", category: CATEGORY, signature: "dedent(value)", description: "Remove common indentation.", example: `dedent("  a\\n  b") // "a\\nb"` },
  { name: "wordWrap", category: CATEGORY, signature: "wordWrap(value, width?)", description: "Greedy wrap to width.", example: `wordWrap("a b c", 3)` },
];
