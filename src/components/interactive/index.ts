// ─── Interactive Components ─────────────────────────────────────────────────
// 15 cutting-edge interactive components inspired by 21st.dev, magicui, aceternity

// macOS-style magnification dock
export { Dock, DockItem, DockSeparator } from "./dock";

// Infinite scroll marquee
export { Marquee, MarqueeItem } from "./marquee";

// Aceternity-style lamp effect
export { Lamp, LampContainer } from "./lamp";

// Animated number counter
export { NumberTicker, AnimatedCounter } from "./number-ticker";

// Text morphing, typing, flipping, rotating
export { MorphingText, TypingText, FlipText, WordRotate } from "./morphing-text";

// Cursor-following spotlight on cards
export { SpotlightCard, SpotlightBorderCard, SpotlightGrid } from "./spotlight-card";

// Magnetic cursor attraction
export { Magnetic, MagneticButton } from "./magnetic";

// SVG beam connections between elements
export { AnimatedBeam, BeamCircle } from "./animated-beam";

// Click ripple effect
export { RippleButton, Ripple } from "./ripple";

// Smooth animated tabs with multiple styles
export { AnimatedTabs, PillTabs, UnderlineTabs } from "./animated-tabs";

// iOS-style glassmorphism
export { LiquidGlass, GlassCard, FrostedPanel } from "./liquid-glass";

// Animated backgrounds and patterns
export { WavyBackground, AnimatedGridPattern, DotPattern } from "./wavy-background";

// Celebration confetti
export { ConfettiButton, CelebrationConfetti } from "./confetti";

// Animated borders and beams
export { BorderBeam, ShimmerBorder, GlowingBorder } from "./border-beam";

// Scroll-triggered reveal animations
export { ScrollReveal, StaggerReveal, TextReveal } from "./scroll-reveal";

// Orbiting elements
export { OrbitingCircles, OrbitSystem } from "./orbit";

// Spring-animated modal/dialog
export { Modal, ModalHeader, ModalFooter, ModalClose } from "./modal";

// Animated toast notifications
export { ToastProvider, useToast } from "./toast";

// Slide-out drawer/sheet
export { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./drawer";

// Smooth animated accordion/collapse
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

// Spring-animated tooltip
export { Tooltip, TooltipGroup } from "./tooltip";

// Loading skeleton placeholders
export {
  Skeleton,
  SkeletonGroup,
  SkeletonCard,
  SkeletonAvatar,
} from "./skeleton";

// Cmd+K command palette
export { CommandPalette, useCommandPalette } from "./command-palette";

// Progress bars, steps, and circular progress
export { ProgressBar, StepIndicator, CircularProgress } from "./progress";

// Animated toggle switch and toggle group
export { Switch, ToggleGroup } from "./switch";

// Tinder-style swipe cards
export { SwipeCards } from "./swipe-cards";
export type { SwipeCard } from "./swipe-cards";

// Drag-and-drop sortable list
export { SortableList } from "./sortable-list";
export type { SortableItem } from "./sortable-list";

// Spring-animated number counter and stat card
export { AnimatedCounter as SpringCounter, StatCard } from "./animated-counter";
