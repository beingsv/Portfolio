"use client";

/**
 * Full-viewport animated film grain. SVG turbulence rendered once, jittered
 * with a stepped keyframe animation so it reads as live grain, not a static
 * texture. Sits above everything except the cursor.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-[-100%] z-[150] opacity-[0.05] motion-reduce:hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        animation: "grain-jitter 0.8s steps(8) infinite",
      }}
    />
  );
}
