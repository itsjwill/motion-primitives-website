"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useRef,
  useCallback,
  type ReactNode,
  type ReactElement,
  type CSSProperties,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TooltipProps {
  children: ReactElement;
  content: ReactNode;
  className?: string;
  /** Tooltip placement */
  side?: "top" | "bottom" | "left" | "right";
  /** Animation style */
  variant?: "spring" | "fade" | "scale" | "blur";
  /** Delay before showing (ms) */
  delayMs?: number;
  /** Follow cursor position */
  followCursor?: boolean;
  /** Custom offset from trigger */
  offset?: number;
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const variants = {
  spring: {
    initial: (side: string) => ({
      opacity: 0,
      scale: 0.8,
      ...(side === "top" && { y: 8 }),
      ...(side === "bottom" && { y: -8 }),
      ...(side === "left" && { x: 8 }),
      ...(side === "right" && { x: -8 }),
    }),
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    transition: { type: "spring", stiffness: 500, damping: 25, mass: 0.5 },
  },
  fade: {
    initial: () => ({ opacity: 0 }),
    animate: { opacity: 1 },
    transition: { duration: 0.15 },
  },
  scale: {
    initial: () => ({ opacity: 0, scale: 0.5 }),
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 400, damping: 20 },
  },
  blur: {
    initial: () => ({ opacity: 0, filter: "blur(4px)", scale: 0.95 }),
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
};

// ─── Position Logic ──────────────────────────────────────────────────────────

function getPositionStyle(
  side: string,
  offset: number
): CSSProperties {
  switch (side) {
    case "top":
      return {
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginBottom: offset,
      };
    case "bottom":
      return {
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        marginTop: offset,
      };
    case "left":
      return {
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: offset,
      };
    case "right":
      return {
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginLeft: offset,
      };
    default:
      return {};
  }
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export function Tooltip({
  children,
  content,
  className,
  side = "top",
  variant = "spring",
  delayMs = 200,
  followCursor = false,
  offset = 8,
}: TooltipProps) {
  const [show, setShow] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => setShow(true), delayMs);
  }, [delayMs]);

  const handleLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(false);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (followCursor && triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [followCursor]
  );

  const v = variants[variant];

  return (
    <div
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            role="tooltip"
            initial={v.initial(side)}
            animate={v.animate}
            exit={v.initial(side)}
            transition={v.transition}
            style={
              followCursor
                ? {
                    position: "absolute",
                    left: cursorPos.x,
                    top: cursorPos.y - 30,
                    pointerEvents: "none",
                  }
                : {
                    position: "absolute",
                    ...getPositionStyle(side, offset),
                    pointerEvents: "none",
                  }
            }
            className={cn(
              "z-50 whitespace-nowrap rounded-lg border border-border/50 bg-surface/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-xl",
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tooltip Group ───────────────────────────────────────────────────────────

export function TooltipGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>{children}</div>
  );
}
