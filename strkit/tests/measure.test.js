import test from "node:test";
import assert from "node:assert/strict";
import { wordCount, charCount, countSubstring, wordFrequency } from "../src/measure/index.js";

test("measure module works standalone", () => {
  assert.equal(wordCount("a b c"), 3);
  assert.equal(charCount("a b", { ignoreSpaces: true }), 2);
  assert.equal(countSubstring("aaa", "aa", { overlapping: true }), 2);
  assert.deepEqual(wordFrequency("a a b"), { a: 2, b: 1 });
});
