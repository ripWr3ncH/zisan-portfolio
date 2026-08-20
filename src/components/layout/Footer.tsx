"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/siteConfig";
import { navLinks } from "@/data/navigation";
import { LogoIcon } from "@/components/icons";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Section anchors only resolve on the home page; from a sub-page they
  // need to route home first.
  const hrefFor = (href: string) => (isHome ? href : `/${href}`);

  return (
    <footer className="mt-20 border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Left: Logo + Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-text-primary">
              <LogoIcon className="w-4 h-4" />
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <span className="text-text-secondary text-sm">{siteConfig.email}</span>
          </div>
          <p className="text-text-primary">{siteConfig.tagline}</p>
        </div>

        {/* Right: Quick Navigation */}
        <div className="space-y-4">
          <h4 className="text-text-primary font-bold text-xl">Navigation</h4>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 max-w-md">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={hrefFor(link.href)}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                <span className="text-primary">#</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-text-secondary text-sm">
        © {new Date().getFullYear()} Made by {siteConfig.fullName}
      </div>
    </footer>
  );
}
