"use client";

import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  value: number;
  className?: string;
  /** Number formatting */
  format?: "number" | "currency" | "percent" | "compact";
  /** Currency symbol (for currency format) */
  currency?: string;
  /** Decimal places */
  decimals?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Prefix text */
  prefix?: string;
  /** Suffix text */
  suffix?: string;
  /** Animate when in view */
  animateOnView?: boolean;
  /** Spring configuration */
  springConfig?: { stiffness: number; damping: number; mass?: number };
}

interface StatCardProps {
  value: number;
  label: string;
  className?: string;
  format?: "number" | "currency" | "percent" | "compact";
  prefix?: string;
  suffix?: string;
  /** Trend indicator */
  trend?: { value: number; label?: string };
  /** Icon */
  icon?: React.ReactNode;
}

// ─── Formatters ──────────────────────────────────────────────────────────────

function formatValue(
  val: number,
  format: string,
  currency: string,
  decimals: number
): string {
  switch (format) {
    case "currency":
      return `${currency}${val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}`;
    case "percent":
      return `${val.toFixed(decimals)}%`;
    case "compact":
      if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M`;
      if (val >= 1_000) return `${(val / 1_000).toFixed(1)}K`;
      return val.toFixed(decimals);
    default:
      return val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
  }
}

// ─── Animated Counter ────────────────────────────────────────────────────────

export function AnimatedCounter({
  value,
  className,
  format = "number",
  currency = "$",
  decimals = 0,
  prefix = "",
  suffix = "",
  animateOnView = true,
  springConfig = { stiffness: 50, damping: 20, mass: 1 },
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const springValue = useSpring(0, springConfig);
  const display = useTransform(springValue, (v) =>
    formatValue(v, format, currency, decimals)
  );

  useEffect(() => {
    if (animateOnView) {
      if (isInView) springValue.set(value);
    } else {
      springValue.set(value);
    }
  }, [value, isInView, animateOnView, springValue]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

export function StatCard({
  value,
  label,
  className,
  format = "number",
  prefix,
  suffix,
  trend,
  icon,
}: StatCardProps) {
  const isPositive = trend ? trend.value >= 0 : true;

  return (
    <motion.div
      className={cn(
        "rounded-xl border border-border/30 bg-surface/80 p-5",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </div>

      <div className="text-3xl font-bold text-foreground">
        <AnimatedCounter
          value={value}
          format={format}
          prefix={prefix}
          suffix={suffix}
        />
      </div>

      {trend && (
        <div className="mt-2 flex items-center gap-1.5">
          <motion.span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              isPositive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-red-500/10 text-red-500"
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isPositive ? "" : "rotate-180"}
            >
              <path d="M6 9V3M3.5 5.5L6 3l2.5 2.5" />
            </svg>
            {Math.abs(trend.value)}%
          </motion.span>
          {trend.label && (
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
