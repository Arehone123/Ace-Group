const THEME_STORAGE_KEY = "ace-theme";

export function getPreferredTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function persistTheme(theme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}
