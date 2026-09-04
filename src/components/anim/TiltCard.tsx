"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface TiltCardProps {
  children: ReactNode;
  /** Applied to the tilting card itself - pass the background and radius here. */
  className?: string;
  /** Applied to the perspective wrapper, for layout (flex/grid sizing). */
  wrapperClassName?: string;
  /** Max tilt in degrees at the card's edge */
  max?: number;
  /** Sheen tint - white reads on dark cards, a warm tint on light ones. */
  sheenColor?: string;
}

/**
 * Cursor-tracked 3D tilt with a specular highlight that follows the pointer.
 *
 * Complements Magnetic rather than repeating it: Magnetic translates a whole
 * element toward the cursor, this one rotates in place on two axes, so cards
 * feel like physical surfaces catching light instead of like they're being
 * pulled around.
 */
export default function TiltCard({
  children,
  className,
  wrapperClassName,
  max = 9,
  sheenColor,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const rotX = gsap.quickTo(el, "rotationX", {
        duration: 0.5,
        ease: "power3.out",
      });
      const rotY = gsap.quickTo(el, "rotationY", {
        duration: 0.5,
        ease: "power3.out",
      });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotY((px - 0.5) * max * 2);
        rotX((py - 0.5) * max * -2);
        el.style.setProperty("--sheen-x", `${px * 100}%`);
        el.style.setProperty("--sheen-y", `${py * 100}%`);
      };

      const onEnter = () => {
        el.dataset.tilting = "true";
      };

      const onLeave = () => {
        el.dataset.tilting = "false";
        gsap.to(el, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref }
  );

  return (
    <div className={wrapperClassName} style={{ perspective: "900px" }}>
      <div
        ref={ref}
        className={`tilt-card relative ${className ?? ""}`}
        style={sheenColor ? { "--sheen-color": sheenColor } as React.CSSProperties : undefined}
      >
        {children}
      </div>
    </div>
  );
}
