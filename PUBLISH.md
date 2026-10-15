# PUBLISH.md — how to publish any package from this repo

Publishing is always manual, one package at a time. Each package folder
is independent; nothing is published from the root.

## One-time setup

```bash
npm login
npm whoami   # must print your npm username
```

## Before every publish (inside the package folder)

1. `package.json` has: correct `name`, bumped `version`, `description`,
   `author`, `license`, `repository`/`bugs`/`homepage` URLs, and
   `engines` if the code needs a minimum Node version.
2. A `LICENSE` file exists and is listed in `files`.
3. `files` includes only what users need (`src/`, entry file, `README.md`,
   `LICENSE`). Tests stay out.
4. `exports` covers the entry point and every deep-import subpath.
5. `README.md` documents install + API + examples.
6. Name is free or version is new: `npm view <name> version`.

## Publish steps

Run inside the package folder (example: `strkit/`):

```bash
npm test
npm pack --dry-run   # inspect the tarball file list, then stop
npm publish --dry-run # must succeed with no errors
npm publish          # real publish; enter OTP if 2FA is on
```

Verify afterwards:

```bash
npm view <name> version   # should print the new version
```

## Version bumps

- Bug fixes only: patch (`1.0.0` → `1.0.1`).
- New features, old API still works: minor (`1.0.0` → `1.1.0`).
- Breaking changes: major (`1.0.0` → `2.0.0`).

```bash
npm version patch   # or minor / major (updates package.json + tags)
```

## Notes

- Never publish from `package-playground/` — it is a sandbox, not a package.
- Never unpublish to fix a mistake; publish a new fixed version instead.
- If publish fails with 403, check the name is yours and you are logged in.
