import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getPathnameForLanguage } from "../i18n/languagePaths";
import { resolveLanguage } from "../i18n/languages";

/**
 * Language-aware document metadata.
 *
 * index.html ships the English values statically, so crawlers and social scrapers
 * that never execute JavaScript still read a complete head. This hook re-points
 * exactly those tags at the active language at runtime: on /ar/ the title,
 * description, canonical, og:url and the Twitter copy become Arabic and the
 * JSON-LD follows the Arabic URL.
 *
 * Only tags that index.html already declares are updated, so nothing is ever
 * duplicated. The three hreflang links in particular are left alone: they describe
 * both languages at once and are identical on both URLs.
 *
 * <html lang> / <html dir> are NOT handled here — src/i18n/index.js owns them.
 */

/** Updates an existing tag; a missing tag stays missing instead of being duplicated. */
const setContent = (selector, content) => {
  if (!content) return;

  const tag = document.querySelector(selector);
  if (tag) tag.setAttribute("content", content);
};

const setHref = (selector, href) => {
  if (!href) return;

  const tag = document.querySelector(selector);
  if (tag) tag.setAttribute("href", href);
};

/**
 * The canonical link in index.html stays the single source of the site origin, so
 * the domain is not repeated in JavaScript.
 */
const getSiteOrigin = () => {
  const canonical = document.querySelector('link[rel="canonical"]');

  try {
    if (canonical?.href) return new URL(canonical.href).origin;
  } catch {
    // A malformed canonical must never break the page.
  }

  return typeof window === "undefined" ? "" : window.location.origin;
};

/** Updates only the JSON-LD properties that depend on the language or the URL. */
const syncJsonLd = (language, pageUrl) => {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script) return;

  let data;
  try {
    data = JSON.parse(script.textContent);
  } catch {
    // Leave the markup in index.html untouched rather than replacing it with a guess.
    return;
  }

  const nodes = Array.isArray(data?.["@graph"]) ? data["@graph"] : [];

  nodes.forEach((node) => {
    if (node?.["@type"] === "WebSite") node.url = pageUrl;

    if (node?.["@type"] === "ProfilePage") {
      node.url = pageUrl;
      node.inLanguage = language;
    }
  });

  script.textContent = JSON.stringify(data, null, 2);
};

const useSeoMetadata = () => {
  const { t, i18n } = useTranslation();

  // react-i18next re-renders on languageChanged, so the effect below re-runs for
  // the new language.
  const activeLanguage = resolveLanguage(i18n.resolvedLanguage || i18n.language);

  useEffect(() => {
    const pageUrl = `${getSiteOrigin()}${getPathnameForLanguage(activeLanguage)}`;
    const title = t("seo.title", { defaultValue: document.title });
    const description = t("seo.description", {
      defaultValue:
        document.querySelector('meta[name="description"]')?.content ?? "",
    });

    document.title = title;
    setContent('meta[name="description"]', description);
    setContent('meta[property="og:title"]', t("seo.ogTitle", { defaultValue: title }));
    setContent(
      'meta[property="og:description"]',
      t("seo.ogDescription", { defaultValue: description }),
    );
    setContent('meta[property="og:url"]', pageUrl);
    setContent('meta[name="twitter:title"]', title);
    setContent('meta[name="twitter:description"]', description);
    setHref('link[rel="canonical"]', pageUrl);
    syncJsonLd(activeLanguage, pageUrl);
  }, [activeLanguage, i18n, t]);
};

export default useSeoMetadata;
