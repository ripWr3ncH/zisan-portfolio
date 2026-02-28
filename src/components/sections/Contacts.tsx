import SectionHeading from "@/components/ui/SectionHeading";
import { EmailIcon, GitHubIcon, DiscordIcon } from "@/components/icons";

const contactInfo = [
  {
    icon: EmailIcon,
    label: "dewanzisan1@gmail.com",
    href: "mailto:dewanzisan1@gmail.com",
  },
  {
    icon: GitHubIcon,
    label: "@ripWr3ncH",
    href: "https://github.com/ripWr3ncH",
  },
  {
    icon: DiscordIcon,
    label: "Discord: zisan",
    href: "#",
  },
];

export default function Contacts() {
  return (
    <section id="contacts" className="py-20">
      <SectionHeading title="contacts" />

      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Left: Message */}
        <div className="flex-1">
          <p className="text-slate-400 text-lg max-w-md">
            I&apos;m interested in freelance opportunities. However, if you have
            other request or question, don&apos;t hesitate to contact me
          </p>
        </div>

        {/* Right: Contact Card */}
        <div className="border border-slate-700 p-6 space-y-4 bg-background/40 min-w-70 sm:min-w-75">
          <h3 className="text-slate-100 font-bold text-lg">Message me here</h3>
          <div className="space-y-3">
            {contactInfo.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors"
              >
                <contact.icon className="w-5 h-5 shrink-0" />
                <span>{contact.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
