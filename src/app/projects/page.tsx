import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SidebarSocials from "@/components/layout/SidebarSocials";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import SmallProjectCard from "@/components/ui/SmallProjectCard";
import { completeApps, smallProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Dewan Salman Rahman Zisan",
  description:
    "Explore my complete apps and small projects — from Discord bots to full-stack web applications.",
};

export default function ProjectsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SidebarSocials />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 w-full">
        {/* Page Title */}
        <section className="pt-12 pb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            <span className="text-primary">/</span>projects
          </h1>
          <p className="text-slate-400">List of my projects</p>
        </section>

        {/* Complete Apps */}
        <section className="py-12">
          <SectionHeading title="complete-apps" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeApps.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Small Projects */}
        <section className="py-12">
          <SectionHeading title="small-projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smallProjects.map((project) => (
              <SmallProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
