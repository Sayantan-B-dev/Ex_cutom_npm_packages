/**
 * strkit — internal barrel. Each folder is an independent module;
 * this file only re-exports them. Deep imports (e.g. `.../case`) skip it.
 */
export * from "./case/index.js";
export * from "./clean/index.js";
export * from "./escape/index.js";
export * from "./fit/index.js";
export * from "./validate/index.js";
export * from "./measure/index.js";
export * from "./extract/index.js";
export * from "./transform/index.js";
export * from "./template/index.js";
export * from "./encode/index.js";
export * from "./similarity/index.js";
export * from "./mask/index.js";
export * from "./id/index.js";
export * from "./help/index.js";

import * as caseMod from "./case/index.js";
import * as cleanMod from "./clean/index.js";
import * as escapeMod from "./escape/index.js";
import * as fitMod from "./fit/index.js";
import * as validateMod from "./validate/index.js";
import * as measureMod from "./measure/index.js";
import * as extractMod from "./extract/index.js";
import * as transformMod from "./transform/index.js";
import * as templateMod from "./template/index.js";
import * as encodeMod from "./encode/index.js";
import * as similarityMod from "./similarity/index.js";
import * as maskMod from "./mask/index.js";
import * as idMod from "./id/index.js";
import * as helpMod from "./help/index.js";

/** Namespace access: `import { categories } from "..."; categories.case.slugify(...)`. */
export const categories = {
  case: caseMod,
  clean: cleanMod,
  escape: escapeMod,
  fit: fitMod,
  validate: validateMod,
  measure: measureMod,
  extract: extractMod,
  transform: transformMod,
  template: templateMod,
  encode: encodeMod,
  similarity: similarityMod,
  mask: maskMod,
  id: idMod,
  help: helpMod,
};

import { slugify, camelCase, pascalCase, snakeCase, kebabCase, titleCase, sentenceCase, constantCase, dotCase, pathCase, headerCase, swapCase, capitalize, uncapitalize, capitalizeWords } from "./case/index.js";
import { trimChars, collapseWhitespace, removeAccents, removeNonAscii, stripPunctuation, stripHtml, stripEmojis, normalizeText } from "./clean/index.js";
import { escapeHtml, unescapeHtml, escapeRegExp, escapeCsv } from "./escape/index.js";
import { truncate, truncateWords, truncateMiddle, padCenter } from "./fit/index.js";
import { isEmpty, isBlank, isEmail, isUrl, isAlpha, isAlphanumeric, isNumeric, isLowerCase, isUpperCase, isPalindrome, isSlug, isUuid, isHex, isBase64, isJson, isIpv4, equalsIgnoreCase, containsIgnoreCase, startsWithIgnoreCase, endsWithIgnoreCase } from "./validate/index.js";
import { wordCount, charCount, lineCount, byteSize, countSubstring, readingTimeMinutes, wordFrequency } from "./measure/index.js";
import { words, lines, chars, getInitials, extractEmails, extractUrls, extractHashtags, extractMentions, extractNumbers, substringBetween, before, after } from "./extract/index.js";
import { reverse, shuffleChars, shuffleWords, sortLines, uniqueWords, humanize, pluralize, singularize, ordinal, quote, unquote, indent, dedent, wordWrap } from "./transform/index.js";
import { template, format } from "./template/index.js";
import { toBase64, fromBase64, toHex, fromHex } from "./encode/index.js";
import { levenshtein, similarity, jaroWinkler, fuzzyIncludes } from "./similarity/index.js";
import { mask, maskEmail, censor } from "./mask/index.js";
import { randomString, uuid, uniqueId, hashString } from "./id/index.js";
import { help, listFunctions, listCategories, describe } from "./help/index.js";

export default {
  slugify, camelCase, pascalCase, snakeCase, kebabCase, titleCase, sentenceCase, constantCase, dotCase, pathCase, headerCase, swapCase, capitalize, uncapitalize, capitalizeWords,
  trimChars, collapseWhitespace, removeAccents, removeNonAscii, stripPunctuation, stripHtml, stripEmojis, normalizeText,
  escapeHtml, unescapeHtml, escapeRegExp, escapeCsv,
  truncate, truncateWords, truncateMiddle, padCenter,
  isEmpty, isBlank, isEmail, isUrl, isAlpha, isAlphanumeric, isNumeric, isLowerCase, isUpperCase, isPalindrome, isSlug, isUuid, isHex, isBase64, isJson, isIpv4, equalsIgnoreCase, containsIgnoreCase, startsWithIgnoreCase, endsWithIgnoreCase,
  wordCount, charCount, lineCount, byteSize, countSubstring, readingTimeMinutes, wordFrequency,
  words, lines, chars, getInitials, extractEmails, extractUrls, extractHashtags, extractMentions, extractNumbers, substringBetween, before, after,
  reverse, shuffleChars, shuffleWords, sortLines, uniqueWords, humanize, pluralize, singularize, ordinal, quote, unquote, indent, dedent, wordWrap,
  template, format,
  toBase64, fromBase64, toHex, fromHex,
  levenshtein, similarity, jaroWinkler, fuzzyIncludes,
  mask, maskEmail, censor,
  randomString, uuid, uniqueId, hashString,
  help, listFunctions, listCategories, describe,
  categories,
};
