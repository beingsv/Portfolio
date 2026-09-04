"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
  onComplete: () => void;
}

/** 0→100 counter, then a curtain wipe up into the hero. */
export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onComplete();
        return;
      }

      const counter = { v: 0 };
      const tl = gsap.timeline({ onComplete });

      tl.to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          }
        },
      })
        .to(innerRef.current, {
          yPercent: -120,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
        });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-end justify-between bg-surface px-8 pb-8 md:px-12"
    >
      <div ref={innerRef} className="flex w-full items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Shiwam Vishwakarma
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">
            Portfolio 2026
          </p>
        </div>
        <span
          ref={countRef}
          className="font-heading text-7xl font-black leading-none text-white tabular-nums md:text-9xl"
        >
          000
        </span>
      </div>
    </div>
  );
}
