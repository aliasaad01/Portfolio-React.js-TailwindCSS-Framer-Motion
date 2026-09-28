import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import useActiveSection from "../hooks/useActiveSection";
import { socialLinkIds, socialLinks } from "../data/social";
import LanguageSwitcher from "./LanguageSwitcher";

// `id` is the stable translation key (nav.<id>); labels are never taken from
// the array index and hrefs stay purely structural.
const navLinks = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#projects" },
  { id: "contact", href: "#contact" },
];

// The mobile menu keeps its own subset and order; the desktop rail renders the
// full list from the shared social data source (socialLinkIds).
// Icons live in socialIcons below; socialLabels provides the accessible names
// for the icon-only links (brand names, so they are never translated).
const socialLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  whatsapp: "WhatsApp",
};
const mobileSocialIds = [
  "github",
  "linkedin",
  "facebook",
  "instagram",
  "whatsapp",
];

const socialIcons = {
  github: <FaGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  instagram: <FaInstagram size={20} />,
  facebook: <FaFacebook size={20} />,
  whatsapp: <FaWhatsapp size={20} />,
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { t } = useTranslation();
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900/90 backdrop-blur-md py-3 shadow-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto md:px-6 flex items-center justify-center gap-14 bg-gray-900 w-fit rounded-3xl px-4 py-2">
          {/* Logo / Name */}
          <a href="#home" className="text-xl font-bold">
            <span className="bg-gradient-to-r from-[#6B8E23] to-[#9DB58A] bg-clip-text text-transparent">
              Dev<span className="text-white">Ali</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <div key={link.id}>
                <a
                  href={link.href}
                  className={`transition-colors relative group rounded-full px-2 py-1 text-sm
                            ${
                              activeSection === link.href.replace("#", "")
                                ? "bg-[#6B8E23]/10 text-[#6B8E23] shadow-lg"
                                : "text-gray-400 hover:text-white"
                            }`}
                >
                  {t(`nav.${link.id}`)}
                  <span className="absolute -bottom-1 start-0 w-0 h-0.5 bg-gradient-to-r from-[#6B8E23] to-[#9DB58A] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            ))}
          </nav>

          {/* Language Switcher (desktop) */}
          <LanguageSwitcher />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`mt-2 mx-2 rounded-xl md:hidden bg-gray-900 shadow-lg transition-all duration-300 ${
            isOpen
              ? "opacity-100 max-h-[30rem]"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`py-2 transition-colors
    ${
      activeSection === link.href.replace("#", "")
        ? "text-[#6B8E23]"
        : "text-gray-300 hover:text-white"
    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(`nav.${link.id}`)}
                </a>
              ))}
              <div className="flex space-x-4 rtl:space-x-reverse pt-4 border-t border-gray-800">
                {mobileSocialIds.map((id) => (
                  <a
                    key={id}
                    href={socialLinks[id].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    {socialIcons[id]}
                  </a>
                ))}
              </div>

              {/* Language Switcher (mobile) */}
              <LanguageSwitcher variant="mobile" />
            </nav>
          </div>
        </div>
      </header>

      {/* Desktop-only social rail: a sibling of <header> on purpose, because the
        scrolled header applies backdrop-blur and would otherwise become the
        containing box for this fixed column. end-* keeps it against the viewport
        edge and mirrors it in RTL; the full list comes from the shared social
        data source. */}
      <div className="hidden md:flex flex-col items-center gap-4 fixed end-1 top-1/2 -translate-y-1/2 z-40">
        {socialLinkIds.map((id) => (
          <a
            key={id}
            href={socialLinks[id].href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={socialLabels[id]}
            className="text-gray-400 hover:text-[#6B8E23] transition-all hover:-translate-y-1 duration-200 mx-8"
          >
            {socialIcons[id]}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
