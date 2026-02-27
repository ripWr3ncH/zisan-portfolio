import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import DotPattern from "@/components/ui/DotPattern";

export default function AboutMe() {
  return (
    <section id="about-me" className="py-20">
      <SectionHeading title="about-me" />

      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Bio Text */}
        <div className="flex-1 space-y-6">
          <p className="text-slate-400 text-lg leading-relaxed">
            Hello, I&apos;m Zisan!
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            I&apos;m a self-taught front-end developer based in Khulna,
            Bangladesh. I can develop responsive websites from scratch and raise
            them into modern user-friendly web experiences.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            Transforming my creativity and knowledge into a website has been my
            passion for over a year. I have been helping various clients to
            establish their presence online. I always strive to learn about the
            newest technologies and frameworks.
          </p>
          <a
            href="/about"
            className="inline-block px-6 py-2 border border-primary text-primary hover:bg-primary/10 transition-all font-bold"
          >
            Read more -&gt;
          </a>
        </div>

        {/* Right: Portrait Image */}
        <div className="flex-1 relative">
          <DotPattern className="absolute -top-6 left-12 w-20 h-20 opacity-40" />

          <div className="relative z-10 border-b-2 border-primary overflow-hidden">
            {/*
              Replace with your actual portrait image.
              The grayscale filter with hover-to-color effect matches the Figma design.
            */}
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
  );
}
