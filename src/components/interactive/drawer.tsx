"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import {
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  /** Which edge the drawer slides from */
  side?: "bottom" | "right" | "left" | "top";
  /** Enable drag-to-dismiss (bottom/top drawers) */
  dragToDismiss?: boolean;
  /** Snap points as percentages (bottom drawers only) */
  snapPoints?: number[];
}

interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Show a drag handle bar */
  showHandle?: boolean;
}

// ─── Animation Config ────────────────────────────────────────────────────────

const sideConfig = {
  bottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    drag: "y" as const,
    dragConstraints: { top: 0 },
    dismissThreshold: 100,
    classes: "inset-x-0 bottom-0 rounded-t-3xl max-h-[90vh]",
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    drag: "x" as const,
    dragConstraints: { left: 0 },
    dismissThreshold: 100,
    classes: "inset-y-0 right-0 w-full max-w-md rounded-l-2xl",
  },
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    drag: "x" as const,
    dragConstraints: { right: 0 },
    dismissThreshold: -100,
    classes: "inset-y-0 left-0 w-full max-w-md rounded-r-2xl",
  },
  top: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    drag: "y" as const,
    dragConstraints: { bottom: 0 },
    dismissThreshold: -100,
    classes: "inset-x-0 top-0 rounded-b-3xl max-h-[90vh]",
  },
};

// ─── Drawer ──────────────────────────────────────────────────────────────────

export function Drawer({
  open,
  onClose,
  children,
  className,
  overlayClassName,
  side = "bottom",
  dragToDismiss = true,
}: DrawerProps) {
  const config = sideConfig[side];
  const dragControls = useDragControls();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }
  }, [open, handleEscape]);

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number } }) => {
    const axis = side === "left" || side === "right" ? "x" : "y";
    const offset = info.offset[axis];
    const threshold = config.dismissThreshold;

    if (
      (threshold > 0 && offset > threshold) ||
      (threshold < 0 && offset < threshold)
    ) {
      onClose();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-0 bg-black/50 backdrop-blur-sm",
              overlayClassName
            )}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={config.initial}
            animate={config.animate}
            exit={config.exit}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
              mass: 0.8,
            }}
            drag={dragToDismiss ? config.drag : undefined}
            dragControls={dragControls}
            dragConstraints={config.dragConstraints}
            dragElastic={0.2}
            onDragEnd={dragToDismiss ? handleDragEnd : undefined}
            className={cn(
              "absolute z-10 border border-border/50 bg-surface/95 shadow-2xl backdrop-blur-xl overflow-y-auto",
              config.classes,
              className
            )}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Drawer Header ───────────────────────────────────────────────────────────

export function DrawerHeader({
  children,
  className,
  showHandle = true,
  ...props
}: DrawerHeaderProps) {
  return (
    <div className={cn("px-6 pt-4 pb-2", className)} {...props}>
      {showHandle && (
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" />
      )}
      {children}
    </div>
  );
}

// ─── Drawer Body ─────────────────────────────────────────────────────────────

export function DrawerBody({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("flex-1 px-6 py-4 overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
}

// ─── Drawer Footer ───────────────────────────────────────────────────────────

export function DrawerFooter({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-border/30 flex items-center justify-end gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
