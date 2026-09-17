"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  /** Size preset */
  size?: "sm" | "md" | "lg";
  /** Visual variant */
  variant?: "default" | "ios" | "pill" | "icon";
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom on/off icons */
  icons?: { on?: React.ReactNode; off?: React.ReactNode };
}

// ─── Size Config ─────────────────────────────────────────────────────────────

const sizes = {
  sm: { track: "w-8 h-4", thumb: "w-3.5 h-3.5", translate: 14 },
  md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: 20 },
  lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: 28 },
};

// ─── Switch ──────────────────────────────────────────────────────────────────

export function Switch({
  checked,
  onChange,
  className,
  size = "md",
  variant = "default",
  label,
  disabled = false,
  icons,
}: SwitchProps) {
  const s = sizes[size];

  const trackColors = {
    default: checked ? "bg-primary" : "bg-muted",
    ios: checked ? "bg-emerald-500" : "bg-muted",
    pill: checked
      ? "bg-gradient-to-r from-primary to-accent"
      : "bg-muted",
    icon: checked ? "bg-primary" : "bg-muted",
  };

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 select-none",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
    >
      <button
        role="switch"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full p-0.5 transition-colors duration-200",
          s.track,
          trackColors[variant]
        )}
      >
        <motion.span
          className={cn(
            "block rounded-full bg-white shadow-sm",
            s.thumb,
            variant === "ios" && "shadow-md"
          )}
          animate={{
            x: checked ? s.translate : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            mass: 0.6,
          }}
        >
          {/* Icons inside thumb */}
          {icons && (
            <span className="flex items-center justify-center w-full h-full text-[8px]">
              {checked ? icons.on : icons.off}
            </span>
          )}
        </motion.span>

        {/* Track icons (icon variant) */}
        {variant === "icon" && (
          <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
            <motion.span
              animate={{ opacity: checked ? 1 : 0.3 }}
              className="text-[10px] text-white"
            >
              ✓
            </motion.span>
            <motion.span
              animate={{ opacity: checked ? 0.3 : 1 }}
              className="text-[10px] text-muted-foreground"
            >
              ✕
            </motion.span>
          </div>
        )}
      </button>
      {label && (
        <span className="text-sm text-foreground">{label}</span>
      )}
    </label>
  );
}

// ─── Toggle Group ────────────────────────────────────────────────────────────

interface ToggleGroupProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ToggleGroup({
  options,
  value,
  onChange,
  className,
}: ToggleGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg bg-muted p-1 gap-0.5",
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            value === option
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === option && (
            <motion.div
              layoutId="toggle-active"
              className="absolute inset-0 rounded-md bg-surface shadow-sm border border-border/30"
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}
          <span className="relative z-10">{option}</span>
        </button>
      ))}
    </div>
  );
}
