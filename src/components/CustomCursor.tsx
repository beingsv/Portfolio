"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "drag";

/**
 * Contextual cursor: amber dot + trailing ring, plus a soft spotlight that
 * lights up dark sections (screen blend = invisible on light backgrounds).
 * Grows over links/buttons, becomes a DRAG pill over [data-cursor="drag"]
 * regions. Desktop pointer devices only; hidden for reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Pointer/reduced-motion capability can only be read client-side after
    // mount, and the cursor must not render at all until it's known.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    const spot = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor='hover']")) {
        setMode("hover");
      } else if (target.closest("[data-cursor='drag']")) {
        setMode("drag");
      } else {
        setMode("default");
      }
    };

    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      spot.x += (pos.x - spot.x) * 0.08;
      spot.y += (pos.y - spot.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`;
      }
      if (spotRef.current) {
        spotRef.current.style.transform = `translate(${spot.x}px, ${spot.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Spotlight - lights up dark sections, invisible over light ones */}
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[140] h-[640px] w-[640px] mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0) 60%)",
          willChange: "transform",
        }}
      />

      {/* Trailing ring / DRAG pill */}
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ${
          mode === "drag"
            ? "h-20 w-20 border-transparent bg-orange-500"
            : mode === "hover"
              ? "h-14 w-14 border-orange-400/60 bg-orange-400/10"
              : "h-8 w-8 border-orange-400/40"
        }`}
        style={{ willChange: "transform" }}
      >
        <span
          className={`text-[9px] font-bold tracking-[0.2em] text-white transition-opacity duration-200 ${
            mode === "drag" ? "opacity-100" : "opacity-0"
          }`}
        >
          DRAG
        </span>
      </div>

      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-orange-400 transition-opacity duration-200 ${
          mode === "drag" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          boxShadow: "0 0 8px 2px rgba(251,146,60,0.5)",
          willChange: "transform",
        }}
      />
    </>
  );
}
