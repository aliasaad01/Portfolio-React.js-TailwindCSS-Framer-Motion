// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { socialLinks, socialLinkIds } from "../data/social";

// `id` is the stable translation key (contact.boxes.<id>.title). Translatable
// values use `textKey`; raw data such as the email address or phone number is
// kept verbatim in `text` and is deliberately not localized.
const contactBoxs = [
  {
    id: "location",
    icon: <FaLocationDot size={24} />,
    textKey: "contact.boxes.location.text",
    href: "https://www.google.com/maps/search/Syria",
    openInNewTab: true,
  },
  {
    id: "email",
    icon: <Mail size={24} />,
    text: "ali.asaad.devx@gmail.com",
    // text: "--------- @gmail.com",
    href: "mailto:ali.asaad.devx@gmail.com",
    openInNewTab: false,
  },
  {
    id: "phone",
    icon: <FaPhone size={24} />,
    text: "+963 937237163",
    // text: "+963 ---------",
    href: "tel:+963937237163",
    openInNewTab: true,
  },
];

/**
 * Gmail's web composer. Desktop/laptop visitors are sent here in a new tab, since
 * a desktop browser usually has no mail handler configured; touch devices keep
 * `mailto:` so their installed mail app opens instead.
 */
const GMAIL_COMPOSE_URL = "https://mail.google.com/mail/?view=cm&fs=1&to=";

/** True only for pointer-driven devices (desktop / laptop). */
const usesPointerInput = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Resolves a `mailto:` link for the current device. The address is taken from the
 * link itself, so it is never duplicated here.
 */
const resolveEmailHref = (mailtoHref) => {
  if (!usesPointerInput()) return { href: mailtoHref, openInNewTab: false };

  return {
    href: `${GMAIL_COMPOSE_URL}${encodeURIComponent(
      mailtoHref.replace(/^mailto:/i, ""),
    )}`,
    openInNewTab: true,
  };
};

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Icons live in the component; the URLs come from the shared social data source.
const socialIcons = {
  github: <FaGithub size={20} />,
  instagram: <FaInstagram size={20} />,
  facebook: <FaFacebook size={20} />,
  linkedin: <FaLinkedin size={20} />,
  whatsapp: <FaWhatsapp size={20} />,
};

const zoomItem = {
  hidden: { scale: 0.92, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Contact = () => {
  const { t } = useTranslation();

  // The email links open Gmail's composer on desktop and keep mailto: on touch
  // devices; resolving once keeps the address in a single place.
  const emailLink = resolveEmailHref(
    contactBoxs.find((item) => item.id === "email").href,
  );
  const contactItems = contactBoxs.map((item) =>
    item.id === "email" ? { ...item, ...emailLink } : item,
  );

  return (
    <section
      id="contact"
      className="relative flex items-center overflow-hidden
      bg-gradient-to-r from-[#0F1A14] via-[#16251D] to-[#0F1A14] py-20"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="mb-6 text-white font-bold text-3xl text-center relative">
            {t("contact.title")}
            <span className="absolute w-20 h-1 bg-[#6B8E23] -bottom-3 left-1/2 -translate-x-1/2"></span>
          </h3>

          <p className="text-gray-400 leading-6 text-center max-w-lg mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {contactItems.map((item) => (
            <motion.a
              key={item.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              variants={zoomItem}
              href={item.href}
              target={item.openInNewTab ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="p-5 border border-gray-500 rounded-xl hover:border-[#6B8E23] transition-colors duration-300
                          will-change-transform transform-gpu mb-6 md:mb-12"
            >
              <div className="flex items-center justify-center mb-2 text-[#6B8E23]">
                {item.icon}
              </div>
              <h4 className="font-semibold text-white text-center text-xl mb-1">
                {t(`contact.boxes.${item.id}.title`)}
              </h4>
              <p className="text-sm text-gray-500 text-center">
                {item.textKey ? t(item.textKey) : item.text}
              </p>
            </motion.a>
          ))}
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          {socialLinkIds.map((id) => (
            <a
              key={id}
              href={socialLinks[id].href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full border text-white hover:border-[#6B8E23] hover:bg-[#6B8E23] transition-colors duration-300"
            >
              {socialIcons[id]}
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={emailLink.href}
            target={emailLink.openInNewTab ? "_blank" : undefined}
            rel={emailLink.openInNewTab ? "noopener noreferrer" : undefined}
            className="inline-block px-6 py-3 rounded-lg bg-[#6B8E23] text-white font-medium hover:bg-[#6B8E23]/90 transition-colors"
          >
            {t("contact.button")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
