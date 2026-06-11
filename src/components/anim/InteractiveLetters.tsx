"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface InteractiveLettersProps {
  /** One string per visual line */
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Letter color while hovered (flashes, then settles back) */
  accent?: string;
}

/**
 * Display title whose letters 3D-flip into place on entry, then react to the
 * cursor: a hovered letter pops up, flashes the accent color, and settles
 * back with an elastic wobble.
 */
export default function InteractiveLetters({
  lines,
  as: Tag = "div",
  className,
  accent = "#ea580c",
}: InteractiveLettersProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const chars = gsap.utils.toArray<HTMLElement>(".il-char", root);

      gsap.from(chars, {
        yPercent: 110,
        rotationX: -90,
        autoAlpha: 0,
        transformOrigin: "50% 100%",
        duration: 1,
        ease: "back.out(1.6)",
        stagger: 0.04,
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
        },
      });

      if (!window.matchMedia("(pointer: fine)").matches) return;

      const baseColor = getComputedStyle(root).color;
      chars.forEach((char) => {
        char.addEventListener("mouseenter", () => {
          gsap.to(char, {
            yPercent: -22,
            color: accent,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              gsap.to(char, {
                yPercent: 0,
                color: baseColor,
                duration: 0.9,
                ease: "elastic.out(1, 0.35)",
              });
            },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, lineIndex) => (
        <span
          key={lineIndex}
          aria-hidden
          className="block"
          style={{ perspective: "600px" }}
        >
          {line.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="il-char inline-block will-change-transform"
            >
              {char === " " ? " " : char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
