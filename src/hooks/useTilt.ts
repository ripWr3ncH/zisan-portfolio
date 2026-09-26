"use client";

import { useEffect, useRef } from "react";

interface TiltOptions {
  /** Maximum rotation (deg) when the pointer reaches an edge. */
  max?: number;
  /** Perspective (px) baked into the transform. */
  perspective?: number;
  /** Scale applied while hovered. */
  scale?: number;
  /** Upward lift (px) applied while hovered. */
  lift?: number;
}

/**
 * Spring-smoothed 3D tilt that follows the pointer.
 *
 * Besides the transform, it exposes `--tilt-x`, `--tilt-y` (-0.5 → 0.5) and
 * `--tilt-h` (0 → 1 hover strength) as CSS variables so children can build
 * depth layers and glare (see `.tilt-glare` / `.tilt-layer` in globals.css).
 * Disabled for touch devices and users who prefer reduced motion.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 6,
  perspective = 800,
  scale = 1.02,
  lift = 0,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const target = { x: 0, y: 0, h: 0 };
    const cur = { x: 0, y: 0, h: 0 };
    let rect: DOMRect | null = null;
    let raf = 0;

    const reset = () => {
      el.style.transform = "";
      el.style.transition = "";
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
      el.style.removeProperty("--tilt-h");
    };

    const render = () => {
      cur.x += (target.x - cur.x) * 0.14;
      cur.y += (target.y - cur.y) * 0.14;
      cur.h += (target.h - cur.h) * 0.12;

      const settled =
        target.h === 0 &&
        Math.abs(cur.x) < 0.001 &&
        Math.abs(cur.y) < 0.001 &&
        cur.h < 0.002;
      if (settled) {
        raf = 0;
        reset();
        return;
      }

      const p = perspective ? `perspective(${perspective}px) ` : "";
      el.style.transform =
        `${p}rotateX(${(-cur.y * max * 2).toFixed(3)}deg) rotateY(${(cur.x * max * 2).toFixed(3)}deg) ` +
        `translate3d(0, ${(-lift * cur.h).toFixed(2)}px, 0) scale(${(1 + (scale - 1) * cur.h).toFixed(4)})`;
      el.style.setProperty("--tilt-x", cur.x.toFixed(4));
      el.style.setProperty("--tilt-y", cur.y.toFixed(4));
      el.style.setProperty("--tilt-h", cur.h.toFixed(4));
      raf = requestAnimationFrame(render);
    };

    const start = () => {
      // Transform is driven per-frame here, so drop any CSS transform
      // transition while keeping the hover colour/shadow transitions.
      el.style.transition =
        "border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.7s ease, filter 0.7s ease";
      if (!raf) raf = requestAnimationFrame(render);
    };

    const onEnter = () => {
      rect = el.getBoundingClientRect();
    };
    const onMove = (e: PointerEvent) => {
      if (!rect) rect = el.getBoundingClientRect();
      target.x = Math.min(0.5, Math.max(-0.5, (e.clientX - rect.left) / rect.width - 0.5));
      target.y = Math.min(0.5, Math.max(-0.5, (e.clientY - rect.top) / rect.height - 0.5));
      target.h = 1;
      start();
    };
    const onLeave = () => {
      rect = null;
      target.x = target.y = target.h = 0;
      start();
    };

    const onScroll = () => {
      if (rect) rect = el.getBoundingClientRect();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      reset();
    };
  }, [max, perspective, scale, lift]);

  return ref;
}
