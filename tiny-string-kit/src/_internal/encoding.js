/** UTF-8 byte helpers (Node Buffer <-> Web TextEncoder/TextDecoder). */

export function bytesFromString(value) {
  if (typeof TextEncoder !== "undefined") return new TextEncoder().encode(value);
  if (typeof Buffer !== "undefined") return Uint8Array.from(Buffer.from(value, "utf8"));
  throw new Error("No UTF-8 encoder available in this environment");
}

export function stringFromBytes(bytes) {
  if (typeof TextDecoder !== "undefined") return new TextDecoder().decode(bytes);
  if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("utf8");
  throw new Error("No UTF-8 decoder available in this environment");
}
