import {
  Code,
  GitBranchIcon,
  Layers,
  Settings,
  TerminalSquare,
} from "lucide-react";
import { CgVercel } from "react-icons/cg";
import { FaCss3, FaGithub, FaHtml5, FaReact, FaTerminal } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import {
  SiEslint,
  SiPrettier,
  SiStyledcomponents,
  SiTailwindcss,
  SiWebpack,
} from "react-icons/si";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const mySkills = [
  {
    icon: <FaReact size={36} />,
    title: "Front-End Development",
    text: "Building responsive and optimized web applications with modern frameworks.",
    popups: [
      {
        icon: <FaHtml5 size={14} />,
        name: "HTML5",
      },
      {
        icon: <FaCss3 size={14} />,
        name: "CSS3",
      },
      {
        icon: <RiJavascriptFill size={14} />,
        name: "JavaScript",
      },
      {
        icon: <FaReact size={14} />,
        name: "React",
      },
    ],
  },
  {
    icon: <Code size={36} />,
    title: "Styling & UI Frameworks",
    text: "Crafting modern and maintainable UI components with efficient styling techniques.",
    popups: [
      {
        icon: <SiTailwindcss size={14} />,
        name: "TailwindCSS",
      },
      {
        icon: <FaCss3 size={14} />,
        name: "CSS Modules",
      },
      {
        icon: <SiStyledcomponents size={14} />,
        name: "Styled Components",
      },
    ],
  },
  {
    icon: <Layers size={36} />,
    title: "State Management",
    text: "Handling application state efficiently for scalable applications.",
    popups: [
      {
        icon: <FaReact size={14} />,
        name: "Context API",
      },
      {
        icon: <FaReact size={14} />,
        name: "Redux Toolkit",
      },
      {
        icon: <Code size={14} />,
        name: "Components",
      },
    ],
  },
  {
    icon: <TerminalSquare size={36} />,
    title: "Back-End Integration",
    text: "Connecting front-end applications to databases and back-end services.",
    popups: [
      {
        icon: <FaTerminal size={14} />,
        name: "API",
      },
    ],
  },
  {
    icon: <Settings size={36} />,
    title: "Development Tools",
    text: "Optimizing workflows with modern development and build tools.",
    popups: [
      {
        icon: <SiWebpack size={14} />,
        name: "Webpack",
      },
      {
        icon: <SiEslint size={14} />,
        name: "ESLint",
      },
      {
        icon: <SiPrettier size={14} />,
        name: "Prettier",
      },
    ],
  },
  {
    icon: <GitBranchIcon size={36} />,
    title: "Version Control & Deployment",
    text: "Managing code collaboration and deploying applications efficiently.",
    popups: [
      {
        icon: <GitBranchIcon size={14} />,
        name: "Git",
      },
      {
        icon: <FaGithub size={14} />,
        name: "GitHub",
      },
      {
        icon: <CgVercel size={14} />,
        name: "Vercel",
      },
    ],
  },
];

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
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

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative min-h-[90vh] flex items-center overflow-hidden
      bg-gradient-to-r from-[#0F1A14] via-[#16251D] to-[#0F1A14] py-20"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="mb-6 text-white font-bold text-3xl text-center relative">
            My Skills
            <span className="absolute w-20 h-1 bg-[#6B8E23] -bottom-3 left-1/2 -translate-x-1/2"></span>
          </h3>

          <p className="text-gray-400 leading-6 text-center max-w-lg mx-auto">
            I've worked with a variety of technologies in front-end development.
            Here are some of my key areas of expertise:
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mySkills.map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              variants={zoomItem}
              className="p-5 border border-gray-500 rounded-xl hover:border-[#6B8E23] transition-colors duration-300
                          will-change-transform transform-gpu"
            >
              <div className="text-[#6B8E23] mb-2">{skill.icon}</div>
              <h4 className="text-white font-bold text-xl text-center mb-2">
                {skill.title}
              </h4>
              <p className="text-gray-400 text-center leading-5 mb-4 text-sm">
                {skill.text}
              </p>
              <div className="flex gap-2 flex-wrap justify-center">
                {skill.popups.map((popup, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs
                            bg-[#6B8E23]/10 text-[#6B8E23] border border-[#6B8E23]
                              flex items-center gap-1 w-fit mx-auto md:mx-0 cursor-pointer"
                  >
                    {popup.icon}
                    {popup.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
