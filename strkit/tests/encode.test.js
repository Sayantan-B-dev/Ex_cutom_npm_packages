import test from "node:test";
import assert from "node:assert/strict";
import { toBase64, fromBase64, toHex, fromHex } from "../src/encode/index.js";

test("encode module works standalone", () => {
  assert.equal(fromBase64(toBase64("hello 👋")), "hello 👋");
  assert.equal(fromHex(toHex("hello")), "hello");
  assert.throws(() => fromBase64("!!!"), TypeError);
});
