"use client";

// React Bits stack adapted to native scrolling; no second scroll controller is needed.
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, ScrollTrigger, setupScrollMotion, desktopMotion } from "@/lib/scroll-motion";
import "./ScrollStack.css";

export function ScrollStackItem({
  children,
  itemClassName = "",
}: {
  children: ReactNode;
  itemClassName?: string;
}) {
  return (
    <>
      <div className="scroll-stack-marker" aria-hidden="true" />
      <div className={`scroll-stack-item ${itemClassName}`}>
        <div className="scroll-stack-card">{children}</div>
      </div>
    </>
  );
}

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: number;
  baseScale?: number;
  onStackComplete?: () => void;
}

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 72,
  itemScale = 0.02,
  itemStackDistance = 20,
  stackPosition = 120,
  baseScale = 0.94,
  onStackComplete,
}: ScrollStackProps) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    return setupScrollMotion(element, () => {
      const items = Array.from(element.querySelectorAll<HTMLElement>(".scroll-stack-item"));
      const markers = element.querySelectorAll<HTMLElement>(".scroll-stack-marker");
      element.dataset.stackEnabled = "true";
      items.forEach((item, index) => {
        item.style.setProperty("--stack-index", String(index));
        const next = markers[index + 1];
        if (!next) return;
        gsap.to(item.querySelector(".scroll-stack-card"), {
          scale: Math.min(1, baseScale + index * itemScale),
          "--stack-shade": 0.18,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: `top ${stackPosition + (index + 1) * itemStackDistance}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
      if (items.length && onStackComplete)
        ScrollTrigger.create({
          trigger: markers[items.length - 1],
          start: `top ${stackPosition + (items.length - 1) * itemStackDistance}`,
          onEnter: onStackComplete,
        });
      return () => {
        delete element.dataset.stackEnabled;
        items.forEach((item) => item.style.removeProperty("--stack-index"));
      };
    }, desktopMotion);
  }, [itemScale, itemStackDistance, stackPosition, baseScale, onStackComplete]);
  return (
    <div
      ref={root}
      className={`scroll-stack ${className}`}
      style={
        {
          "--stack-gap": `${itemDistance}px`,
          "--stack-step": `${itemStackDistance}px`,
          "--stack-top": `${stackPosition}px`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
