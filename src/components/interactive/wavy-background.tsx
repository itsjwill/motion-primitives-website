"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface WavyBackgroundProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  blur?: number;
  speed?: "slow" | "medium" | "fast";
  waveOpacity?: number;
}

interface AnimatedGridPatternProps {
  className?: string;
  width?: number;
  height?: number;
  strokeDasharray?: number;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
}

interface DotPatternProps {
  className?: string;
  width?: number;
  height?: number;
  cx?: number;
  cy?: number;
  cr?: number;
}

// ─── WavyBackground ────────────────────────────────────────────────────────
// Animated gradient waves background

export function WavyBackground({
  children,
  className,
  containerClassName,
  colors,
  blur = 10,
  speed = "medium",
  waveOpacity = 0.5,
}: WavyBackgroundProps) {
  const speedMap = { slow: 10, medium: 6, fast: 3 };
  const duration = speedMap[speed];

  const defaultColors = [
    "hsl(var(--primary))",
    "hsl(var(--accent))",
    "hsl(var(--secondary))",
    "hsl(var(--primary) / 0.5)",
  ];

  const waveColors = colors || defaultColors;

  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden", containerClassName)}>
      {/* SVG Waves */}
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `blur(${blur}px)`, opacity: waveOpacity }}
      >
        {waveColors.map((color, i) => (
          <motion.path
            key={i}
            d={generateWavePath(i, waveColors.length)}
            fill={color}
            animate={{
              d: [
                generateWavePath(i, waveColors.length),
                generateWavePath(i + 0.5, waveColors.length),
                generateWavePath(i, waveColors.length),
              ],
            }}
            transition={{
              duration: duration + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}

function generateWavePath(offset: number, totalWaves: number): string {
  const yBase = 50 + (offset / totalWaves) * 30;
  const amplitude = 15 + offset * 3;
  return `M0,${yBase + Math.sin(offset) * amplitude} C25,${yBase - amplitude} 50,${yBase + amplitude} 75,${yBase} C87.5,${yBase - amplitude / 2} 100,${yBase + amplitude / 2} 100,${yBase} L100,100 L0,100 Z`;
}

// Deterministic pseudo-random so the server and client render the same grid.
// Math.random() here caused a hydration mismatch.
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// ─── AnimatedGridPattern ────────────────────────────────────────────────────
// Grid pattern with cells that light up in a fixed scatter

export function AnimatedGridPattern({
  className,
  width = 40,
  height = 40,
  strokeDasharray = 0,
  numSquares = 50,
  maxOpacity = 0.5,
  duration = 4,
}: AnimatedGridPatternProps) {
  const id = `grid-${useId().replace(/:/g, "")}`;

  const squares = Array.from({ length: numSquares }, (_, i) => ({
    id: i,
    x: Math.floor(seeded(i, 1) * 40) * width,
    y: Math.floor(seeded(i, 2) * 20) * height,
    delay: seeded(i, 3) * duration,
    repeatDelay: seeded(i, 4) * 2,
  }));

  return (
    <svg className={cn("absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray={strokeDasharray}
            className="text-border/30"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />

      {/* Animated glowing squares */}
      {squares.map((square) => (
        <motion.rect
          key={square.id}
          x={square.x}
          y={square.y}
          width={width - 1}
          height={height - 1}
          fill="currentColor"
          className="text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, maxOpacity, 0] }}
          transition={{
            duration,
            delay: square.delay,
            repeat: Infinity,
            repeatDelay: square.repeatDelay,
          }}
        />
      ))}
    </svg>
  );
}

// ─── DotPattern ─────────────────────────────────────────────────────────────
// Repeating dot pattern background

export function DotPattern({
  className,
  width = 16,
  height = 16,
  cx = 1,
  cy = 1,
  cr = 1,
}: DotPatternProps) {
  const id = `dot-${useId().replace(/:/g, "")}`;

  return (
    <svg className={cn("absolute inset-0 h-full w-full", className)}>
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" className="text-muted-foreground/20" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
