"use client";

export default function AboutSection() {
  return (
    <section
      className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(to bottom, #f8c89c, #f38b3e, #eb6310)" }}
    >
      {/* Floating white dots */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatUpA {
            0% { transform: translate(0px, 0px); opacity: 0; }
            5% { opacity: 0.7; }
            20% { transform: translate(12px, -22vh); }
            40% { transform: translate(-15px, -44vh); opacity: 0.6; }
            60% { transform: translate(20px, -66vh); opacity: 0.7; }
            80% { transform: translate(-8px, -88vh); opacity: 0.4; }
            95% { opacity: 0.2; }
            100% { transform: translate(5px, -110vh); opacity: 0; }
          }
          @keyframes floatUpB {
            0% { transform: translate(0px, 0px); opacity: 0; }
            5% { opacity: 0.6; }
            20% { transform: translate(-18px, -22vh); }
            40% { transform: translate(12px, -44vh); opacity: 0.7; }
            60% { transform: translate(-22px, -66vh); opacity: 0.5; }
            80% { transform: translate(10px, -88vh); opacity: 0.4; }
            95% { opacity: 0.2; }
            100% { transform: translate(-6px, -110vh); opacity: 0; }
          }
          @keyframes floatUpC {
            0% { transform: translate(0px, 0px); opacity: 0; }
            5% { opacity: 0.8; }
            20% { transform: translate(15px, -22vh); }
            40% { transform: translate(-20px, -44vh); opacity: 0.6; }
            60% { transform: translate(25px, -66vh); opacity: 0.7; }
            80% { transform: translate(-12px, -88vh); opacity: 0.3; }
            95% { opacity: 0.1; }
            100% { transform: translate(8px, -110vh); opacity: 0; }
          }
        `}} />
        {[
          { size: 4, left: "8%", duration: 28, delay: 0, anim: "floatUpA" },
          { size: 3, left: "18%", duration: 32, delay: 3, anim: "floatUpB" },
          { size: 5, left: "30%", duration: 26, delay: 1, anim: "floatUpC" },
          { size: 3, left: "42%", duration: 30, delay: 5, anim: "floatUpA" },
          { size: 4, left: "55%", duration: 29, delay: 2, anim: "floatUpB" },
          { size: 6, left: "68%", duration: 31, delay: 7, anim: "floatUpC" },
          { size: 3, left: "78%", duration: 34, delay: 4, anim: "floatUpA" },
          { size: 4, left: "88%", duration: 27, delay: 6, anim: "floatUpB" },
          { size: 5, left: "12%", duration: 30, delay: 8, anim: "floatUpC" },
          { size: 3, left: "95%", duration: 33, delay: 1.5, anim: "floatUpA" },
          { size: 4, left: "38%", duration: 28, delay: 9, anim: "floatUpB" },
          { size: 5, left: "62%", duration: 32, delay: 3.5, anim: "floatUpC" },
          { size: 3, left: "5%", duration: 29, delay: 10, anim: "floatUpA" },
          { size: 4, left: "72%", duration: 31, delay: 2.5, anim: "floatUpB" },
          { size: 5, left: "48%", duration: 35, delay: 6.5, anim: "floatUpC" },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              bottom: "0%",
              left: dot.left,
              opacity: 0,
              boxShadow: "0 0 6px 3px rgba(255,255,255,0.5)",
              animation: `${dot.anim} ${dot.duration}s linear ${dot.delay}s infinite`,
              animationFillMode: "backwards",
            }}
          />
        ))}
        {/* Background depth dots - larger, low opacity, slower = 3D depth */}
        {[
          { size: 10, left: "12%", duration: 45, delay: 2, anim: "floatUpB" },
          { size: 12, left: "35%", duration: 50, delay: 5, anim: "floatUpC" },
          { size: 8, left: "58%", duration: 42, delay: 0, anim: "floatUpA" },
          { size: 14, left: "80%", duration: 48, delay: 8, anim: "floatUpB" },
          { size: 10, left: "25%", duration: 52, delay: 12, anim: "floatUpC" },
          { size: 12, left: "68%", duration: 46, delay: 3, anim: "floatUpA" },
          { size: 9, left: "45%", duration: 50, delay: 15, anim: "floatUpB" },
          { size: 11, left: "90%", duration: 44, delay: 6, anim: "floatUpC" },
        ].map((dot, i) => (
          <div
            key={`bg-${i}`}
            className="absolute rounded-full bg-white/20"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              bottom: "0%",
              left: dot.left,
              opacity: 0,
              boxShadow: "0 0 12px 6px rgba(255,255,255,0.15)",
              filter: "blur(1px)",
              animation: `${dot.anim} ${dot.duration}s linear ${dot.delay}s infinite`,
              animationFillMode: "backwards",
            }}
          />
        ))}
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
          <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-black leading-[0.9] tracking-tight font-heading">
            Shiwam
            <br />
            Vishwakarma
          </h2>

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
        <a
          href="#projects"
          className="self-start inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white text-sm font-medium rounded-full hover:bg-orange-700 transition-colors duration-300 mb-10"
        >
          View Projects
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-300/50">
            <p className="text-lg font-bold text-orange-700">3+</p>
            <p className="text-xs text-black/60">Years Experience</p>
          </div>
          <div className="px-5 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-orange-300/50">
            <p className="text-lg font-bold text-orange-700">12+</p>
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
