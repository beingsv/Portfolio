"use client";

import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_THEME,
  THEMES,
  THEME_STORAGE_KEY,
  isThemeId,
  type ThemeId,
} from "@/lib/themes";

/** Feature-detected rather than declared, so the DOM lib version can't matter. */
type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

interface ThemeSwitcherProps {
  variant?: "dark" | "light";
}

/**
 * Palette picker. Writes data-theme on <html>; every colour on the site is a
 * token off that attribute, so one attribute swap repaints everything.
 *
 * The swap is wrapped in a view transition and revealed by a circle grown
 * from the pressed swatch - the click point and the distance to the furthest
 * viewport corner are handed to the CSS keyframes as custom properties.
 */
export default function ThemeSwitcher({ variant = "dark" }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  // `theme` drives the active ring, but it cannot be trusted for deduping
  // clicks: startViewTransition pauses rendering while it captures its
  // snapshot, so the state lags behind what is actually applied. This ref is
  // written synchronously on click and is the real source of truth.
  const selectedRef = useRef<ThemeId>(DEFAULT_THEME);
  const inFlightRef = useRef(false);
  const isDark = variant === "dark";

  // The inline head script already set the attribute before paint. Reading it
  // back after mount (rather than reading localStorage during render) keeps
  // the server and first client render identical, so there's no mismatch.
  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (isThemeId(current)) {
      selectedRef.current = current;
      if (current !== DEFAULT_THEME) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTheme(current);
      }
    }
  }, []);

  const pick = (id: ThemeId, event: React.MouseEvent<HTMLButtonElement>) => {
    if (id === selectedRef.current) return;
    // Record the intent before any async work, so a burst of clicks dedupes
    // against the latest one rather than against a stale render.
    selectedRef.current = id;

    const root = document.documentElement;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    // Furthest corner, so the circle is guaranteed to cover the viewport.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    root.style.setProperty("--vt-r", `${radius}px`);

    // Reads the ref rather than the captured `id`. A view transition runs this
    // callback asynchronously - the browser defers it until it is ready to
    // snapshot - so by the time it fires, later clicks may already have applied
    // a newer palette directly. Closing over `id` would let a late transition
    // overwrite them and snap the theme backwards.
    const commit = () => {
      const next = selectedRef.current;
      root.setAttribute("data-theme", next);
      setTheme(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Private mode / storage disabled - the theme still applies for this visit.
      }
    };

    const doc = document as ViewTransitionDocument;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // A transition can only be captured from a visible document, and only one
    // can be in flight. Outside those conditions the palette still has to
    // change - it just changes without the wipe.
    if (
      reduced ||
      typeof doc.startViewTransition !== "function" ||
      document.visibilityState !== "visible" ||
      inFlightRef.current
    ) {
      commit();
      return;
    }

    let transition: ViewTransition;
    try {
      transition = doc.startViewTransition(commit);
    } catch {
      // Never reached in practice, but a throwing startViewTransition must not
      // leave the theme unchanged.
      commit();
      return;
    }

    inFlightRef.current = true;
    // Every promise the transition exposes has to be handled, not just the one
    // we care about: an aborted transition (tab backgrounded mid-wipe, another
    // transition pre-empting this one) rejects them, and any left without a
    // handler surfaces as an unhandledRejection in the console. The DOM update
    // has already happened by then, so there is nothing to recover.
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    transition.finished
      .catch(() => {})
      .finally(() => {
        inFlightRef.current = false;
      });
  };

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`hidden lg:inline text-[9px] tracking-[0.2em] uppercase ${
          isDark ? "text-white/40" : "text-black/40"
        }`}
      >
        Theme
      </span>

      <div
        role="radiogroup"
        aria-label="Colour theme"
        className={`flex items-center gap-1.5 rounded-full border px-2 py-1.5 backdrop-blur-sm ${
          isDark ? "border-white/15 bg-white/5" : "border-black/10 bg-black/5"
        }`}
      >
        {THEMES.map((t) => {
          const active = t.id === theme;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${t.label} theme`}
              title={t.label}
              onClick={(e) => pick(t.id, e)}
              className={`relative h-3.5 w-3.5 rounded-full transition-transform duration-300 ease-out hover:scale-125 ${
                active ? "scale-110" : "scale-90 opacity-70 hover:opacity-100"
              }`}
              style={{ backgroundColor: t.swatch }}
            >
              {active && (
                <span
                  aria-hidden
                  className={`absolute -inset-1 rounded-full border ${
                    isDark ? "border-white/70" : "border-black/50"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
