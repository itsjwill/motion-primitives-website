"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  /** Animation style */
  variant?: "spring" | "scale" | "slide" | "blur" | "morph";
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on Escape key */
  closeOnEscape?: boolean;
  /** Max width preset */
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants: Record<string, Variants> = {
  spring: {
    hidden: { opacity: 0, scale: 0.8, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  },
  slide: {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: "100%",
      transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] },
    },
  },
  blur: {
    hidden: { opacity: 0, scale: 1.1, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(8px)",
      transition: { duration: 0.2 },
    },
  },
  morph: {
    hidden: { opacity: 0, borderRadius: "50%", scale: 0.3 },
    visible: {
      opacity: 1,
      borderRadius: "16px",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      borderRadius: "50%",
      scale: 0.3,
      transition: { duration: 0.3 },
    },
  },
};

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[90vw] max-h-[90vh]",
};

// ─── Modal ───────────────────────────────────────────────────────────────────

export function Modal({
  open,
  onClose,
  children,
  className,
  overlayClassName,
  variant = "spring",
  closeOnOverlay = true,
  closeOnEscape = true,
  size = "md",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) onClose();
    },
    [onClose, closeOnEscape]
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

  return (
    <AnimatePresence mode="wait">
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-0 bg-black/60 backdrop-blur-sm",
              overlayClassName
            )}
            onClick={closeOnOverlay ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            variants={modalVariants[variant]}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "relative z-10 w-full rounded-2xl border border-border/50 bg-surface/95 p-6 shadow-2xl backdrop-blur-xl",
              sizeMap[size],
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

// ─── Modal Header ────────────────────────────────────────────────────────────

export function ModalHeader({ children, className, ...props }: ModalHeaderProps) {
  return (
    <div
      className={cn("mb-4 flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Modal Footer ────────────────────────────────────────────────────────────

export function ModalFooter({ children, className, ...props }: ModalFooterProps) {
  return (
    <div
      className={cn("mt-6 flex items-center justify-end gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// ─── Modal Close Button ──────────────────────────────────────────────────────

export function ModalClose({
  onClose,
  className,
}: {
  onClose: () => void;
  className?: string;
}) {
  return (
    <motion.button
      onClick={onClose}
      className={cn(
        "rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className
      )}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Close"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M4 4l8 8M12 4l-8 8" />
      </svg>
    </motion.button>
  );
}
