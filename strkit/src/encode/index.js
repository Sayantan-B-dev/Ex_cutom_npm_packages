/** Encoding helpers (UTF-8 safe, Node + browser). Deep import: `strkit/encode`. */
import { assertString } from "../_internal/guards.js";
import { bytesFromString, stringFromBytes } from "../_internal/encoding.js";
import { isBase64 } from "../validate/index.js";

export const CATEGORY = "encode";
export const CATEGORY_LABEL = "Encoding";

/** UTF-8 string -> base64. */
export function toBase64(value) {
  assertString(value);
  if (typeof Buffer !== "undefined") return Buffer.from(value, "utf8").toString("base64");
  const bytes = bytesFromString(value);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/** base64 -> UTF-8 string. */
export function fromBase64(value) {
  assertString(value);
  const clean = value.trim().replace(/\s+/g, "");
  if (!isBase64(clean)) throw new TypeError("Invalid base64 string");
  if (typeof Buffer !== "undefined") return Buffer.from(clean, "base64").toString("utf8");
  const bin = atob(clean);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return stringFromBytes(bytes);
}

/** UTF-8 string -> lowercase hex. */
export function toHex(value) {
  assertString(value);
  const bytes = bytesFromString(value);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** hex -> UTF-8 string. */
export function fromHex(value) {
  assertString(value);
  const v = value.trim().toLowerCase().replace(/^0x/, "");
  if (v === "" || !/^[0-9a-f]*$/.test(v) || v.length % 2 !== 0) {
    throw new TypeError("Invalid hex string");
  }
  const bytes = new Uint8Array(v.length / 2);
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(v.slice(i * 2, i * 2 + 2), 16);
  return stringFromBytes(bytes);
}

export const META = [
  { name: "toBase64", category: CATEGORY, signature: "toBase64(value)", description: "UTF-8 -> base64.", example: `toBase64("hi") // "aGk="` },
  { name: "fromBase64", category: CATEGORY, signature: "fromBase64(value)", description: "base64 -> UTF-8.", example: `fromBase64("aGk=") // "hi"` },
  { name: "toHex", category: CATEGORY, signature: "toHex(value)", description: "UTF-8 -> hex.", example: `toHex("hi") // "6869"` },
  { name: "fromHex", category: CATEGORY, signature: "fromHex(value)", description: "hex -> UTF-8.", example: `fromHex("6869") // "hi"` },
];
