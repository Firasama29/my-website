import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubActivity from "@/components/GitHubActivity";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <GitHubActivity />
      <Contact />
    </>
  );
}
