"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { useInView } from "@/hooks/useInView";

const achievements = [
  {
    icon: "🏆",
    title: "Finalist – BUET CSE Fest Hackathon",
  },
  {
    icon: "💻",
    title: "Codeforces Pupil",
    detail: "500+ problems solved in online judges",
  },
  {
    icon: "🎓",
    title: "Eligible for Dean's List Award",
    detail: "2nd Year",
  },
  {
    icon: "🥉",
    title: "3rd Place in HACK Project Showcasing",
  },
];

export default function Achievements() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="achievements" className="py-20" ref={ref}>
      <SectionHeading title="achievements" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((item, i) => (
          <div
            key={item.title}
            className={`border border-slate-700 p-5 bg-background/40 flex items-start gap-4 group hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
              {item.icon}
            </span>
            <div>
              <h3 className="text-slate-100 font-bold group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              {item.detail && (
                <p className="text-slate-400 text-sm mt-1">{item.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
