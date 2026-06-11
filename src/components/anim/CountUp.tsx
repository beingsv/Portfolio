"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CountUpProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

/** Number that counts up from 0 when it scrolls into view. */
export default function CountUp({
  value,
  suffix = "",
  className,
  duration = 1.6,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const counter = { v: 0 };
      gsap.to(counter, {
        v: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(counter.v)}${suffix}`;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
