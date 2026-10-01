"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);
  const hovering = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label")
      ) {
        hovering.current = true;
      }
    };

    const handleOut = () => {
      hovering.current = false;
    };

    const handleLeave = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    let raf: number;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const scale = hovering.current ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = hovering.current
          ? "var(--accent-primary)"
          : "var(--accent-muted)";
      }

      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full opacity-0"
        style={{
          background: "var(--accent-primary)",
          boxShadow: "0 0 10px var(--accent-primary), 0 0 20px var(--accent-primary)",
          transition: "opacity 0.3s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-9 w-9 rounded-full border opacity-0"
        style={{
          borderColor: "var(--accent-muted)",
          transition: "opacity 0.3s, border-color 0.3s, transform 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}
