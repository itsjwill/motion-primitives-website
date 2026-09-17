"use client";

import { cn } from "@/lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  /** Bar color — any Tailwind bg class */
  color?: string;
  /** Height preset */
  size?: "sm" | "md" | "lg";
  /** Show percentage label */
  showLabel?: boolean;
  /** Animation style */
  variant?: "spring" | "smooth" | "bounce";
  /** Glow effect on the bar */
  glow?: boolean;
  /** Striped animation */
  striped?: boolean;
}

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
  /** Visual style */
  variant?: "dots" | "line" | "pills";
  /** Step click handler */
  onStepClick?: (step: number) => void;
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  /** Show value in center */
  showValue?: boolean;
  /** Custom center content */
  children?: ReactNode;
}

// ─── Progress Bar ────────────────────────────────────────────────────────────

const sizeClasses = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

export function ProgressBar({
  value,
  max = 100,
  className,
  color = "bg-primary",
  size = "md",
  showLabel = false,
  variant = "spring",
  glow = false,
  striped = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const springConfig = {
    spring: { stiffness: 100, damping: 20, mass: 0.8 },
    smooth: { stiffness: 50, damping: 30, mass: 1 },
    bounce: { stiffness: 300, damping: 15, mass: 0.5 },
  };

  const springValue = useSpring(0, springConfig[variant]);
  const width = useTransform(springValue, (v) => `${v}%`);

  useEffect(() => {
    springValue.set(percentage);
  }, [percentage, springValue]);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-muted-foreground">Progress</span>
          <motion.span className="text-xs font-medium text-foreground tabular-nums">
            {Math.round(percentage)}%
          </motion.span>
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-muted overflow-hidden",
          sizeClasses[size]
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full relative",
            color,
            glow && "shadow-[0_0_12px_currentColor]",
            striped &&
              "bg-[length:1rem_1rem] bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] animate-[shimmer_1s_linear_infinite]"
          )}
          style={{ width }}
        />
      </div>
    </div>
  );
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

export function StepIndicator({
  steps,
  currentStep,
  className,
  variant = "dots",
  onStepClick,
}: StepIndicatorProps) {
  if (variant === "pills") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {steps.map((step, i) => (
          <motion.button
            key={i}
            onClick={() => onStepClick?.(i)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              i === currentStep
                ? "bg-primary text-primary-foreground"
                : i < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {step}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          {/* Step circle/dot */}
          <motion.button
            onClick={() => onStepClick?.(i)}
            className="relative flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={cn(
                "rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                variant === "dots" ? "w-3 h-3" : "w-8 h-8",
                i === currentStep
                  ? "bg-primary text-primary-foreground"
                  : i < currentStep
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              )}
              animate={{
                scale: i === currentStep ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {variant === "line" && (
                i < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7l3 3 5-5" />
                  </svg>
                ) : (
                  <span>{i + 1}</span>
                )
              )}
            </motion.div>
            <span className="absolute -bottom-6 text-[10px] text-muted-foreground whitespace-nowrap">
              {step}
            </span>
          </motion.button>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div className="relative w-12 sm:w-20 h-0.5 mx-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: i < currentStep ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Circular Progress ───────────────────────────────────────────────────────

export function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 6,
  className,
  color = "stroke-primary",
  showValue = true,
  children,
}: CircularProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const springValue = useSpring(circumference, {
    stiffness: 100,
    damping: 20,
  });

  useEffect(() => {
    springValue.set(circumference - (percentage / 100) * circumference);
  }, [percentage, circumference, springValue]);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={color}
          strokeDasharray={circumference}
          style={{ strokeDashoffset: springValue }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children || (showValue && (
          <span className="text-sm font-semibold tabular-nums">
            {Math.round(percentage)}%
          </span>
        ))}
      </div>
    </div>
  );
}
