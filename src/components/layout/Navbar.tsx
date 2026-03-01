"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { socials } from "@/data/socials";
import {
  LogoIcon,
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
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-primary transition-transform duration-300 group-hover:rotate-12">
            <LogoIcon className="w-6 h-6" />
          </span>
          <span className="text-text-primary text-xl font-bold tracking-tight">
            Zisan
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-text-secondary hover:text-text-primary transition-colors font-medium"
            >
              <span className="text-primary">#</span>
              {link.label}
            </a>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-text-secondary hover:text-primary transition-colors p-1"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </nav>

        {/* Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="text-text-secondary hover:text-primary transition-colors p-1"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
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
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-primary">
                <LogoIcon className="w-6 h-6" />
              </span>
              <span className="text-text-primary text-xl font-bold tracking-tight">
                Zisan
              </span>
            </Link>
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
