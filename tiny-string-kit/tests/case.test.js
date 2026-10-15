import test from "node:test";
import assert from "node:assert/strict";
import { slugify, camelCase } from "../src/case/index.js";

test("case module works standalone", () => {
  assert.equal(slugify("Hello, World!"), "hello-world");
  assert.equal(slugify("Café"), "cafe");
  assert.equal(camelCase("hello world"), "helloWorld");
  assert.throws(() => slugify(123), TypeError);
});
