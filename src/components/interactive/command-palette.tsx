"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
  group?: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  items: CommandItem[];
  open: boolean;
  onClose: () => void;
  placeholder?: string;
  className?: string;
  /** Animation variant */
  variant?: "spring" | "fade" | "scale";
  /** Empty state message */
  emptyMessage?: string;
}

// ─── Command Palette ─────────────────────────────────────────────────────────

export function CommandPalette({
  items,
  open,
  onClose,
  placeholder = "Type a command or search...",
  className,
  variant = "spring",
  emptyMessage = "No results found.",
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = items.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.keywords?.some((k) => k.toLowerCase().includes(q)) ||
      item.group?.toLowerCase().includes(q)
    );
  });

  // Group items
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    const group = item.group || "";
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (flatFiltered[activeIndex]) {
            flatFiltered[activeIndex].onSelect();
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [flatFiltered, activeIndex, onClose]
  );

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const variants = {
    spring: {
      initial: { opacity: 0, scale: 0.95, y: -20 },
      animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 25 } },
      exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 22 } },
      exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
    },
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            {...variants[variant]}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-xl border border-border/50 bg-surface/95 shadow-2xl backdrop-blur-xl overflow-hidden",
              className
            )}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-border/30 px-4">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground shrink-0">
                <circle cx="8" cy="8" r="5.5" />
                <path d="M12 12l4 4" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2">
              {flatFiltered.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group}>
                    {group && (
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {group}
                      </div>
                    )}
                    {groupItems.map((item) => {
                      flatIndex++;
                      const idx = flatIndex;
                      return (
                        <motion.button
                          key={item.id}
                          data-index={idx}
                          onClick={() => {
                            item.onSelect();
                            onClose();
                          }}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                            idx === activeIndex
                              ? "bg-primary/10 text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          )}
                          layout
                          transition={{ duration: 0.15 }}
                        >
                          {item.icon && (
                            <span className="shrink-0 text-muted-foreground">
                              {item.icon}
                            </span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{item.label}</div>
                            {item.description && (
                              <div className="text-xs text-muted-foreground truncate">
                                {item.description}
                              </div>
                            )}
                          </div>
                          {item.shortcut && (
                            <kbd className="shrink-0 rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {item.shortcut}
                            </kbd>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/30 px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/50 bg-muted/50 px-1 py-0.5">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border/50 bg-muted/50 px-1 py-0.5">↵</kbd>
                  Select
                </span>
              </div>
              <span>{flatFiltered.length} results</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ─── Hook for Cmd+K ──────────────────────────────────────────────────────────

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen, onClose: () => setOpen(false) };
}
