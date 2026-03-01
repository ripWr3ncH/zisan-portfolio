"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";

const educationData = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "Khulna University of Engineering & Technology (KUET)",
    status: "Currently Pursuing",
  },
  {
    degree: "Higher Secondary Certificate (H.S.C)",
    institution: "Dhaka City College",
  },
  {
    degree: "Secondary School Certificate (S.S.C)",
    institution: "Joypara Pilot High School",
  },
];

export default function Education() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="education" className="py-20" ref={ref}>
      <SectionHeading title="education" />
      <div className="space-y-6">
        {educationData.map((edu, i) => (
          <div
            key={edu.degree}
            className={`border border-border p-6 bg-background/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:border-primary/60 hover:-translate-x-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
              isInView ? "animate-fade-in-left" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div>
              <h3 className="text-text-primary font-bold text-lg">
                {edu.degree}
              </h3>
              <p className="text-text-secondary">{edu.institution}</p>
            </div>
            {edu.status && (
              <span className="text-primary text-sm font-medium border border-primary px-3 py-1 shrink-0 w-fit animate-pulse">
                {edu.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
