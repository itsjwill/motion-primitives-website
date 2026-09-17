"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type ToastType = "default" | "success" | "error" | "warning" | "info";
type ToastPosition =
  | "top-right"
  | "top-left"
  | "top-center"
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; onClick: () => void };
}

interface ToastContextType {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const icons: Record<ToastType, ReactNode> = {
  default: null,
  success: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" />
      <path d="M5.5 9.5l2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" />
    </svg>
  ),
  error: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" className="text-red-500" />
      <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-red-500" />
    </svg>
  ),
  warning: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L1.5 16h15L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="text-amber-500" />
      <path d="M9 7v4M9 13v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-amber-500" />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" className="text-blue-500" />
      <path d="M9 8v5M9 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-blue-500" />
    </svg>
  ),
};

// ─── Variants ────────────────────────────────────────────────────────────────

const positionClasses: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

const slideDirection = (position: ToastPosition) => {
  if (position.includes("right")) return { x: 100, opacity: 0 };
  if (position.includes("left")) return { x: -100, opacity: 0 };
  if (position.includes("top")) return { y: -50, opacity: 0 };
  return { y: 50, opacity: 0 };
};

// ─── Toast Provider ──────────────────────────────────────────────────────────

export function ToastProvider({
  children,
  position = "bottom-right",
  maxToasts = 5,
}: {
  children: ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = Math.random().toString(36).slice(2, 9);
      const newToast: Toast = {
        id,
        title: options.title,
        description: options.description,
        type: options.type || "default",
        duration: options.duration ?? 4000,
        action: options.action,
      };

      setToasts((prev) => [...prev.slice(-(maxToasts - 1)), newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => dismiss(id), newToast.duration);
      }

      return id;
    },
    [dismiss, maxToasts]
  );

  const isBottom = position.includes("bottom");

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      <div
        className={cn(
          "fixed z-[100] flex flex-col gap-2 pointer-events-none",
          positionClasses[position]
        )}
      >
        <AnimatePresence mode="popLayout">
          {(isBottom ? [...toasts].reverse() : toasts).map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={slideDirection(position)}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.15 },
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8,
              }}
              className={cn(
                "pointer-events-auto w-[360px] rounded-xl border border-border/50 bg-surface/95 px-4 py-3 shadow-lg backdrop-blur-xl",
                "flex items-start gap-3"
              )}
            >
              {icons[t.type] && (
                <span className="mt-0.5 shrink-0">{icons[t.type]}</span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {t.title}
                </p>
                {t.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.description}
                  </p>
                )}
                {t.action && (
                  <button
                    onClick={t.action.onClick}
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    {t.action.label}
                  </button>
                )}
              </div>
              <motion.button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Dismiss"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
