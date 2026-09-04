"use client";

import ParticlesCanvas from "@/components/ParticlesCanvas";
import InteractiveLetters from "@/components/anim/InteractiveLetters";
import CountUp from "@/components/anim/CountUp";
import Magnetic from "@/components/anim/Magnetic";
import ScrambleText from "@/components/anim/ScrambleText";
import TiltCard from "@/components/anim/TiltCard";

/** Accent-tinted bloom - a white sheen is invisible on these white cards. */
const CARD_SHEEN = "color-mix(in oklab, var(--accent) 32%, transparent)";

const socials = [
  { label: "GitHub", href: "https://github.com/beingsv" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/beingsv/" },
  { label: "Instagram", href: "https://www.instagram.com/im.blacksmith/" },
];

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 12, suffix: "+", label: "Projects Completed" },
];

export default function AboutSection() {
  return (
    <section
      className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(160deg, var(--grad-1), var(--grad-2) 55%, var(--grad-3))",
      }}
    >
      {/*
        Aurora field: oversized blurred blobs drifting on long, mismatched
        durations, so the background is never quite the same twice. Replaces a
        flat linear-gradient - the base gradient above is still what shows
        under reduced motion.
      */}
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="aurora-blob aurora-a -top-[15%] -left-[10%] h-[60vw] w-[60vw]"
          style={{ background: "var(--grad-1)", opacity: 0.55 }}
        />
        <div
          className="aurora-blob aurora-b -bottom-[20%] -right-[5%] h-[55vw] w-[55vw]"
          style={{ background: "var(--accent-bright)", opacity: 0.4 }}
        />
        <div
          className="aurora-blob aurora-c top-[20%] left-[45%] h-[45vw] w-[45vw]"
          style={{ background: "var(--grad-3)", opacity: 0.35 }}
        />
      </div>

      {/* Floating particles - canvas-based, repel from the cursor */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <ParticlesCanvas />
      </div>

      {/* Spacer for fixed navbar */}
      <div className="relative z-10 h-16" />

      {/* Main Content - vertically centered */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-center">
        {/* Intro text */}
        <div className="mb-6">
          <p className="text-sm text-black/60">Hi, I&apos;m</p>
          <ScrambleText
            as="p"
            className="text-sm text-accent-ink italic tracking-wide"
          >
            Software Developer
          </ScrambleText>
        </div>

        {/* Name + Info Cards Row */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-10">
          {/* Big Name - letters flip in, then react to the cursor */}
          <InteractiveLetters
            as="h2"
            lines={["Shiwam", "Vishwakarma"]}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-[0.9] tracking-tight font-heading"
          />

          {/* Info Cards - parallel to the name on the right, tilt under the cursor */}
          <div className="flex flex-col gap-4 lg:max-w-xs shrink-0">
            <TiltCard
              className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg shadow-black/5"
              sheenColor={CARD_SHEEN}
            >
              <p className="text-xs text-black/80 font-semibold leading-relaxed">
                Building cinematic digital{" "}
                <span className="text-accent-deep font-semibold">experiences</span>{" "}
                with modern web technologies &amp; AI.
              </p>
              <p className="text-[11px] text-black/50 mt-2">
                Available for full-time opportunities.
              </p>
            </TiltCard>

            <TiltCard
              className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-4 shadow-lg shadow-black/5"
              sheenColor={CARD_SHEEN}
            >
              <p className="text-xs font-semibold text-black flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                Available for work
              </p>
              <p className="text-[11px] text-black/60 mt-1">Based in India</p>
              <p className="text-[11px] text-black/60">Available Worldwide</p>
            </TiltCard>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["Frontend Engineer", "MERN Stack"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/70 backdrop-blur-sm text-black text-xs font-medium rounded-full border border-black/10 transition-transform duration-300 hover:-translate-y-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Projects Button */}
        <Magnetic className="self-start mb-10">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-accent-deep text-white text-sm font-medium rounded-full hover:bg-accent-ink transition-colors duration-300"
          >
            View Projects
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </Magnetic>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          {stats.map((stat) => (
            <TiltCard
              key={stat.label}
              max={6}
              className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-accent-line/50"
              sheenColor={CARD_SHEEN}
            >
              <p className="text-lg font-bold text-accent-ink">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-black/60">{stat.label}</p>
            </TiltCard>
          ))}
          <TiltCard
            max={6}
            className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-accent-line/50"
            sheenColor={CARD_SHEEN}
          >
            <p className="text-lg font-bold text-accent-ink">Frontend</p>
            <p className="text-xs text-black/60">Specialist</p>
          </TiltCard>
        </div>
      </div>

      {/* Left side social links (vertical) */}
      <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-10">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-black/50 hover:text-black transition-colors duration-200 [writing-mode:vertical-lr] rotate-180"
          >
            {social.label}
          </a>
        ))}
      </div>
    </section>
  );
}
