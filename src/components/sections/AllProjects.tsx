"use client";

import { allProjects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { useInView } from "@/hooks/useInView";

export default function AllProjects() {
  const { ref, isInView } = useInView(0.05);

  return (
    <section id="all-projects" className="py-12">
      <SectionHeading title="all-projects" />

      <p className="text-text-secondary -mt-8 mb-12 max-w-2xl">
        Everything I&apos;ve built so far &mdash; hackathon projects, course work,
        and things I made because I wanted them to exist.
      </p>

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {allProjects.map((project, i) => (
          <div
            key={project.id}
            className={`section-reveal h-full ${isInView ? "visible" : ""}`}
            style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
