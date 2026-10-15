import test from "node:test";
import assert from "node:assert/strict";
import { trimChars, collapseWhitespace, removeAccents, stripHtml } from "../src/clean/index.js";

test("clean module works standalone", () => {
  assert.equal(trimChars("---hi---", "-"), "hi");
  assert.equal(collapseWhitespace("a   b\n c"), "a b c");
  assert.equal(removeAccents("Café"), "Cafe");
  assert.equal(stripHtml("<b>hi</b>"), "hi");
});
