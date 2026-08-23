import type { Project } from "@/types";

/** Every project, in display order. The projects section shows the first
 *  `FEATURED_COUNT`; the rest live on the /projects page. */
export const allProjects: Project[] = [
  {
    id: "shruti",
    title: "Shruti",
    description:
      "An audio description tool that makes video lessons accessible to blind and low-vision learners.",
    technologies: ["React.js", "Node.js", "Gemma", "FFmpeg"],
    image: "/images/projects/Shruti.png",
    githubUrl: "https://github.com/ripWr3ncH/Shruti",
  },
  {
    id: "balanceloop",
    title: "BalanceLoop",
    description:
      "An offline-first mobile app for splitting expenses and settling balances across friends and groups — fully usable with no network.",
    technologies: ["React Native", "Expo", "TypeScript", "Supabase"],
    image: "/images/projects/BalanceLoop.png",
    liveUrl: "https://ripwr3nch.github.io/BalanceLoop/index.html",
    githubUrl: "https://github.com/ripWr3ncH/BalanceLoop",
  },
  {
    id: "invigilo",
    title: "Invigilo",
    description:
      "A secure online examination system designed to conduct and monitor exams with integrity.",
    technologies: ["Electron.js", "PostgreSQL"],
    image: "/images/projects/secure-examapp.png",
    liveUrl:
      "https://github.com/Nafiz001/secure-exam-desktop-app/releases/tag/v1.0.0",
    githubUrl: "https://github.com/Nafiz001/secure-exam-desktop-app",
  },
  {
    id: "kickoff-stats",
    title: "KickOff Stats",
    description:
      "A football statistics and news platform providing comprehensive football information.",
    technologies: ["PHP", "MySQL", "Laravel"],
    image: "/images/projects/kickoffstats.png",
    liveUrl: "https://kickoff-stats.onrender.com/",
    githubUrl: "https://github.com/ripWr3ncH/KickOff_Stats.git",
  },
  {
    id: "shopcircuitbd",
    title: "ShopCircuitBD",
    description:
      "An e-commerce website providing a seamless online shopping experience.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Firebase"],
    image: "/images/projects/shopcircuitbd.png",
    liveUrl: "https://www.shopcircuit.me/",
    githubUrl: "https://github.com/Nafiz001/ISD-lab-project.git",
  },
  {
    id: "logarithm-warehouse",
    title: "FrostByte Logistics",
    description:
      "BUET CSE Fest 2026 hackathon-winning microservices and DevOps logistics dashboard with deterministic chaos testing, monitoring, and Azure CI/CD deployment.",
    technologies: [
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "Docker",
      "Prometheus",
      "Grafana",
      "Azure",
    ],
    image: "/images/projects/frostbyte_project.png",
    liveUrl: "https://logarithm-warehouse.onrender.com/",
    githubUrl: "https://github.com/Nafiz001/logarithm-warehouse",
  },
  {
    id: "smart-car-parking",
    title: "Smart Car Parking System",
    description:
      "An IoT-based smart parking system detecting parked cars and reporting slot availability in real-time.",
    technologies: ["ESP-32", "C++", "IR Sensors"],
    image: "/images/projects/smartpark.jpeg",
    githubUrl: "https://github.com/ripWr3ncH/Smart-Car-Parking-System-IoT-.git",
  },
  {
    id: "minionlang-compiler",
    title: "MinionLang Compiler",
    description:
      "A Flex and Bison based educational compiler with lexical analysis, parsing, semantic checks, IR optimization, and a browser playground.",
    technologies: ["C", "Flex", "Bison", "GCC", "Vercel"],
    image: "/images/projects/minionlang.png",
    liveUrl: "https://minion-lang-compiler.vercel.app/",
    githubUrl: "https://github.com/ripWr3ncH/MinionLang_Compiler.git",
  },
];

/** How many projects the home page shows before "view all". */
export const FEATURED_COUNT = 6;

export const featuredProjects: Project[] = allProjects.slice(0, FEATURED_COUNT);
