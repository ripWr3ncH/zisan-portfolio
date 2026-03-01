import { socials } from "@/data/socials";
import { GitHubIcon, DiscordIcon, LinkedInIcon } from "@/components/icons";

const socialIcons: Record<string, React.ElementType> = {
  GitHub: GitHubIcon,
  Discord: DiscordIcon,
  LinkedIn: LinkedInIcon,
};

export default function SidebarSocials() {
  return (
    <div
      className="fixed left-8 top-0 hidden xl:flex flex-col items-center gap-4 z-30"
      aria-label="Social links"
    >
      <div className="w-px h-32 bg-text-secondary" />
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
