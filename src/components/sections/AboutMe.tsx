"use client";

import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import DotPattern from "@/components/ui/DotPattern";
import { useInView } from "@/hooks/useInView";

export default function AboutMe() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="about-me" className="py-20">
      <SectionHeading title="about-me" />

      <div ref={ref} className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Bio Text */}
        <div className="flex-1 space-y-6">
          <p className={`text-text-secondary text-lg leading-relaxed section-reveal ${isInView ? "visible" : ""}`} style={{ transitionDelay: "0s" }}>
            Hello, I&apos;m Dewan Salman Rahman Zisan!
          </p>
          <p className={`text-text-secondary text-lg leading-relaxed section-reveal ${isInView ? "visible" : ""}`} style={{ transitionDelay: "0.12s" }}>
            I&apos;m currently pursuing BSc in Computer Science &amp; Engineering
            at KUET. I&apos;m interested in Web Development, Machine Learning,
            Problem Solving, Microservice and DevOps.
          </p>
          <p className={`text-text-secondary text-lg leading-relaxed section-reveal ${isInView ? "visible" : ""}`} style={{ transitionDelay: "0.24s" }}>
            I can develop responsive websites from scratch and raise them into
            modern user-friendly web experiences. I always strive to learn about
            the newest technologies and frameworks.
          </p>
        </div>

        {/* Right: Portrait Image */}
        <div className="flex-1 relative flex justify-end">
          <DotPattern className="absolute -top-6 left-12 w-20 h-20 opacity-40" />

          <div className={`relative z-10 overflow-hidden max-w-xs w-full section-reveal ${isInView ? "visible" : ""}`} style={{ transitionDelay: "0.3s" }}>
            <div className="relative aspect-3/4 bg-linear-to-b from-border/30 to-background/60">
              <Image
                src="/images/profile.jpg"
                alt="Dewan Salman Rahman Zisan - portrait"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
          </div>

          <DotPattern className="absolute bottom-10 -right-4 w-32 h-20 opacity-40" />
        </div>
      </div>
    </section>
  );
}
