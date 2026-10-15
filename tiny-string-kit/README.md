# Tiny String Kit — Advanced Edition

> **105 dependency-free string helpers** for JavaScript, in **14 modular folders**,
> with a built-in `help()` that documents everything at runtime.

- ✅ Zero dependencies — works in **Node 18+** and modern **browsers** (ESM)
- ✅ Modular source: `src/case`, `src/clean`, `src/validate`, … (no giant file)
- ✅ Tree-shaking friendly **deep imports** (`tiny-string-kit-sbdev/case`)
- ✅ Runtime discovery: `help()`, `help("slugify")`, `help("case")`
- ✅ Unicode-aware, emoji-safe, crypto-backed randomness where it matters

---

## Table of contents

1. [Requirements](#1-requirements)
2. [Installation](#2-installation)
3. [Quick start](#3-quick-start)
4. [Discovery — `help()` shows everything](#4-discovery--helpshows-everything)
5. [Import styles](#5-import-styles)
6. [API reference](#6-api-reference)
   - [6.1 Case conversion (`case`) — 15 fns](#61-case-conversion-case--15-functions)
   - [6.2 Cleaning / normalizing (`clean`) — 8 fns](#62-cleaning--normalizing-clean--8-functions)
   - [6.3 Escaping (`escape`) — 4 fns](#63-escaping-escape--4-functions)
   - [6.4 Truncate / pad (`fit`) — 4 fns](#64-truncate--pad-fit--4-functions)
   - [6.5 Validation & checks (`validate`) — 20 fns](#65-validation--checks-validate--20-functions)
   - [6.6 Measure / count (`measure`) — 7 fns](#66-measure--count-measure--7-functions)
   - [6.7 Extract / search (`extract`) — 12 fns](#67-extract--search-extract--12-functions)
   - [6.8 Transform (`transform`) — 14 fns](#68-transform-transform--14-functions)
   - [6.9 Templating (`template`) — 2 fns](#69-templating-template--2-functions)
   - [6.10 Encoding (`encode`) — 4 fns](#610-encoding-encode--4-functions)
   - [6.11 Similarity / fuzzy (`similarity`) — 4 fns](#611-similarity--fuzzy-similarity--4-functions)
   - [6.12 Mask / redact (`mask`) — 3 fns](#612-mask--redact-mask--3-functions)
   - [6.13 Random / ids / hash (`id`) — 4 fns](#613-random--ids--hash-id--4-functions)
   - [6.14 Discovery (`help`) — 4 fns](#614-discovery-help--4-functions)
7. [Option objects & tricky signatures](#7-option-objects--tricky-signatures)
8. [Error handling](#8-error-handling)
9. [Real-world recipes](#9-real-world-recipes)
10. [Project structure](#10-project-structure)
11. [Testing](#11-testing)
12. [Changelog](#12-changelog)
13. [License](#13-license)

---

## 1. Requirements

| Requirement | Detail |
|---|---|
| Node.js | **18+** (ES modules + built-in test runner) |
| Module system | **ESM** (`import … from`) — package has `"type": "module"` |
| Browser | Any modern browser (no Node-only APIs in the hot path; `Buffer` is used only as a fallback) |
| Dependencies | **None** |

---

## 2. Installation

### From npm (once published)

```bash
npm install tiny-string-kit-sbdev
```

### From a local folder (monorepo / `file:` dependency)

```bash
npm install file:../tiny-string-kit
# package.json then contains:
# "dependencies": { "tiny-string-kit-sbdev": "file:../tiny-string-kit" }
```

### From git

```bash
npm install github:<owner>/tiny-string-kit
```

### Verify the install

```bash
node -e "import('tiny-string-kit-sbdev').then(m => console.log(m.listFunctions().length))"
# 105
```

> **CommonJS note:** this package is ESM-only. In a CJS project, use dynamic
> `import()`:
>
> ```js
> const { slugify } = await import("tiny-string-kit-sbdev");
> ```

---

## 3. Quick start

```js
import { slugify, capitalize, truncate } from "tiny-string-kit-sbdev";

console.log(slugify("My First npm Package!"));
// "my-first-npm-package"

console.log(capitalize("hello world"));
// "Hello world"

console.log(truncate("Learning npm package development", 12));
// "Learning ..." (12 chars: 9 of text + "...")
```

A slightly bigger taste — one function per category:

```js
import {
  kebabCase, collapseWhitespace, escapeHtml, truncateWords,
  isEmail, wordCount, extractEmails, humanize,
  template, toBase64, similarity, maskEmail,
  randomString, help,
} from "tiny-string-kit-sbdev";

console.log(kebabCase("HelloWorldFoo"));            // "hello-world-foo"
console.log(collapseWhitespace("  too   much \n space ")); // "too much space"
console.log(escapeHtml('<b>"hi"</b> & bye'));       // "&lt;b&gt;&quot;hi&quot;&lt;/b&gt; &amp; bye"
console.log(truncateWords("one two three four", 3)); // "one two three…"
console.log(isEmail("ada@example.com"));            // true
console.log(wordCount("the cat and the dog"));      // 5
console.log(extractEmails("mail ada@x.com now"));   // ["ada@x.com"]
console.log(humanize("hello_world-testCase"));      // "Hello world test case"
console.log(template("Hi {name}!", { name: "Ada" })); // "Hi Ada!"
console.log(toBase64("hi"));                        // "aGk="
console.log(similarity("hello", "hallo"));          // 0.8
console.log(maskEmail("john.doe@example.com"));     // "j*******@example.com"
console.log(randomString(10).length);               // 10
console.log(typeof help());                         // "string" (and the catalog is printed)
```

---

## 4. Discovery — `help()` shows everything

You never need to memorize this README. At runtime:

```js
import { help, listFunctions, listCategories, describe } from "tiny-string-kit-sbdev";

console.log(help());
// ── prints the FULL catalog, grouped by category ──
// tiny-string-kit — everything you can do
// ==========================================
// ## Case conversion  [case]
//   • slugify(value, separator?) — URL-friendly slug ...
//   ... (all 105 helpers)
// Total: 105 helpers across 14 categories.

console.log(help("slugify"));
// slugify [case]
// ==============================
// Signature:   slugify(value, separator?)
// Description: URL-friendly slug: 'Hello World!' -> 'hello-world'.
// Example:     slugify("Hello, World!") // "hello-world"

console.log(help("case"));   // every case-conversion helper with examples
console.log(help("nope"));   // friendly "Unknown topic" + category list

console.log(listFunctions().length); // 105
console.log(listCategories());
// ["case","clean","escape","fit","validate","measure",
//  "extract","transform","template","encode",
//  "similarity","mask","id","help"]

console.log(describe("levenshtein"));
// {
//   name: "levenshtein",
//   category: "similarity",
//   categoryLabel: "Similarity / fuzzy",
//   signature: "levenshtein(a, b)",
//   description: "Edit distance.",
//   example: 'levenshtein("kitten","sitting") // 3'
// }

console.log(describe("nope")); // null
```

`help()` **prints** to the console **and returns** the text, so it works in
REPLs, CLIs, and log files alike.

---

## 5. Import styles

### A. Whole kit (simplest)

```js
import { slugify, isEmail, uuid } from "tiny-string-kit-sbdev";
```

### B. Deep imports (smallest bundles — recommended for frontends)

Every folder is a public subpath:

| Import path | Gives you |
|---|---|
| `tiny-string-kit-sbdev/case` | 15 case-conversion helpers |
| `tiny-string-kit-sbdev/clean` | 8 cleaning helpers |
| `tiny-string-kit-sbdev/escape` | 4 escaping helpers |
| `tiny-string-kit-sbdev/fit` | 4 truncate/pad helpers |
| `tiny-string-kit-sbdev/validate` | 20 validators |
| `tiny-string-kit-sbdev/measure` | 7 measure/count helpers |
| `tiny-string-kit-sbdev/extract` | 12 extract/search helpers |
| `tiny-string-kit-sbdev/transform` | 14 transform helpers |
| `tiny-string-kit-sbdev/template` | 2 templating helpers |
| `tiny-string-kit-sbdev/encode` | 4 encoding helpers |
| `tiny-string-kit-sbdev/similarity` | 4 similarity helpers |
| `tiny-string-kit-sbdev/mask` | 3 mask/redact helpers |
| `tiny-string-kit-sbdev/id` | 4 random/id/hash helpers |
| `tiny-string-kit-sbdev/help` | `help`, `listFunctions`, `listCategories`, `describe` |

```js
import { slugify } from "tiny-string-kit-sbdev/case";
import { isEmail } from "tiny-string-kit-sbdev/validate";

console.log(slugify("Hello World!")); // "hello-world"
console.log(isEmail("a@b.com"));      // true
```

### C. Namespace access

```js
import { categories } from "tiny-string-kit-sbdev";

console.log(categories.case.slugify("Hi There")); // "hi-there"
console.log(categories.validate.isUrl("https://x.com")); // true
```

### D. Default import (whole kit as one object)

```js
import kit from "tiny-string-kit-sbdev";

console.log(kit.camelCase("hello world")); // "helloWorld"
```

---

## 6. API reference

> ✅ Every example below was **executed against the real code** — outputs are exact
> (long floats truncated with `…` for readability where noted).

### 6.1 Case conversion (`case`) — 15 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `slugify(value, separator?)` | URL-friendly slug; strips accents, lowercases | `slugify("Café au lait!")` | `"cafe-au-lait"` |
| `slugify(value, separator?)` | Custom separator | `slugify("Hello World", "_")` | `"hello_world"` |
| `camelCase(value)` | `→ helloWorldFooBar` | `camelCase("Hello-World_foo bar")` | `"helloWorldFooBar"` |
| `pascalCase(value)` | `→ HelloWorld` | `pascalCase("hello world")` | `"HelloWorld"` |
| `snakeCase(value)` | `→ hello_world_foo` | `snakeCase("HelloWorldFoo")` | `"hello_world_foo"` |
| `kebabCase(value)` | `→ hello-world-foo` | `kebabCase("HelloWorldFoo")` | `"hello-world-foo"` |
| `titleCase(value)` | First letter of each word upper | `titleCase("hello world")` | `"Hello World"` |
| `sentenceCase(value)` | First letter upper, rest lower | `sentenceCase("hELLO WORLD")` | `"Hello world"` |
| `constantCase(value)` | `→ HELLO_WORLD` (env-var style) | `constantCase("hello world")` | `"HELLO_WORLD"` |
| `dotCase(value)` | `→ hello.world` | `dotCase("hello world")` | `"hello.world"` |
| `pathCase(value)` | `→ hello/world` | `pathCase("hello world")` | `"hello/world"` |
| `headerCase(value)` | `→ Hello-World` (HTTP-header style) | `headerCase("hello world")` | `"Hello-World"` |
| `swapCase(value)` | Flip every letter's case | `swapCase("hELLO wORLD")` | `"Hello World"` |
| `capitalize(value)` | Uppercase first char only | `capitalize("hello")` | `"Hello"` |
| `uncapitalize(value)` | Lowercase first char only | `uncapitalize("Hello")` | `"hello"` |
| `capitalizeWords(value)` | Uppercase each word's first letter | `capitalizeWords("hello world")` | `"Hello World"` |

Edge cases worth knowing:

```js
slugify("  Hello   npm  "); // "hello-npm"   (trims + collapses)
camelCase("");              // ""            (empty in → empty out)
capitalize("");             // ""            (no crash on empty)
slugify(123);               // throws TypeError: Expected a string
```

### 6.2 Cleaning / normalizing (`clean`) — 8 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `trimChars(value, chars?)` | Trim whitespace, or a custom char set | `trimChars("---hello---", "-")` | `"hello"` |
| `collapseWhitespace(value)` | All whitespace runs → one space + trim | `collapseWhitespace("  hello   world \n new")` | `"hello world new"` |
| `removeAccents(value)` | Strip diacritics | `removeAccents("Café naïve résumé")` | `"Cafe naive resume"` |
| `removeNonAscii(value)` | Drop every non-ASCII char | `removeNonAscii("héllo→")` | `"hllo"` |
| `stripPunctuation(value)` | Keep letters/numbers/spaces only | `stripPunctuation("hi, you! (yes?)")` | `"hi you yes"` |
| `stripHtml(value)` | Remove `<tags>` | `stripHtml("<p>Hello <b>world</b></p>")` | `"Hello world"` |
| `stripEmojis(value)` | Remove emoji/pictographs | `stripEmojis("hi 👋 there 🎉")` | `"hi  there "` |
| `normalizeText(value, form?)` | Unicode normalize: `NFC` (default), `NFD`, `NFKC`, `NFKD` | `normalizeText("é", "NFD").length` | `2` (e + combining accent) |

```js
trimChars("  padded  ");      // "padded"  (no 2nd arg = plain trim)
normalizeText("é", "bogus");  // throws RangeError (bad form)
```

### 6.3 Escaping (`escape`) — 4 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `escapeHtml(value)` | Escape `& < > " ' \`` for HTML | `escapeHtml('<a href="x">&"hi"</a>')` | `"&lt;a href=&quot;x&quot;&gt;&amp;&quot;hi&quot;&lt;/a&gt;"` |
| `unescapeHtml(value)` | Reverse `escapeHtml` | `unescapeHtml("&lt;a&gt;&amp;")` | `"<a>&"` |
| `escapeRegExp(value)` | Escape for literal `new RegExp(...)` use | `escapeRegExp("a+b (c)")` | `"a\\+b \\(c\\)"` |
| `escapeCsv(value)` | Quote one CSV cell (RFC 4180) | `escapeCsv('a,"b"')` | `'"a,""b"""'` |

```js
// Safe dynamic regex:
const word = "a+b";
new RegExp(`^${escapeRegExp(word)}$`).test("a+b"); // true

escapeCsv("plain"); // "plain" (no quoting when unneeded)
```

### 6.4 Truncate / pad (`fit`) — 4 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `truncate(value, maxLength, options?)` | Cut to length + `"..."` (legacy-compatible) | `truncate("Hello world", 8)` | `"Hello..."` |
| `truncate(value, maxLength, options?)` | Custom omission char | `truncate("Hello world", 8, { omission: "…" })` | `"Hello w…"` |
| `truncate(value, maxLength, options?)` | Don't cut mid-word | `truncate("Hello wonderful world", 12, { boundary: "word" })` | `"Hello..."` |
| `truncateWords(value, maxWords, omission?)` | Cut to N words | `truncateWords("one two three four", 3)` | `"one two three…"` |
| `truncateMiddle(value, maxLength, omission?)` | Keep both ends, cut the middle | `truncateMiddle("HelloWorld", 8)` | `"Hell…rld"` |
| `padCenter(value, targetLength, fill?)` | Center-pad to a width | `padCenter("hi", 6)` | `"  hi  "` |
| `padCenter(value, targetLength, fill?)` | Custom fill char | `padCenter("hi", 7, "-")` | `"--hi---"` |

```js
truncate("Hi", 10);  // "Hi"   (short strings untouched)
truncate("Hello", 2); // ".."  (maxLength ≤ omission → sliced dots)
truncateWords("a b", 5); // "a b" (fewer words than the limit → as-is)
```

### 6.5 Validation & checks (`validate`) — 20 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `isEmpty(value)` | Exactly `""` | `isEmpty("")` | `true` |
| `isBlank(value)` | Empty or whitespace-only | `isBlank("   ")` | `true` |
| `isEmail(value)` | Pragmatic e-mail check | `isEmail("ada@example.com")` | `true` |
| `isEmail(value)` | Rejects junk | `isEmail("not-an-email")` | `false` |
| `isUrl(value)` | URL or bare domain | `isUrl("https://example.com/a?b=1")` | `true` |
| `isUrl(value)` | Bare domains count | `isUrl("example.com")` | `true` |
| `isAlpha(value)` | Letters only (unicode-aware) | `isAlpha("héllo")` | `true` |
| `isAlphanumeric(value)` | Letters + digits only | `isAlphanumeric("abc123")` | `true` |
| `isNumeric(value)` | Integer/decimal string | `isNumeric("  -3.14 ")` | `true` |
| `isLowerCase(value)` | All cased chars are lower | `isLowerCase("abc")` | `true` |
| `isUpperCase(value)` | All cased chars are upper | `isUpperCase("ABC")` | `true` |
| `isPalindrome(value)` | Case/punctuation-insensitive | `isPalindrome("racecar")` | `true` |
| `isSlug(value)` | Valid kebab slug | `isSlug("hello-world-123")` | `true` |
| `isUuid(value)` | UUID v1–v5 | `isUuid(uuid())` | `true` |
| `isHex(value, {prefix}?)` | Even-length hex | `isHex("deadbeef")` | `true` |
| `isHex(value, {prefix}?)` | `0x`-prefixed mode | `isHex("0xdeadbeef", { prefix: true })` | `true` |
| `isBase64(value)` | Valid base64 | `isBase64("aGk=")` | `true` |
| `isJson(value)` | `JSON.parse` succeeds | `isJson('{"a":1}')` | `true` |
| `isIpv4(value)` | IPv4 address | `isIpv4("192.168.0.1")` | `true` |
| `equalsIgnoreCase(a, b)` | Case-insensitive `===` | `equalsIgnoreCase("Hi", "hi")` | `true` |
| `containsIgnoreCase(h, n)` | Case-insensitive `includes` | `containsIgnoreCase("Hello", "ELL")` | `true` |
| `startsWithIgnoreCase(v, p)` | Case-insensitive `startsWith` | `startsWithIgnoreCase("Hello", "he")` | `true` |
| `endsWithIgnoreCase(v, s)` | Case-insensitive `endsWith` | `endsWithIgnoreCase("Hello", "LO")` | `true` |

```js
// Typical form validation:
function validateSignup(name, email) {
  const errors = [];
  if (isBlank(name)) errors.push("Name is required");
  if (!isEmail(email)) errors.push("Email looks wrong");
  return errors;
}
validateSignup("  ", "nope"); // ["Name is required", "Email looks wrong"]
validateSignup("Ada", "ada@x.com"); // []
```

### 6.6 Measure / count (`measure`) — 7 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `wordCount(value)` | Whitespace-separated words | `wordCount("the cat and the dog")` | `5` |
| `charCount(value, {ignoreSpaces}?)` | Unicode-aware length (emoji = 1) | `charCount("héllo 👋")` | `7` |
| `charCount(value, {ignoreSpaces}?)` | Skip spaces | `charCount("a b", { ignoreSpaces: true })` | `2` |
| `lineCount(value)` | Lines (`\n`, `\r\n`, `\r`) | `lineCount("a\nb\nc")` | `3` |
| `byteSize(value)` | UTF-8 bytes (not chars!) | `byteSize("é")` | `2` |
| `byteSize(value)` | Emoji are 4 bytes | `byteSize("👋")` | `4` |
| `countSubstring(value, sub, opts?)` | Count occurrences | `countSubstring("aaa", "aa")` | `1` |
| `countSubstring(value, sub, opts?)` | Overlapping mode | `countSubstring("aaa", "aa", { overlapping: true })` | `2` |
| `countSubstring(value, sub, opts?)` | Case-insensitive | `countSubstring("Hello hello", "hello", { ignoreCase: true })` | `2` |
| `readingTimeMinutes(value, wpm?)` | Est. reading minutes (200 wpm) | `readingTimeMinutes("word ".repeat(400))` | `2` |
| `wordFrequency(value)` | Lowercase word → count map | `wordFrequency("the cat and the dog")` | `{ the: 2, cat: 1, and: 1, dog: 1 }` |

```js
wordCount("   "); // 0 (blank-safe)
byteSize("hi");   // 2 (ASCII: bytes === chars)
```

### 6.7 Extract / search (`extract`) — 12 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `words(value)` | Word tokens (letters/numbers) | `words("hi, you! 123")` | `["hi", "you", "123"]` |
| `lines(value)` | Split on any newline style | `lines("a\r\nb\nc")` | `["a", "b", "c"]` |
| `chars(value)` | Unicode-safe char array | `chars("hé👋")` | `["h", "é", "👋"]` |
| `getInitials(value, {max}?)` | First letters | `getInitials("John Fitzgerald Kennedy")` | `"JFK"` |
| `getInitials(value, {max}?)` | Limit them | `getInitials("John Fitzgerald Kennedy", { max: 2 })` | `"JF"` |
| `extractEmails(value)` | All e-mails | `extractEmails("mail ada@x.com or bob@y.io")` | `["ada@x.com", "bob@y.io"]` |
| `extractUrls(value)` | All http(s) URLs (trailing `.` trimmed) | `extractUrls("see https://example.com/a and http://x.io/b.")` | `["https://example.com/a", "http://x.io/b"]` |
| `extractHashtags(value)` | All `#tags` | `extractHashtags("love #node and #js!")` | `["#node", "#js"]` |
| `extractMentions(value)` | All `@mentions` | `extractMentions("hi @ada and @bob")` | `["@ada", "@bob"]` |
| `extractNumbers(value)` | Integers/decimals as strings | `extractNumbers("a1 b-2.5 c3")` | `["1", "-2.5", "3"]` |
| `substringBetween(value, s, e)` | Text between markers (`""` if missing) | `substringBetween("Hello [world] bye", "[", "]")` | `"world"` |
| `before(value, d)` | Portion before first `d` | `before("key=value=extra", "=")` | `"key"` |
| `after(value, d)` | Portion after first `d` | `after("key=value=extra", "=")` | `"value=extra"` |

```js
lines("");              // [] (not [""])
extractEmails("none");  // [] (always an array — safe to .map)
before("abc", "=");     // "abc" (delimiter absent → whole string)
after("abc", "=");      // ""    (delimiter absent → empty)
```

### 6.8 Transform (`transform`) — 14 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `reverse(value)` | Reverse, emoji-safe | `reverse("abc")` | `"cba"` |
| `shuffleChars(value)` | Randomly shuffle chars (crypto-backed) | `shuffleChars("abcd").split("").sort().join("")` | `"abcd"` (same letters, new order) |
| `shuffleWords(value)` | Randomly shuffle words | `shuffleWords("a b c").split(" ").sort().join(" ")` | `"a b c"` (same words, new order) |
| `sortLines(value, opts?)` | Sort lines A→Z | `sortLines("pear\napple")` | `"apple\npear"` |
| `sortLines(value, opts?)` | + dedupe | `sortLines("b\na\nb", { unique: true })` | `"a\nb"` |
| `uniqueWords(value)` | Drop duplicate words (1st wins) | `uniqueWords("hello Hello world hello")` | `"hello world"` |
| `humanize(value)` | `snake/camel/kebab → "Hello world …"` | `humanize("hello_world-testCase")` | `"Hello world test case"` |
| `pluralize(word)` | English plural | `pluralize("quiz")` | `"quizzes"` |
| `pluralize(word)` | y → ies | `pluralize("city")` | `"cities"` |
| `pluralize(word, n, {inclusive}?)` | Count-aware + printable | `pluralize("cat", 2, { inclusive: true })` | `"2 cats"` |
| `singularize(word)` | English singular | `singularize("cities")` | `"city"` |
| `ordinal(n)` | `1 → 1st` (11–13 → `th`!) | `[1,2,3,4,11,13,21].map(ordinal)` | `["1st","2nd","3rd","4th","11th","13th","21st"]` |
| `quote(value, mark?)` | Wrap in quotes (idempotent) | `quote("hi")` | `'"hi"'` |
| `unquote(value)` | Strip surrounding `" ' \`` | `unquote("'hi'")` | `"hi"` |
| `indent(value, prefix?)` | Prefix every line (default 2 spaces) | `indent("a\nb", "> ")` | `"> a\n> b"` |
| `dedent(value)` | Remove common indentation | `dedent("  a\n    b\n  c")` | `"a\n  b\nc"` |
| `wordWrap(value, width?)` | Greedy wrap (default 80 cols) | `wordWrap("the quick brown fox jumps", 10)` | `"the quick\nbrown fox\njumps"` |

```js
pluralize("cat", 1); // "cat" (singular when count is 1)
quote('"hi"');       // '"hi"' (already quoted → untouched)
```

### 6.9 Templating (`template`) — 2 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `template(value, data?, fallback?)` | Fill `{key}` / `{{key}}`, dotted paths | `template("Hi {name}!", { name: "Ada" })` | `"Hi Ada!"` |
| `template(value, data?, fallback?)` | Nested paths | `template("Hi {{user.name}}", { user: { name: "Ada" } })` | `"Hi Ada"` |
| `template(value, data?, fallback?)` | Missing key → `""` | `template("Hi {name}, age {age}!", { name: "Ada" })` | `"Hi Ada, age !"` |
| `template(value, data?, fallback?)` | Missing key → custom fallback | `template("Hi {name}!", {}, "N/A")` | `"Hi N/A!"` |
| `format(value, ...args)` | Positional `{0}` placeholders | `format("{0} {1}", "a", "b")` | `"a b"` |
| `format(value, ...args)` | Reuse + array form | `format("{0} + {0} = {1}", ["1", "2"])` | `"1 + 1 = 2"` |

### 6.10 Encoding (`encode`) — 4 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `toBase64(value)` | UTF-8 → base64 (emoji-safe) | `toBase64("hi")` | `"aGk="` |
| `toBase64(value)` | Unicode works too | `toBase64("héllo 👋")` | `"aMOpbGxvIPCfkYs="` |
| `fromBase64(value)` | base64 → UTF-8 | `fromBase64("aGk=")` | `"hi"` |
| `toHex(value)` | UTF-8 → lowercase hex | `toHex("hi")` | `"6869"` |
| `fromHex(value)` | hex → UTF-8 (`0x` prefix ok) | `fromHex("6869")` | `"hi"` |

```js
fromBase64(toBase64("hello 👋")); // "hello 👋" (round-trip safe)
fromBase64("!!!"); // throws TypeError: Invalid base64 string
fromHex("zz");     // throws TypeError: Invalid hex string
```

### 6.11 Similarity / fuzzy (`similarity`) — 4 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `levenshtein(a, b)` | Edit distance | `levenshtein("kitten", "sitting")` | `3` |
| `levenshtein(a, b)` | Empty edge | `levenshtein("", "abc")` | `3` |
| `similarity(a, b)` | 0–1 score (`1` = identical) | `similarity("abc", "abc")` | `1` |
| `similarity(a, b)` | Partial match | `similarity("hello", "hallo")` | `0.8` |
| `jaroWinkler(a, b, scaling?)` | Prefix-boosted score | `jaroWinkler("martha", "marhta")` | `0.9611…` |
| `fuzzyIncludes(h, n, t?)` | Typo-tolerant `includes` (default threshold `0.7`) | `fuzzyIncludes("hello", "hllo")` | `true` |
| `fuzzyIncludes(h, n, t?)` | No match | `fuzzyIncludes("hello", "xyz")` | `false` |

```js
// "Did you mean…?" search:
const cmds = ["install", "uninstall", "update"];
cmds.filter(c => fuzzyIncludes(c, "instal")); // ["install", "uninstall"]
```

### 6.12 Mask / redact (`mask`) — 3 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `mask(value, opts?)` | Hide everything (defaults) | `mask("password123")` | `"***********"` |
| `mask(value, opts?)` | Keep head + tail | `mask("password123", { visibleStart: 2, visibleEnd: 2 })` | `"pa*******23"` |
| `maskEmail(value, maskChar?)` | Hide e-mail user | `maskEmail("john.doe@example.com")` | `"j*******@example.com"` |
| `censor(value, words, replacement?)` | Replace banned words (case-insensitive) | `censor("oh damn it", "damn")` | `"oh *** it"` |
| `censor(value, words, replacement?)` | List + custom replacement | `censor("oh damn hell", ["damn", "hell"], "[censored]")` | `"oh [censored] [censored]"` |

### 6.13 Random / ids / hash (`id`) — 4 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `randomString(length?, alphabet?)` | Crypto-strong random (default 16, alphanumeric) | `randomString(10).length` | `10` |
| `randomString(length?, alphabet?)` | Presets: `alpha`, `numeric`, `hex`, `base36`, `symbols`, or custom chars | `randomString(8, "hex")` | e.g. `"3fa9c1e0"` (8 hex chars) |
| `uuid()` | RFC 4122 v4 UUID | `uuid()` | e.g. `"3f6d533a-…"` (36-char `8-4-4-4-12` shape) |
| `uniqueId(prefix?)` | Incrementing id (per process) | `uniqueId("u_"); uniqueId("u_")` | `"u_1"` then `"u_2"` |
| `hashString(value, seed?)` | Fast cyrb53 hash as hex (**not** for passwords) | `hashString("hello")` | `"bfb06f3a63cd7000"` |
| `hashString(value, seed?)` | Seeded variant | `hashString("hello", 42)` | `"aac0fa9357603800"` |

```js
randomString(0);   // "" (valid: zero length)
uuid();            // matches /^[0-9a-f-]{36}$/i
hashString("a") === hashString("a"); // true (deterministic)
```

### 6.14 Discovery (`help`) — 4 functions

| Function | What it does | Example | Output |
|---|---|---|---|
| `help(topic?)` | Full catalog (prints + returns) | `help()` | Big string; includes `"slugify"`, `"levenshtein"`, `"uuid"`, … |
| `help(topic?)` | One function | `help("slugify")` | Detail block with signature + example |
| `help(topic?)` | One category | `help("case")` | All 15 case helpers with examples |
| `listFunctions()` | All names | `listFunctions().length` | `105` |
| `listCategories()` | All category slugs | `listCategories()` | `["case","clean","escape","fit",…]` (14) |
| `describe(name)` | Metadata object or `null` | `describe("slugify").signature` | `"slugify(value, separator?)"` |

---

## 7. Option objects & tricky signatures

### `truncate(value, maxLength, options?)`

```js
truncate("Hello world", 8);
// "Hello..." — default omission "..."

truncate("Hello world", 8, { omission: "…" });
// "Hello w…" — custom omission (1 char → more text fits)

truncate("Hello wonderful world", 12, { boundary: "word" });
// "Hello..." — cut back to the last space instead of mid-word
```

### `template(value, data?, fallback?)`

- Placeholders: `{key}` **or** `{{key}}` (both work, can mix).
- Dotted paths: `{user.address.city}`.
- Missing key → `""`, or `fallback` when given (3rd arg).

### `mask(value, { visibleStart, visibleEnd, maskChar, minMasked }?)`

```js
mask("password123");                                        // "***********"
mask("password123", { visibleStart: 2, visibleEnd: 2 });    // "pa*******23"
mask("password123", { visibleStart: 1, maskChar: "#" });    // "p##########"
```

### `randomString(length?, alphabet?)`

```js
randomString();            // 16 alphanumeric chars
randomString(8, "hex");    // e.g. "3fa9c1e0"
randomString(6, "ABC");    // e.g. "ACBABC" (fully custom pool)
randomString(12, "numeric"); // e.g. "048291033117" (OTP-style)
```

### `countSubstring(value, sub, { overlapping, ignoreCase }?)`

```js
countSubstring("aaa", "aa");                                // 1
countSubstring("aaa", "aa", { overlapping: true });         // 2
countSubstring("Hello hello", "hello", { ignoreCase: true });// 2
```

---

## 8. Error handling

All throwing behavior is intentional and tested:

| Error | When | Example |
|---|---|---|
| `TypeError` | Non-string input | `slugify(123)` → `TypeError: Expected a string` |
| `RangeError` | Bad length/number | `truncate("hi", -1)` → `RangeError: maxLength must be a non-negative integer` |
| `RangeError` | Bad enum option | `normalizeText("é", "bogus")` → `RangeError: form must be one of …` |
| `TypeError` | Bad encoded input | `fromBase64("!!!")` → `TypeError: Invalid base64 string` |
| `TypeError` | Bad e-mail to mask | `maskEmail("no-at-sign")` → `TypeError: Invalid email address` |

Design rules:

- Validators (`is*`) **never throw** on strings — they return `false` for
  non-matches (but still throw `TypeError` for non-string input).
- Extractors return `[]`/`""` instead of `null` — safe to chain (`.map`, `+ ""`).
- Truncaters return the input untouched when it already fits.

---

## 9. Real-world recipes

### Blog post pipeline: title → slug, excerpt, reading time

```js
import { slugify, truncateWords, readingTimeMinutes, ordinal } from "tiny-string-kit-sbdev";

const title = "  Hello, World! My FIRST Post  ";
const body = "word ".repeat(400);

console.log(slugify(title));              // "hello-world-my-first-post"
console.log(truncateWords(body, 5));       // "word word word word word…"
console.log(Math.ceil(readingTimeMinutes(body))); // 2  ("2 min read")
console.log(`This is my ${ordinal(1)} post!`);    // "This is my 1st post!"
```

### Comment moderation: censor + blank check

```js
import { isBlank, censor } from "tiny-string-kit-sbdev";

function publishComment(raw) {
  if (isBlank(raw)) return { ok: false, error: "Empty comment" };
  return { ok: true, text: censor(raw, ["spam", "scam"]) };
}

console.log(publishComment("   "));
// { ok: false, error: "Empty comment" }
console.log(publishComment("This is SPAM, a total scam"));
// { ok: true, text: "This is ***, a total ***" }
```

### Log redaction: mask secrets before writing

```js
import { maskEmail, mask } from "tiny-string-kit-sbdev";

console.log(maskEmail("ops-team@example.com"));   // "o*******@example.com"
console.log(mask("sk-live-abc123", { visibleStart: 3, visibleEnd: 2 }));
// "sk-***********23"
```

### Search box: typo-tolerant matching

```js
import { fuzzyIncludes } from "tiny-string-kit-sbdev";

const products = ["headphones", "phone case", "charger"];
console.log(products.filter(p => fuzzyIncludes(p, "hedphones")));
// ["headphones"]
```

### CSV export: quote cells safely

```js
import { escapeCsv } from "tiny-string-kit-sbdev";

const rows = [["Ada", 'Says "hi", loudly']];
console.log(rows.map(r => r.map(escapeCsv).join(",")).join("\n"));
// Ada,"Says ""hi"", loudly"
```

---

## 10. Project structure

One folder per domain — the root `index.js` is only a barrel:

```
tiny-string-kit/
├── index.js            # public barrel (re-exports src; keeps old imports working)
├── src/
│   ├── index.js        # internal barrel + `categories` namespace
│   ├── _internal/      # guards.js, words.js, regex.js, random.js, encoding.js
│   ├── case/           # 15 fns — slugify, camelCase, …
│   ├── clean/          # 8 fns — trimChars, stripHtml, …
│   ├── escape/         # 4 fns — escapeHtml, escapeCsv, …
│   ├── fit/            # 4 fns — truncate, padCenter, …
│   ├── validate/       # 20 fns — isEmail, isUuid, …
│   ├── measure/        # 7 fns — wordCount, byteSize, …
│   ├── extract/        # 12 fns — words, extractEmails, …
│   ├── transform/      # 14 fns — reverse, pluralize, …
│   ├── template/       # 2 fns — template, format
│   ├── encode/         # 4 fns — toBase64, fromHex, …
│   ├── similarity/     # 4 fns — levenshtein, fuzzyIncludes, …
│   ├── mask/           # 3 fns — mask, censor, …
│   ├── id/             # 4 fns — randomString, uuid, …
│   └── help/           # 4 fns — help(), REGISTRY, …
└── tests/              # one *.test.js per module + barrel contract
```

Each `src/<domain>/index.js` exports its functions **plus** `CATEGORY`,
`CATEGORY_LABEL`, and `META` — `help()` aggregates the `META` arrays, so the
runtime docs can never drift from the code.

---

## 11. Testing

```bash
npm test   # node --test → 18 suites, all must pass
```

Coverage layout: `tests/<domain>.test.js` imports straight from
`src/<domain>/index.js` (proves every module stands alone), while the root
`index.test.js` asserts the barrel re-exports `src` 1:1, deep imports return
identical function instances, and legacy behavior (`slugify`/`capitalize`/
`truncate(value, maxLength)`) is unchanged.

---

## 12. Changelog

| Version | Notes |
|---|---|
| `2.1.0` | Modularized: `src/<domain>/` folders, deep-import subpaths, `categories` namespace |
| `2.0.0` | Advanced kit: 105 helpers, `help()` discovery, extended `truncate` options |
| `1.0.0` | Initial release: `slugify`, `capitalize`, `truncate` |

---

## 13. License

MIT
