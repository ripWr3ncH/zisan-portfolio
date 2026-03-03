"use client";

import { useState, useEffect } from "react";
import { navLinks } from "@/data/navigation";
import { socials } from "@/data/socials";
import {
  GitHubIcon,
  DiscordIcon,
  LinkedInIcon,
  MenuIcon,
  CloseIcon,
  SunIcon,
  MoonIcon,
} from "@/components/icons";
import { useTheme } from "@/components/ThemeProvider";

const socialIcons: Record<string, React.ElementType> = {
  GitHub: GitHubIcon,
  Discord: DiscordIcon,
  LinkedIn: LinkedInIcon,
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoName, setLogoName] = useState<"ZISAN" | "DEWAN">("ZISAN");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 border-b transition-all duration-300 ${
        scrolled
          ? "border-border/50 bg-background/90 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center group cursor-pointer select-none"
          onClick={(e) => {
            e.preventDefault();
            setLogoName((prev) => (prev === "ZISAN" ? "DEWAN" : "ZISAN"));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="text-text-secondary/60 text-xl font-bold">{'{'}</span>
          <span className="mx-1.5">
            <span
              key={logoName}
              className="text-xl font-bold tracking-widest uppercase animate-logo-swap inline-flex"
            >
              <span className="bg-gradient-to-br from-[#a855f7] via-primary to-[#7c3aed] bg-clip-text text-transparent">{logoName[0]}</span>
              <span className="text-text-primary">{logoName.slice(1)}</span>
            </span>
          </span>
          <span className="text-text-secondary/60 text-xl font-bold">{'}'}</span>
        </a>

        {/* Desktop Nav */}        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-text-secondary hover:text-text-primary transition-colors font-medium group"
            >
              <span className="text-primary">#</span>
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative text-text-secondary hover:text-primary p-1 w-8 h-8 flex items-center justify-center overflow-hidden"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span
              key={theme}
              className="absolute inset-0 flex items-center justify-center animate-theme-icon-in"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
        </nav>

        {/* Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="relative text-text-secondary hover:text-primary p-1 w-8 h-8 flex items-center justify-center overflow-hidden"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span
              key={theme}
              className="absolute inset-0 flex items-center justify-center animate-theme-icon-in"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </span>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="text-text-primary p-1"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-background transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full px-6 py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="flex items-center select-none"
              onClick={(e) => {
                e.preventDefault();
                setLogoName((prev) => (prev === "ZISAN" ? "DEWAN" : "ZISAN"));
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="text-text-secondary/60 text-xl font-bold">{'{'}</span>
              <span className="mx-1.5">
                <span
                  key={logoName}
                  className="text-xl font-bold tracking-widest uppercase animate-logo-swap inline-flex"
                >
                  <span className="bg-gradient-to-br from-[#a855f7] via-primary to-[#7c3aed] bg-clip-text text-transparent">{logoName[0]}</span>
                  <span className="text-text-primary">{logoName.slice(1)}</span>
                </span>
              </span>
              <span className="text-text-secondary/60 text-xl font-bold">{'}'}</span>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="text-text-secondary hover:text-text-primary p-1"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-6 mt-16">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-medium text-text-primary hover:text-primary transition-colors"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-primary">#</span>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Social Icons */}
          <div className="mt-auto pb-12 flex items-center gap-4">
            {socials.map((social) => {
              const Icon = socialIcons[social.name];
              if (!Icon) return null;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-8 h-8" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
