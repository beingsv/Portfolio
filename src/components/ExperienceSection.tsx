"use client";

import { useRef, useState, useEffect } from "react";
import ScrambleText from "@/components/anim/ScrambleText";

const experiences = [
  {
    number: "01",
    company: "Adda247",
    role: "Software Development Engineer 1",
    type: "Full-Time",
    location: "Gurugram, India",
    period: "Aug 2025 – Present",
    points: [
      "Engineered Anthology, a type-safe Design Language System (DLS) using Atomic Design and token-driven multi-theme engines to unify branding across 4 platforms, increasing development velocity by 30%.",
      "Established UI testing and documentation standards by integrating Storybook and a robust Vitest visual regression pipeline, reducing design-to-production inconsistencies to zero.",
      "Launched a full-scale CMS platform for LearnR with zero-downtime publishing, reducing the content-to-live deployment lifecycle by 40% for high-traffic educational assets.",
      "Resolved critical P1 production incidents by identifying root causes in core services, leading to a 25% reduction in recurring incidents and ensuring high system availability.",
      "Optimized frontend architecture through code-splitting and lazy loading, improving page load performance by 8-12% for high-traffic workloads.",
    ],
    techs: ["React", "TypeScript", "Storybook", "Vitest", "Design Systems"],
  },
  {
    number: "02",
    company: "Trigvent Solutions",
    role: "Software Engineer 1",
    type: "Full-Time",
    location: "Mohali, India",
    period: "Dec 2024 – Aug 2025",
    points: [
      "Spearheaded the development of a multilingual event management platform using React and Material-UI, implementing RBAC for 3 distinct user roles which improved administrative workflow efficiency by 25%.",
      "Engineered a dynamic pricing engine with configurable parameters (seasonality, exclusivity), resulting in a 40% reduction in quotation errors and improved financial accuracy.",
      "Developed embeddable React calendar widgets with seamless API connectivity, driving a 60% increase in third-party platform integrations.",
      "Integrated Google Calendar synchronization for 5K+ users with a time-zone aware UI, reducing missed meetings by 25% through automated reminders.",
      "Optimized frontend performance via code-splitting and efficient state management to achieve 95+ Lighthouse scores, significantly enhancing site speed and SEO.",
    ],
    techs: ["React", "Material-UI", "RBAC", "Google Calendar API", "JavaScript"],
  },
  {
    number: "03",
    company: "CloudEQ",
    role: "Software Engineer 1",
    type: "Full-Time",
    location: "Chandigarh, India",
    period: "Mar 2023 – Dec 2024",
    points: [
      "Engineered a high-performance shopping cart using React and Redux Toolkit, increasing user engagement by 30% through optimized API handling and persistent cart storage.",
      "Implemented New Relic Command Centers for real-time monitoring of full-stack metrics, reducing the Mean Time to Detection (MTTD) of production issues by 40%.",
      "Developed DevOps dashboards to track CI/CD pipelines and SonarQube quality checks, which increased release visibility and reduced deployment-related errors by 20%.",
      "Streamlined containerization and automation using Docker and Kubernetes, improving deployment reliability and reducing environment setup time by 50%.",
    ],
    techs: ["React", "Redux Toolkit", "New Relic", "Docker", "Kubernetes"],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-screen bg-surface overflow-hidden pt-32 pb-16"
    >
      {/* Big watermark */}
      <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none overflow-hidden">
        <p className="text-[16vw] font-black text-white/[0.03] leading-none text-center font-heading whitespace-nowrap">
          EXPERIENCE
        </p>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-8 md:px-12 mb-12">
        <ScrambleText
          as="p"
          className="text-xs text-accent tracking-[0.2em] uppercase font-bold"
        >
          Work Experience
        </ScrambleText>
        <p className="text-xs text-white/40 tracking-wider">
          {experiences.length} Companies
        </p>
      </div>

      {/* Timeline cards */}
      <div className="relative z-10 px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            return (
            <div
              key={exp.number}
              onClick={() => toggleExpand(index)}
              className={`group relative transition-all duration-500 ease-out cursor-pointer ${isExpanded ? "is-expanded" : ""}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: visible ? `${index * 120}ms` : "0ms",
              }}
            >
              {/* Timeline node */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center bg-surface shrink-0">
                  <span className="text-xs font-bold text-accent">
                    {exp.number}
                  </span>
                </div>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />
              </div>

              {/* Period + type + location */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs text-white/80 font-medium tracking-wide">
                  {exp.period}
                </span>
                <span className="px-2 py-0.5 bg-accent/20 border border-accent/40 text-accent-bright text-[9px] tracking-wider uppercase rounded">
                  {exp.type}
                </span>
                <span className="text-[10px] text-white/30">{exp.location}</span>
              </div>

              {/* Company */}
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight font-heading mb-1">
                {exp.company}
              </h3>

              {/* Role */}
              <p className="text-[11px] text-white/50 tracking-wider uppercase mb-5">
                {exp.role}
              </p>

              {/* Points - first always visible, rest reveal on hover/tap */}
              <ul className="flex flex-col gap-3 mb-6">
                {/* First point always visible */}
                <li className="flex gap-2 text-xs text-white/70 leading-relaxed">
                  <span className="text-accent shrink-0 mt-0.5">▸</span>
                  <span>{exp.points[0]}</span>
                </li>

                {/* Remaining points - slide down on hover or when expanded */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-[.is-expanded]:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-3 pt-3 opacity-0 group-hover:opacity-100 group-[.is-expanded]:opacity-100 transition-opacity duration-500 delay-100">
                      {exp.points.slice(1).map((point, i) => (
                        <div key={i} className="flex gap-2 text-xs text-white/70 leading-relaxed">
                          <span className="text-accent shrink-0 mt-0.5">▸</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hint when collapsed */}
                <span className="text-[10px] text-accent-bright/60 italic group-hover:opacity-0 group-[.is-expanded]:opacity-0 transition-opacity duration-300">
                  Tap to see more ↓
                </span>
              </ul>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2">
                {exp.techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/70 text-[9px] tracking-wider uppercase rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
