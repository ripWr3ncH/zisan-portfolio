"use client";

import { useState } from "react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open mailto with pre-filled subject and body
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.open(
      `mailto:dewanzisan1@gmail.com?subject=${subject}&body=${body}`,
      "_blank"
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contacts" className="py-20">
      <SectionHeading title="contacts" />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Message Form */}
        <div className="flex-1">
          <p className="text-text-secondary text-lg mb-8 max-w-md">
            Have a question or want to work together? Send me a message!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-text-secondary text-sm font-medium mb-1.5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-background border border-border px-4 py-2.5 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-text-secondary text-sm font-medium mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-background border border-border px-4 py-2.5 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-text-secondary text-sm font-medium mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-background border border-border px-4 py-2.5 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition-colors resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all font-bold"
            >
              {submitted ? "Opening mail client..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right: Contact Card */}
        <div className="lg:w-80">
          <div className="border border-border p-6 space-y-4 bg-background/40">
            <h3 className="text-text-primary font-bold text-lg">
              Or reach me directly
            </h3>
            <div className="space-y-3">
              {contactInfo.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
                >
                  <contact.icon className="w-5 h-5 shrink-0" />
                  <span>{contact.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
