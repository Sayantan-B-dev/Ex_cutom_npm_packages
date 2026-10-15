import test from "node:test";
import assert from "node:assert/strict";
import { randomString, uuid, uniqueId, hashString } from "../src/id/index.js";

test("id module works standalone", () => {
  assert.equal(randomString(10).length, 10);
  assert.match(uuid(), /^[0-9a-f-]{36}$/i);
  assert.ok(uniqueId("id_").startsWith("id_"));
  assert.equal(hashString("a"), hashString("a"));
});
