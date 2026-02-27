import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SidebarSocials from "@/components/layout/SidebarSocials";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillCard from "@/components/ui/SkillCard";
import DotPattern from "@/components/ui/DotPattern";
import { skills } from "@/data/skills";
import { funFacts } from "@/data/funFacts";

export const metadata: Metadata = {
  title: "About Me | Dewan Salman Rahman Zisan",
  description:
    "Learn about Dewan Salman Rahman Zisan — a self-taught front-end developer based in Khulna, Bangladesh.",
};

function parseBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="text-slate-100">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SidebarSocials />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 w-full">
        {/* Page Title */}
        <section className="pt-12 pb-4">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">
            <span className="text-primary">/</span>about-me
          </h1>
          <p className="text-slate-400">Who am I?</p>
        </section>

        {/* About Section */}
        <section className="py-12">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-6">
              <p className="text-slate-400 text-lg leading-relaxed">
                Hello, I&apos;m Zisan!
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                I&apos;m a self-taught front-end developer based in Khulna,
                Bangladesh. I can develop responsive websites from scratch and
                raise them into modern user-friendly web experiences.
              </p>
              <p className="text-slate-400 text-lg leading-relaxed">
                Transforming my creativity and knowledge into a website has been
                my passion for over a year. I have been helping various clients
                to establish their presence online. I always strive to learn
                about the newest technologies and frameworks.
              </p>
            </div>

            <div className="flex-1 relative">
              <DotPattern className="absolute -top-6 left-12 w-20 h-20 opacity-40" />
              <div className="relative z-10 border-b-2 border-primary overflow-hidden">
                <div className="relative aspect-3/4 bg-linear-to-b from-slate-700/30 to-slate-800/60">
                  <Image
                    src="/images/portrait.svg"
                    alt="Dewan Salman Rahman Zisan - portrait"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <DotPattern className="absolute bottom-10 -right-4 w-32 h-20 opacity-40" />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-12">
          <SectionHeading title="skills" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {skills.map((category) => (
              <SkillCard key={category.title} category={category} />
            ))}
          </div>
        </section>

        {/* Fun Facts Section */}
        <section className="py-12">
          <SectionHeading title="my-fun-facts" />
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 flex flex-wrap gap-3 items-start">
              {funFacts.map((fact, index) => (
                <div
                  key={index}
                  className="px-4 py-2 border border-slate-700 text-slate-400"
                >
                  {parseBoldText(fact)}
                </div>
              ))}
            </div>

            <div className="flex-1 relative min-h-37.5 hidden md:block">
              <DotPattern className="absolute top-0 right-0 w-24 h-24 opacity-40" />
              <div className="absolute bottom-0 left-10 w-20 h-20 border border-slate-700" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
