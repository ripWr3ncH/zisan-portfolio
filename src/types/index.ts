export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
}
