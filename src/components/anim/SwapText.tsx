"use client";

import type { ReactNode } from "react";

/**
 * Hover text-swap: the label slides out the top while a duplicate slides in
 * from the bottom. The parent element must have the Tailwind `group` class.
 */
export default function SwapText({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}
