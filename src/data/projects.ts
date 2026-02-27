import type { Project } from "@/types";

export const featuredProjects: Project[] = [
  {
    id: "chert-nodes",
    title: "ChertNodes",
    description: "Minecraft servers hosting landing page with clean UI",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    image: "/images/projects/chert-nodes.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "protectx",
    title: "ProtectX",
    description: "Discord anti-raid bot with advanced protection features",
    technologies: ["React", "Node.js", "Discord.js"],
    image: "/images/projects/protectx.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "kahoot-answers",
    title: "Kahoot Answers",
    description: "FastAPI based utility to view Kahoot answers instantly",
    technologies: ["Python", "FastAPI", "Vue.js"],
    image: "/images/projects/kahoot-answers.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const completeApps: Project[] = [
  ...featuredProjects,
  {
    id: "bot-hotfix",
    title: "Bot Hotfix",
    description: "Real-time Discord bot monitoring and error tracking dashboard",
    technologies: ["TypeScript", "React", "Node.js"],
    image: "/images/projects/bot-hotfix.svg",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const smallProjects: Project[] = [
  {
    id: "bot-battleground",
    title: "Bot Battleground",
    description: "A platform for testing and battling Discord bots",
    technologies: ["CSS", "Express", "Node.js"],
    liveUrl: "#",
  },
  {
    id: "my-blog",
    title: "My Blog",
    description: "Personal blog built with modern web technologies",
    technologies: ["React", "Express", "Node.js"],
    githubUrl: "#",
  },
  {
    id: "chess-pro",
    title: "Chess pro",
    description: "Online chess platform with real-time multiplayer",
    technologies: ["React", "TypeScript"],
    liveUrl: "#",
  },
  {
    id: "frontend-boilerplate",
    title: "Front-end Boilerplate",
    description: "Production-ready frontend project starter template",
    technologies: ["HTML", "SCSS", "Python"],
    githubUrl: "#",
  },
  {
    id: "css-environments",
    title: "CSS Environments",
    description: "Collection of pure CSS environment illustrations",
    technologies: ["CSS"],
    liveUrl: "#",
  },
  {
    id: "juice-box",
    title: "Juice Box",
    description: "E-commerce web parts for a juice delivery service",
    technologies: ["React", "Vue.js", "TypeScript"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "robot-stock",
    title: "Robot Stock",
    description: "Automated stock trading dashboard and analytics",
    technologies: ["Python", "FastAPI"],
    githubUrl: "#",
  },
  {
    id: "school-website",
    title: "School Website",
    description: "Fully responsive modern school website redesign",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
  },
];
