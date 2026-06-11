"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface SplitRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "lines" (default) for headings/paragraphs, "chars" for short display text */
  type?: "lines" | "chars";
  /** Extra delay in seconds before the reveal starts */
  delay?: number;
  /**
   * When set, the reveal plays the moment this flips to true instead of on
   * scroll (used by the hero, which reveals on Start, not on scroll).
   */
  play?: boolean;
}

export default function SplitReveal({
  children,
  as: Tag = "div",
  className,
  type = "lines",
  delay = 0,
  play,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Play-mode not yet triggered: keep hidden until `play` flips true.
      if (play === false) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });

      SplitText.create(el, {
        type,
        mask: type,
        autoSplit: true,
        onSplit: (self) => {
          const targets = type === "chars" ? self.chars : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            duration: type === "chars" ? 0.9 : 1.1,
            ease: "power4.out",
            stagger: type === "chars" ? 0.035 : 0.09,
            delay,
            scrollTrigger:
              play === undefined
                ? {
                    trigger: el,
                    start: "top 85%",
                    once: true,
                  }
                : undefined,
          });
        },
      });
    },
    { scope: ref, dependencies: [play], revertOnUpdate: true }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
