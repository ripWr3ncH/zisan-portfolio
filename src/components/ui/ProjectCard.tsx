"use client";

import { useRef } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import { GitHubIcon } from "@/components/icons";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full flex flex-col border border-border bg-background/30 group project-card-tilt cursor-default"
    >
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
      <div className="p-2 border-b border-border text-text-secondary text-sm font-mono truncate">
        {project.technologies.join(" ")}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-4">
        <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
        <p className="text-text-secondary line-clamp-3">{project.description}</p>
        <div className="flex gap-4 mt-auto">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-live relative overflow-hidden flex items-center gap-1.5 px-4 py-1.5 border border-border text-sm font-medium"
            >
              <span className="relative z-10">Live</span>
              <span className="btn-live-arrow relative z-10 transition-transform duration-200">{"<~>"}</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github relative overflow-hidden flex items-center gap-1.5 px-4 py-1.5 border border-border text-text-secondary text-sm font-medium"
            >
              <GitHubIcon width={14} height={14} className="relative z-10 shrink-0" />
              <span className="relative z-10">Github</span>
              <span className="btn-github-arrow relative z-10 transition-transform duration-200">&#x2192;</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
