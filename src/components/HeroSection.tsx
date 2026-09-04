"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitReveal from "@/components/anim/SplitReveal";
import Magnetic from "@/components/anim/Magnetic";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HeroSectionProps {
  onStart: () => void;
  started: boolean;
}

export default function HeroSection({ onStart, started }: HeroSectionProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Video drifts down slower than the section scrolls out = depth on exit
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(videoRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setVideoPlaying(false);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const handleStart = () => {
    onStart();
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setVideoPlaying(true);
      setMuted(false);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-surface">
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          started ? "opacity-100" : "opacity-30"
        }`}
        src="/video/hero.mp4"
        muted
        playsInline
        preload="auto"
      />

      {/* Dark overlay - splits into top and bottom halves on start */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-black/70 z-[15] transition-transform duration-1000 ease-in-out ${
          started ? "-translate-y-full" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-black/70 z-[15] transition-transform duration-1000 ease-in-out ${
          started ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Subtle gradient overlay after split */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 delay-500 ${
          started
            ? "opacity-100 bg-gradient-to-r from-black/40 via-transparent to-transparent"
            : "opacity-0"
        }`}
      />

      {/* Intro Screen - Before Start */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center z-20 transition-all duration-700 ${
          started ? "opacity-0 pointer-events-none scale-95" : "opacity-100"
        }`}
      >
        <p className="text-label text-gray-300 font-light">
          Shiwam Vishwakarma
        </p>
        <Magnetic>
          <button
            onClick={handleStart}
            className="btn relative overflow-hidden border border-accent/80 text-accent tracking-[0.25em] uppercase hover:text-white transition-colors duration-300 group"
          >
            <span className="absolute inset-0 bg-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
            <span className="relative z-10">Start</span>
          </button>
        </Magnetic>
      </div>

      {/* Main Content - After Start */}
      <div
        className={`absolute inset-0 z-10 flex flex-col justify-between p-8 md:p-12 transition-all duration-1000 delay-300 ${
          started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Top bar */}
        <div className="flex justify-between items-start">
          <div />
          <a
            href="mailto:beingsamvis@gmail.com"
            className="btn btn-sm border border-white/30 text-white hover:bg-white/10"
          >
            Email me
          </a>
        </div>

        {/* Center content */}
        <div
          className="flex flex-col justify-center flex-1 pr-4"
          style={{ marginLeft: "clamp(1rem, 5vw, 5rem)" }}
        >
          <p className="text-label text-accent font-medium">Portfolio 2026</p>
          <SplitReveal
            as="h1"
            type="chars"
            play={started}
            delay={0.9}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight font-heading break-words"
          >
            Shiwam
            <br />
            Vishwakarma
          </SplitReveal>
          <p className="text-subtitle text-sm md:text-base text-gray-300">
            Frontend Engineer · System Design
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end">
          <div />
          {/* Scroll indicator - centered */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-white/60 tracking-[0.3em] uppercase">Scroll</p>
            <div className="w-[1px] h-10 bg-white/40" />
          </div>
          {/* Play/Pause & Mute/Unmute buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleVideo}
              className="btn-icon border border-white/30 rounded-full hover:bg-white/10"
              aria-label={videoPlaying ? "Pause video" : "Play video"}
            >
              {videoPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="btn-icon border border-white/30 rounded-full hover:bg-white/10"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
