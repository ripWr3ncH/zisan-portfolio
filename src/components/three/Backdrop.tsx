"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/ThemeProvider";

// three.js is loaded after hydration so it never blocks first paint.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function Backdrop() {
  const { theme } = useTheme();

  // Cursor-following light for `.spotlight` cards, via one delegated listener.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let last: PointerEvent | null = null;
    const update = () => {
      raf = 0;
      if (!last) return;
      const el = (last.target as Element | null)?.closest?.<HTMLElement>(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${last.clientX - r.left}px`);
      el.style.setProperty("--my", `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(update);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <Scene theme={theme} />;
}
