/**
 * Barrel contract: the public entrypoint (`./index.js`) must re-export every
 * module identically, stay backward compatible, and support deep imports.
 * Per-domain behavior is covered in `tests/*.test.js`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import * as barrel from "./index.js";
import def from "./index.js";
import * as src from "./src/index.js";
import { slugify as deepSlugify } from "./src/case/index.js";
import { isEmail as deepIsEmail } from "./src/validate/index.js";

test("barrel preserves legacy behaviour", () => {
  assert.equal(barrel.slugify("Hello, World!"), "hello-world");
  assert.equal(barrel.capitalize("hello"), "Hello");
  assert.equal(barrel.truncate("Hello world", 8), "Hello...");
  assert.throws(() => barrel.slugify(123), TypeError);
  assert.throws(() => barrel.truncate("Hello", -1), RangeError);
});

test("root barrel re-exports src barrel 1:1", () => {
  assert.deepEqual(Object.keys(barrel).filter((k) => k !== "default").sort(), Object.keys(src).filter((k) => k !== "default").sort());
  assert.equal(barrel.slugify, src.slugify);
  assert.equal(barrel.help, src.help);
  assert.equal(typeof def.slugify, "function");
});

test("deep imports return the same function instances", () => {
  assert.equal(deepSlugify, barrel.slugify);
  assert.equal(deepIsEmail, barrel.isEmail);
  assert.equal(deepIsEmail("a@b.com"), true);
});

test("help() still shows the whole kit via the barrel", () => {
  const full = barrel.help();
  assert.ok(full.includes("slugify") && full.includes("levenshtein") && full.includes("uuid"));
  assert.ok(barrel.listFunctions().length > 100);
});
