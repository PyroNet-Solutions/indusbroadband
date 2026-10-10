"use client";

import { useEffect, useRef } from "react";

// Hero backdrop: fiber strands flowing across the screen with light pulses
// travelling along them toward glowing network nodes. Plain 2D canvas, no
// dependencies. Decorative only: hidden from assistive tech, pauses off-screen
// and when the tab is hidden, and draws a single still frame for reduced motion.
type Strand = { y0: number; amp: number; freq: number; phase: number; w: number; hue: number };
type Pulse = { s: number; t: number; v: number };

export function FiberField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let mx = 0.5, my = 0.5, tmx = 0.5, tmy = 0.5;
    let strands: Strand[] = [];
    let pulses: Pulse[] = [];

    const isDark = () => document.documentElement.dataset.theme === "dark";

    const build = () => {
      const n = w < 700 ? 9 : 16;
      strands = Array.from({ length: n }, (_, i) => ({
        y0: 0.15 + (i / n) * 0.8,
        amp: 0.04 + Math.random() * 0.1,
        freq: 0.8 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        w: 0.6 + Math.random() * 1.4,
        hue: Math.random(),
      }));
      pulses = Array.from({ length: n * 2 }, () => ({ s: Math.floor(Math.random() * n), t: Math.random(), v: 0.0012 + Math.random() * 0.003 }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    // Strands sweep from lower-left toward a convergence point on the right.
    const point = (s: Strand, t: number, time: number) => {
      const cx = 0.78 + (mx - 0.5) * 0.06, cy = 0.42 + (my - 0.5) * 0.08;
      const x = -0.05 + t * (cx + 0.05);
      const ease = t * t * (3 - 2 * t);
      const yBase = s.y0 + (cy - s.y0) * ease;
      const wave = Math.sin(t * s.freq * Math.PI * 2 + s.phase + time * 0.0004) * s.amp * (1 - ease);
      return [x * w, (yBase + wave) * h] as const;
    };

    const draw = (time: number) => {
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      const steps = 70;

      for (const s of strands) {
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) {
          const [x, y] = point(s, i / steps, time);
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = dark ? `rgba(255,${110 + s.hue * 60},60,0.16)` : `rgba(11,31,59,0.10)`;
        ctx.lineWidth = s.w;
        ctx.stroke();
      }

      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (const p of pulses) {
        if (!reduce) { p.t += p.v; if (p.t > 1) { p.t = 0; p.s = Math.floor(Math.random() * strands.length); } }
        const s = strands[p.s];
        if (!s) continue;
        for (let k = 0; k < 14; k++) {
          const tt = p.t - k * 0.006;
          if (tt < 0) break;
          const [x, y] = point(s, tt, time);
          const a = (1 - k / 14) * (dark ? 0.9 : 0.75);
          ctx.fillStyle = k < 2 ? `rgba(255,220,180,${a})` : `rgba(255,${80 + k * 6},40,${a * 0.6})`;
          ctx.beginPath(); ctx.arc(x, y, Math.max(0.6, 2.4 - k * 0.14), 0, Math.PI * 2); ctx.fill();
        }
      }

      // Convergence node
      const [nx, ny] = point(strands[0], 1, time);
      const r = 90 + Math.sin(time * 0.002) * 8;
      const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, r);
      g.addColorStop(0, "rgba(255,150,60,0.55)"); g.addColorStop(0.3, "rgba(255,70,40,0.18)"); g.addColorStop(1, "rgba(255,60,40,0)");
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(nx, ny, 4, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time: number) => {
      draw(time);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => { cancelAnimationFrame(raf); if (reduce) draw(0); else raf = requestAnimationFrame(loop); };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else cancelAnimationFrame(raf); });
    const onMove = (e: PointerEvent) => { tmx = e.clientX / window.innerWidth; tmy = e.clientY / window.innerHeight; };
    const onVis = () => { if (!document.hidden && visible) start(); };
    const mo = new MutationObserver(() => { if (reduce) draw(0); });

    resize(); start();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
