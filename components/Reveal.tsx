"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds .in to .reveal elements as they enter the viewport. Content stays
// visible without JS because the hidden state only applies under html.js.
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
