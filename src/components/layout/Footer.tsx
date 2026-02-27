import { siteConfig } from "@/data/siteConfig";
import {
  LogoIcon,
  GitHubIcon,
  DiscordIcon,
  TwitterIcon,
} from "@/components/icons";

const footerSocials = [
  { icon: GitHubIcon, url: "https://github.com/ripWr3ncH", label: "GitHub" },
  { icon: DiscordIcon, url: "#", label: "Discord" },
  { icon: TwitterIcon, url: "#", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-700 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Left: Logo + Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-slate-100">
              <LogoIcon className="w-4 h-4" />
              <span className="font-bold">{siteConfig.name}</span>
            </div>
            <span className="text-slate-400 text-sm">{siteConfig.email}</span>
          </div>
          <p className="text-slate-100">{siteConfig.tagline}</p>
        </div>

        {/* Right: Media Links */}
        <div className="space-y-4">
          <h4 className="text-slate-100 font-bold text-xl">Media</h4>
          <div className="flex gap-4">
            {footerSocials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-100 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-12 text-slate-400 text-sm">
        © {new Date().getFullYear()} Made by {siteConfig.fullName}
      </div>
    </footer>
  );
}
