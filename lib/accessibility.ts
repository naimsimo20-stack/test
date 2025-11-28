/**
 * Focus the main content region for keyboard users
 */
export function skipToMainContent() {
  const main = document.querySelector<HTMLElement>("main");

  if (main) {
    // Ensure focusability for users of skip links
    if (!main.hasAttribute("tabindex")) {
      main.setAttribute("tabindex", "-1");
    }

    main.focus({ preventScroll: true });
    main.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Announce screen reader messages (ARIA live region utility)
 */
let liveRegion: HTMLElement | null = null;

export function announceChange(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
  if (typeof document === "undefined") return;

  // Reuse an existing live region instead of creating many
  if (!liveRegion) {
    liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", priority);
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    document.body.appendChild(liveRegion);
  }

  // Update priority dynamically
  liveRegion.setAttribute("aria-live", priority);

  // Announce
  liveRegion.textContent = message;

  // Clear after short delay but keep node (better perf)
  setTimeout(() => {
    if (liveRegion) liveRegion.textContent = "";
  }, 1000);
}

/**
 * Check for high-contrast mode (OS accessibility setting)
 */
export function isHighContrast(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-contrast: more)").matches;
}

/**
 * Check for reduced motion (OS accessibility setting)
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.match
