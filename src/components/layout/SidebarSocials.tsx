"use client";

import { useState, useEffect } from "react";
import { socials } from "@/data/socials";
import { GitHubIcon, DiscordIcon, LinkedInIcon } from "@/components/icons";

const socialIcons: Record<string, React.ElementType> = {
  GitHub: GitHubIcon,
  Discord: DiscordIcon,
  LinkedIn: LinkedInIcon,
};

export default function SidebarSocials() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed left-8 top-15 hidden xl:flex flex-col items-center gap-4 z-30"
      aria-label="Social links"
    >
      {/* Scroll progress line */}
      <div className="relative w-px h-32">
        <div className="absolute inset-0 bg-text-secondary/20" />
        <div
          className="absolute top-0 left-0 w-full bg-primary transition-all duration-150"
          style={{ height: `${scrollPercent * 100}%` }}
        />
      </div>
      {socials.map((social) => {
        const Icon = socialIcons[social.name];
        if (!Icon) return null;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary transition-colors"
            aria-label={social.name}
          >
            <Icon className="w-6 h-6" />
          </a>
        );
      })}
    </div>
  );
}
