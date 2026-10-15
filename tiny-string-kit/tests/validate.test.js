import test from "node:test";
import assert from "node:assert/strict";
import { isEmail, isUrl, isPalindrome, isSlug, isIpv4, equalsIgnoreCase } from "../src/validate/index.js";
import { uuid } from "../src/id/index.js";
import { isUuid } from "../src/validate/index.js";

test("validate module works standalone", () => {
  assert.equal(isEmail("a@b.com"), true);
  assert.equal(isEmail("nope"), false);
  assert.equal(isUrl("https://example.com"), true);
  assert.equal(isPalindrome("racecar"), true);
  assert.equal(isSlug("hello-world"), true);
  assert.equal(isUuid(uuid()), true);
  assert.equal(isIpv4("127.0.0.1"), true);
  assert.equal(equalsIgnoreCase("Hi", "hi"), true);
});
