// import { FaGithub, FaReact } from "react-icons/fa";
// import { SiTailwindcss, SiTypescript } from "react-icons/si";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Hero() {
  // إعدادات تتابع حركة النصوص في الطرف الأيسر
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // الفارق الزمني بين ظهور كل عنصر والتالي
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pb-7
      bg-gradient-to-r from-[#0F1A14] via-[#16251D] to-[#0F1A14]"
    >
      <div className="container mx-auto px-6 flex justify-between items-center gap-10 z-10 flex-wrap mt-[70px] md:mt-[84px]">
        {/* LEFT CONTENT - ANIMATED WITH STAGGER */}
        <motion.div
          className="text-center md:text-left flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 1. Badge */}
          <motion.span
            variants={itemVariants}
            className="px-4 py-1 mb-8 rounded-full text-sm font-medium
            bg-[#6B8E23]/10 text-[#6B8E23] border border-[#6B8E23]
            flex items-center gap-2 w-fit mx-auto md:mx-0"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B8E23]"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6B8E23]"></span>
            </span>
            Available For Freelance Work
          </motion.span>

          {/* 2. Title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-7xl font-bold mb-6 text-white"
          >
            Hi, I'm {/* <span className="text-[#7A8F5A]">Ali </span> */}
            <span className="text-[#6B8E23]">Ali Asaad</span>
          </motion.h1>

          {/* 3. Role description */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl text-[#e6edf5] mb-6"
          >
            <p className="font-medium">Front-End Engineer</p>
            <p className="font-medium opacity-80 text-sm md:text-base mt-1">
              Helping small businesses get more clients
            </p>
          </motion.div>

          {/* 4. Paragraph */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-[#8b949e] mb-6 text-lg md:text-xl"
          >
            I focus on building clean UI, responsive layouts, and real-world
            dashboards.
          </motion.p>

          {/* 5. Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#6B8E23] to-[#7A8F5A]
              text-white hover:scale-105 transition duration-300"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-[#6B8E23] border-[#6B8E23] border
              hover:scale-105 transition duration-300"
            >
              Contact Me
            </a>
          </motion.div>

          {/* 6. Tech Stack List */}
          {/* <motion.div variants={itemVariants} className="mb-4 md:mb-0">
            <p className="text-[#8b949e] mb-3">I'm working with:</p>
            <div className="flex gap-3 flex-wrap justify-center md:justify-start">
              <div className="flex gap-2 items-center rounded-lg text-[#8b949e] bg-gray-600/80 border border-gray-500 w-fit px-3 py-2 hover:scale-105 transition-all cursor-default will-change-transform">
                <span>
                  <FaReact
                    className="text-cyan-400"
                    size={18}
                    aria-label="React logo"
                  />
                </span>
                <p className="text-sm">React</p>
              </div>
              <div className="flex gap-2 items-center rounded-lg text-[#8b949e] bg-gray-600/80 border border-gray-500 w-fit px-3 py-2 hover:scale-105 transition-all cursor-default will-change-transform">
                <span>
                  <SiTypescript
                    className="text-[#3178c6]"
                    size={16}
                    aria-label="TypeScript logo"
                  />
                </span>
                <p className="text-sm">TypeScript</p>
              </div>
              <div className="flex gap-2 items-center rounded-lg text-[#8b949e] bg-gray-600/80 border border-gray-500 w-fit px-3 py-2 hover:scale-105 transition-all cursor-default will-change-transform">
                <span>
                  <SiTailwindcss
                    className="text-sky-400"
                    size={18}
                    aria-label="Tailwind CSS logo"
                  />
                </span>
                <p className="text-sm">Tailwind CSS</p>
              </div>
              <div className="flex gap-2 items-center rounded-lg text-[#8b949e] bg-gray-600/80 border border-gray-500 w-fit px-3 py-2 hover:scale-105 transition-all cursor-default will-change-transform">
                <span>
                  <FaGithub
                    className="text-gray-800"
                    size={18}
                    aria-label="GitHub logo"
                  />
                </span>
                <p className="text-sm">GitHub</p>
              </div>
            </div>
          </motion.div> */}
        </motion.div>

        {/* RIGHT IMAGE - INDEPENDENT SMOOTH SPRING ANIMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            type: "spring",
            stiffness: 60,
          }}
          className="relative flex justify-center rounded-3xl border-gray-500 border-4 mx-auto md:mx-0"
        >
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/myPhoto.png"
              alt="Ali Asaad"
              className="w-64 h-64 md:w-[350px] md:h-[350px] object-cover
              shadow-xl transition-transform duration-700 hover:scale-110 will-change-transform"
            />
          </div>

          <div className="absolute -top-8 -right-4 rounded-3xl -z-10 w-24 h-24 md:w-44 md:h-44 bg-[#7A8F5A]/60 backdrop-blur-md"></div>
          <div className="absolute -bottom-8 -left-4 rounded-3xl -z-10 w-24 h-24 md:w-44 md:h-44 bg-[#7A8F5A]/60 backdrop-blur-md"></div>
        </motion.div>
      </div>
    </section>
  );
}
