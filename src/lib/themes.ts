/**
 * Theme registry. Shared by the pre-paint inline script in the root layout
 * and by the ThemeSwitcher, so the two can never disagree about which ids
 * are legal or what the default is.
 *
 * Each id must have a matching `:root[data-theme="<id>"]` block in
 * globals.css implementing the full token contract.
 */
export const THEMES = [
  { id: "ember", label: "Ember", swatch: "#f97316" },
  { id: "cobalt", label: "Cobalt", swatch: "#3b82f6" },
  { id: "flux", label: "Flux", swatch: "#84cc16" },
  { id: "orchid", label: "Orchid", swatch: "#a855f7" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "ember";

export const THEME_STORAGE_KEY = "portfolio-theme";

export const THEME_IDS: readonly ThemeId[] = THEMES.map((t) => t.id);

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && (THEME_IDS as readonly string[]).includes(value);
}

/**
 * Runs synchronously in <head> during HTML parsing, so the saved palette is
 * on <html> before the first paint - no flash of the default theme.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});if(t&&${JSON.stringify(
  THEME_IDS
)}.indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
