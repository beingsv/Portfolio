"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

/** Returns the Lenis instance, or null when smooth scroll is disabled (reduced motion / not mounted yet). */
export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion: fall back to native scrolling entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    // Desktop uses Observer-driven fullpage navigation (one gesture = one
    // section) - Lenis free-scroll would fight it for wheel events.
    if (window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
      return;
    }

    const instance = new Lenis({
      lerp: 0.1,
      anchors: true,
    });

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Lenis can only be constructed client-side after mount; consumers need a
    // re-render once it exists, so state is the right home for the instance.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
