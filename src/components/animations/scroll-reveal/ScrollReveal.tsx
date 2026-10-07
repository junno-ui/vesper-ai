"use client";

// Adapted from React Bits; scoped cleanup replaces the original global trigger cleanup.
import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap, setupScrollMotion } from "@/lib/scroll-motion";
import "./ScrollReveal.css";

interface ScrollRevealProps {
  children: ReactNode;
  as?: "h2" | "p" | "blockquote";
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

export default function ScrollReveal({
  children,
  as: Tag = "p",
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 0.6,
  baseRotation = 0,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom center",
}: ScrollRevealProps) {
  const root = useRef<HTMLHeadingElement & HTMLParagraphElement & HTMLQuoteElement>(null);
  const text = typeof children === "string" ? children : undefined;
  useEffect(() => {
    if (!root.current || !text) return;
    const element = root.current;
    return setupScrollMotion(element, () => {
      const trigger = {
        trigger: element,
        scroller: scrollContainerRef?.current ?? undefined,
        scrub: true,
        invalidateOnRefresh: true,
      };
      if (baseRotation)
        gsap.fromTo(
          element,
          { rotate: baseRotation, transformOrigin: "0% 50%" },
          {
            rotate: 0,
            ease: "none",
            scrollTrigger: { ...trigger, start: "top bottom", end: rotationEnd },
          },
        );
      const words = element.querySelectorAll<HTMLElement>(".scroll-reveal-word");
      const originalStyles = Array.from(words, (word) => word.style.cssText);
      gsap.set(words, {
        opacity: baseOpacity,
        ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
      });
      gsap.to(words, {
        opacity: 1,
        ...(enableBlur ? { filter: "blur(0px)" } : {}),
        ease: "none",
        stagger: 0.05,
        scrollTrigger: { ...trigger, start: "top bottom-=15%", end: wordAnimationEnd },
      });
      return () =>
        words.forEach((word, index) => {
          word.style.cssText = originalStyles[index];
        });
    });
  }, [
    text,
    scrollContainerRef,
    enableBlur,
    baseOpacity,
    baseRotation,
    blurStrength,
    rotationEnd,
    wordAnimationEnd,
  ]);
  return (
    <Tag ref={root} className={`scroll-reveal ${containerClassName}`}>
      {text && <span className="sr-only">{text}</span>}
      <span className={`scroll-reveal-text ${textClassName}`} aria-hidden={text ? true : undefined}>
        {text
          ? text.split(/(\s+)/).map((word, index) =>
              /^\s+$/.test(word) ? (
                word
              ) : (
                <span className="scroll-reveal-word" key={index}>
                  {word}
                </span>
              ),
            )
          : children}
      </span>
    </Tag>
  );
}
