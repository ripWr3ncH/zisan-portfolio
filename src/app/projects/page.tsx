import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SidebarSocials from "@/components/layout/SidebarSocials";
import AllProjects from "@/components/sections/AllProjects";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.fullName}`,
  description: `All projects built by ${siteConfig.fullName} — web apps, mobile apps, compilers, IoT and DevOps work.`,
};

export default function ProjectsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SidebarSocials />
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 w-full pt-28">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-8"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            {"<~~"}
          </span>
          <span className="border-b border-transparent group-hover:border-primary transition-colors">
            Back to home
          </span>
        </Link>
        <AllProjects />
      </main>
      <Footer />
    </div>
  );
}
