/**
 * Discovery helpers — `help()` shows everything this kit can do.
 * Deep import: `strkit/help`.
 */
import { META as caseMeta, CATEGORY_LABEL as caseLabel } from "../case/index.js";
import { META as cleanMeta, CATEGORY_LABEL as cleanLabel } from "../clean/index.js";
import { META as escapeMeta, CATEGORY_LABEL as escapeLabel } from "../escape/index.js";
import { META as fitMeta, CATEGORY_LABEL as fitLabel } from "../fit/index.js";
import { META as validateMeta, CATEGORY_LABEL as validateLabel } from "../validate/index.js";
import { META as measureMeta, CATEGORY_LABEL as measureLabel } from "../measure/index.js";
import { META as extractMeta, CATEGORY_LABEL as extractLabel } from "../extract/index.js";
import { META as transformMeta, CATEGORY_LABEL as transformLabel } from "../transform/index.js";
import { META as templateMeta, CATEGORY_LABEL as templateLabel } from "../template/index.js";
import { META as encodeMeta, CATEGORY_LABEL as encodeLabel } from "../encode/index.js";
import { META as similarityMeta, CATEGORY_LABEL as similarityLabel } from "../similarity/index.js";
import { META as maskMeta, CATEGORY_LABEL as maskLabel } from "../mask/index.js";
import { META as idMeta, CATEGORY_LABEL as idLabel } from "../id/index.js";

export const CATEGORY = "help";
export const CATEGORY_LABEL = "Discovery / help";

export const META = [
  { name: "help", category: CATEGORY, signature: "help(topic?)", description: "Show everything this kit can do (or deep-dive one fn/category).", example: `help() / help("slugify") / help("case")` },
  { name: "listFunctions", category: CATEGORY, signature: "listFunctions()", description: "All exported function names.", example: `listFunctions() // ["slugify", ...]` },
  { name: "listCategories", category: CATEGORY, signature: "listCategories()", description: "All categories.", example: `listCategories()` },
  { name: "describe", category: CATEGORY, signature: "describe(name)", description: "Metadata for one function (or null).", example: `describe("slugify")` },
];

export const REGISTRY = [
  ...caseMeta,
  ...cleanMeta,
  ...escapeMeta,
  ...fitMeta,
  ...validateMeta,
  ...measureMeta,
  ...extractMeta,
  ...transformMeta,
  ...templateMeta,
  ...encodeMeta,
  ...similarityMeta,
  ...maskMeta,
  ...idMeta,
  ...META,
];

export const CATEGORY_LABELS = {
  case: caseLabel,
  clean: cleanLabel,
  escape: escapeLabel,
  fit: fitLabel,
  validate: validateLabel,
  measure: measureLabel,
  extract: extractLabel,
  transform: transformLabel,
  template: templateLabel,
  encode: encodeLabel,
  similarity: similarityLabel,
  mask: maskLabel,
  id: idLabel,
  help: CATEGORY_LABEL,
};

/** All exported function names. */
export function listFunctions() {
  return REGISTRY.map((r) => r.name);
}

/** All categories (slugs). */
export function listCategories() {
  return [...new Set(REGISTRY.map((r) => r.category))];
}

/** Metadata for one function, or null when unknown. */
export function describe(name) {
  if (typeof name !== "string") throw new TypeError("name must be a string");
  const key = name.trim().toLowerCase();
  const found =
    REGISTRY.find((r) => r.name.toLowerCase() === key) ??
    REGISTRY.find((r) => r.name.toLowerCase().replace(/_/g, "") === key.replace(/_/g, ""));
  return found ? { ...found, categoryLabel: CATEGORY_LABELS[found.category] ?? found.category } : null;
}

function renderFullHelp() {
  const linesOut = [];
  linesOut.push("strkit — everything you can do");
  linesOut.push("=".repeat(42));
  linesOut.push("");
  linesOut.push("Tip: help(\"slugify\") for one function, help(\"case\") for a category.");
  linesOut.push("");
  for (const cat of listCategories()) {
    linesOut.push(`## ${CATEGORY_LABELS[cat] ?? cat}  [${cat}]`);
    for (const item of REGISTRY.filter((r) => r.category === cat)) {
      linesOut.push(`  • ${item.signature} — ${item.description}`);
    }
    linesOut.push("");
  }
  linesOut.push(`Total: ${REGISTRY.length} helpers across ${listCategories().length} categories.`);
  return linesOut.join("\n");
}

function renderTopicHelp(topic) {
  const q = topic.trim().toLowerCase();
  if (listCategories().includes(q) || Object.values(CATEGORY_LABELS).some((l) => l.toLowerCase() === q)) {
    const cat = listCategories().find((c) => c === q || (CATEGORY_LABELS[c] ?? "").toLowerCase() === q);
    const items = REGISTRY.filter((r) => r.category === cat);
    const out = [`${CATEGORY_LABELS[cat]} [${cat}]`, "=".repeat(30), ""];
    for (const item of items) {
      out.push(`• ${item.signature}`);
      out.push(`  ${item.description}`);
      out.push(`  e.g. ${item.example}`);
      out.push("");
    }
    return out.join("\n");
  }
  const meta = describe(topic);
  if (meta) {
    return [
      `${meta.name} [${meta.category}]`,
      "=".repeat(30),
      `Signature:   ${meta.signature}`,
      `Description: ${meta.description}`,
      `Example:     ${meta.example}`,
      "",
      `Try: help("${meta.category}") for related helpers, or help() for everything.`,
    ].join("\n");
  }
  return [
    `Unknown topic "${topic}".`,
    "",
    `Categories: ${listCategories().join(", ")}`,
    `Try help() to see all ${REGISTRY.length} helpers, e.g. help("slugify").`,
  ].join("\n");
}

/**
 * Show everything this kit can do.
 *
 * - `help()` prints + returns the full catalog.
 * - `help("slugify")` prints + returns one function's docs.
 * - `help("case")` prints + returns one category.
 */
export function help(topic) {
  const text = topic === undefined ? renderFullHelp() : renderTopicHelp(String(topic));
  try {
    if (typeof console !== "undefined" && typeof console.log === "function") console.log(text);
  } catch {
    /* ignore logging failures */
  }
  return text;
}
