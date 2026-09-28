// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaShare } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Projects = () => {
  const { t } = useTranslation();

  // Localized copy is resolved through the stable `project.id` (never the array
  // index), so the markup below keeps using `project.title` / `project.description`.
  const localizedProjects = projects.map((project) => ({
    ...project,
    title: t(`projects.items.${project.id}.title`),
    description: t(`projects.items.${project.id}.description`),
  }));

  return (
    <section id="projects" className="py-20 bg-[#0F1A14]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h3 className="mb-6 text-white font-bold text-3xl relative inline-block">
            {t("projects.heading")}
            <span className="absolute w-20 h-1 bg-[#6B8E23] -bottom-3 left-1/2 -translate-x-1/2"></span>
          </h3>

          <p className="text-gray-400 max-w-lg mx-auto">
            {t("projects.subheading")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          {localizedProjects.map((project) => (
            <motion.a
              key={project.id}
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className={`group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden
              border border-gray-800 hover:border-[#6B8E23] transition-colors duration-500
              transform-gpu will-change-transform cursor-pointer
              lg:relative lg:block lg:aspect-video`}
            >
              <div
                className={`relative overflow-hidden flex items-center justify-center
                  lg:absolute lg:inset-0 lg:bg-[#0F1A14]`}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover
                              transition-transform duration-700 ease-out
                              group-hover:scale-[1.06]
                              lg:object-contain lg:group-hover:scale-[1.02]"
                />
              </div>

              <div
                className={`col-span-2 md:col-span-1 p-8 flex flex-col bg-[#16251D]
                  lg:absolute lg:inset-0 lg:justify-center lg:px-16 lg:py-14
                  lg:bg-[#0F1A14]/90 lg:opacity-0 lg:transition-opacity lg:duration-500
                  lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100`}
              >
                <span className="text-[#6B8E23] text-sm font-semibold mb-3 lg:text-[#9DB58A]">
                  {t("projects.featured")}
                </span>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#6B8E23] transition-colors duration-500 lg:max-w-2xl">
                  {project.title}
                </h3>

                <p className="text-gray-500 mb-6 lg:max-w-2xl lg:text-gray-300">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <div
                    className="bg-[#6B8E23] px-4 py-2 rounded-xl text-white flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105
                                text-sm md:text-base"
                  >
                    <FaShare /> {t("projects.viewLive")}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <div className="text-center mt-20 pt-16 border-t border-gray-200 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-[#6B8E23]/10 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-[#6B8E23]/20 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-[#6B8E23] rounded-full"></div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            {t("projects.cta.titlePrefix")}{" "}
            <span className="text-[#6B8E23]">
              {t("projects.cta.titleAccent")}
            </span>
            {t("projects.cta.titleSuffix")}
          </h3>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("projects.cta.text")}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#6B8E23] text-white
            rounded-xl hover:bg-[#6B8E23]/90 hover:scale-105 transition-all
            duration-300 group font-medium"
          >
            <span>{t("projects.cta.button")}</span>
            <div className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <FaShare />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
