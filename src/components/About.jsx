import { User, Zap, Accessibility, FileCode, Focus } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// إعدادات الأنيميشن التتابعي للكروت والعناوين
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // EaseOutCubic ناعم جداً ومريح للعين
    },
  },
};

// `id` is the stable translation key (about.philosophy.items.<id>). Icons stay
// here; the copy comes from the locale files, never from the array index.
const developmentPhil = [
  {
    id: "performance",
    icon: <Zap size={22} />,
  },
  {
    id: "accessibility",
    icon: <Accessibility size={22} />,
  },
  {
    id: "clean-code",
    icon: <FileCode size={22} />,
  },
  {
    id: "user-centered",
    icon: <Focus size={22} />,
  },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-[#0F1A14]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight">
            <span className="text-[#fff]">{t("about.heading.primary")}</span>{" "}
            <span className="text-[#6B8E23]">{t("about.heading.secondary")}</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* ABOUT BOX */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-2xl p-8 mb-20 border border-[#6B8E23]/30 bg-gray-950/20 backdrop-blur-sm shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* ICON CONTAINER */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#6B8E23]/10 flex items-center justify-center shrink-0 border border-[#6B8E23]/20">
              <User className="text-[#6B8E23]" size={40} />
            </div>

            {/* TEXT CONTENT */}
            <div className="text-center md:text-start">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">
                {t("about.greeting")}{" "}
                <span className="text-[#6B8E23]">{t("about.name")}</span>
              </h3>

              <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                {t("about.bio.prefix")}{" "}
                <span className="text-[#6B8E23] font-medium">
                  {t("about.bio.role")}
                </span>{" "}
                {t("about.bio.suffix")}
                <br className="hidden md:block" />
                <span className="inline-block mt-3">
                  {t("about.bio.detail")}
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Development Philosophy */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3
            variants={itemVariant}
            className="text-2xl md:text-3xl font-bold mb-12 text-center text-white tracking-tight"
          >
            {t("about.philosophy.title")}
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentPhil.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariant}
                whileHover={{
                  y: -6,
                  // borderColor: "#6B8E23",
                  boxShadow: "0 10px 30px -15px rgba(107, 142, 35, 0.3)",
                }}
                className="rounded-xl flex flex-col items-center border border-gray-800 bg-gray-900/10 px-6 py-7 transition-colors duration-300 select-none"
              >
                {/* ICON */}
                <div className="bg-[#6B8E23]/10 text-[#6B8E23] p-2.5 rounded-xl mb-4 border border-[#6B8E23]/10">
                  {item.icon}
                </div>

                {/* TITLE */}
                <h4 className="text-white font-bold text-lg mb-2 tracking-wide">
                  {t(`about.philosophy.items.${item.id}.title`)}
                </h4>

                {/* TEXT */}
                <p className="text-gray-400 text-sm leading-relaxed text-center">
                  {t(`about.philosophy.items.${item.id}.text`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
