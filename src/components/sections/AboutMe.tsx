"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import DotPattern from "@/components/ui/DotPattern";
import { useInView } from "@/hooks/useInView";

const slideshowPhotos = [
  { src: "/images/achivements/buetcsefest.jpeg", alt: "BUET CSE Fest 2026 Hackathon" },
  { src: "/images/achivements/julyhackathon.jpeg", alt: "July Hackathon 2026 Champions" },
  { src: "/images/achivements/iuthack.jpeg", alt: "IUT Techathon 2026",rotate: 270 },
  { src: "/images/achivements/crcertificate.jpeg", alt: "Class Representative Certificate",rotate: 90, scale: 1.05 },
];

export default function AboutMe() {
  const { ref, isInView } = useInView(0.15);
  const frameRef = useRef<HTMLDivElement>(null);
  // `position` drives the slide. We render `slideshowPhotos.length + 1` items,
  // where the last item is a clone of the first. When position === N we are
  // showing the clone, then we instantly snap back to 0 with the transition
  // turned off so the wrap-around is invisible.
  const [position, setPosition] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = slideshowPhotos.length;

  useEffect(() => {
    const id = setInterval(() => {
      setPosition((prev) => prev + 1);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // After the slide to the cloned frame finishes, jump back to the real first
  // slide without animation so the loop continues smoothly. The clone and the
  // first slide are pixel-identical, so the snap is invisible.
  useEffect(() => {
    if (position !== total) return;
    setEnableTransition(false);
    setPosition(0);
    // Re-enable the transition on the next frame so the next tick animates.
    const id = requestAnimationFrame(() => setEnableTransition(true));
    return () => cancelAnimationFrame(id);
  }, [position, total]);

  useEffect(() => {
    setActiveIndex(position % total);
  }, [position, total]);

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

        {/* Right: Achievements Slideshow */}
        <div className="flex-1 relative flex justify-end">
          <DotPattern className="absolute -top-6 left-12 w-20 h-20 opacity-40" />

          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative z-10 overflow-hidden max-w-md w-full section-reveal transition-transform duration-300 ease-out ${isInView ? "visible" : ""}`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="relative aspect-4/3 bg-linear-to-b from-border/30 to-background/60 overflow-hidden">
              {/* Sliding track */}
              <div
                className={`flex h-full w-full ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  enableTransition ? "transition-transform duration-700" : ""
                }`}
                style={{ transform: `translateX(-${position * 100}%)` }}
              >
                {[...slideshowPhotos, slideshowPhotos[0]].map((photo, i) => (
                  <div
                    key={`${photo.src}-${i}`}
                    className="relative h-full w-full shrink-0 grow-0 basis-full overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={
                        photo.rotate
                          ? {
                              transform: `rotate(${photo.rotate}deg) scale(${photo.scale ?? 1.3})`,
                              transformOrigin: "center",
                            }
                          : undefined
                      }
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        priority={i < 2}
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 384px"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                {slideshowPhotos.map((photo, i) => (
                  <span
                    key={photo.src}
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-text-secondary/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <DotPattern className="absolute bottom-10 -right-4 w-32 h-20 opacity-40" />
        </div>
      </div>
    </section>
  );
}
