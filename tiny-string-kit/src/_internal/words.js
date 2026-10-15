/** Split any casing style into plain words. Handles camelCase, PascalCase, snake_case, kebab-case, dot.case, path/case, CONSTANT_CASE, sentences. */

export function splitIntoWords(value) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}
