import { siteConfig } from "@/data/siteConfig";
import {
  LogoIcon,
  GitHubIcon,
  DiscordIcon,
  LinkedInIcon,
} from "@/components/icons";

const footerSocials = [
  { icon: GitHubIcon, url: "https://github.com/ripWr3ncH", label: "GitHub" },
  { icon: DiscordIcon, url: "#", label: "Discord" },
  { icon: LinkedInIcon, url: "#", label: "LinkedIn" },
];

export default function Footer() {
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

        {/* Right: Media Links */}
        <div className="space-y-4">
          <h4 className="text-text-primary font-bold text-xl">Media</h4>
          <div className="flex gap-4">
            {footerSocials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-text-secondary text-sm">
        © {new Date().getFullYear()} Made by {siteConfig.fullName}
      </div>
    </footer>
  );
}
