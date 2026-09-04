"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HeroSection from "@/components/HeroSection";
import Preloader from "@/components/Preloader";
import AboutSection from "@/components/AboutSection";
import WhoIAmSection from "@/components/WhoIAmSection";
import ProjectsSection, { PROJECT_COUNT } from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import { useLenis } from "@/components/SmoothScrollProvider";

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);

const TOTAL_SECTIONS = 6;
const PROJECTS_SECTION = 3; // index of the projects section in the stack

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [navVariant, setNavVariant] = useState<"light" | "dark">("dark");
  const [projectIndex, setProjectIndex] = useState(0);
  const lenis = useLenis();

  const sectionIndexRef = useRef(0);
  const projectIndexRef = useRef(0);
  const animatingRef = useRef(false);
  const goToProjectRef = useRef<((index: number) => void) | null>(null);

  // Lock scrolling until the intro "Start" is clicked
  useEffect(() => {
    if (started) {
      lenis?.start();
      document.documentElement.style.overflow = "";
    } else {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [started, lenis]);

  // Navbar visibility + theme, driven by ScrollTrigger
  useEffect(() => {
    const visibilityTrigger = ScrollTrigger.create({
      start: () => window.innerHeight * 0.5,
      end: "max",
      onToggle: (self) => setNavVisible(self.isActive),
    });

    // Each themed region declares itself via data-navtheme; the region under
    // the navbar wins.
    const themeTriggers = gsap.utils
      .toArray<HTMLElement>("[data-navtheme]")
      .map((sec) =>
        ScrollTrigger.create({
          trigger: sec,
          start: "top 40px",
          end: "bottom 40px",
          onToggle: (self) => {
            if (self.isActive) {
              setNavVariant(sec.dataset.navtheme === "dark" ? "dark" : "light");
            }
          },
        })
      );

    return () => {
      visibilityTrigger.kill();
      themeTriggers.forEach((t) => t.kill());
    };
  }, []);

  // Fullpage navigation (desktop): one gesture = one transition. Wheel and
  // touch are intercepted; vertical moves tween the window between section
  // offsets (the sticky stack provides the cover effect), and while on the
  // projects section the same gestures step through projects horizontally.
  useEffect(() => {
    if (!started) return;
    const fullpage =
      window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fullpage) return;

    const vh = () => window.innerHeight;

    const goToSection = (rawIndex: number) => {
      const index = gsap.utils.clamp(0, TOTAL_SECTIONS - 1, rawIndex);
      if (
        index === sectionIndexRef.current &&
        Math.abs(window.scrollY - index * vh()) < 2
      ) {
        return;
      }
      animatingRef.current = true;
      sectionIndexRef.current = index;
      gsap.to(window, {
        scrollTo: index * vh(),
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          // Brief cooldown so trackpad momentum can't chain transitions
          gsap.delayedCall(0.15, () => (animatingRef.current = false));
        },
      });
    };

    const goToProject = (rawIndex: number) => {
      const index = gsap.utils.clamp(0, PROJECT_COUNT - 1, rawIndex);
      if (index === projectIndexRef.current) return;
      animatingRef.current = true;
      projectIndexRef.current = index;
      setProjectIndex(index);
      // Matches the slide tween duration in ProjectsSection + cooldown
      gsap.delayedCall(1.15, () => (animatingRef.current = false));
    };
    goToProjectRef.current = goToProject;

    const next = () => {
      if (animatingRef.current) return;
      if (
        sectionIndexRef.current === PROJECTS_SECTION &&
        projectIndexRef.current < PROJECT_COUNT - 1
      ) {
        goToProject(projectIndexRef.current + 1);
      } else {
        goToSection(sectionIndexRef.current + 1);
      }
    };

    const prev = () => {
      if (animatingRef.current) return;
      if (
        sectionIndexRef.current === PROJECTS_SECTION &&
        projectIndexRef.current > 0
      ) {
        goToProject(projectIndexRef.current - 1);
      } else {
        goToSection(sectionIndexRef.current - 1);
      }
    };

    const observer = Observer.create({
      type: "wheel,touch",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onDown: prev,
      onUp: next,
    });

    const onKey = (e: KeyboardEvent) => {
      if (
        ["ArrowDown", "PageDown"].includes(e.key) ||
        (e.key === " " && !e.shiftKey)
      ) {
        e.preventDefault();
        next();
      } else if (
        ["ArrowUp", "PageUp"].includes(e.key) ||
        (e.key === " " && e.shiftKey)
      ) {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSection(TOTAL_SECTIONS - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    // Scrollbar drags, nav clicks, and restored scroll positions can land
    // anywhere - settle on the nearest section and keep the index in sync.
    let settle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      if (animatingRef.current) return;
      clearTimeout(settle);
      settle = setTimeout(() => {
        const nearest = gsap.utils.clamp(
          0,
          TOTAL_SECTIONS - 1,
          Math.round(window.scrollY / vh())
        );
        sectionIndexRef.current = nearest;
        if (Math.abs(window.scrollY - nearest * vh()) > 2) {
          goToSection(nearest);
        }
      }, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.kill();
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(settle);
      goToProjectRef.current = null;
    };
  }, [started]);

  // Dots/arrows inside ProjectsSection; falls back to plain state on mobile
  const handleProjectNavigate = useCallback((index: number) => {
    if (goToProjectRef.current) {
      goToProjectRef.current(index);
    } else {
      const clamped = gsap.utils.clamp(0, PROJECT_COUNT - 1, index);
      projectIndexRef.current = clamped;
      setProjectIndex(clamped);
    }
  }, []);

  return (
    <main className="w-full">
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

      {/*
        Stacked sections: on desktop every section is sticky at the top, so
        the one you're on holds still while the next slides up and covers it
        (and un-covers when scrolling back). Each wrapper gets an explicit
        z-index so a section's internal layers can never paint over the
        section stacking above it. Mobile keeps normal flow - sticky breaks
        sections taller than the viewport.
      */}

      {/* Section 1: Hero */}
      <section
        id="home"
        data-navtheme="dark"
        className="h-screen overflow-hidden lg:sticky lg:top-0 z-[1]"
      >
        <HeroSection onStart={() => setStarted(true)} started={started} />
      </section>

      {/* Section 2: AboutSection */}
      <section
        data-navtheme="light"
        className="min-h-screen overflow-hidden lg:sticky lg:top-0 lg:h-screen z-[2]"
      >
        <AboutSection />
      </section>

      {/* Section 3: WhoIAmSection */}
      <section
        data-navtheme="light"
        className="min-h-screen overflow-hidden bg-panel lg:sticky lg:top-0 lg:h-screen z-[3]"
      >
        <WhoIAmSection />
      </section>

      {/* Section 4: ProjectsSection (horizontal slide-over) */}
      <div className="relative lg:sticky lg:top-0 z-[4]">
        <ProjectsSection
          activeIndex={projectIndex}
          onNavigate={handleProjectNavigate}
        />
      </div>

      {/* Section 5: ExperienceSection */}
      <section
        data-navtheme="dark"
        className="min-h-screen overflow-hidden bg-surface lg:sticky lg:top-0 lg:h-screen z-[5]"
      >
        <ExperienceSection />
      </section>

      {/* Section 6: ContactSection */}
      <section
        data-navtheme="dark"
        className="min-h-screen overflow-hidden bg-surface lg:sticky lg:top-0 lg:h-screen z-[6]"
      >
        <ContactSection />
      </section>

      {/* Preloader on top of everything until the count finishes */}
      {!loaded && (
        <Preloader
          onComplete={() => {
            setLoaded(true);
            // Reloading mid-page restores the scroll position, so the Start
            // gate (top of page) is unreachable - skip it or the user is
            // stranded with scrolling locked.
            if (window.scrollY > 10) {
              setStarted(true);
            }
          }}
        />
      )}
    </main>
  );
}
