/** Shared input guards. */

export function assertString(value, name = "value") {
  if (typeof value !== "string") {
    throw new TypeError(`Expected ${name} to be a string, got ${typeof value}`);
  }
}

export function assertNonNegativeInt(value, name = "maxLength") {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer`);
  }
}
