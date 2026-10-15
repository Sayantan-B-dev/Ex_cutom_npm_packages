import test from "node:test";
import assert from "node:assert/strict";
import { levenshtein, similarity, fuzzyIncludes } from "../src/similarity/index.js";

test("similarity module works standalone", () => {
  assert.equal(levenshtein("kitten", "sitting"), 3);
  assert.equal(similarity("abc", "abc"), 1);
  assert.equal(fuzzyIncludes("hello", "hllo"), true);
  assert.equal(fuzzyIncludes("hello", "xyz"), false);
});
