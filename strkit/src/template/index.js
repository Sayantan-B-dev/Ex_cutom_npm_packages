/** Templating helpers. Deep import: `strkit-sbdev/template`. */
import { assertString } from "../_internal/guards.js";

export const CATEGORY = "template";
export const CATEGORY_LABEL = "Templating";

/**
 * Interpolate `{key}` / `{{key}}` placeholders (supports `a.b.c` paths).
 * Missing keys become "" (or `fallback` when provided).
 */
export function template(value, data = {}, fallback = "") {
  assertString(value);
  if (typeof data !== "object" || data === null) throw new TypeError("data must be an object");
  return value.replace(/\{\{\s*([\w$.]+)\s*\}\}|\{\s*([\w$.]+)\s*\}/g, (_, a, b) => {
    const path = (a ?? b ?? "").split(".");
    let cur = data;
    for (const k of path) {
      if (cur == null || typeof cur !== "object" || !(k in cur)) return fallback;
      cur = cur[k];
    }
    return cur == null ? fallback : String(cur);
  });
}

/** Positional formatting: format("Hi {0}, you are {1}", "Ada", "great"). */
export function format(value, ...args) {
  assertString(value);
  const params = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
  return value.replace(/\{(\d+)\}/g, (_, i) => {
    const idx = Number(i);
    return idx < params.length && params[idx] != null ? String(params[idx]) : _;
  });
}

export const META = [
  { name: "template", category: CATEGORY, signature: "template(value, data?, fallback?)", description: "Fill {key} / {{key}} (+ dotted paths).", example: `template("Hi {name}", {name:"Ada"})` },
  { name: "format", category: CATEGORY, signature: "format(value, ...args)", description: "Positional '{0}' formatting.", example: `format("{0} {1}", "a", "b") // "a b"` },
];
