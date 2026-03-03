"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { DownloadIcon } from "@/components/icons";
import DotPattern from "@/components/ui/DotPattern";

const typedPhrases = [
  "tech enthusiast",
  "web developer",
  "ML explorer",
  "problem solver",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const phrase = typedPhrases[phraseIdx.current];

      if (!deleting.current) {
        charIdx.current++;
        setDisplayText(phrase.slice(0, charIdx.current));
        if (charIdx.current === phrase.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        charIdx.current--;
        setDisplayText(phrase.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current =
            (phraseIdx.current + 1) % typedPhrases.length;
          timeout = setTimeout(tick, 300);
          return;
        }
        timeout = setTimeout(tick, 50);
      }
    }

    tick();
    return () => clearTimeout(timeout);
  }, []);

  /* ── Image tilt on hover ── */
  const frameRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (frameRef.current) frameRef.current.style.transform = "";
  };

  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center py-12 md:py-20">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full">
        {/* Left: Text Content */}
        <div className="flex-1 space-y-6">
          {/* Available tag */}
          <div className="inline-flex items-center gap-2 border border-border px-3 py-1.5 text-sm text-text-secondary opacity-0 animate-fade-in-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Available for work
          </div>

          <div className="opacity-0 animate-fade-in-up [animation-delay:0.15s]">
            <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.15] text-text-primary">
              Zisan is a
            </h1>
            <div className="h-[clamp(2.2rem,5vw,3.8rem)] flex items-center">
              <span className="typed-wrapper text-primary text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.15]">
                {displayText}
              </span>
            </div>
          </div>

          <p className="text-text-secondary text-lg max-w-[480px] leading-relaxed opacity-0 animate-fade-in-up [animation-delay:0.3s]">
            {siteConfig.description}
          </p>

          <div className="pt-2 opacity-0 animate-fade-in-up [animation-delay:0.45s]">
            <a
              href="/dewanzisan_resume.pdf"
              download
              className="btn-hero inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-bold relative overflow-hidden"
            >
              <span className="relative z-10">Download Resume</span>
              <DownloadIcon className="w-5 h-5 relative z-10" />
            </a>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="flex-1 relative w-full max-w-[420px] opacity-0 animate-fade-in-up [animation-delay:0.25s]">
          <DotPattern className="absolute -top-10 -left-10 w-24 h-24 opacity-30" />

          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative z-10 border border-border bg-background/50 overflow-hidden transition-transform duration-300 ease-out"
          >
            <div className="aspect-square bg-linear-to-br from-primary/20 to-transparent flex items-center justify-center relative">
              <Image
                src="/images/profile-pic.png"
                alt="Portrait photo of Dewan Salman Rahman Zisan"
                fill
                className="object-contain transition-all duration-600 grayscale-[20%] hover:grayscale-0"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Currently Working Badge */}
          <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-background border border-border flex items-center gap-3 z-20">
            <div className="w-3 h-3 bg-primary shrink-0" />
            <span className="text-text-secondary text-sm">
              Currently working on{" "}
              <span className="text-text-primary font-medium">
                {siteConfig.currentProject}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
