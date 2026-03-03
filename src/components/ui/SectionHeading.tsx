"use client";

import { useInView } from "@/hooks/useInView";
import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  linkText,
  linkHref,
  className = "",
}: SectionHeadingProps) {
  const { ref, isInView } = useInView(0.5);

  return (
    <div ref={ref} className={`flex items-center justify-between mb-12 ${className}`}>
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-3xl font-bold text-text-primary shrink-0">
          <span className="text-primary">#</span>
          {title}
        </h2>
        <div className={`h-px bg-primary flex-1 max-w-125 section-line ${isInView ? "visible" : ""}`} />
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="text-text-primary hover:text-primary transition-colors text-sm whitespace-nowrap ml-4"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
