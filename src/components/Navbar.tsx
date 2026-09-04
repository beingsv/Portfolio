"use client";

import { useEffect, useState } from "react";
import { useLenis } from "@/components/SmoothScrollProvider";
import SwapText from "@/components/anim/SwapText";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  // { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  variant?: "dark" | "light";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState("");
  const lenis = useLenis();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setCurrentTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = variant === "dark";

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (!element) return;
    // Sections are sticky-stacked: an already-covered section reports
    // rect.top = 0, so scroll to its layout (flow) position instead, which
    // stickiness doesn't affect.
    let top = 0;
    let node: HTMLElement | null = element;
    while (node) {
      top += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }
    if (lenis) {
      lenis.scrollTo(top, { duration: 1.4, force: true });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="relative z-10 flex justify-between items-center px-8 md:px-12 py-5">
      <p
        className={`text-xs tracking-wider uppercase font-medium ${
          isDark ? "text-white/70" : "text-black/70"
        }`}
      >
        India Time – {currentTime}
      </p>
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`group text-sm transition-colors duration-200 tracking-wide cursor-pointer ${
              isDark
                ? "text-white/80 hover:text-white"
                : "text-black/80 hover:text-black"
            }`}
          >
            <SwapText>{item.label}</SwapText>
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <ThemeSwitcher variant={variant} />
        <a
          href="mailto:beingsamvis@gmail.com"
          className={`text-xs whitespace-nowrap transition-colors duration-200 ${
            isDark ? "text-accent-bright hover:text-white" : "text-accent-ink hover:text-black"
          }`}
        >
          Hire me →
        </a>
      </div>
    </nav>
  );
}
