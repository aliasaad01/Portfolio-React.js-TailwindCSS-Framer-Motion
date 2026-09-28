/**
 * Centralized external social links.
 *
 * These are data, not user-facing copy, so they intentionally live outside the
 * components and are never localized. Icons, ordering and styling stay in the
 * components that render them.
 */
export const socialLinks = {
  github: {
    id: "github",
    href: "https://github.com/aliasaad01",
  },
  instagram: {
    id: "instagram",
    href: "https://instagram.com/aliasaad.dev",
  },
  facebook: {
    id: "facebook",
    href: "https://facebook.com/lyasd.944396",
  },
  linkedin: {
    id: "linkedin",
    href: "https://www.linkedin.com/in/ali-asaad-dev/",
  },
  whatsapp: {
    id: "whatsapp",
    href: "https://wa.me/963937237163",
  },
};

/**
 * Canonical display order, used where the full list of links is rendered.
 */
export const socialLinkIds = Object.keys(socialLinks);
