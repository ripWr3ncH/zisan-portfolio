"use client";

import { completeApps } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { useInView } from "@/hooks/useInView";

export default function Projects() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="works" className="py-20">
      <SectionHeading title="projects" />

      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {completeApps.map((project, i) => (
          <div
            key={project.id}
            className={`section-reveal ${isInView ? "visible" : ""}`}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
