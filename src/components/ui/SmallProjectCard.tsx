import type { Project } from "@/types";

interface SmallProjectCardProps {
  project: Project;
}

export default function SmallProjectCard({ project }: SmallProjectCardProps) {
  return (
    <article className="border border-border p-4 flex flex-col justify-between gap-4 bg-background/30">
      <div className="space-y-2">
        <div className="text-text-secondary text-sm font-mono">
          {project.technologies.join(" ")}
        </div>
        <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary text-sm">{project.description}</p>
      </div>
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
    </article>
  );
}
