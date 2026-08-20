"use client";

import Link from "next/link";
import { allProjects, featuredProjects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { useInView } from "@/hooks/useInView";

export default function Projects() {
  const { ref, isInView } = useInView(0.1);
  const hasMore = allProjects.length > featuredProjects.length;

  return (
    <section id="works" className="py-20">
      <SectionHeading title="projects" />

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {featuredProjects.map((project, i) => (
          <div
            key={project.id}
            className={`section-reveal h-full ${isInView ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <span className="border-b border-transparent group-hover:border-primary transition-colors">
              View all {allProjects.length} projects
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              {"~~>"}
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
