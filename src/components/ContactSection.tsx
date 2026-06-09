"use client";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function ContactSection() {
  const greeting = getGreeting();

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col"
    >
      {/* Center background image */}
      <div className="absolute inset-0 z-0">
        {/* <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/images/contact-profile.png)" }}
        /> */}
        {/* Side gradients to blend image into background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
      </div>

      {/* Big watermark name at bottom */}
      <div className="absolute bottom-20 left-0 right-0 z-0 pointer-events-none overflow-hidden">
        <p className="text-[6vw] font-black text-white/[0.04] leading-none text-center font-heading whitespace-nowrap">
          SHIWAM VISHWAKARMA
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-between px-8 md:px-12 lg:px-16 pt-20">
        {/* Left - intro */}
        <div className="max-w-sm flex flex-col gap-6">
          {/* Labels */}
          <div>
            <p className="flex items-center gap-2 text-[10px] text-white/50 tracking-[0.2em] uppercase mb-1" suppressHydrationWarning>
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full inline-block" />
              {greeting}
            </p>
            <p className="text-[10px] text-orange-500 tracking-[0.2em] uppercase font-bold">
              Software Developer
            </p>
          </div>

          {/* Name */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.95] font-heading">
              SHIWAM
            </h2>
            <h2 className="text-4xl md:text-5xl font-black text-white/30 leading-[0.95] font-heading">
              VISHWAKARMA
            </h2>
          </div>

          <p className="text-sm text-white/60 leading-loose">
            Building cinematic digital experiences, scalable systems, and high-performance products with modern web technologies.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-5 text-white/60">
            <a href="https://github.com/beingsv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase hover:text-orange-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/beingsv/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase hover:text-orange-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://www.instagram.com/im.blacksmith/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase hover:text-orange-500 transition-colors">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
          </div>

          {/* Email */}
          <a
            href="mailto:beingsamvis@gmail.com"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-orange-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4z" fill="none" />
              <path d="M22 6l-10 7L2 6" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>
            beingsamvis@gmail.com
          </a>
        </div>

        {/* Right - CTA */}
        <div className="hidden lg:block max-w-md text-right">
          <p className="text-[10px] text-white/50 tracking-[0.2em] uppercase mb-6">
            Available for Collaborations
          </p>

          <h3 className="text-5xl xl:text-6xl font-black text-white leading-[0.95] font-heading mb-8">
            CRAFTING
            <br />
            MODERN
            <br />
            DIGITAL
            <br />
            PRODUCTS
            <br />
            THAT FEEL
            <br />
            <span className="text-orange-500">ALIVE.</span>
          </h3>

          <a
            href="mailto:beingsamvis@gmail.com"
            className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 border border-orange-500 text-orange-500 text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            Let&apos;s Talk →
          </a>
        </div>
      </div>

      {/* Center aesthetic - rotating badge with glowing orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center pointer-events-none">
        {/* Glowing orb */}
        <div className="absolute w-32 h-32 rounded-full bg-orange-500/30 blur-2xl animate-glow-pulse" />
        <div className="absolute w-4 h-4 rounded-full bg-orange-500 animate-glow-pulse shadow-[0_0_25px_10px_rgba(249,115,22,0.6)]" />

        {/* Rotating circular text */}
        <div className="relative w-80 h-80 animate-spin-slow">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 100,100 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
                fill="none"
              />
            </defs>
            <text className="fill-white/40 text-[9px] tracking-[0.15em] uppercase font-medium">
              <textPath href="#circlePath" startOffset="0%" textLength="565">
                &nbsp;Available for work &nbsp;•&nbsp; Open to opportunities &nbsp;•&nbsp; Let&apos;s build together &nbsp;•&nbsp;
              </textPath>
            </text>
          </svg>
        </div>

        {/* Outer ring */}
        <div className="absolute w-[22rem] h-[22rem] rounded-full border border-white/10" />
        <div className="absolute w-[26rem] h-[26rem] rounded-full border border-white/5" />
      </div>

      {/* Footer bar */}
      <div className="relative z-10 flex justify-between items-end px-8 md:px-12 lg:px-16 pb-8">
        <div>
          <p className="text-[10px] text-white/50 tracking-wider">
            © 2026 Shiwam Vishwakarma
          </p>
          <p className="text-[10px] text-white/30 tracking-wider uppercase">
            All Rights Reserved
          </p>
        </div>

        {/* Monogram */}
        <div className="hidden md:flex w-10 h-10 rounded-full border border-white/20 items-center justify-center">
          <span className="text-[10px] font-bold text-white/70">SV</span>
        </div>

        <div className="text-right">
          <p className="text-[10px] text-white/50 tracking-wider uppercase">
            Designed &amp; Developed
          </p>
          <p className="text-[10px] text-white/30 tracking-wider uppercase">
            With Precision
          </p>
        </div>
      </div>
    </section>
  );
}
