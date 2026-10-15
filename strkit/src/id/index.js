/** Random / ids / hash helpers. Deep import: `strkit-sbdev/id`. */
import { assertString } from "../_internal/guards.js";
import { randomFloat } from "../_internal/random.js";

export const CATEGORY = "id";
export const CATEGORY_LABEL = "Random / ids / hash";

/**
 * Cryptographically-strong random string.
 * @param {number} [length=16]
 * @param {string} [alphabet="alphanumeric"] preset or custom chars
 */
export function randomString(length = 16, alphabet = "alphanumeric") {
  if (!Number.isInteger(length) || length < 0) throw new RangeError("length must be a non-negative integer");
  const PRESETS = {
    alphanumeric: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    alpha: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    numeric: "0123456789",
    hex: "0123456789abcdef",
    base36: "abcdefghijklmnopqrstuvwxyz0123456789",
    symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
  };
  const chars = PRESETS[alphabet] ?? alphabet;
  if (typeof chars !== "string" || chars.length === 0) throw new TypeError("alphabet must be a non-empty string");
  const pool = Array.from(chars);
  let out = "";
  try {
    const c = globalThis.crypto;
    if (c?.getRandomValues) {
      const rand = new Uint32Array(length);
      c.getRandomValues(rand);
      for (let i = 0; i < length; i++) out += pool[rand[i] % pool.length];
      return out;
    }
  } catch {
    /* fallback below */
  }
  for (let i = 0; i < length; i++) out += pool[Math.floor(Math.random() * pool.length)];
  return out;
}

/** RFC 4122 v4 UUID (uses crypto when available). */
export function uuid() {
  try {
    const c = globalThis.crypto;
    if (c?.randomUUID) return c.randomUUID();
  } catch {
    /* fallback */
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (ch) => {
    const r = Math.floor(randomFloat() * 16);
    return (ch === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

let __uidCounter = 0;
/** Incrementing unique id: uniqueId("id_") -> "id_1". */
export function uniqueId(prefix = "") {
  assertString(prefix, "prefix");
  __uidCounter += 1;
  return `${prefix}${__uidCounter}`;
}

/**
 * Fast non-crypto string hash (cyrb53) returned as hex.
 * Good for checksums / sharding — NOT for passwords.
 */
export function hashString(value, seed = 0) {
  assertString(value);
  if (!Number.isInteger(seed)) throw new TypeError("seed must be an integer");
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < value.length; i++) {
    const ch = value.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hash = (h2 >>> 0) * 4294967296 + (h1 >>> 0);
  return hash.toString(16);
}

export const META = [
  { name: "randomString", category: CATEGORY, signature: "randomString(length?, alphabet?)", description: "Crypto-strong random string.", example: `randomString(8) // e.g. "aB3xYz12"` },
  { name: "uuid", category: CATEGORY, signature: "uuid()", description: "RFC 4122 v4 UUID.", example: `uuid() // "xxxxxxxx-xxxx-..."` },
  { name: "uniqueId", category: CATEGORY, signature: "uniqueId(prefix?)", description: "Incrementing id.", example: `uniqueId("id_") // "id_1"` },
  { name: "hashString", category: CATEGORY, signature: "hashString(value, seed?)", description: "Fast cyrb53 hash as hex (not for passwords).", example: `hashString("hello") // "..."` },
];
