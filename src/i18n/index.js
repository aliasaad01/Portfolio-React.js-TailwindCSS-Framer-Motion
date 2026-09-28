/**
 * i18next bootstrap for the bilingual (English / Arabic) portfolio.
 *
 * This module is imported for its side effects from src/main.jsx, so it runs
 * exactly once, before the React tree is rendered. It:
 *   1. registers the browser language detector and the React bindings,
 *   2. loads the bundled translation resources for "en" and "ar",
 *   3. keeps <html lang> / <html dir> in sync with the active language,
 *   4. remembers the active language in localStorage.
 *
 * The URL decides the language entry point: "/" renders English and "/ar/"
 * renders Arabic, whatever localStorage or the browser language say. This module
 * is also the only place that synchronises <html lang> / <html dir>; the
 * pathname <-> language mapping itself lives in ./languagePaths.
 *
 * The language switcher UI is intentionally NOT part of this phase.
 */
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ar from "../locales/ar/translation.json";
import en from "../locales/en/translation.json";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  getDirection,
  isSupportedLanguage,
  normalizeLanguage,
  resolveLanguage,
} from "./languages";
import {
  DEFAULT_PATHNAME,
  getLanguageFromPathname,
  getPathnameForLanguage,
} from "./languagePaths";

/**
 * Bundled resources: no backend/HTTP loader is used, so i18next can initialise
 * synchronously and the first paint is already translated.
 */
export const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

/** Every language the browser reports, most specific first, e.g. ["ar-SY", "ar"]. */
const getBrowserLanguages = () => {
  if (typeof navigator === "undefined") return [];

  const { language, languages } = navigator;
  const candidates =
    Array.isArray(languages) && languages.length > 0 ? languages : [language];

  return candidates.filter(
    (candidate) => typeof candidate === "string" && candidate.length > 0,
  );
};

/** Reading storage can throw (private mode, storage blocked by the user). */
const readStoredLanguage = () => {
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch {
    return null;
  }
};

/**
 * The pathname decides first: "/" is English and "/ar/" is Arabic even when the
 * stored or browser language says otherwise, so a shared link always opens in the
 * language it points at. Only a path that is not a language entry point falls
 * through to the signals below, which are consulted in this order:
 *   1. the saved language, but only when it is one we support
 *   2. the browser language: "en-US" / "en-GB" -> "en", "ar-SA" / "ar-SY" -> "ar"
 *   3. English
 *
 * Every source is validated on its own, so an unsupported value can never win
 * over a supported one further down the list.
 */
export const detectInitialLanguage = () => {
  const fromPathname = getLanguageFromPathname(
    typeof window === "undefined" ? DEFAULT_PATHNAME : window.location.pathname,
  );
  if (fromPathname) return fromPathname;

  const stored = readStoredLanguage();
  if (isSupportedLanguage(stored)) return normalizeLanguage(stored);

  const fromBrowser = getBrowserLanguages().find((candidate) =>
    isSupportedLanguage(candidate),
  );
  if (fromBrowser) return normalizeLanguage(fromBrowser);

  return DEFAULT_LANGUAGE;
};

/**
 * The browser language detector is registered so that i18next keeps writing the
 * active language back to localStorage (the `caches` option) using the very key
 * that detectInitialLanguage() reads. Detection itself is handled above, which
 * is stricter than the plugin's first-match behaviour.
 */
const detection = {
  lookupLocalStorage: LANGUAGE_STORAGE_KEY,
  caches: ["localStorage"],
};

/**
 * Mirrors the active language onto the document element:
 * <html lang="ar" dir="rtl">, <html lang="en" dir="ltr">.
 */
export const syncDocumentLanguage = (language) => {
  const resolved = resolveLanguage(language);
  const root = document.documentElement;

  root.lang = resolved;
  root.dir = getDirection(resolved);

  return resolved;
};

/** Stores the active language so the next visit can restore it. */
const persistLanguage = (language) => {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, resolveLanguage(language));
  } catch {
    // localStorage can be unavailable (private mode, blocked cookies...).
    // The language still applies to the current session, so this is not fatal.
  }
};

const handleLanguageChanged = (language) => {
  const resolved = syncDocumentLanguage(language);

  persistLanguage(resolved);
  syncUrlWithLanguage(resolved);
};

/**
 * Keeps the address bar and the active language in agreement.
 *
 * A URL that already stands for the active language is left untouched, which is
 * what makes the popstate handler below safe: after Back/Forward the URL is
 * already correct, so nothing is pushed again and no extra history entry is
 * created. A path that is not a language entry point is never rewritten — the
 * portfolio stays one page and does not pretend to route.
 */
const syncUrlWithLanguage = (language) => {
  if (typeof window === "undefined" || !window.history?.pushState) return;

  const languageInUrl = getLanguageFromPathname(window.location.pathname);

  if (languageInUrl === null || languageInUrl === language) return;

  window.history.pushState(null, "", getPathnameForLanguage(language));
};

/**
 * Back/forward buttons: the URL is the truth, so applying it is all that is
 * needed. changeLanguage() re-renders through react-i18next, and
 * handleLanguageChanged() then finds the URL already correct.
 */
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    const languageInUrl = getLanguageFromPathname(window.location.pathname);
    const active = resolveLanguage(i18n.resolvedLanguage || i18n.language);

    if (languageInUrl && languageInUrl !== active) {
      i18n.changeLanguage(languageInUrl);
    }
  });
}

const initialLanguage = detectInitialLanguage();

// Registered before init() so the very first resolution is handled too.
i18n.on("languageChanged", handleLanguageChanged);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: initialLanguage,
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
    fallbackLng: DEFAULT_LANGUAGE,
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    detection,
    interpolation: {
      // React already escapes interpolated values.
      escapeValue: false,
    },
  });

// Applied immediately, without waiting for init() to resolve, so <html lang> and
// <html dir> are already correct before React renders anything.
handleLanguageChanged(initialLanguage);

// init() can also resolve the language asynchronously; this keeps the document in
// sync with whatever i18next ends up using, and with any later language change.
i18n.on("initialized", () => {
  handleLanguageChanged(i18n.resolvedLanguage || i18n.language);
});

export default i18n;
