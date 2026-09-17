"use client";

import { cn } from "@/lib/utils";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { useState, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SortableItem {
  id: string;
  content: ReactNode;
}

interface SortableListProps {
  items: SortableItem[];
  onReorder: (items: SortableItem[]) => void;
  className?: string;
  /** Item class name */
  itemClassName?: string;
  /** Axis of reordering */
  axis?: "y" | "x";
  /** Show drag handle */
  showHandle?: boolean;
  /** Enable remove animation */
  removable?: boolean;
  /** Called when an item is removed */
  onRemove?: (item: SortableItem) => void;
}

// ─── Drag Handle Icon ────────────────────────────────────────────────────────

function DragHandle() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="text-muted-foreground/50"
    >
      <circle cx="5" cy="3" r="1.5" />
      <circle cx="11" cy="3" r="1.5" />
      <circle cx="5" cy="8" r="1.5" />
      <circle cx="11" cy="8" r="1.5" />
      <circle cx="5" cy="13" r="1.5" />
      <circle cx="11" cy="13" r="1.5" />
    </svg>
  );
}

// ─── Sortable List ───────────────────────────────────────────────────────────

export function SortableList({
  items,
  onReorder,
  className,
  itemClassName,
  axis = "y",
  showHandle = true,
  removable = false,
  onRemove,
}: SortableListProps) {
  return (
    <Reorder.Group
      axis={axis}
      values={items}
      onReorder={onReorder}
      className={cn(
        axis === "y" ? "flex flex-col gap-2" : "flex flex-row gap-2",
        className
      )}
    >
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <SortableListItem
            key={item.id}
            item={item}
            className={itemClassName}
            showHandle={showHandle}
            removable={removable}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}

// ─── Sortable List Item ──────────────────────────────────────────────────────

function SortableListItem({
  item,
  className,
  showHandle,
  removable,
  onRemove,
}: {
  item: SortableItem;
  className?: string;
  showHandle: boolean;
  removable: boolean;
  onRemove?: (item: SortableItem) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Reorder.Item
      value={item}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: removable ? -200 : 0, transition: { duration: 0.2 } }}
      whileDrag={{
        scale: 1.03,
        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        zIndex: 50,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "flex items-center gap-3 rounded-xl border border-border/30 bg-surface/80 px-4 py-3 select-none",
        isDragging
          ? "cursor-grabbing border-primary/30 bg-surface"
          : "cursor-grab hover:border-border/60",
        className
      )}
    >
      {showHandle && (
        <span className="shrink-0 cursor-grab active:cursor-grabbing">
          <DragHandle />
        </span>
      )}

      <div className="flex-1 min-w-0">{item.content}</div>

      {removable && (
        <motion.button
          onClick={() => onRemove?.(item)}
          className="shrink-0 rounded-md p-1 text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Remove"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
          </svg>
        </motion.button>
      )}
    </Reorder.Item>
  );
}
