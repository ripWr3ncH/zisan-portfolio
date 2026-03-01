import Image from "next/image";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border border-border bg-background/30 group">
      {/* Project Image */}
      <div className="aspect-video overflow-hidden border-b border-border relative bg-linear-to-br from-primary/10 to-background">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-secondary text-4xl font-bold">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      {/* Tech Tags */}
      <div className="p-2 border-b border-border text-text-secondary text-sm font-mono">
        {project.technologies.join(" ")}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary">{project.description}</p>
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 border border-primary text-primary hover:bg-primary/10 text-sm font-medium transition-colors"
            >
              Live {"<~>"}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 border border-border text-text-secondary hover:text-text-primary text-sm font-medium transition-colors"
            >
              Github {">="}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
