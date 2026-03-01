import type { Project } from "@/types";

export const featuredProjects: Project[] = [
  {
    id: "shopcircuitbd",
    title: "ShopCircuitBD",
    description:
      "An e-commerce website providing a seamless online shopping experience.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Firebase"],
    image: "/images/projects/chert-nodes.svg",
    githubUrl: "#",
  },
  {
    id: "kickoff-stats",
    title: "KickOff Stats",
    description:
      "A football statistics and news platform providing comprehensive football information.",
    technologies: ["PHP", "MySQL", "Laravel"],
    image: "/images/projects/protectx.svg",
    githubUrl: "#",
  },
  {
    id: "invigilo",
    title: "Invigilo",
    description:
      "A secure online examination system designed to conduct and monitor exams with integrity.",
    technologies: ["Electron.js", "PostgreSQL"],
    image: "/images/projects/kahoot-answers.svg",
    githubUrl: "#",
  },
];

export const completeApps: Project[] = [
  ...featuredProjects,
  {
    id: "smart-car-parking",
    title: "Smart Car Parking System",
    description:
      "An IoT-based smart parking system detecting parked cars and reporting slot availability in real-time.",
    technologies: ["ESP-32", "C++", "IR Sensors"],
    image: "/images/projects/bot-hotfix.svg",
    githubUrl: "#",
  },
  {
    id: "email-application",
    title: "Email Application",
    description:
      "A lightweight desktop email client with login, inbox, compose, and database-backed account storage.",
    technologies: ["Java", "JavaFX", "CSS"],
    githubUrl: "#",
  },
];

export const smallProjects: Project[] = [];
