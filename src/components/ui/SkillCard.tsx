"use client";

import { useState } from "react";
import type { SkillCategory } from "@/types";

interface SkillCardProps {
  category: SkillCategory;
  style?: React.CSSProperties;
  className?: string;
}

export default function SkillCard({
  category,
  style,
  className = "",
}: SkillCardProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div
      className={`border border-slate-700 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${className}`}
      style={style}
    >
      <div className="p-2 border-b border-slate-700 font-bold text-slate-100">
        {category.title}
      </div>
      <div className="p-2 text-slate-400 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {category.skills.map((skill) => (
          <span
            key={skill}
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`cursor-default transition-colors duration-200 ${
              hoveredSkill === skill ? "text-primary" : ""
            }`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
