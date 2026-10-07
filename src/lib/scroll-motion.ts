"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const desktopMotion = "(min-width: 901px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)";

/** Scope animations to their owner and measure only after the local fonts settle. */
export function setupScrollMotion(root: HTMLElement, setup: () => void | (() => void), query = "(prefers-reduced-motion: no-preference)") {
  const media = gsap.matchMedia();
  let disposed = false;
  void document.fonts.ready.then(() => {
    if (disposed) return;
    media.add(query, setup, root);
    ScrollTrigger.refresh();
  });
  return () => { disposed = true; media.revert(); };
}
