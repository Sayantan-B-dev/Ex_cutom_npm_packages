/** Crypto-backed float in [0, 1), with Math.random fallback (works in Node + browsers). */

export function randomFloat() {
  try {
    const c = globalThis.crypto;
    if (c?.getRandomValues) {
      const arr = new Uint32Array(1);
      c.getRandomValues(arr);
      return arr[0] / 4294967296;
    }
  } catch {
    /* fall through */
  }
  return Math.random();
}
