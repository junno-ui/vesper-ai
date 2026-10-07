"use client";

// Adapted from the supplied React Bits source. See docs/licenses/react-bits.txt.
import { useEffect, useMemo, useRef } from "react";
import { gsap, setupScrollMotion } from "@/lib/scroll-motion";
import "./ScrollFloat.css";

/**
 * @param {{children: import('react').ReactNode, scrollContainerRef?: import('react').RefObject<HTMLElement | null>, containerClassName?: string, textClassName?: string, animationDuration?: number, ease?: string, scrollStart?: string, scrollEnd?: string, stagger?: number}} props
 */
export default function ScrollFloat({
  children, scrollContainerRef, containerClassName = "", textClassName = "",
  animationDuration = 1, ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%", scrollEnd = "bottom bottom-=40%", stagger = 0.03,
}) {
  const containerRef = useRef(null);
  const text = typeof children === "string" ? children : null;
  const splitText = useMemo(() => text === null ? children : text.split(/(\s+)/).map((word, index) =>
    /^\s+$/.test(word) ? word : <span className="scroll-float-word" key={index}>{Array.from(word).map((char, charIndex) => <span className="scroll-float-char" key={charIndex}>{char}</span>)}</span>
  ), [text, children]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !text) return;
    return setupScrollMotion(element, () => {
      gsap.fromTo(element.querySelectorAll(".scroll-float-char"),
        { opacity: 0, yPercent: 120, scaleY: 2.3, scaleX: 0.7, transformOrigin: "50% 0%" },
        { opacity: 1, yPercent: 0, scaleY: 1, scaleX: 1, duration: animationDuration, ease, stagger,
          scrollTrigger: { trigger: element, scroller: scrollContainerRef?.current ?? window, start: scrollStart, end: scrollEnd, scrub: true, invalidateOnRefresh: true } }
      );
    });
  }, [text, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
    {text !== null && <span className="sr-only">{text}</span>}
    <span className={`scroll-float-text ${textClassName}`} aria-hidden={text !== null ? true : undefined}>{splitText}</span>
  </h2>;
}
