/**
 * Language entry points of the bilingual portfolio.
 *
 *   /      -> English (the default, also the x-default of the hreflang set)
 *   /ar/   -> Arabic
 *
 * The pathname is the single source of truth for the *initial* language, so one
 * URL always renders one language: a link is shareable, crawlable and stable, and
 * the language is never carried in a query string or in storage.
 *
 * This module is the only place that knows the mapping, so no component has to
 * inspect window.location itself.
 */
import { resolveLanguage } from "./languages";

/** language -> pathname, one entry per language in SUPPORTED_LANGUAGES. */
export const LANGUAGE_PATHNAMES = {
  en: "/",
  ar: "/ar/",
};

/** Used when an unknown path has to fall back to something. */
export const DEFAULT_PATHNAME = LANGUAGE_PATHNAMES.en;

/**
 * "/AR/" -> "/ar", "/ar//" -> "/ar", "" -> "/".
 *
 * Trailing slashes are dropped except for the root, so "/ar" and "/ar/" name the
 * same entry point: search engines reconcile that difference through the
 * canonical tag instead of through a redirect this client-rendered app cannot issue.
 */
export const normalizePathname = (pathname) => {
  const value = String(pathname ?? "").toLowerCase();
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  const collapsed = withLeadingSlash.replace(/\/{2,}/g, "/");

  return collapsed.length > 1 ? collapsed.replace(/\/+$/, "") : "/";
};

/** pathname -> language, derived from LANGUAGE_PATHNAMES so both stay in step. */
const PATHNAMES_TO_LANGUAGES = Object.entries(LANGUAGE_PATHNAMES).reduce(
  (map, [language, pathname]) => ({
    ...map,
    [normalizePathname(pathname)]: language,
  }),
  {},
);

/**
 * The language a pathname stands for, or null when the path is not a language
 * entry point. The null is meaningful: only an unmapped path is allowed to fall
 * back to the stored / browser language.
 */
export const getLanguageFromPathname = (pathname) =>
  PATHNAMES_TO_LANGUAGES[normalizePathname(pathname)] ?? null;

/** The pathname that serves a language; anything unsupported falls back to "/". */
export const getPathnameForLanguage = (language) =>
  LANGUAGE_PATHNAMES[resolveLanguage(language)] ?? DEFAULT_PATHNAME;
