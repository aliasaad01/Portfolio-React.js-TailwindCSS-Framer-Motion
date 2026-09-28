/**
 * Language constants and helpers shared by the i18next bootstrap, the
 * <html lang> / <html dir> synchronisation and the language switcher that will
 * be added in a later phase.
 *
 * Only "en" and "ar" are supported. Browsers report regional codes such as
 * "en-US", "en-GB", "ar-SA" or "ar-SY", so every incoming code is normalised to
 * its base language before it is validated. Anything unsupported becomes
 * English.
 */

export const DEFAULT_LANGUAGE = "en";

/** The only language codes we ship translations for. */
export const SUPPORTED_LANGUAGES = ["en", "ar"];

/** Languages that are written right-to-left. */
export const RTL_LANGUAGES = ["ar"];

/** localStorage key used to remember the visitor's language. */
export const LANGUAGE_STORAGE_KEY = "i18nextLng";

/** "en-US" | "en_US" | "EN" -> "en" */
export const normalizeLanguage = (language) =>
  String(language ?? "")
    .toLowerCase()
    .split(/[-_]/)[0];

/** True only for the base codes that we actually support. */
export const isSupportedLanguage = (language) =>
  SUPPORTED_LANGUAGES.includes(normalizeLanguage(language));

/** Normalised language, falling back to English when unsupported. */
export const resolveLanguage = (language) =>
  isSupportedLanguage(language) ? normalizeLanguage(language) : DEFAULT_LANGUAGE;

/** Writing direction ("ltr" / "rtl") for a regional or unknown language code. */
export const getDirection = (language) =>
  RTL_LANGUAGES.includes(normalizeLanguage(language)) ? "rtl" : "ltr";
