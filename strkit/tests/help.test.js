import test from "node:test";
import assert from "node:assert/strict";
import { help, listFunctions, listCategories, describe } from "../src/help/index.js";

test("help module aggregates every category", () => {
  const full = help();
  for (const fn of ["slugify", "truncate", "levenshtein", "template", "uuid", "maskEmail"]) {
    assert.ok(full.includes(fn), `help() missing ${fn}`);
  }
  assert.ok(listFunctions().includes("help"));
  assert.ok(listCategories().includes("case"));
  assert.equal(describe("slugify").name, "slugify");
  assert.equal(describe("nope"), null);
  assert.ok(help("case").includes("camelCase"));
  assert.ok(help("slugify").includes("slugify"));
});
