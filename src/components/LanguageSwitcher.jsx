import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, resolveLanguage } from "../i18n/languages";

/**
 * Minimal language switcher: one labelled option per supported language, with
 * the active one highlighted like the active navigation link.
 *
 * It deliberately owns NO language state. The active language is read from
 * i18next, and switching delegates to i18n.changeLanguage(), so the shared
 * Phase 1 behaviour stays in charge of everything else:
 *   - localStorage persistence (LANGUAGE_STORAGE_KEY)
 *   - the <html lang> / <html dir> synchronization
 *
 * changeLanguage() re-renders the tree through react-i18next, so switching
 * never reloads the page.
 */

/** Layout only: the control itself looks the same in both placements. */
const variantClasses = {
  desktop: "hidden md:flex items-center gap-1",
  mobile: "flex items-center gap-1 pt-4 border-t border-gray-800",
};

const LanguageSwitcher = ({ variant = "desktop" }) => {
  const { t, i18n } = useTranslation();

  // Reuses the Phase 1 helper so a regional code ("ar-SA") can never fail to
  // match an option; i18next re-renders this component on languageChanged.
  const activeLanguage = resolveLanguage(i18n.resolvedLanguage || i18n.language);

  return (
    <div
      role="group"
      aria-label={t("languages.switcher.label")}
      className={variantClasses[variant] ?? variantClasses.desktop}
    >
      {SUPPORTED_LANGUAGES.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => i18n.changeLanguage(language)}
          aria-current={language === activeLanguage ? "true" : undefined}
          className={`px-2 py-1 rounded-full text-sm transition-colors ${
            language === activeLanguage
              ? "bg-[#6B8E23]/10 text-[#6B8E23] shadow-lg"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {t(`languages.${language}`)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
