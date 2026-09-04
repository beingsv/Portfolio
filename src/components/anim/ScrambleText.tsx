"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>[]{}=+*#%$@";

interface ScrambleTextProps {
  /** Plain text only - the effect rewrites textContent. */
  children: string;
  as?: ElementType;
  className?: string;
  /** Seconds for the whole string to resolve */
  duration?: number;
  /** Extra delay in seconds before decoding starts */
  delay?: number;
}

/**
 * Decode-on-reveal: the string sits as noise, then resolves left to right as
 * it scrolls into view. Deliberately unlike the site's other reveals - those
 * move type through space, this one resolves it in place, which suits short
 * monospace-ish labels.
 *
 * Every character always renders something, so the element's width never
 * collapses and nothing around it reflows mid-decode. The real text is what
 * renders on the server, so search engines and no-JS visitors see it intact.
 */
export default function ScrambleText({
  children,
  as: Tag = "span",
  className,
  duration = 1.1,
  delay = 0,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const final = children;
      const chars = final.split("");
      const state = { progress: 0 };
      let tick = 0;
      let noise = chars.map(() => GLYPHS[(Math.random() * GLYPHS.length) | 0]);

      const render = () => {
        // Re-roll on every other frame; per-frame churn reads as static
        // rather than as something decoding.
        if (tick++ % 2 === 0) {
          noise = chars.map(() => GLYPHS[(Math.random() * GLYPHS.length) | 0]);
        }
        const front = state.progress * chars.length;
        el.textContent = chars
          .map((ch, i) => (ch === " " ? " " : i < front ? ch : noise[i]))
          .join("");
      };

      render();

      gsap.to(state, {
        progress: 1,
        duration,
        delay,
        ease: "power2.inOut",
        onUpdate: render,
        onComplete: () => {
          el.textContent = final;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [children] }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
