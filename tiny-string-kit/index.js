/**
 * tiny-string-kit — public entrypoint (backward compatible).
 *
 * The implementation now lives in `src/<category>/index.js` (one folder per
 * domain + `src/_internal/` for shared guards). This file is only a barrel so
 * `import { slugify } from "tiny-string-kit-sbdev"` keeps working.
 *
 * For smaller bundles, deep-import a single domain:
 *   import { slugify } from "tiny-string-kit-sbdev/case";
 *   import { isEmail } from "tiny-string-kit-sbdev/validate";
 */
export * from "./src/index.js";
import def from "./src/index.js";
export default def;
