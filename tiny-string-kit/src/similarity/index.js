/** Similarity / fuzzy helpers. Deep import: `tiny-string-kit-sbdev/similarity`. */
import { assertString } from "../_internal/guards.js";

export const CATEGORY = "similarity";
export const CATEGORY_LABEL = "Similarity / fuzzy";

/** Levenshtein edit distance. */
export function levenshtein(a, b) {
  assertString(a, "a");
  assertString(b, "b");
  const A = Array.from(a);
  const B = Array.from(b);
  if (A.length === 0) return B.length;
  if (B.length === 0) return A.length;
  let prev = Array.from({ length: B.length + 1 }, (_, i) => i);
  for (let i = 1; i <= A.length; i++) {
    const cur = [i];
    for (let j = 1; j <= B.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (A[i - 1] === B[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[B.length];
}

/** Normalized similarity 0..1 (1 = identical). */
export function similarity(a, b) {
  assertString(a, "a");
  assertString(b, "b");
  const len = Math.max(Array.from(a).length, Array.from(b).length);
  if (len === 0) return 1;
  return 1 - levenshtein(a, b) / len;
}

function jaro(a, b) {
  const A = Array.from(a);
  const B = Array.from(b);
  if (A.length === 0 || B.length === 0) return 0;
  const range = Math.max(0, Math.floor(Math.max(A.length, B.length) / 2) - 1);
  const aMatch = new Array(A.length).fill(false);
  const bMatch = new Array(B.length).fill(false);
  let matches = 0;
  for (let i = 0; i < A.length; i++) {
    const lo = Math.max(0, i - range);
    const hi = Math.min(i + range + 1, B.length);
    for (let j = lo; j < hi; j++) {
      if (!bMatch[j] && A[i] === B[j]) {
        aMatch[i] = true;
        bMatch[j] = true;
        matches++;
        break;
      }
    }
  }
  if (matches === 0) return 0;
  let t = 0;
  let k = 0;
  for (let i = 0; i < A.length; i++) {
    if (aMatch[i]) {
      while (!bMatch[k]) k++;
      if (A[i] !== B[k]) t++;
      k++;
    }
  }
  t /= 2;
  return (matches / A.length + matches / B.length + (matches - t) / matches) / 3;
}

/** Jaro-Winkler similarity 0..1 (boosts common prefixes). */
export function jaroWinkler(a, b, scaling = 0.1) {
  assertString(a, "a");
  assertString(b, "b");
  const j = jaro(a, b);
  const A = Array.from(a);
  const B = Array.from(b);
  let prefix = 0;
  for (let i = 0; i < Math.min(4, A.length, B.length); i++) {
    if (A[i] === B[i]) prefix++;
    else break;
  }
  return j + prefix * scaling * (1 - j);
}

/** True when typo-tolerant fuzzy match passes threshold. */
export function fuzzyIncludes(haystack, needle, threshold = 0.7) {
  assertString(haystack, "haystack");
  assertString(needle, "needle");
  if (typeof threshold !== "number" || threshold < 0 || threshold > 1) {
    throw new RangeError("threshold must be between 0 and 1");
  }
  if (needle === "") return true;
  const h = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (h.includes(n)) return true;
  if (n.length > h.length) return similarity(h, n) >= threshold;
  let best = 0;
  for (let i = 0; i <= h.length - n.length; i++) {
    best = Math.max(best, similarity(h.slice(i, i + n.length), n));
    if (best >= threshold) return true;
  }
  return false;
}

export const META = [
  { name: "levenshtein", category: CATEGORY, signature: "levenshtein(a, b)", description: "Edit distance.", example: `levenshtein("kitten","sitting") // 3` },
  { name: "similarity", category: CATEGORY, signature: "similarity(a, b)", description: "0..1 similarity (1 = identical).", example: `similarity("abc","abc") // 1` },
  { name: "jaroWinkler", category: CATEGORY, signature: "jaroWinkler(a, b, scaling?)", description: "Prefix-boosted string similarity.", example: `jaroWinkler("martha","marhta") // ~0.96` },
  { name: "fuzzyIncludes", category: CATEGORY, signature: "fuzzyIncludes(haystack, needle, threshold?)", description: "Typo-tolerant includes.", example: `fuzzyIncludes("hello", "hllo") // true` },
];
