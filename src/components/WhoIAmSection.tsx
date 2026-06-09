"use client";

import { useRef } from "react";
import Image from "next/image";

const skills = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Redux Toolkit",
  "React Query",
  "Jest",
  "Tailwind CSS",
  "D3.js",
  "Material-UI",
  "Storybook",
  "Node.js",
  "Express.js",
  "Docker",
  "Kubernetes",
  "Firebase",
  "MongoDB",
  "Git/GitHub",
  "New Relic",
  "Vitest",
  "Figma",
];

export default function WhoIAmSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen lg:h-screen bg-white text-black overflow-hidden">
      {/* Spacer for fixed navbar */}
      <div className="h-16" />

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-12 px-8 md:px-12 lg:px-16 pt-4 pb-16">
        {/* Left - Photo */}
        <div className="w-full lg:w-[35%] shrink-0">
          <div className="relative">
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="/images/about-profile.jpeg"
                alt="Shiwam Vishwakarma"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6">
            <a href="https://github.com/beingsv" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="w-9 h-9 flex items-center justify-center text-black/50 hover:text-orange-500 border border-black/10 rounded-full transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/beingsv/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center text-black/50 hover:text-orange-500 border border-black/10 rounded-full transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://www.instagram.com/im.blacksmith/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center text-black/50 hover:text-orange-500 border border-black/10 rounded-full transition-colors duration-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">

          {/* Section title */}
          <p className="text-lg font-black text-orange-500 tracking-wider uppercase mb-4 font-heading">
            Who I Am
          </p>

          {/* Skills marquee - infinite horizontal scroll with edge fade */}
          <div className="relative overflow-hidden mb-8">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes marqueeScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}} />

            <div
              className="flex items-center whitespace-nowrap"
              style={{ animation: "marqueeScroll 30s linear infinite" }}
            >
              {/* Duplicate the list for seamless loop */}
              {[...skills, ...skills].map((skill, i) => (
                <span key={i} className="flex items-center shrink-0">
                  <span className="text-[13px] text-gray-400 tracking-wider uppercase font-bold">{skill}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mx-3 shrink-0" />
                </span>
              ))}
            </div>
          </div>

          {/* Bio paragraph */}
          <div className="w-full">
            <p className="text-base md:text-lg leading-relaxed text-black/85 font-medium">
              Frontend Engineer specializing in scalable React and Next.js applications, performance optimization, and real-time systems. Proven impact includes <span className="font-bold">95+ Lighthouse scores</span>, <span className="font-bold">40% reduction in business errors</span>, and integrations used by <span className="font-bold">5K+ users</span>. Strong full-stack exposure with Node.js and modern cloud tooling. Passionate about crafting pixel-perfect interfaces, building design systems from scratch, and turning complex data into intuitive, accessible user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
