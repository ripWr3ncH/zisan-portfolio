"use client";

import { useInView } from "@/hooks/useInView";
import { useTilt } from "@/hooks/useTilt";

export default function Quote() {
  const { ref, isInView } = useInView(0.2);
  const cardRef = useTilt<HTMLDivElement>({ max: 5, perspective: 700, scale: 1 });

  return (
    <section ref={ref} className="py-12 md:py-16 flex flex-col items-center md:items-end">
      <div
        ref={cardRef}
        className={`relative max-w-3xl section-reveal tilt-3d tilt-shadow ${isInView ? "visible" : ""}`}
      >
        {/* Opening quote mark */}
        <span className="absolute -top-6 -left-2 text-text-secondary text-4xl font-bold select-none tilt-layer [--depth:40px]">
          &quot;
        </span>

        {/* Quote text */}
        <blockquote className="relative overflow-hidden border border-border px-8 py-6 text-text-primary text-xl md:text-2xl">
          Code is like humor. When you have to explain it, it&apos;s bad.
          <span className="tilt-glare" aria-hidden="true" />
        </blockquote>

        {/* Closing quote mark */}
        <span className="absolute -bottom-6 -right-2 text-text-secondary text-4xl font-bold select-none tilt-layer [--depth:40px]">
          &quot;
        </span>
      </div>

      {/* Attribution */}
      <div className={`border border-border border-t-0 px-6 py-3 text-text-secondary mr-0 md:mr-8 section-reveal ${isInView ? "visible" : ""}`} style={{ transitionDelay: "0.15s" }}>
        - Cory House
      </div>
    </section>
  );
}
