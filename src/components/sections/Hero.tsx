import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import DotPattern from "@/components/ui/DotPattern";

export default function Hero() {
  return (
    <section
      id="home"
      className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-12"
    >
      {/* Left: Text Content */}
      <div className="flex-1 space-y-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-100">
          Zisan is a{" "}
          <span className="text-primary">web designer</span> and{" "}
          <span className="text-primary">front-end developer</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-lg">
          {siteConfig.description}
        </p>
        <div className="pt-4">
          <a
            href="/resume.pdf"
            download
            className="inline-block px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all font-bold"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Right: Hero Image */}
      <div className="flex-1 relative w-full max-w-md md:max-w-none">
        <DotPattern className="absolute -top-10 -left-10 w-24 h-24 opacity-30" />

        <div className="relative z-10 border border-slate-700 bg-background/50 overflow-hidden rounded-lg">
          <div className="aspect-square bg-linear-to-br from-primary/20 to-transparent flex items-center justify-center p-8 relative">
            <Image
              src="/images/apx-profile.png"
              alt="Portrait photo of Dewan Salman Rahman Zisan"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Currently Working Badge */}
        <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-background border border-slate-700 flex items-center gap-3 z-20">
          <div className="w-4 h-4 bg-primary rounded-sm" />
          <span className="text-slate-400 text-sm">
            Currently working on{" "}
            <span className="text-slate-100 font-medium">
              {siteConfig.currentProject}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
