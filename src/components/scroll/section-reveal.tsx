"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  type?: "fade" | "clip" | "slide" | "parallax";
  className?: string;
  delay?: number;
}

export function SectionReveal({
  children,
  type = "fade",
  className,
  delay = 0,
}: SectionRevealProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    fade: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    clip: {
      hidden: { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
      visible: { clipPath: "circle(100% at 50% 50%)", opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0 },
    },
    parallax: {
      hidden: { opacity: 0, y: 100, scale: 0.92 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
  };

  return (
    // The observed element must stay unclipped. When the clip variant started
    // at circle(0%) on the observed node itself, the browser measured an empty
    // intersection rect, the reveal never fired, and the section stayed
    // invisible for good. The outer node only tracks the viewport; the inner
    // node does the animating.
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        variants={variants[type]}
        transition={{
          duration: type === "clip" ? 1.0 : 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
