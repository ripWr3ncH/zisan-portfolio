"use client";

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
  return (
    <div
      className={`border border-border hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${className}`}
      style={style}
    >
      <div className="p-2 border-b border-border font-bold text-text-primary">
        {category.title}
      </div>
      <div className="skill-list p-2 text-text-secondary flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {category.skills.map((skill, i) => (
          <span
            key={skill}
            className="skill-item cursor-default"
            style={{ animationDelay: `${i * 55}ms` }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
