import test from "node:test";
import assert from "node:assert/strict";
import { reverse, humanize, pluralize, singularize, ordinal } from "../src/transform/index.js";

test("transform module works standalone (cross-imports case + extract)", () => {
  assert.equal(reverse("abc"), "cba");
  assert.equal(humanize("hello_world-test"), "Hello world test");
  assert.equal(pluralize("cat"), "cats");
  assert.equal(singularize("cats"), "cat");
  assert.equal(ordinal(22), "22nd");
  assert.equal(humanize("helloWorld"), "Hello world");
});
