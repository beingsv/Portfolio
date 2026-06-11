"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    number: "01",
    tag: "AI-Powered Job Tool",
    title: "AI JOB\nDASHBOARD",
    subtitle: "Smart Outreach & Application Automation",
    description:
      "An AI-driven job application platform that automates the entire outreach workflow — discovering HR and tech contacts via Hunter.io, scoring resumes against job descriptions with a hybrid keyword + LLM ATS engine, and generating tailored application and referral emails. Features smart template routing that sends formal emails to recruiters and casual referral requests to engineers, with automatic resume attachment and bulk sending.",
    techs: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Ollama AI"],
    links: [
      {
        label: "Live Demo",
        url: "https://email-automation-two-azure.vercel.app/dashboard",
      },
    ],
    bgImage: "/images/project1.png",
  },
  {
    number: "02",
    tag: "Error Tracking & Observability Platform",
    title: "LOGGER MANAGEMENT\nSYSTEM",
    subtitle: "SDK-Driven Error Capture, Grouping & Real-Time Analytics",
    description:
      "A self-hosted, multi-tenant error tracking platform (Sentry/Bugsnag-style) for monitoring errors across multiple web apps. A lightweight JS/TS SDK auto-captures uncaught errors, failed requests, and logs, parsing stack traces into structured frames and fingerprinting errors for grouping. The Express backend ingests logs via per-project API keys, groups identical errors into single issues, and streams them live to the dashboard over Server-Sent Events. Backed by JWT auth and MongoDB time-series collections.",
    techs: [
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "React 19",
      "Vite",
      "Tailwind CSS",
      "React Query",
      "Recharts",
      "Server-Sent Events",
      "JWT",
      "Rollup",
    ],
    links: [
      {
        label: "Live Demo",
        url: "#",
      },
    ],
    bgImage: "/images/project2.png",
  },
  {
    number: "03",
    tag: "B2B Wholesale Commerce Platform",
    title: "WHOLESALE SAREE\nQUOTATION SYSTEM",
    subtitle: "Multi-Color Cart & Automated Quotation Generation",
    description:
      "A B2B wholesale saree platform that lets retailers browse a published catalog, build multi-color carts with per-color quantities, add-ons, and packaging options, then generate itemized PDF-style quotations with auto-incrementing quotation numbers. Features a dual-frontend architecture — a customer-facing storefront for catalog browsing and quotation requests, and a separate admin panel for managing sarees, categories, colors, add-ons, media uploads, and reviewing quotation history. Backed by role-based JWT auth, Cloudinary image hosting, and a serverless-ready Express API with on-demand DB connection pooling.",
    techs: [
      "React 19",
      "Vite",
      "Ant Design",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Cloudinary",
      "JWT",
    ],

    links: [
      {
        label: "Storefront",
        url: "https://whole-sale-saree-frontend.vercel.app/",
      },
      {
        label: "Admin Panel",
        url: "https://whole-sale-saree-admin.vercel.app/",
      },
    ],
    bgImage: "/images/project3.png",
  },
];

export const PROJECT_COUNT = projects.length;

interface ProjectsSectionProps {
  /** Which project is showing - owned by the page's fullpage navigation */
  activeIndex: number;
  /** Request navigation to a project (dots / arrows) */
  onNavigate: (index: number) => void;
}

/**
 * Horizontal counterpart of the page's stacked sections: slides sit on top
 * of each other and the next project slides in from the right to cover the
 * current one (which stays put), mirroring the vertical effect.
 */
export default function ProjectsSection({
  activeIndex,
  onNavigate,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const firstRun = useRef(true);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".proj-slide");
      slides.forEach((slide, i) => {
        const xPercent = i <= activeIndex ? 0 : 100;
        if (firstRun.current) {
          gsap.set(slide, { xPercent });
        } else {
          gsap.to(slide, {
            xPercent,
            duration: 1,
            ease: "power3.inOut",
            overwrite: true,
          });
        }
      });
      firstRun.current = false;
    },
    { scope: sectionRef, dependencies: [activeIndex] }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-navtheme="dark"
      className="relative h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Stacked slides - later projects cover earlier ones from the right */}
      <div className="relative h-full w-full">
        {projects.map((project, index) => (
          <div
            key={index}
            className="proj-slide absolute inset-0 will-change-transform"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${project.bgImage})` }}
            />
            {/* Cinematic vignette - dark around all edges */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.85) 100%)",
              }}
            />
            {/* Bottom darkening for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            {/* Left darkening for title */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
            {/* Top subtle darkening for navbar */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

            {/* Large watermark number */}
            <div className="absolute bottom-32 right-8 z-0 opacity-10">
              <p className="text-[180px] font-black text-white leading-none font-heading">
                {project.number}
              </p>
            </div>

            {/* Content - two columns at the bottom */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 pb-16">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-20">
                {/* Left column - tag, title, subtitle, button */}
                <div className="lg:max-w-2xl shrink-0 flex flex-col gap-5">
                  <div>
                    <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-400 text-[10px] tracking-wider uppercase rounded">
                      {project.tag}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight font-heading whitespace-pre-line">
                    {project.title}
                  </h3>

                  <p className="text-xs text-white/50">{project.subtitle}</p>

                  <div className="flex flex-wrap gap-3 self-start">
                    {project.links.map((link) => {
                      const isDisabled = !link.url || link.url === "#";
                      return isDisabled ? (
                        <span
                          key={link.label}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white/40 text-xs font-bold tracking-wider uppercase rounded-full cursor-not-allowed"
                        >
                          {link.label}
                          <span className="text-[9px] normal-case font-normal">(Coming soon)</span>
                        </span>
                      ) : (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-xs font-bold tracking-wider uppercase rounded-full hover:bg-orange-600 transition-colors duration-300"
                        >
                          {link.label}
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Right column - description + tech tags */}
                <div className="lg:max-w-5xl lg:pb-2 flex flex-col gap-6">
                  <p className="text-sm text-white/70 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 text-white/80 text-[10px] tracking-wider uppercase rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top bar */}
      <div className="absolute top-20 left-8 right-8 z-30 flex justify-between items-center">
        <p className="text-xs text-orange-500 tracking-wider uppercase font-bold">
          Projects
        </p>
        <p className="text-xs text-white/40 tracking-wider">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      {/* Progress dots - clickable */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-orange-500" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2">
        <button
          onClick={() => onNavigate(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous project"
          className="btn-icon border border-white/30 text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => onNavigate(activeIndex + 1)}
          disabled={activeIndex === projects.length - 1}
          aria-label="Next project"
          className="btn-icon border border-white/30 text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
