import type { SkillCategory } from "@/types";

interface SkillCardProps {
  category: SkillCategory;
}

export default function SkillCard({ category }: SkillCardProps) {
  return (
    <div className="border border-slate-700">
      <div className="p-2 border-b border-slate-700 font-bold text-slate-100">
        {category.title}
      </div>
      <div className="p-2 text-slate-400 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        {category.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </div>
  );
}
