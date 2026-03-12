"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { EmailIcon, GitHubIcon, DiscordIcon } from "@/components/icons";
import { useInView } from "@/hooks/useInView";

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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { ref: revealRef, isInView } = useInView(0.1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7045b36b-65b3-4505-9184-c456f7d7d145",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contacts" className="py-20">
      <SectionHeading title="contacts" />

      <div ref={revealRef} className={`flex flex-col lg:flex-row gap-12 section-reveal ${isInView ? "visible" : ""}`}>
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
              disabled={status === "loading"}
              className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-primary text-sm font-medium">
                ✓ Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}
            
            {status === "error" && (
              <p className="text-red-500 text-sm font-medium">
                ✗ {errorMessage}
              </p>
            )}
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
