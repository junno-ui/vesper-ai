"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap, setupScrollMotion, desktopMotion } from "@/lib/scroll-motion";
import "./ScrollExpand.css";

interface ScrollExpandProps {
  src: string;
  alt?: string;
  title: string;
  children?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  scrollDistance?: number;
  enabled?: boolean;
}

/** Window-scroll adaptation of the supplied React Bits media expansion. */
export default function ScrollExpand({ src, alt = "", title, children, startWidth = 64, startHeight = 65, startRadius = 24, scrollDistance = 1, enabled = true }: ScrollExpandProps) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !enabled) return;
    return setupScrollMotion(element, () => {
      element.dataset.expandEnabled = "true";
      const distance = Math.max(.1, scrollDistance);
      element.style.setProperty("--expand-distance", String(distance));
      const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top top", end: () => `+=${window.innerHeight * distance}`, scrub: true, invalidateOnRefresh: true } });
      timeline.fromTo(element.querySelector(".expand-media"), { clipPath: `inset(${(100 - startHeight) / 2}% ${(100 - startWidth) / 2}% round ${startRadius}px)` }, { clipPath: "inset(0% 0% round 0px)", ease: "none" }, 0)
        .fromTo(element.querySelector("img"), { scale: 1.2 }, { scale: 1, ease: "none" }, 0);
      return () => { delete element.dataset.expandEnabled; element.style.removeProperty("--expand-distance"); };
    }, desktopMotion);
  }, [enabled, startWidth, startHeight, startRadius, scrollDistance]);
  return <section className="scroll-expand" ref={root} aria-label={title}>
    <div className="expand-stage">
      <div className="expand-media"><Image src={src} alt={alt} fill sizes="100vw" quality={85} /></div>
      <div className="expand-copy"><h2>{title}</h2>{children}</div>
    </div>
  </section>;
}
