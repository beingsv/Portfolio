"use client";

import { useState, useEffect, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhoIAmSection from "@/components/WhoIAmSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [navVariant, setNavVariant] = useState<"light" | "dark">("light");
  const containerRef = useRef<HTMLDivElement>(null);

  // Show/hide navbar and set variant based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = containerRef.current?.scrollTop ?? 0;
      const vh = window.innerHeight;

      setNavVisible(scrollTop > vh * 0.5);

      // Dark sections (Projects + Experience) -> use light text (variant="dark")
      if (scrollTop > vh * 2.6) {
        setNavVariant("dark");
      } else {
        setNavVariant("light");
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-screen overflow-x-hidden ${
        started ? "overflow-y-auto snap-y snap-mandatory" : "overflow-y-hidden"
      }`}
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Fixed transparent Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          navVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <Navbar variant={navVariant} />
      </div>

      {/* Section 1: Hero */}
      <section id="home" className="h-screen snap-start snap-always">
        <HeroSection onStart={() => setStarted(true)} started={started} />
      </section>

      {/* Section 2: AboutSection */}
      <section className="min-h-screen snap-start snap-always">
        <AboutSection />
      </section>

      {/* Section 3: WhoIAmSection */}
      <section className="min-h-screen snap-start snap-always">
        <WhoIAmSection />
      </section>

      {/* Section 4: ProjectsSection (horizontal snap inside) */}
      <ProjectsSection containerRef={containerRef} />

      {/* Section 5: ExperienceSection */}
      <section className="min-h-screen snap-start snap-always">
        <ExperienceSection />
      </section>

      {/* Section 6: ContactSection */}
      <section className="min-h-screen snap-start snap-always">
        <ContactSection />
      </section>
    </div>
  );
}
