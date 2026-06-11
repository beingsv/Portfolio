"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface MagneticProps {
  children: ReactNode;
  /** How strongly the element leans toward the cursor (0–1) */
  strength?: number;
  className?: string;
}

/** Wrapper that makes its child lean toward the cursor and spring back on leave. */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.4)",
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </div>
  );
}
