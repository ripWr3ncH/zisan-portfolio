"use client";

import { skills } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import DotPattern from "@/components/ui/DotPattern";
import { useInView } from "@/hooks/useInView";

export default function Skills() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="skills" className="py-20" ref={ref}>
      <SectionHeading title="skills" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left: Decorative Area */}
        <div className="lg:col-span-2 relative h-full min-h-50 hidden lg:flex items-center justify-center">
          <DotPattern className="absolute top-0 left-0 w-20 h-20 opacity-40" />
          <div className="w-32 h-32 border border-border" />
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary/20 border border-primary/40" />
        </div>

        {/* Right: Skill Cards Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((category, i) => (
            <SkillCard
              key={category.title}
              category={category}
              className={isInView ? "animate-scale-in" : "opacity-0"}
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
