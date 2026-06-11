"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WordRevealProps {
  text: string;
  className?: string;
  /** Words rendered bold (matched against the plain word, punctuation ignored) */
  highlights?: string[];
}

/**
 * Paragraph that starts dimmed and fills in word by word once it enters the
 * viewport. Plays through on its own (not scrubbed), so it always finishes -
 * fullpage snapping never scrolls partway into a section.
 */
export default function WordReveal({ text, className, highlights = [] }: WordRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll("[data-word]");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { opacity: 1 });
        return;
      }
      gsap.to(targets, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  const isHighlight = (word: string) =>
    highlights.some((h) => word.replace(/[^\w+%]/g, "") === h);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-word
          className={`opacity-15 ${isHighlight(word) ? "font-bold" : ""}`}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
