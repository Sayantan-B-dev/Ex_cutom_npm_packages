import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, unescapeHtml, escapeRegExp, escapeCsv } from "../src/escape/index.js";

test("escape module works standalone", () => {
  assert.equal(escapeHtml("<a>&"), "&lt;a&gt;&amp;");
  assert.equal(unescapeHtml("&lt;a&gt;&amp;"), "<a>&");
  assert.equal(escapeRegExp("a+b"), "a\\+b");
  assert.equal(escapeCsv('a,"b"'), '"a,""b"""');
});
