import test from "node:test";
import assert from "node:assert/strict";
import { words, getInitials, extractEmails, before, after } from "../src/extract/index.js";

test("extract module works standalone", () => {
  assert.deepEqual(words("hi, you!"), ["hi", "you"]);
  assert.equal(getInitials("John Fitzgerald Kennedy"), "JFK");
  assert.deepEqual(extractEmails("mail a@b.com now"), ["a@b.com"]);
  assert.equal(before("a=b", "="), "a");
  assert.equal(after("a=b", "="), "b");
});
