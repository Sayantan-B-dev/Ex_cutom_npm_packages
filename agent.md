# agent.md — repo rules for AI assistants and contributors

This repo holds many independent npm packages, one folder per package.
`package-playground/` is a local sandbox for trying them out.

## Layout

- `<package-name>/` — one self-contained publishable package
  (own `package.json`, `src/`, `tests/`, `README.md`, `LICENSE`).
- `package-playground/` — sandbox only. Never commit it, never refactor it
  as part of package work. It is fully ignored by git.
- Root holds only shared repo files (`agent.md`, `PUBLISH.md`, `.gitignore`).

## Commit rules (must follow)

1. Simple names: short, lowercase, plain words. Example: `add validation utilities`.
2. No emojis anywhere in commits.
3. No AI tagging or watermarking. No `Co-authored-by` trailers, no
   `Generated with`, no tool or model mentions in messages or bodies.
4. Every commit must be one proper feature. No micro commits like
   `fix typo`, `wip`, `update`, or single-line changes standing alone.
5. Small related changes get merged into one commit with their similar
   changes instead of being committed separately.
6. One package per commit. Never mix two packages in a single commit.
7. Docs-only changes for a package go in that package's own commit
   (for example `add documentation`), not mixed with code changes.
8. Keep `package-playground/` out of every commit.

## Package conventions

- ESM only (`"type": "module"`), zero dependencies unless a package
  genuinely needs one.
- Source split by domain: `src/<domain>/index.js` plus `src/_internal/`
  for shared helpers. No single giant file.
- One test file per module in `tests/`, runnable with `npm test`.
- Every package ships `README.md` (install + API + examples) and `LICENSE`.

## Package tiers

Every package picks one tier and meets its full bar before publish.
`strkit` is the advanced reference implementation.

- Basic — one small job, one or two files (example: a slug-only helper).
  Needs: `package.json`, entry file, a few tests, short README, `LICENSE`.
- Intermediate — several related modules (example: a date or color kit).
  Needs everything in basic, plus: `src/<domain>/` split, one test file
  per module, full README with install + API + examples, `engines` set.
- Advanced — a full toolkit like `strkit`.
  Needs everything in intermediate, plus: deep-import `exports` map,
  runtime discovery docs (`help()` or equivalent), `files` whitelist,
  `prepublishOnly` test guard.

Rules for new packages:

- A new package means a new folder. Never nest a package inside another.
- Packages never import each other with relative paths. Test them together
  only through `package-playground/` using `file:` installs.
- A package can move up a tier later; the checklist above decides what
  is still missing.

## Publishing

Publishing is manual. Follow `PUBLISH.md` in the root.
