import test from "node:test";
import assert from "node:assert/strict";
import { mask, maskEmail, censor } from "../src/mask/index.js";

test("mask module works standalone", () => {
  assert.equal(mask("password", { visibleStart: 1, visibleEnd: 1 }), "p******d");
  assert.ok(maskEmail("john@example.com").includes("@example.com"));
  assert.equal(censor("oh damn it", "damn"), "oh *** it");
});
