"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
  /** Animation style */
  variant?: "shimmer" | "pulse" | "wave" | "glow";
  /** Shape preset */
  shape?: "rectangle" | "circle" | "text" | "avatar" | "button" | "card";
  /** Width (any CSS value) */
  width?: string | number;
  /** Height (any CSS value) */
  height?: string | number;
  /** Number of text lines to render */
  lines?: number;
  /** Respect reduced motion */
  reducedMotion?: boolean;
}

interface SkeletonGroupProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between items */
  stagger?: number;
  /** Show skeleton while loading */
  loading?: boolean;
  /** Content to show when loaded */
  loaded?: ReactNode;
}

// ─── Shape Presets ───────────────────────────────────────────────────────────

const shapeClasses = {
  rectangle: "rounded-lg",
  circle: "rounded-full aspect-square",
  text: "rounded h-4",
  avatar: "rounded-full w-10 h-10",
  button: "rounded-lg h-10 w-24",
  card: "rounded-xl h-48",
};

// ─── Animation Styles ────────────────────────────────────────────────────────

const variantClasses = {
  shimmer: "bg-muted relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
  pulse: "",
  wave: "bg-muted relative overflow-hidden",
  glow: "bg-muted relative overflow-hidden",
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

export function Skeleton({
  className,
  variant = "shimmer",
  shape = "rectangle",
  width,
  height,
  lines,
  reducedMotion = false,
}: SkeletonProps) {
  if (lines && lines > 1) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant={variant}
            shape="text"
            width={i === lines - 1 ? "60%" : "100%"}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    );
  }

  const style = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
  };

  if (variant === "pulse") {
    return (
      <motion.div
        animate={
          reducedMotion
            ? {}
            : { opacity: [1, 0.4, 1] }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "bg-muted",
          shapeClasses[shape],
          className
        )}
        style={style}
      />
    );
  }

  if (variant === "wave") {
    return (
      <div
        className={cn(shapeClasses[shape], "bg-muted relative overflow-hidden", className)}
        style={style}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
          animate={reducedMotion ? {} : { x: ["-100%", "100%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <motion.div
        className={cn(
          "bg-muted",
          shapeClasses[shape],
          className
        )}
        style={style}
        animate={
          reducedMotion
            ? {}
            : {
                boxShadow: [
                  "0 0 0 0 hsl(var(--primary) / 0)",
                  "0 0 20px 2px hsl(var(--primary) / 0.15)",
                  "0 0 0 0 hsl(var(--primary) / 0)",
                ],
              }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
    );
  }

  // shimmer (default) — uses CSS animation from tailwind config
  return (
    <div
      className={cn(
        variantClasses.shimmer,
        shapeClasses[shape],
        className
      )}
      style={style}
          />
  );
}

// ─── Skeleton Group ──────────────────────────────────────────────────────────

export function SkeletonGroup({
  children,
  className,
  stagger = 0.1,
  loading = true,
  loaded,
}: SkeletonGroupProps) {
  if (!loading && loaded) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {loaded}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Skeleton Presets ────────────────────────────────────────────────────────

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 rounded-xl border border-border/30 p-6", className)}>
      <Skeleton shape="rectangle" height={160} variant="wave" />
      <Skeleton shape="text" width="70%" />
      <Skeleton lines={3} variant="pulse" />
      <div className="flex gap-3">
        <Skeleton shape="button" />
        <Skeleton shape="button" width={80} />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Skeleton shape="avatar" variant="pulse" />
      <div className="space-y-2 flex-1">
        <Skeleton shape="text" width="40%" />
        <Skeleton shape="text" width="60%" />
      </div>
    </div>
  );
}
