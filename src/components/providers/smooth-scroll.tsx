"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/scroll-motion";

export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const tick = (seconds: number) => lenis?.raf(seconds * 1000);
    const destroy = () => {
      gsap.ticker.remove(tick);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      lenis = undefined;
    };
    const sync = () => {
      if (preference.matches || document.hidden || document.body.hasAttribute("data-scroll-locked")) {
        destroy();
      } else if (!lenis) {
        lenis = new Lenis({
          autoRaf: false,
          lerp: .085,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -112, duration: 1.1 },
          prevent: node => node.matches("textarea, [data-lenis-prevent]"),
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] });
    preference.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); preference.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); destroy(); };
  }, [pathname]);
  return null;
}
