"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { useState, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SwipeCard {
  id: string;
  content: ReactNode;
}

interface SwipeCardsProps {
  cards: SwipeCard[];
  className?: string;
  /** Called when a card is swiped */
  onSwipe?: (card: SwipeCard, direction: "left" | "right") => void;
  /** Called when all cards are exhausted */
  onEmpty?: () => void;
  /** Swipe threshold in pixels */
  threshold?: number;
  /** Card rotation intensity */
  rotationIntensity?: number;
  /** Overlay labels */
  labels?: { left?: string; right?: string };
}

// ─── Swipe Cards ─────────────────────────────────────────────────────────────

export function SwipeCards({
  cards: initialCards,
  className,
  onSwipe,
  onEmpty,
  threshold = 120,
  rotationIntensity = 15,
  labels = { left: "NOPE", right: "LIKE" },
}: SwipeCardsProps) {
  const [cards, setCards] = useState(initialCards);

  const removeTop = (direction: "left" | "right") => {
    if (cards.length === 0) return;
    const removed = cards[cards.length - 1];
    onSwipe?.(removed, direction);
    setCards((prev) => prev.slice(0, -1));
    if (cards.length <= 1) onEmpty?.();
  };

  return (
    <div
      className={cn(
        "relative w-[320px] h-[420px]",
        className
      )}
    >
      <AnimatePresence>
        {cards.map((card, i) => {
          const isTop = i === cards.length - 1;
          const scale = 1 - (cards.length - 1 - i) * 0.04;
          const yOffset = (cards.length - 1 - i) * -8;

          return isTop ? (
            <DraggableCard
              key={card.id}
              card={card}
              onSwipe={removeTop}
              threshold={threshold}
              rotationIntensity={rotationIntensity}
              labels={labels}
            />
          ) : (
            <motion.div
              key={card.id}
              className="absolute inset-0 rounded-2xl border border-border/30 bg-surface/80 shadow-lg overflow-hidden"
              style={{
                scale,
                y: yOffset,
                zIndex: i,
              }}
              animate={{ scale, y: yOffset }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {card.content}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {cards.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed border-border/50 text-muted-foreground text-sm"
        >
          No more cards
        </motion.div>
      )}
    </div>
  );
}

// ─── Draggable Card ──────────────────────────────────────────────────────────

function DraggableCard({
  card,
  onSwipe,
  threshold,
  rotationIntensity,
  labels,
}: {
  card: SwipeCard;
  onSwipe: (direction: "left" | "right") => void;
  threshold: number;
  rotationIntensity: number;
  labels: { left?: string; right?: string };
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-rotationIntensity, 0, rotationIntensity]);
  const likeOpacity = useTransform(x, [0, threshold], [0, 1]);
  const nopeOpacity = useTransform(x, [-threshold, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl border border-border/30 bg-surface shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: 100 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      whileDrag={{ scale: 1.02 }}
    >
      {card.content}

      {/* Right swipe overlay */}
      {labels.right && (
        <motion.div
          className="absolute top-6 left-6 px-4 py-2 rounded-lg border-2 border-emerald-500 text-emerald-500 font-bold text-xl -rotate-12 pointer-events-none"
          style={{ opacity: likeOpacity }}
        >
          {labels.right}
        </motion.div>
      )}

      {/* Left swipe overlay */}
      {labels.left && (
        <motion.div
          className="absolute top-6 right-6 px-4 py-2 rounded-lg border-2 border-red-500 text-red-500 font-bold text-xl rotate-12 pointer-events-none"
          style={{ opacity: nopeOpacity }}
        >
          {labels.left}
        </motion.div>
      )}
    </motion.div>
  );
}
