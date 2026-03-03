import type { Project } from "@/types";

export const featuredProjects: Project[] = [

  {
    id: "kickoff-stats",
    title: "KickOff Stats",
    description:
      "A football statistics and news platform providing comprehensive football information.",
    technologies: ["PHP", "MySQL", "Laravel"],
    image: "/images/projects/kickoffstats.png",
    githubUrl: "https://github.com/ripWr3ncH/KickOff_Stats.git",
  },
  {
    id: "invigilo",
    title: "Invigilo",
    description:
      "A secure online examination system designed to conduct and monitor exams with integrity.",
    technologies: ["Electron.js", "PostgreSQL"],
    image: "/images/projects/secure-examapp.png",
    githubUrl: "#",
  },
    {
    id: "shopcircuitbd",
    title: "ShopCircuitBD",
    description:
      "An e-commerce website providing a seamless online shopping experience.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Firebase"],
    image: "/images/projects/shopcircuitbd.png",
    githubUrl: "https://github.com/Nafiz001/ISD-lab-project.git",
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
    image: "/images/projects/smartpark.jpeg",
    githubUrl: "https://github.com/ripWr3ncH/Smart-Car-Parking-System-IoT-.git",
  },
  {
    id: "email-application",
    title: "Email Application",
    description:
      "A lightweight desktop email client with login, inbox, compose, and database-backed account storage.",
    technologies: ["Java", "JavaFX", "CSS"],
    image: "/images/projects/emailapplication.png",
    githubUrl: "https://github.com/ripWr3ncH/EmailApplication.git",
  },
];

export const smallProjects: Project[] = [];
