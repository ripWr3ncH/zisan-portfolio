"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";

export default function Experience() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="experience" className="py-20" ref={ref}>
      <SectionHeading title="experience" />

      <div
        className={`border border-border p-6 bg-background/40 hover:border-primary/60 hover:-translate-x-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${
          isInView ? "animate-fade-in-left" : "opacity-0"
        }`}
      >
        <h3 className="text-text-primary font-bold text-xl">
          Software Engineer
        </h3>
        <p className="text-text-secondary mt-1">Logarithm Studio</p>
        <span className="inline-flex mt-4 text-primary text-sm font-medium border border-primary px-3 py-1 w-fit animate-pulse">
          Currently Working
        </span>
      </div>
    </section>
  );
}
