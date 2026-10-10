"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

type Theme = "light" | "dark";

// The theme lives on <html data-theme>, set before paint by the layout script.
const subscribe = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);

  const toggle = () => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch { /* storage blocked */ }
  };

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        {theme === "dark" ? (
          <><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>
        ) : (
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [openPath, setOpenPath] = useState(path);
  // Close the mobile menu after navigation (render-time reset, no effect needed).
  if (openPath !== path) { setOpenPath(path); setOpen(false); }
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link href="/" aria-label="Indus Broadband home"><Logo /></Link>
        <nav className="nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path === n.href ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="hdr-act">
          <ThemeToggle />
          <Link className="btn btn-primary" href="/contact/">Get Connected</Link>
          <button type="button" className="icon-btn menu-btn" aria-expanded={open} aria-controls="mnav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h10" />}
            </svg>
          </button>
        </div>
      </div>
      <nav id="mnav" className="mnav" data-open={open} aria-label="Mobile">
        {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        <Link href="/contact/">Contact</Link>
        <Link className="btn btn-primary" href="/contact/">Get Connected</Link>
      </nav>
    </header>
  );
}
