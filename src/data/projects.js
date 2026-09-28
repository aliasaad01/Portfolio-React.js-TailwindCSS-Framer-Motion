/**
 * Structural project data only: identity, external links and assets.
 *
 * Localized copy (title / description) is NOT stored here — it lives in
 * src/locales/<lng>/translation.json under `projects.items.<id>` and is resolved
 * in Projects.jsx through the stable `project.id`, never through the array index.
 * Adding a project means adding an `id` here plus a matching entry in every locale.
 */
export const projects = [
  {
    id: "as-byggtjanster",
    tools: ["React.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    liveDemo: "https://www.asbyggtjanster.se/",
    img: "/asbyggtjanster.jpg",
  },
  {
    id: "rs-sociostod",
    tools: ["React.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    liveDemo: "https://www.rssociostod.se/",
    img: "/rs.png",
  },
  {
    id: "ambean",
    tools: ["React.js", "TypeScript", "TailwindCSS", "React Router"],
    liveDemo: "https://ambean-coffee-shop.vercel.app/",
    sourceCode: "https://github.com/aliasaad01/amBean-Coffee-Shop",
    img: "/amBean-home.png",
  },
  {
    id: "fahad-travel",
    tools: ["React.js", "TypeScript", "TailwindCSS", "Framer Motion"],
    liveDemo: "https://www.fahad-travel.com/",
    img: "/fahad.png",
  },
  // The entries below are disabled drafts. Re-enabling one requires a stable
  // `id` here plus `projects.items.<id>` copy in every locale file.
  // {
  //   title: "FitFlow – Interactive Women's Fitness Platform.",
  //   description:
  //     "A dynamic and engaging fitness web application tailored specifically for women's exercise routines. Built with a strong focus on interactivity, the platform offers structured workout tracking, video playback interfaces, and intuitive progress visualization to keep users motivated.",
  //   tools: [
  //     "React.js",
  //     "TypeScript",
  //     "TailwindCSS",
  //     "React Router",
  //     "Framer Motion",
  //   ],
  //   liveDemo: "https://fitflow-olive.vercel.app/",
  //   img: "/fit.png",
  // },
  // {
  //   title: "Garsah – E-Commerce & Plant Care Platform.",
  //   description:
  //     "An intuitive e-commerce and educational platform designed to simplify plant shopping and care. The application features a curated marketplace alongside an interactive guidance system that helps users select the ideal plants for their space and provides personalized maintenance tracking.",
  //   tools: [
  //     "React.js",
  //     "TypeScript",
  //     "TailwindCSS",
  //     "React Router",
  //     "Framer Motion",
  //   ],
  //   liveDemo: "https://garsah.vercel.app/",
  //   img: "/garsah.png",
  // },

  // {
  //   title: "React Admin Dashboard.",
  //   description:
  //     "A modern admin dashboard built with React.js, designed to manage products and data efficiently through a clean, responsive, dark/light mode and user-friendly interface.",
  //   tools: ["React.js", "TailwindCSS", "Redux Toolkit", "React Router"],
  //   liveDemo: "https://react-admin-dashboard-five-smoky.vercel.app/",
  //   sourceCode: "https://github.com/aliasaad01/React-Admin-Dashboard",
  //   img: "/dashboard-3.png",
  // },
  // {
  //   title: "E-Commerce Website.",
  //   description:
  //     "A modern e-commerce website built with React.js, featuring product browsing, filtering, cart management, and a smooth user experience.",
  //   tools: ["React.js", "TailwindCSS", "Redux Toolkit", "React Router"],
  //   liveDemo: "https://e-commerce-web-three-beryl.vercel.app/",
  //   sourceCode: "https://github.com/aliasaad01/E-commerce-web",
  //   img: "/e-commerce-2.png",
  // },
];
