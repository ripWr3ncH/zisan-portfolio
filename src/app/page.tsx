import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SidebarSocials from "@/components/layout/SidebarSocials";
import Hero from "@/components/sections/Hero";
import Quote from "@/components/sections/Quote";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import AboutMe from "@/components/sections/AboutMe";
import Contacts from "@/components/sections/Contacts";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <SidebarSocials />
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 w-full">
        <Hero />
        <Quote />
        <Projects />
        <Skills />
        <AboutMe />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
