import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Experience } from "@/components/experience/Experience";
import { Contact } from "@/components/contact/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
