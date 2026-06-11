"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vy: number;
  drift: number;
  phase: number;
  size: number;
  depth: number; // 0..1, larger = closer (bigger, brighter, faster)
}

/**
 * Floating upward particle field with gentle cursor repulsion. One canvas
 * replaces the previous 23 individually-animated DOM dots. Pauses when
 * offscreen; renders a static field under reduced motion.
 */
export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      const count = Math.min(70, Math.floor(width / 18));
      for (let i = 0; i < count; i++) {
        const depth = Math.random();
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vy: 0.2 + depth * 0.55,
          drift: 8 + Math.random() * 18,
          phase: Math.random() * Math.PI * 2,
          size: 1 + depth * 2.6,
          depth,
        });
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        if (!reduced) {
          p.y -= p.vy;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        }
        let x = p.x + Math.sin(t / 2400 + p.phase) * p.drift;

        // Cursor repulsion
        const dx = x - mouse.x;
        const dy = p.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        const radius = 120;
        if (dist2 < radius * radius && dist2 > 0.01) {
          const dist = Math.sqrt(dist2);
          const force = ((radius - dist) / radius) * 36;
          x += (dx / dist) * force;
          if (!reduced) p.y += (dy / dist) * force * 0.25;
        }

        const alpha = 0.25 + p.depth * 0.5;
        ctx.beginPath();
        ctx.arc(x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.shadowBlur = 4 + p.depth * 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const loop = (t: number) => {
      draw(t);
      if (!reduced) raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    resize();
    seed();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
