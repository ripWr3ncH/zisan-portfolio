"use client";

import type { SVGProps } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  TrophyIcon,
  CodeBracketIcon,
  GradCapIcon,
  MedalIcon,
} from "@/components/icons";
import { useInView } from "@/hooks/useInView";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const achievements: {
  icon: IconComponent;
  title: string;
  detail?: string;
}[] = [
  {
    icon: TrophyIcon,
    title: "Finalist \u2013 BUET CSE Fest Hackathon",
  },
  {
    icon: CodeBracketIcon,
    title: "Codeforces Pupil",
    detail: "500+ problems solved in online judges",
  },
  {
    icon: GradCapIcon,
    title: "Eligible for Dean\u2019s List Award",
    detail: "2nd Year",
  },
  {
    icon: MedalIcon,
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
            className={`border border-border p-5 bg-background/40 flex items-start gap-4 group hover:border-primary/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-default ${
              isInView ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <item.icon className="w-6 h-6 text-primary shrink-0 transition-transform duration-300 group-hover:scale-125" />
            <div>
              <h3 className="text-text-primary font-bold group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              {item.detail && (
                <p className="text-text-secondary text-sm mt-1">{item.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
