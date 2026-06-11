"use client";

import ParticlesCanvas from "@/components/ParticlesCanvas";
import SplitReveal from "@/components/anim/SplitReveal";
import CountUp from "@/components/anim/CountUp";
import Magnetic from "@/components/anim/Magnetic";

export default function AboutSection() {
  return (
    <section
      className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(to bottom, #f8c89c, #f38b3e, #eb6310)" }}
    >
      {/* Floating particles - canvas-based, repel from the cursor */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ParticlesCanvas />
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Main Content - vertically centered */}
      <div className="relative z-10 px-8 md:px-12 lg:px-16 flex-1 flex flex-col justify-center">
        {/* Intro text */}
        <div className="mb-6">
          <p className="text-sm text-black/60">Hi, I&apos;m</p>
          <p className="text-sm text-orange-800 italic">Software Developer</p>
        </div>

        {/* Name + Info Cards Row */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-10">
          {/* Big Name */}
          <SplitReveal
            as="h2"
            type="lines"
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-[0.9] tracking-tight font-heading"
          >
            Shiwam
            <br />
            Vishwakarma
          </SplitReveal>

          {/* Info Cards - parallel to the name on the right */}
          <div className="flex flex-col gap-4 lg:max-w-xs shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-4">
              <p className="text-xs text-black/80 font-medium font-semibold leading-relaxed">
                Building cinematic digital{" "}
                <span className="text-orange-600 font-semibold">experiences</span>{" "}
                with modern web technologies &amp; AI.
              </p>
              <p className="text-[11px] text-black/50 mt-2">
                Available for full-time opportunities.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-5 py-4">
              <p className="text-xs font-semibold text-black flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                Available for work
              </p>
              <p className="text-[11px] text-black/60 mt-1">Based in India</p>
              <p className="text-[11px] text-black/60">Available Worldwide</p>
            </div>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["Frontend Engineer", "MERN Stack"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/70 backdrop-blur-sm text-black text-xs font-medium rounded-full border border-black/10"
              >
                {tag}
              </span>
            )
          )}
        </div>

        {/* View Projects Button */}
        <Magnetic className="self-start mb-10">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white text-sm font-medium rounded-full hover:bg-orange-700 transition-colors duration-300"
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
          <div className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-300/50">
            <p className="text-lg font-bold text-orange-700">
              <CountUp value={3} suffix="+" />
            </p>
            <p className="text-xs text-black/60">Years Experience</p>
          </div>
          <div className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-300/50">
            <p className="text-lg font-bold text-orange-700">
              <CountUp value={12} suffix="+" />
            </p>
            <p className="text-xs text-black/60">Projects Completed</p>
          </div>
          <div className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-300/50">
            <p className="text-lg font-bold text-orange-700">Frontend</p>
            <p className="text-xs text-black/60">Specialist</p>
          </div>
        </div>
      </div>


      {/* Left side social links (vertical) */}
      <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-5 z-10">
        {[
          { label: "GitHub", href: "https://github.com/beingsv" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/beingsv/" },
          { label: "Instagram", href: "https://www.instagram.com/im.blacksmith/" },
        ].map((social) => (
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
