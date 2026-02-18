import Hero from "@/components/Hero";
import JourneySection from "@/components/JourneySection";
import WorkSection from "@/components/WorkSection";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ResearchSection from "@/components/ResearchSection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <JourneySection />
      <WorkSection />
      <ExperienceTimeline />
      <ResearchSection />
      <About />
      <Skills />
      <Gallery />
      <Contact />
    </>
  );
}
