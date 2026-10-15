import test from "node:test";
import assert from "node:assert/strict";
import { truncate, truncateWords, truncateMiddle, padCenter } from "../src/fit/index.js";

test("fit module works standalone (legacy truncate preserved)", () => {
  assert.equal(truncate("Hello world", 8), "Hello...");
  assert.equal(truncate("Hi", 10), "Hi");
  assert.equal(truncateWords("a b c d", 2), "a b…");
  assert.equal(truncateMiddle("HelloWorld", 8).length, 8);
  assert.equal(padCenter("hi", 6), "  hi  ");
  assert.throws(() => truncate("Hello", -1), RangeError);
});
