"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onEnterHoverable = () => {
      cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px) scale(2)`;
    };

    const onLeaveHoverable = () => {
      cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px) scale(1)`;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    let rafId: number;
    const animate = () => {
      curX = lerp(curX, mouseX, 0.12);
      curY = lerp(curY, mouseY, 0.12);
      cursor.style.transform = `translate(${curX - 20}px, ${curY - 20}px) scale(${cursor.dataset.scale || 1})`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const hoverables = document.querySelectorAll("a, button, [data-cursor]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHoverable);
      el.addEventListener("mouseleave", onLeaveHoverable);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable);
        el.removeEventListener("mouseleave", onLeaveHoverable);
        el.addEventListener("mouseenter", onEnterHoverable);
        el.addEventListener("mouseleave", onLeaveHoverable);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#c9a86c] pointer-events-none z-[9999] transition-transform duration-300 ease-out mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c9a86c] pointer-events-none z-[9999]"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
