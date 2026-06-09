"use client";

import { useRef, useEffect, useState } from "react";

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

interface ProjectsSectionProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProjectsSection({
  containerRef,
}: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Translate horizontally based on how far we've scrolled through the tall section
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / sectionHeight));
      setProgress(p);
      setActiveIndex(Math.round(p * (projects.length - 1)));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  const translateX = -(progress * (projects.length - 1) * 100);

  return (
    <div ref={sectionRef} id="projects" className="relative bg-[#0a0a0a]">
      {/* Snap anchor points - one per project (sticky viewport overlays these) */}
      <div className="sticky top-0 h-screen overflow-hidden snap-start snap-always z-10">
        {/* Top bar */}
        <div className="absolute top-20 left-8 right-8 z-30 flex justify-between items-center">
          <p className="text-xs text-orange-500 tracking-wider uppercase font-bold">
            Projects
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {projects.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-orange-500" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Horizontal track */}
        <div
          className="flex h-full"
          style={{
            transform: `translateX(${translateX}vw)`,
            width: `${projects.length * 100}vw`,
            transition: "transform 0.15s ease-out",
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative w-screen h-screen flex-shrink-0"
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
      </div>

      {/* Extra snap anchors for projects 2..N (sticky viewport stays pinned over these) */}
      {projects.slice(1).map((_, i) => (
        <div key={i} className="h-screen snap-start snap-always" />
      ))}
    </div>
  );
}
