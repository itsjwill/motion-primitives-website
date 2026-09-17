"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  useState,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface AccordionProps {
  children: ReactNode;
  className?: string;
  /** Allow multiple items open simultaneously */
  type?: "single" | "multiple";
  /** Default open item(s) */
  defaultValue?: string | string[];
  /** Controlled value */
  value?: string | string[];
  /** Controlled onChange */
  onValueChange?: (value: string | string[]) => void;
}

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
  className?: string;
  /** Disable this item */
  disabled?: boolean;
}

interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

interface AccordionContextType {
  type: "single" | "multiple";
  openItems: string[];
  toggle: (value: string) => void;
}

interface ItemContextType {
  value: string;
  isOpen: boolean;
  disabled: boolean;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AccordionContext = createContext<AccordionContextType>({
  type: "single",
  openItems: [],
  toggle: () => {},
});

const ItemContext = createContext<ItemContextType>({
  value: "",
  isOpen: false,
  disabled: false,
});

// ─── Accordion ───────────────────────────────────────────────────────────────

export function Accordion({
  children,
  className,
  type = "single",
  defaultValue,
  value: controlledValue,
  onValueChange,
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const openItems = controlledValue
    ? Array.isArray(controlledValue)
      ? controlledValue
      : [controlledValue]
    : internalOpen;

  const toggle = (itemValue: string) => {
    let next: string[];

    if (type === "single") {
      next = openItems.includes(itemValue) ? [] : [itemValue];
    } else {
      next = openItems.includes(itemValue)
        ? openItems.filter((v) => v !== itemValue)
        : [...openItems, itemValue];
    }

    if (onValueChange) {
      onValueChange(type === "single" ? next[0] ?? "" : next);
    } else {
      setInternalOpen(next);
    }
  };

  return (
    <AccordionContext.Provider value={{ type, openItems, toggle }}>
      <div className={cn("divide-y divide-border/50", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ─── Accordion Item ──────────────────────────────────────────────────────────

export function AccordionItem({
  value,
  children,
  className,
  disabled = false,
  ...props
}: AccordionItemProps) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <ItemContext.Provider value={{ value, isOpen, disabled }}>
      <div
        className={cn(
          "py-1",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        data-state={isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

// ─── Accordion Trigger ───────────────────────────────────────────────────────

export function AccordionTrigger({
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const { toggle } = useContext(AccordionContext);
  const { value, isOpen, disabled } = useContext(ItemContext);

  return (
    <button
      type="button"
      onClick={() => !disabled && toggle(value)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-primary",
        disabled && "cursor-not-allowed",
        className
      )}
      aria-expanded={isOpen}
      disabled={disabled}
      {...props}
    >
      {children}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="shrink-0 ml-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </motion.span>
    </button>
  );
}

// ─── Accordion Content ───────────────────────────────────────────────────────

export function AccordionContent({
  children,
  className,
}: AccordionContentProps) {
  const { isOpen } = useContext(ItemContext);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
              opacity: { duration: 0.2, delay: 0.05 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { type: "spring", stiffness: 500, damping: 30, mass: 0.8 },
              opacity: { duration: 0.15 },
            },
          }}
          className="overflow-hidden"
        >
          <div className={cn("pb-4 text-sm text-muted-foreground", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
