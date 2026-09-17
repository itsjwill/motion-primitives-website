"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme, DIRECTION_META } from "@/lib/theme";
import { DirectionPicker } from "./direction-picker";

const LINKS = [
  { href: "#components", label: "Components" },
  { href: "#directions", label: "Directions" },
  { href: "https://github.com/itsjwill/motion-primitives-website", label: "Docs" },
];

export function SiteNav() {
  const { direction } = useTheme();
  const meta = DIRECTION_META[direction];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape closes the mobile sheet; body scroll stays locked while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4"
      >
        <div
          className={`
            mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl
            px-4 py-3 transition-all duration-500 md:px-5
            ${scrolled
              ? "border border-border/60 bg-background/70 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              : "border border-transparent bg-transparent"
            }
          `}
        >
          {/* Logo */}
          <a href="/" className="group flex shrink-0 items-center gap-2.5">
            <span
              className="h-6 w-6 rounded-md transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: meta.accent, boxShadow: `0 0 20px ${meta.accent}55` }}
            />
            <span className="font-heading text-base font-semibold tracking-tight md:text-lg">
              Motion Primitives
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative text-body-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                  style={{ backgroundColor: meta.accent }}
                />
              </a>
            ))}
          </nav>

          {/* Desktop direction picker */}
          <div className="hidden items-center gap-3 md:flex">
            <DirectionPicker variant="inline" />
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-border/60 bg-surface/60 text-foreground transition-colors hover:border-border md:hidden"
          >
            <span className="relative block h-3 w-4">
              <motion.span
                animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-0 block h-[2px] w-4 bg-current"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-[5px] block h-[2px] w-4 bg-current"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-[10px] block h-[2px] w-4 bg-current"
              />
            </span>
          </button>
        </div>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-2 max-w-6xl rounded-2xl border border-border/60 bg-background/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col divide-y divide-border/40">
                {LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-lg font-medium text-foreground/90 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <p className="mb-3 mt-5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Design direction
              </p>
              <DirectionPicker variant="inline" />
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
