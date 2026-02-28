import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SidebarSocials from "@/components/layout/SidebarSocials";
import { EmailIcon, GitHubIcon, DiscordIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import DotPattern from "@/components/ui/DotPattern";

export const metadata: Metadata = {
  title: "Contacts | Dewan Salman Rahman Zisan",
  description:
    "Get in touch with Dewan Salman Rahman Zisan for freelance opportunities or collaboration.",
};

const allContacts = [
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
    label: "zisan",
    href: "#",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: TwitterIcon,
    label: "Twitter",
    href: "#",
  },
];

const socialMedia = [
  { icon: GitHubIcon, label: "GitHub", href: "https://github.com/ripWr3ncH" },
  { icon: DiscordIcon, label: "Discord", href: "#" },
  { icon: TwitterIcon, label: "Twitter", href: "#" },
];

export default function ContactsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SidebarSocials />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 w-full">
        {/* Page Title */}
        <section className="pt-12 pb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            <span className="text-primary">/</span>contacts
          </h1>
          <p className="text-slate-400">Get in touch with me</p>
        </section>

        {/* Contacts */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            {/* Left: Message */}
            <div className="flex-1 relative">
              <p className="text-slate-400 text-lg max-w-md mb-6">
                I&apos;m interested in freelance opportunities. However, if you
                have other request or question, don&apos;t hesitate to contact
                me
              </p>
              <DotPattern className="absolute -bottom-8 left-0 w-24 h-24 opacity-30" />
            </div>

            {/* Right: Contact Cards */}
            <div className="space-y-6">
              {/* Support Card */}
              <div className="border border-slate-700 p-6 space-y-4 bg-background/40 min-w-70 sm:min-w-75">
                <h3 className="text-slate-100 font-bold text-lg">
                  Message me here
                </h3>
                <div className="space-y-3">
                  {allContacts.map((contact) => (
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

              {/* All Media */}
              <div className="border border-slate-700 p-6 space-y-4 bg-background/40">
                <h3 className="text-slate-100 font-bold text-lg">
                  All media
                </h3>
                <div className="flex gap-4">
                  {socialMedia.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
