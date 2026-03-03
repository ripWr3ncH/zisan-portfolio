"use client";

import { useRef, useCallback } from "react";
import { useInView } from "@/hooks/useInView";

export default function Quote() {
  const { ref, isInView } = useInView(0.2);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    el.style.boxShadow = `${-x * 20}px ${y * 20}px 30px rgba(199,120,221,0.08)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg)";
    el.style.boxShadow = "none";
  }, []);

  return (
    <section ref={ref} className="py-12 md:py-16 flex flex-col items-center md:items-end">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative max-w-3xl section-reveal transition-transform duration-200 ease-out ${isInView ? "visible" : ""}`}
        style={{ willChange: "transform" }}
      >
        {/* Opening quote mark */}
        <span className="absolute -top-6 -left-2 text-text-secondary text-4xl font-bold select-none">
          &quot;
        </span>

        {/* Quote text */}
        <blockquote className="border border-border px-8 py-6 text-text-primary text-xl md:text-2xl">
          Code is like humor. When you have to explain it, it&apos;s bad.
        </blockquote>

        {/* Closing quote mark */}
        <span className="absolute -bottom-6 -right-2 text-text-secondary text-4xl font-bold select-none">
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
