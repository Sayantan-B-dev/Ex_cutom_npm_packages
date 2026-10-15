import test from "node:test";
import assert from "node:assert/strict";
import { template, format } from "../src/template/index.js";

test("template module works standalone", () => {
  assert.equal(template("Hi {name}!", { name: "Ada" }), "Hi Ada!");
  assert.equal(template("Hi {{user.name}}", { user: { name: "Ada" } }), "Hi Ada");
  assert.equal(format("{0} {1}", "a", "b"), "a b");
});
