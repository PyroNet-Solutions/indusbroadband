"use client";

import { useEffect, useRef } from "react";

// Hero backdrop: "the Indus", a river of light. Dozens of fiber-like currents
// flow left to right inside one meandering channel; the centre runs faster than
// the banks, like water, and light pulses drift downstream. Plain 2D canvas, no
// dependencies. Decorative only: hidden from assistive tech, pauses off-screen
// and when the tab is hidden, and draws one still frame for reduced motion.
type Current = { off: number; w: number; tone: number; wob: number };
type Pulse = { c: number; x: number; v: number };

export function FiberField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true, t0 = 0;
    let my = 0.5, tmy = 0.5;
    let currents: Current[] = [];
    let pulses: Pulse[] = [];

    const isDark = () => document.documentElement.dataset.theme === "dark";

    const build = () => {
      const n = w < 700 ? 22 : 38;
      currents = Array.from({ length: n }, (_, i) => ({
        off: (i / (n - 1)) * 2 - 1,                 // -1 bank .. +1 bank
        w: 0.5 + Math.random() * 1.3,
        tone: Math.random(),
        wob: Math.random() * Math.PI * 2,
      }));
      pulses = Array.from({ length: Math.round(n * 1.6) }, () => ({ c: Math.floor(Math.random() * n), x: Math.random(), v: 0 }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    // Channel centre-line and half-width at horizontal position x (0..1).
    const channel = (x: number, time: number) => {
      const s = time * 0.00012;
      const cy = 0.66 + (my - 0.5) * 0.05
        + Math.sin(x * 3.1 + s) * 0.09
        + Math.sin(x * 7.3 - s * 1.7) * 0.025;
      const half = 0.1 + Math.sin(x * 2.2 + 1.3) * 0.035 + x * 0.04; // widens downstream
      return [cy, half] as const;
    };

    const at = (c: Current, x: number, time: number) => {
      const [cy, half] = channel(x, time);
      const ripple = Math.sin(x * 22 + c.wob + time * 0.0016) * 0.004;
      return [x * w, (cy + c.off * half + ripple) * h] as const;
    };

    const draw = (time: number) => {
      my += (tmy - my) * 0.04;
      ctx.clearRect(0, 0, w, h);
      const dark = isDark();
      const steps = w < 700 ? 60 : 110;

      // Water body glow under the currents.
      ctx.beginPath();
      for (let i = 0; i <= steps; i++) { const x = i / steps; const [cy, half] = channel(x, time); ctx.lineTo(x * w, (cy - half * 1.15) * h); }
      for (let i = steps; i >= 0; i--) { const x = i / steps; const [cy, half] = channel(x, time); ctx.lineTo(x * w, (cy + half * 1.15) * h); }
      ctx.closePath();
      const body = ctx.createLinearGradient(0, 0, w, 0);
      body.addColorStop(0, dark ? "rgba(43,57,144,0.10)" : "rgba(37,170,225,0.05)");
      body.addColorStop(1, dark ? "rgba(37,170,225,0.18)" : "rgba(37,170,225,0.12)");
      ctx.fillStyle = body; ctx.fill();

      for (const c of currents) {
        ctx.beginPath();
        for (let i = 0; i <= steps; i++) { const [x, y] = at(c, i / steps, time); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
        const edge = Math.abs(c.off);
        ctx.strokeStyle = dark
          ? `rgba(${60 + c.tone * 50},${150 + c.tone * 50},235,${0.22 - edge * 0.1})`
          : `rgba(${43 - c.tone * 6},${57 + c.tone * 110},${144 + c.tone * 80},${0.2 - edge * 0.08})`;
        ctx.lineWidth = c.w;
        ctx.stroke();
      }

      // Light drifting downstream: faster mid-channel, slower at the banks.
      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (const p of pulses) {
        const c = currents[p.c];
        if (!c) continue;
        const speed = 0.0011 + (1 - Math.abs(c.off)) * 0.0024;
        if (!reduce) { p.x += speed; if (p.x > 1.05) { p.x = -0.05; p.c = Math.floor(Math.random() * currents.length); } }
        for (let k = 0; k < 16; k++) {
          const xx = p.x - k * 0.005;
          if (xx < 0) break;
          const [x, y] = at(c, xx, time);
          const a = (1 - k / 16) * (dark ? 0.85 : 0.6);
          ctx.fillStyle = k < 2 ? `rgba(220,245,255,${a})` : `rgba(37,${150 + k * 4},225,${a * 0.55})`;
          ctx.beginPath(); ctx.arc(x, y, Math.max(0.5, 2.2 - k * 0.12), 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time: number) => {
      draw(time - t0);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => { cancelAnimationFrame(raf); if (reduce) draw(0); else raf = requestAnimationFrame(loop); };

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else cancelAnimationFrame(raf); });
    const onMove = (e: PointerEvent) => { tmy = e.clientY / window.innerHeight; };
    const onVis = () => { if (!document.hidden && visible) start(); };
    const mo = new MutationObserver(() => { if (reduce) draw(0); });

    t0 = performance.now() - 20000;
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
