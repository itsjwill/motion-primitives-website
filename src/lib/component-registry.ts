// =============================================================================
// Component Registry — Powers dynamic documentation pages
// =============================================================================

export interface ComponentMeta {
  name: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  props: PropMeta[];
  code: string;
  isNew?: boolean;
  isPremium?: boolean;
  dependencies?: string[];
}

export interface PropMeta {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export type ComponentCategory =
  | "backgrounds"
  | "cards"
  | "effects"
  | "interactive"
  | "layout"
  | "navigation"
  | "scroll"
  | "text"
  | "three"
  | "transitions";

export const CATEGORY_META: Record<ComponentCategory, { label: string; description: string }> = {
  backgrounds: { label: "Backgrounds", description: "Animated backgrounds, grids, particles, and mesh gradients" },
  cards: { label: "Cards", description: "Interactive card components with hover effects and animations" },
  effects: { label: "Effects", description: "Cursor effects, hover reveals, audio reactivity, and more" },
  layout: { label: "Layout", description: "Masonry grids, hero sections, and premium page layouts" },
  navigation: { label: "Navigation", description: "Morphing navbars and scroll-aware navigation" },
  scroll: { label: "Scroll", description: "Scroll-driven animations, parallax, and video playback" },
  text: { label: "Text", description: "Text animations, gradient text, reveals, and distortion" },
  three: { label: "3D / Three.js", description: "WebGL particle systems, globes, and 3D scroll scenes" },
  transitions: { label: "Transitions", description: "Page transitions, preloaders, and noise dissolves" },
  interactive: { label: "Interactive", description: "Modals, drawers, toasts, command palette, progress, switches, swipe cards, sortable lists, and more" },
};

// =============================================================================
// Full Registry
// =============================================================================

export const componentRegistry: ComponentMeta[] = [
  // ─── Backgrounds ──────────────────────────────────────────────────────────────
  {
    name: "Aurora Background",
    slug: "aurora",
    category: "backgrounds",
    description: "Animated aurora borealis gradient background with configurable colors and speed.",
    tags: ["background", "gradient", "aurora", "animated"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Aurora } from "@/components/backgrounds/aurora";

<Aurora className="h-screen" />`,
  },
  {
    name: "Gradient Blur",
    slug: "gradient-blur",
    category: "backgrounds",
    description: "Blurred gradient orbs with configurable colors for atmospheric backgrounds.",
    tags: ["background", "gradient", "blur", "orbs"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { GradientBlur } from "@/components/backgrounds/gradient-blur";

<GradientBlur className="h-screen" />`,
  },
  {
    name: "Gradient Mesh",
    slug: "gradient-mesh",
    category: "backgrounds",
    description: "Multi-point animated mesh gradient that adapts to the active direction. Supports interactive mouse tracking.",
    tags: ["background", "gradient", "mesh", "interactive", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "points", type: "MeshPoint[]", description: "Custom gradient control points" },
      { name: "speed", type: "number", default: "0.5", description: "Animation speed multiplier" },
      { name: "blur", type: "number", default: "80", description: "Blur radius in pixels" },
      { name: "interactive", type: "boolean", default: "false", description: "Enable mouse interaction" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { GradientMesh } from "@/components/backgrounds/gradient-mesh";

<GradientMesh interactive speed={0.8} className="h-screen" />`,
  },
  {
    name: "Grid Background",
    slug: "grid",
    category: "backgrounds",
    description: "Subtle grid pattern background using SVG for crisp rendering at any scale.",
    tags: ["background", "grid", "pattern"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Grid } from "@/components/backgrounds/grid";

<Grid className="h-screen" />`,
  },
  {
    name: "Infinite Grid",
    slug: "infinite-grid",
    category: "backgrounds",
    description: "Perspective grid that scrolls infinitely with direction-aware coloring and edge fading.",
    tags: ["background", "grid", "infinite", "perspective", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "cellSize", type: "number", default: "60", description: "Grid cell size in pixels" },
      { name: "lineWidth", type: "number", default: "1", description: "Grid line width" },
      { name: "speed", type: "number", default: "0.5", description: "Scroll speed" },
      { name: "perspective", type: "boolean", default: "true", description: "Enable perspective fade" },
      { name: "fadeEdges", type: "boolean", default: "true", description: "Fade grid at edges" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { InfiniteGrid } from "@/components/backgrounds/infinite-grid";

<InfiniteGrid speed={1} perspective className="h-96" />`,
  },
  {
    name: "Meteors",
    slug: "meteors",
    category: "backgrounds",
    description: "Falling meteor animation with randomized paths and fading trails.",
    tags: ["background", "meteors", "particles", "animated"],
    props: [
      { name: "number", type: "number", default: "20", description: "Number of meteors" },
    ],
    code: `import { Meteors } from "@/components/backgrounds/meteors";

<Meteors number={30} />`,
  },
  {
    name: "Particles",
    slug: "particles",
    category: "backgrounds",
    description: "Floating particle system with configurable density and movement.",
    tags: ["background", "particles", "animated"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Particles } from "@/components/backgrounds/particles";

<Particles className="h-screen" />`,
  },
  {
    name: "Spotlight",
    slug: "spotlight",
    category: "backgrounds",
    description: "Animated spotlight effect that follows cursor or auto-animates.",
    tags: ["background", "spotlight", "cursor", "animated"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Spotlight } from "@/components/backgrounds/spotlight";

<Spotlight className="h-screen" />`,
  },

  // ─── Cards ─────────────────────────────────────────────────────────────────────
  {
    name: "Bento Grid",
    slug: "bento-grid",
    category: "cards",
    description: "Apple-style bento grid layout with configurable spans and gap sizes.",
    tags: ["cards", "grid", "bento", "layout"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Grid items" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { BentoGrid, BentoGridItem } from "@/components/cards/bento-grid";

<BentoGrid>
  <BentoGridItem title="Feature" description="Description" />
</BentoGrid>`,
  },
  {
    name: "Glow Card",
    slug: "glow-card",
    category: "cards",
    description: "Card with animated glow border that follows cursor position.",
    tags: ["cards", "glow", "hover", "cursor"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Card content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { GlowCard } from "@/components/cards/glow-card";

<GlowCard>
  <h3>Glowing Card</h3>
  <p>Hover to see the glow effect</p>
</GlowCard>`,
  },
  {
    name: "Hover Card",
    slug: "hover-card",
    category: "cards",
    description: "Card with smooth 3D tilt and scale on hover with spring physics.",
    tags: ["cards", "hover", "3d", "tilt"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Card content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { HoverCard } from "@/components/cards/hover-card";

<HoverCard>
  <p>Hover me for 3D effect</p>
</HoverCard>`,
  },
  {
    name: "Stack Cards",
    slug: "stack-cards",
    category: "cards",
    description: "Cards that stack on scroll with sticky positioning and cascade effect. Each card slides into view and compresses previous ones.",
    tags: ["cards", "scroll", "stack", "sticky"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "cards", type: "StackCard[]", required: true, description: "Array of card objects with id and content" },
      { name: "offset", type: "number", default: "30", description: "Vertical offset between stacked cards" },
      { name: "className", type: "string", description: "Container CSS classes" },
      { name: "cardClassName", type: "string", description: "Individual card CSS classes" },
    ],
    code: `import { StackCards } from "@/components/cards/stack-cards";

<StackCards cards={[
  { id: 1, content: <div>Card 1</div> },
  { id: 2, content: <div>Card 2</div> },
  { id: 3, content: <div>Card 3</div> },
]} />`,
  },
  {
    name: "Tilt Card",
    slug: "tilt-card",
    category: "cards",
    description: "3D perspective tilt card that responds to mouse position.",
    tags: ["cards", "3d", "tilt", "perspective"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Card content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { TiltCard } from "@/components/cards/tilt-card";

<TiltCard>
  <p>Move your mouse over me</p>
</TiltCard>`,
  },

  // ─── Effects ───────────────────────────────────────────────────────────────────
  {
    name: "Animated Input",
    slug: "animated-input",
    category: "effects",
    description: "Input field with animated label, focus ring, and validation states.",
    tags: ["effects", "input", "form", "animated"],
    props: [
      { name: "placeholder", type: "string", description: "Placeholder text" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { AnimatedInput } from "@/components/effects/animated-input";

<AnimatedInput placeholder="Enter your email" />`,
  },
  {
    name: "Audio Reactive",
    slug: "audio-reactive",
    category: "effects",
    description: "Elements that pulse and react to audio input from the microphone. Includes visualizer bars and scale effects.",
    tags: ["effects", "audio", "microphone", "reactive", "visualizer"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Content to make reactive" },
      { name: "sensitivity", type: "number", default: "1.5", description: "Audio sensitivity multiplier" },
      { name: "barCount", type: "number", default: "32", description: "Number of visualizer bars" },
      { name: "showBars", type: "boolean", default: "true", description: "Show frequency bars" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { AudioReactive } from "@/components/effects/audio-reactive";

<AudioReactive sensitivity={2}>
  <h1>I pulse with sound</h1>
</AudioReactive>`,
  },
  {
    name: "Custom Cursor",
    slug: "custom-cursor",
    category: "effects",
    description: "Custom cursor replacement with smooth trailing and hover state changes.",
    tags: ["effects", "cursor", "custom", "animated"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { CustomCursor } from "@/components/effects/custom-cursor";

<CustomCursor />`,
  },
  {
    name: "Fluid Cursor",
    slug: "fluid-cursor",
    category: "effects",
    description: "Metaball-style cursor with trailing blobs that merge and separate. Direction-aware coloring with blend mode effects.",
    tags: ["effects", "cursor", "metaball", "fluid", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "size", type: "number", default: "20", description: "Cursor dot size in pixels" },
      { name: "trailCount", type: "number", default: "8", description: "Number of trailing dots" },
      { name: "color", type: "string", description: "Override cursor color" },
      { name: "blend", type: "boolean", default: "true", description: "Use difference blend mode" },
    ],
    code: `import { FluidCursor } from "@/components/effects/fluid-cursor";

<FluidCursor size={24} trailCount={10} />`,
  },
  {
    name: "Magnetic Button",
    slug: "magnetic-button",
    category: "effects",
    description: "Button that magnetically attracts toward the cursor on hover.",
    tags: ["effects", "button", "magnetic", "hover"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { MagneticButton } from "@/components/effects/magnetic-button";

<MagneticButton>Hover Me</MagneticButton>`,
  },
  {
    name: "Magnetic Gallery",
    slug: "magnetic-gallery",
    category: "effects",
    description: "Image gallery where items are attracted to and repelled by the cursor with spring physics.",
    tags: ["effects", "gallery", "magnetic", "images", "interactive"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "items", type: "GalleryItem[]", required: true, description: "Array of image items" },
      { name: "strength", type: "number", default: "30", description: "Magnetic pull strength" },
      { name: "gap", type: "number", default: "16", description: "Gap between items in pixels" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { MagneticGallery } from "@/components/effects/magnetic-gallery";

<MagneticGallery items={[
  { id: 1, src: "/img1.jpg", alt: "Image 1" },
  { id: 2, src: "/img2.jpg", alt: "Image 2" },
]} strength={40} />`,
  },
  {
    name: "Reveal on Hover",
    slug: "reveal-on-hover",
    category: "effects",
    description: "Text that reveals an image on hover, following the cursor position with spring animations.",
    tags: ["effects", "hover", "reveal", "image", "cursor"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "text", type: "string", required: true, description: "Display text" },
      { name: "imageSrc", type: "string", required: true, description: "Image URL to reveal" },
      { name: "imageAlt", type: "string", description: "Image alt text" },
      { name: "imageWidth", type: "number", default: "300", description: "Revealed image width" },
      { name: "imageHeight", type: "number", default: "400", description: "Revealed image height" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { RevealOnHover } from "@/components/effects/reveal-on-hover";

<RevealOnHover text="Hover Me" imageSrc="/reveal.jpg" />`,
  },
  {
    name: "Text Distortion",
    slug: "text-distortion",
    category: "effects",
    description: "Canvas-based text that warps and distorts on hover with horizontal slice displacement.",
    tags: ["effects", "text", "distortion", "canvas", "hover"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "text", type: "string", required: true, description: "Text to display" },
      { name: "intensity", type: "number", default: "20", description: "Distortion intensity in pixels" },
      { name: "speed", type: "number", default: "0.02", description: "Animation speed" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { TextDistortion } from "@/components/effects/text-distortion";

<TextDistortion text="DISTORT ME" intensity={30} />`,
  },

  // ─── Layout ────────────────────────────────────────────────────────────────────
  {
    name: "Animated Masonry",
    slug: "animated-masonry",
    category: "layout",
    description: "Masonry grid with staggered entrance animations and category filtering. Direction-aware motion presets.",
    tags: ["layout", "masonry", "grid", "filter", "animated", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "items", type: "MasonryItem[]", required: true, description: "Array of items with id, content, and optional category" },
      { name: "columns", type: "number", default: "3", description: "Number of columns" },
      { name: "gap", type: "number", default: "16", description: "Gap between items in pixels" },
      { name: "categories", type: "string[]", description: "Category filter buttons" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { AnimatedMasonry } from "@/components/layout/animated-masonry";

<AnimatedMasonry
  columns={3}
  items={[
    { id: 1, content: <div>Item 1</div>, category: "photos" },
    { id: 2, content: <div>Item 2</div>, category: "videos" },
  ]}
/>`,
  },

  // ─── Navigation ────────────────────────────────────────────────────────────────
  {
    name: "Morphing Nav",
    slug: "morphing-nav",
    category: "navigation",
    description: "Navigation that morphs between three modes: full bar, floating pill, and fullscreen overlay. Scroll-aware with direction-aware motion.",
    tags: ["navigation", "morphing", "scroll", "animated", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "items", type: "NavItem[]", required: true, description: "Navigation items with label and href" },
      { name: "logo", type: "ReactNode", description: "Logo element" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { MorphingNav } from "@/components/navigation/morphing-nav";

<MorphingNav items={[
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
]} />`,
  },

  // ─── Scroll ────────────────────────────────────────────────────────────────────
  {
    name: "Scroll Video",
    slug: "scroll-video",
    category: "scroll",
    description: "Video that advances frame-by-frame as the user scrolls. Apple-style product reveal effect with sticky positioning.",
    tags: ["scroll", "video", "sticky", "apple-style"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "src", type: "string", required: true, description: "Video source URL" },
      { name: "startFrame", type: "number", default: "0", description: "Start time in seconds" },
      { name: "endFrame", type: "number", description: "End time in seconds" },
      { name: "sticky", type: "boolean", default: "true", description: "Enable sticky positioning" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { ScrollVideo } from "@/components/scroll/scroll-video";

<ScrollVideo src="/product-reveal.mp4" sticky />`,
  },
  {
    name: "Parallax Scroll",
    slug: "parallax-scroll",
    category: "scroll",
    description: "Parallax scrolling effect with configurable speed and direction.",
    tags: ["scroll", "parallax", "animated"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Content to parallax" },
      { name: "speed", type: "number", default: "0.5", description: "Parallax speed" },
    ],
    code: `import { ParallaxScroll } from "@/components/scroll/parallax-scroll";

<ParallaxScroll speed={0.3}>
  <img src="/hero.jpg" alt="Hero" />
</ParallaxScroll>`,
  },
  {
    name: "Infinite Scroll",
    slug: "infinite-scroll",
    category: "scroll",
    description: "Continuous horizontal or vertical scrolling content with seamless looping.",
    tags: ["scroll", "infinite", "loop", "marquee"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Content to scroll" },
      { name: "direction", type: "'left' | 'right'", default: "'left'", description: "Scroll direction" },
      { name: "speed", type: "number", default: "1", description: "Scroll speed" },
    ],
    code: `import { InfiniteScroll } from "@/components/scroll/infinite-scroll";

<InfiniteScroll direction="left" speed={1.5}>
  <span>Scrolling text</span>
</InfiniteScroll>`,
  },

  // ─── Text ──────────────────────────────────────────────────────────────────────
  {
    name: "Gradient Text",
    slug: "gradient-text",
    category: "text",
    description: "Text with animated gradient color effect.",
    tags: ["text", "gradient", "animated"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Text content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { GradientText } from "@/components/text/gradient-text";

<GradientText>Beautiful Gradient</GradientText>`,
  },
  {
    name: "Split Screen Text",
    slug: "split-screen-text",
    category: "text",
    description: "Text that splits apart vertically on scroll, revealing content underneath. Scroll-driven with sticky positioning.",
    tags: ["text", "split", "scroll", "reveal", "animated"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "topText", type: "string", required: true, description: "Top half text" },
      { name: "bottomText", type: "string", required: true, description: "Bottom half text" },
      { name: "revealContent", type: "ReactNode", required: true, description: "Content revealed between split" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { SplitScreenText } from "@/components/text/split-screen-text";

<SplitScreenText
  topText="Discover"
  bottomText="Something New"
  revealContent={<img src="/reveal.jpg" alt="" />}
/>`,
  },
  {
    name: "Text Generate",
    slug: "text-generate",
    category: "text",
    description: "Text that generates character by character with a typing cursor effect.",
    tags: ["text", "typing", "generate", "animated"],
    props: [
      { name: "words", type: "string", required: true, description: "Text to generate" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { TextGenerate } from "@/components/text/text-generate";

<TextGenerate words="Hello, World!" />`,
  },
  {
    name: "Text Reveal",
    slug: "text-reveal",
    category: "text",
    description: "Text that reveals word by word with scroll-driven animation.",
    tags: ["text", "reveal", "scroll", "animated"],
    props: [
      { name: "children", type: "string", required: true, description: "Text to reveal" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { TextReveal } from "@/components/text/text-reveal";

<TextReveal>This text reveals as you scroll</TextReveal>`,
  },

  // ─── Three.js ──────────────────────────────────────────────────────────────────
  {
    name: "Floating Shapes",
    slug: "floating-shapes",
    category: "three",
    description: "3D floating geometric shapes with gentle rotation and bounce.",
    tags: ["three", "3d", "shapes", "floating", "webgl"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { FloatingShapes } from "@/components/three/floating-shapes";

<FloatingShapes className="h-96" />`,
  },
  {
    name: "Globe",
    slug: "globe",
    category: "three",
    description: "Interactive 3D globe with connection arcs and glow effects.",
    tags: ["three", "3d", "globe", "interactive", "webgl"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Globe } from "@/components/three/globe";

<Globe className="h-96" />`,
  },
  {
    name: "Particle Morph",
    slug: "particle-morph",
    category: "three",
    description: "Particle system that smoothly morphs between geometric shapes (sphere, cube, torus, spiral). Direction-aware coloring.",
    tags: ["three", "3d", "particles", "morph", "webgl", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "shapes", type: "string[]", default: '["sphere","cube","torus","spiral"]', description: "Shapes to morph between" },
      { name: "particleCount", type: "number", default: "5000", description: "Number of particles" },
      { name: "speed", type: "number", default: "1", description: "Morph speed" },
      { name: "size", type: "number", default: "0.03", description: "Particle size" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { ParticleMorph } from "@/components/three/particle-morph";

<ParticleMorph particleCount={8000} speed={1.5} className="h-96" />`,
    dependencies: ["@react-three/fiber", "three"],
  },
  {
    name: "Scroll Progress 3D",
    slug: "scroll-progress-3d",
    category: "three",
    description: "3D scene that rotates and scales based on page scroll progress. Wireframe icosahedron with direction-aware coloring.",
    tags: ["three", "3d", "scroll", "progress", "webgl", "direction-aware"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "wireframe", type: "boolean", default: "true", description: "Show wireframe" },
      { name: "stages", type: "number", default: "4", description: "Number of morph stages" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { ScrollProgress3D } from "@/components/three/scroll-progress-3d";

<ScrollProgress3D wireframe stages={4} className="h-96" />`,
    dependencies: ["@react-three/fiber", "three"],
  },

  // ─── Transitions ───────────────────────────────────────────────────────────────
  {
    name: "Noise Transition",
    slug: "noise-transition",
    category: "transitions",
    description: "Page transition with Perlin noise dissolve effect. Canvas-based with configurable speed and color.",
    tags: ["transitions", "noise", "dissolve", "canvas"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "isActive", type: "boolean", required: true, description: "Trigger the transition" },
      { name: "duration", type: "number", default: "1.2", description: "Total transition duration" },
      { name: "color", type: "string", default: "hsl(var(--primary))", description: "Transition color" },
      { name: "onComplete", type: "() => void", description: "Callback when transition completes" },
      { name: "children", type: "ReactNode", description: "Content behind transition" },
    ],
    code: `import { NoiseTransition } from "@/components/transitions/noise-transition";

const [transitioning, setTransitioning] = useState(false);

<NoiseTransition isActive={transitioning} onComplete={() => router.push("/next")}>
  <div>Current page content</div>
</NoiseTransition>`,
  },
  {
    name: "Page Transition",
    slug: "page-transition",
    category: "transitions",
    description: "Smooth page transition wrapper with configurable enter/exit animations.",
    tags: ["transitions", "page", "animated"],
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Page content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { PageTransition } from "@/components/transitions/page-transition";

<PageTransition>
  <div>Page content</div>
</PageTransition>`,
  },
  {
    name: "Preloader",
    slug: "preloader",
    category: "transitions",
    description: "Full-screen preloader with progress indicator and exit animation.",
    tags: ["transitions", "preloader", "loading"],
    props: [
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Preloader } from "@/components/transitions/preloader";

<Preloader />`,
  },
  // ==========================================================================
  // Premium Buttons — Advanced physics/WebGL/Canvas interactions
  // ==========================================================================
  {
    name: "Shader Distortion Button",
    slug: "shader-distortion-button",
    category: "buttons",
    description: "WebGL-powered button with GPU-computed water-warp distortion on hover. Real-time ripple displacement mapping.",
    tags: ["buttons", "webgl", "shader", "distortion", "hover", "gpu"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "intensity", type: "number", default: "0.03", description: "Distortion strength" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { ShaderDistortionButton } from "@/components/buttons/premium-buttons";

<ShaderDistortionButton intensity={0.04}>
  Explore
</ShaderDistortionButton>`,
  },
  {
    name: "Ink Bleed Button",
    slug: "ink-bleed-button",
    category: "buttons",
    description: "Click triggers organic watercolor-like ink bleeding from the click point. Canvas-based fluid simulation with sub-drop spawning.",
    tags: ["buttons", "fluid", "ink", "click", "canvas", "organic"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "inkColor", type: "string", default: "rgba(99, 102, 241, 0.8)", description: "Ink color (rgba format)" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { InkBleedButton } from "@/components/buttons/premium-buttons";

<InkBleedButton inkColor="rgba(236, 72, 153, 0.8)">
  Create
</InkBleedButton>`,
  },
  {
    name: "Cloth Button",
    slug: "cloth-button",
    category: "buttons",
    description: "Button surface simulates fabric using verlet integration physics. Cursor pushes dents into the cloth mesh.",
    tags: ["buttons", "physics", "cloth", "verlet", "fabric", "interactive"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "meshColor", type: "string", default: "rgba(255, 255, 255, 0.4)", description: "Mesh line color" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { ClothButton } from "@/components/buttons/premium-buttons";

<ClothButton meshColor="rgba(99, 102, 241, 0.5)">
  Touch Me
</ClothButton>`,
  },
  {
    name: "Portal Button",
    slug: "portal-button",
    category: "buttons",
    description: "Click tears open a spiraling vortex/wormhole from the click point. Organic distorted rings with center glow.",
    tags: ["buttons", "portal", "vortex", "click", "animation", "canvas"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "portalColor", type: "string", default: "#6366f1", description: "Portal color (hex)" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { PortalButton } from "@/components/buttons/premium-buttons";

<PortalButton portalColor="#06b6d4">
  Enter Portal
</PortalButton>`,
  },
  {
    name: "Swarm Button",
    slug: "swarm-button",
    category: "buttons",
    description: "Text rendered as particle swarm that scatters on hover and reforms using boid flocking behavior.",
    tags: ["buttons", "particles", "swarm", "boid", "flocking", "text"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "string", required: true, description: "Text to render as particles" },
      { name: "particleColor", type: "string", default: "#ffffff", description: "Particle color" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { SwarmButton } from "@/components/buttons/premium-buttons";

<SwarmButton particleColor="#a855f7">
  HOVER
</SwarmButton>`,
  },
  {
    name: "Liquid Metal Button",
    slug: "liquid-metal-button",
    category: "buttons",
    description: "Chrome/mercury metallic surface with flowing reflections that track cursor position. Environment-mapped lighting.",
    tags: ["buttons", "metal", "chrome", "reflection", "metallic", "premium"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { LiquidMetalButton } from "@/components/buttons/premium-buttons";

<LiquidMetalButton>
  Premium
</LiquidMetalButton>`,
  },
  {
    name: "Reactive Shadow Button",
    slug: "reactive-shadow-button",
    category: "buttons",
    description: "Shadow responds to cursor as if it were a point light source. Shadow direction, size, and blur change in real-time.",
    tags: ["buttons", "shadow", "light", "cursor", "reactive", "depth"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "shadowColor", type: "string", default: "rgba(99, 102, 241, 0.4)", description: "Shadow color" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { ReactiveShadowButton } from "@/components/buttons/premium-buttons";

<ReactiveShadowButton shadowColor="rgba(236, 72, 153, 0.5)">
  Illuminate
</ReactiveShadowButton>`,
  },
  {
    name: "Sticker Peel Button",
    slug: "sticker-peel-button",
    category: "buttons",
    description: "Button lifts off the page like a sticker being peeled. 3D perspective with shadow underneath and corner curl.",
    tags: ["buttons", "3d", "peel", "sticker", "perspective", "hover"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { StickerPeelButton } from "@/components/buttons/premium-buttons";

<StickerPeelButton>
  Peel Me
</StickerPeelButton>`,
  },
  {
    name: "Thermal Button",
    slug: "thermal-button",
    category: "buttons",
    description: "Button visually 'heats up' the longer you hover. Color shifts from cool blue to hot red with glow and shimmer effects.",
    tags: ["buttons", "thermal", "heat", "temperature", "glow", "interactive"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { ThermalButton } from "@/components/buttons/premium-buttons";

<ThermalButton>
  Hold to Heat
</ThermalButton>`,
  },
  {
    name: "Momentum Button",
    slug: "momentum-button",
    category: "buttons",
    description: "Button maintains physics inertia after cursor leaves. Flick the cursor across it and watch it continue moving with realistic momentum and spring-back.",
    tags: ["buttons", "physics", "momentum", "inertia", "velocity", "spring"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "children", type: "ReactNode", required: true, description: "Button content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
      { name: "onClick", type: "() => void", description: "Click handler" },
    ],
    code: `import { MomentumButton } from "@/components/buttons/premium-buttons";

<MomentumButton>
  Flick Me
</MomentumButton>`,
  },
  // ==========================================================================
  // Showcase & Living System Cards
  // ==========================================================================
  {
    name: "Feature Showcase",
    slug: "feature-showcase",
    category: "cards",
    description: "Interactive three-panel bento: sidebar nav switches a live demo center panel and code snippet right panel. Perfect for SaaS feature sections.",
    tags: ["cards", "bento", "showcase", "tabs", "demo", "code", "saas"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "items", type: "FeatureShowcaseItem[]", required: true, description: "Array of features with id, title, demo, and code" },
      { name: "title", type: "string", description: "Section title" },
      { name: "subtitle", type: "string", description: "Section subtitle" },
      { name: "label", type: "string", default: "SYSTEMS", description: "Colored label text" },
      { name: "color", type: "string", default: "blue", description: "Accent color theme" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { FeatureShowcase } from "@/components/cards/feature-showcase";

<FeatureShowcase
  label="AI FEATURES"
  title="Smart Automation"
  items={[
    {
      id: "routing",
      title: "Smart Routing",
      category: "Core",
      demo: <AnimatedDemo />,
      code: \`const router = new SmartRouter();
router.configure({ mode: "ai" });\`,
      tags: ["AI", "Routing"],
    },
  ]}
  color="cyan"
/>`,
  },
  {
    name: "Living System",
    slug: "living-system",
    category: "cards",
    description: "A multi-panel organism that breathes, pulses, and reacts as one living entity. Nodes are connected by flowing particle streams with a shared heartbeat.",
    tags: ["cards", "living", "organism", "particles", "connections", "heartbeat", "interactive"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "nodes", type: "SystemNode[]", required: true, description: "Array of nodes with id, title, position [x%, y%]" },
      { name: "connections", type: "SystemConnection[]", required: true, description: "Array of connections between node IDs" },
      { name: "heartbeatInterval", type: "number", default: "3000", description: "Heartbeat interval in ms" },
      { name: "color", type: "string", default: "cyan", description: "System color theme" },
      { name: "breathe", type: "number", default: "0.5", description: "Breathing intensity (0-1)" },
      { name: "title", type: "string", description: "System title label" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { LivingSystem } from "@/components/cards/living-system";

<LivingSystem
  title="Neural Network"
  color="cyan"
  heartbeatInterval={2500}
  nodes={[
    { id: "brain", title: "Brain", position: [50, 30] },
    { id: "data", title: "Data Lake", position: [25, 70] },
    { id: "api", title: "API Layer", position: [75, 70] },
  ]}
  connections={[
    { from: "brain", to: "data", particles: 4, speed: 2 },
    { from: "brain", to: "api", particles: 3, speed: 3 },
    { from: "data", to: "api", particles: 2, speed: 1 },
  ]}
/>`,
  },
  {
    name: "Neural Web",
    slug: "neural-web",
    category: "cards",
    description: "Self-organizing neural network background. Nodes autonomously drift, form connections by proximity, pulse together, and recoil from your cursor like a living nervous system.",
    tags: ["cards", "neural", "network", "self-organizing", "physics", "mouse-reactive", "organic"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "nodeCount", type: "number", default: "40", description: "Number of neural nodes" },
      { name: "color", type: "string", default: "cyan", description: "Network color" },
      { name: "sensitivity", type: "number", default: "0.7", description: "Mouse reactivity (0-1)" },
      { name: "connectionRadius", type: "number", default: "120", description: "Max distance for connections (px)" },
      { name: "children", type: "ReactNode", description: "Content overlaid on the network" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { NeuralWeb } from "@/components/cards/living-system";

<NeuralWeb nodeCount={50} color="purple" sensitivity={0.8}>
  <h2 className="text-3xl font-bold text-white">
    Intelligence Layer
  </h2>
</NeuralWeb>`,
  },
  {
    name: "Synapse Card",
    slug: "synapse-card",
    category: "cards",
    description: "Individual cards that form a shared nervous system. Multiple SynapseCards on the same page automatically connect to each other with a synchronized heartbeat pulse.",
    tags: ["cards", "synapse", "connected", "heartbeat", "pulse", "network"],
    isNew: true,
    isPremium: true,
    props: [
      { name: "id", type: "string", required: true, description: "Unique identifier for connection registry" },
      { name: "title", type: "string", required: true, description: "Card title" },
      { name: "description", type: "string", description: "Card description" },
      { name: "icon", type: "ReactNode", description: "Card icon" },
      { name: "color", type: "string", default: "cyan", description: "Pulse color" },
      { name: "pulseIntensity", type: "number", default: "0.5", description: "Heartbeat strength (0-1)" },
      { name: "children", type: "ReactNode", description: "Additional card content" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { SynapseCard } from "@/components/cards/living-system";

<div className="grid grid-cols-3 gap-4">
  <SynapseCard id="input" title="Input Layer" color="blue" />
  <SynapseCard id="process" title="Processing" color="purple" />
  <SynapseCard id="output" title="Output" color="emerald" />
</div>`,
  },

  // ─── Interactive (NEW) ────────────────────────────────────────────────────────

  {
    name: "Modal",
    slug: "modal",
    category: "interactive",
    description: "Spring-animated modal/dialog with 5 animation variants (spring, scale, slide, blur, morph). Includes header, footer, and close button sub-components.",
    tags: ["modal", "dialog", "overlay", "spring", "animated", "popup"],
    isNew: true,
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls modal visibility" },
      { name: "onClose", type: "() => void", required: true, description: "Called when modal should close" },
      { name: "variant", type: '"spring" | "scale" | "slide" | "blur" | "morph"', default: '"spring"', description: "Animation style" },
      { name: "size", type: '"sm" | "md" | "lg" | "xl" | "full"', default: '"md"', description: "Max width preset" },
      { name: "closeOnOverlay", type: "boolean", default: "true", description: "Close when clicking overlay" },
      { name: "closeOnEscape", type: "boolean", default: "true", description: "Close on Escape key" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Modal, ModalHeader, ModalFooter, ModalClose } from "@/components/interactive/modal";

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} variant="spring">
  <ModalHeader>
    <h2 className="text-lg font-semibold">Title</h2>
    <ModalClose onClose={() => setOpen(false)} />
  </ModalHeader>
  <p>Modal content here...</p>
  <ModalFooter>
    <button onClick={() => setOpen(false)}>Cancel</button>
    <button>Confirm</button>
  </ModalFooter>
</Modal>`,
  },
  {
    name: "Toast Notifications",
    slug: "toast",
    category: "interactive",
    description: "Animated toast notification system with spring physics, 5 types (default, success, error, warning, info), and 6 position options. Uses React context with useToast hook.",
    tags: ["toast", "notification", "alert", "snackbar", "spring", "animated"],
    isNew: true,
    props: [
      { name: "position", type: '"top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"', default: '"bottom-right"', description: "Toast position on screen" },
      { name: "maxToasts", type: "number", default: "5", description: "Maximum visible toasts" },
    ],
    code: `import { ToastProvider, useToast } from "@/components/interactive/toast";

// Wrap your app
<ToastProvider position="bottom-right">
  <App />
</ToastProvider>

// In any component
const { toast } = useToast();
toast({ title: "Saved!", type: "success", description: "Changes saved." });`,
  },
  {
    name: "Drawer",
    slug: "drawer",
    category: "interactive",
    description: "Slide-out drawer/sheet from any edge with spring animations and drag-to-dismiss. Includes header with drag handle, body, and footer sub-components.",
    tags: ["drawer", "sheet", "slide", "panel", "sidebar", "bottom-sheet", "drag"],
    isNew: true,
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls drawer visibility" },
      { name: "onClose", type: "() => void", required: true, description: "Called when drawer should close" },
      { name: "side", type: '"bottom" | "right" | "left" | "top"', default: '"bottom"', description: "Which edge the drawer slides from" },
      { name: "dragToDismiss", type: "boolean", default: "true", description: "Enable drag-to-dismiss gesture" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "@/components/interactive/drawer";

const [open, setOpen] = useState(false);

<Drawer open={open} onClose={() => setOpen(false)} side="bottom">
  <DrawerHeader showHandle>
    <h2 className="text-lg font-semibold">Options</h2>
  </DrawerHeader>
  <DrawerBody>
    <p>Drawer content...</p>
  </DrawerBody>
  <DrawerFooter>
    <button onClick={() => setOpen(false)}>Done</button>
  </DrawerFooter>
</Drawer>`,
  },
  {
    name: "Accordion",
    slug: "accordion",
    category: "interactive",
    description: "Smooth animated accordion/collapse with spring-physics height transitions. Supports single or multiple open items, controlled/uncontrolled modes.",
    tags: ["accordion", "collapse", "expandable", "faq", "spring", "animated"],
    isNew: true,
    props: [
      { name: "type", type: '"single" | "multiple"', default: '"single"', description: "Allow one or multiple items open" },
      { name: "defaultValue", type: "string | string[]", description: "Initially open item(s)" },
      { name: "value", type: "string | string[]", description: "Controlled open item(s)" },
      { name: "onValueChange", type: "(value) => void", description: "Controlled onChange handler" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/interactive/accordion";

<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Motion Primitives?</AccordionTrigger>
    <AccordionContent>
      The largest free animated React component library.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes — keyboard navigable, aria-expanded, reduced motion support.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "interactive",
    description: "Spring-animated tooltip with 4 variants (spring, fade, scale, blur), 4 positions, cursor-follow mode, and configurable delay.",
    tags: ["tooltip", "popover", "hover", "spring", "animated", "cursor"],
    isNew: true,
    props: [
      { name: "content", type: "ReactNode", required: true, description: "Tooltip content" },
      { name: "side", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Tooltip placement" },
      { name: "variant", type: '"spring" | "fade" | "scale" | "blur"', default: '"spring"', description: "Animation style" },
      { name: "delayMs", type: "number", default: "200", description: "Delay before showing (ms)" },
      { name: "followCursor", type: "boolean", default: "false", description: "Follow cursor position" },
      { name: "offset", type: "number", default: "8", description: "Distance from trigger (px)" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Tooltip } from "@/components/interactive/tooltip";

<Tooltip content="Edit document" side="top" variant="spring">
  <button>Edit</button>
</Tooltip>

<Tooltip content="Following you..." followCursor variant="blur">
  <div className="h-32 w-full bg-muted rounded-lg" />
</Tooltip>`,
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "interactive",
    description: "Loading skeleton placeholders with 4 animation variants (shimmer, pulse, wave, glow), 6 shape presets, and composable card/avatar presets.",
    tags: ["skeleton", "loading", "placeholder", "shimmer", "pulse", "animated"],
    isNew: true,
    props: [
      { name: "variant", type: '"shimmer" | "pulse" | "wave" | "glow"', default: '"shimmer"', description: "Animation style" },
      { name: "shape", type: '"rectangle" | "circle" | "text" | "avatar" | "button" | "card"', default: '"rectangle"', description: "Shape preset" },
      { name: "width", type: "string | number", description: "Width (CSS value)" },
      { name: "height", type: "string | number", description: "Height (CSS value)" },
      { name: "lines", type: "number", description: "Number of text lines to render" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { Skeleton, SkeletonCard, SkeletonAvatar } from "@/components/interactive/skeleton";

{/* Individual skeletons */}
<Skeleton variant="wave" shape="text" width="60%" />
<Skeleton variant="pulse" shape="avatar" />
<Skeleton variant="glow" shape="card" height={200} />

{/* Multi-line text */}
<Skeleton lines={4} variant="shimmer" />

{/* Preset compositions */}
<SkeletonCard />
<SkeletonAvatar />`,
  },
  {
    name: "Command Palette",
    slug: "command-palette",
    category: "interactive",
    description: "Cmd+K command palette with fuzzy search, keyboard navigation, grouped items, and shortcut display. Includes useCommandPalette hook for global binding.",
    tags: ["command", "palette", "cmdk", "search", "keyboard", "shortcuts", "spotlight"],
    isNew: true,
    props: [
      { name: "open", type: "boolean", required: true, description: "Controls palette visibility" },
      { name: "onClose", type: "() => void", required: true, description: "Called when palette should close" },
      { name: "items", type: "CommandItem[]", required: true, description: "Array of command items with id, label, group, icon, shortcut, onSelect" },
      { name: "placeholder", type: "string", default: '"Type a command..."', description: "Search input placeholder" },
      { name: "variant", type: '"spring" | "scale" | "blur"', default: '"spring"', description: "Animation style" },
      { name: "className", type: "string", description: "Additional CSS classes" },
    ],
    code: `import { CommandPalette, useCommandPalette } from "@/components/interactive/command-palette";

const { open, setOpen } = useCommandPalette(); // binds Cmd+K

<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: "1", label: "Go to Dashboard", group: "Navigation", shortcut: "G D", onSelect: () => {} },
    { id: "2", label: "Create New File", group: "Actions", shortcut: "⌘ N", onSelect: () => {} },
  ]}
/>`,
  },
  {
    name: "Progress Bar",
    slug: "progress-bar",
    category: "interactive",
    description: "Spring-animated progress bar with 3 animation variants (spring, smooth, bounce), optional glow and striped effects, and percentage label.",
    tags: ["progress", "bar", "loading", "spring", "animated", "glow", "striped"],
    isNew: true,
    props: [
      { name: "value", type: "number", required: true, description: "Current progress value" },
      { name: "max", type: "number", default: "100", description: "Maximum value" },
      { name: "variant", type: '"spring" | "smooth" | "bounce"', default: '"spring"', description: "Animation style" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height preset" },
      { name: "color", type: "string", default: '"bg-primary"', description: "Bar color (Tailwind class)" },
      { name: "showLabel", type: "boolean", default: "false", description: "Show percentage label" },
      { name: "glow", type: "boolean", default: "false", description: "Glow effect" },
      { name: "striped", type: "boolean", default: "false", description: "Striped animation" },
    ],
    code: `import { ProgressBar } from "@/components/interactive/progress";

<ProgressBar value={65} variant="spring" showLabel glow />
<ProgressBar value={40} variant="bounce" color="bg-emerald-500" striped />`,
  },
  {
    name: "Step Indicator",
    slug: "step-indicator",
    category: "interactive",
    description: "Animated step/wizard indicator with 3 visual variants (dots, line, pills) and spring-animated connectors between steps.",
    tags: ["steps", "wizard", "indicator", "stepper", "progress", "spring", "animated"],
    isNew: true,
    props: [
      { name: "steps", type: "string[]", required: true, description: "Array of step labels" },
      { name: "currentStep", type: "number", required: true, description: "Active step index (0-based)" },
      { name: "variant", type: '"dots" | "line" | "pills"', default: '"dots"', description: "Visual style" },
      { name: "onStepClick", type: "(step: number) => void", description: "Step click handler" },
    ],
    code: `import { StepIndicator } from "@/components/interactive/progress";

<StepIndicator
  steps={["Account", "Profile", "Review", "Complete"]}
  currentStep={1}
  variant="line"
  onStepClick={(i) => setStep(i)}
/>`,
  },
  {
    name: "Circular Progress",
    slug: "circular-progress",
    category: "interactive",
    description: "SVG circular progress ring with spring-animated stroke, configurable size and stroke width, and optional center content.",
    tags: ["circular", "progress", "ring", "svg", "spring", "animated", "donut"],
    isNew: true,
    props: [
      { name: "value", type: "number", required: true, description: "Current progress value" },
      { name: "max", type: "number", default: "100", description: "Maximum value" },
      { name: "size", type: "number", default: "80", description: "Diameter in pixels" },
      { name: "strokeWidth", type: "number", default: "6", description: "Stroke width" },
      { name: "showValue", type: "boolean", default: "true", description: "Show percentage in center" },
      { name: "color", type: "string", default: '"stroke-primary"', description: "Ring color (Tailwind class)" },
      { name: "children", type: "ReactNode", description: "Custom center content" },
    ],
    code: `import { CircularProgress } from "@/components/interactive/progress";

<CircularProgress value={72} size={100} strokeWidth={8} />
<CircularProgress value={100} color="stroke-emerald-500">
  <span className="text-xs">Done</span>
</CircularProgress>`,
  },
  {
    name: "Switch",
    slug: "switch",
    category: "interactive",
    description: "Animated toggle switch with 4 visual variants (default, ios, pill, icon), 3 sizes, and spring-animated thumb. Includes ToggleGroup for segmented control.",
    tags: ["switch", "toggle", "checkbox", "spring", "animated", "ios"],
    isNew: true,
    props: [
      { name: "checked", type: "boolean", required: true, description: "Toggle state" },
      { name: "onChange", type: "(checked: boolean) => void", required: true, description: "State change handler" },
      { name: "variant", type: '"default" | "ios" | "pill" | "icon"', default: '"default"', description: "Visual style" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size preset" },
      { name: "label", type: "string", description: "Label text" },
      { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
      { name: "icons", type: "{ on?: ReactNode; off?: ReactNode }", description: "Custom thumb icons" },
    ],
    code: `import { Switch, ToggleGroup } from "@/components/interactive/switch";

const [on, setOn] = useState(false);
<Switch checked={on} onChange={setOn} variant="ios" label="Dark mode" />

const [view, setView] = useState("Grid");
<ToggleGroup options={["Grid", "List", "Board"]} value={view} onChange={setView} />`,
  },
  {
    name: "Swipe Cards",
    slug: "swipe-cards",
    category: "interactive",
    description: "Tinder-style swipe card stack with drag physics, rotation, directional overlays (LIKE/NOPE), and depth-stacked cards behind the active card.",
    tags: ["swipe", "cards", "tinder", "drag", "gesture", "stack", "animated"],
    isNew: true,
    props: [
      { name: "cards", type: "SwipeCard[]", required: true, description: "Array of cards with id and content" },
      { name: "onSwipe", type: "(card, direction) => void", description: "Called when card is swiped" },
      { name: "onEmpty", type: "() => void", description: "Called when all cards exhausted" },
      { name: "threshold", type: "number", default: "120", description: "Swipe threshold in pixels" },
      { name: "rotationIntensity", type: "number", default: "15", description: "Max rotation degrees" },
      { name: "labels", type: "{ left?: string; right?: string }", default: '{ left: "NOPE", right: "LIKE" }', description: "Overlay labels" },
    ],
    code: `import { SwipeCards } from "@/components/interactive/swipe-cards";

<SwipeCards
  cards={[
    { id: "1", content: <div className="p-8">Card 1</div> },
    { id: "2", content: <div className="p-8">Card 2</div> },
    { id: "3", content: <div className="p-8">Card 3</div> },
  ]}
  onSwipe={(card, dir) => console.log(card.id, dir)}
/>`,
  },
  {
    name: "Sortable List",
    slug: "sortable-list",
    category: "interactive",
    description: "Drag-and-drop reorderable list using Framer Motion's Reorder API with drag handle, removable items, and spring exit animations.",
    tags: ["sortable", "drag", "reorder", "list", "dnd", "spring", "animated"],
    isNew: true,
    props: [
      { name: "items", type: "SortableItem[]", required: true, description: "Array of items with id and content" },
      { name: "onReorder", type: "(items) => void", required: true, description: "Called when items are reordered" },
      { name: "axis", type: '"y" | "x"', default: '"y"', description: "Reorder axis" },
      { name: "showHandle", type: "boolean", default: "true", description: "Show drag handle icon" },
      { name: "removable", type: "boolean", default: "false", description: "Enable remove button" },
      { name: "onRemove", type: "(item) => void", description: "Called when item is removed" },
    ],
    code: `import { SortableList } from "@/components/interactive/sortable-list";

const [items, setItems] = useState([
  { id: "1", content: <span>First item</span> },
  { id: "2", content: <span>Second item</span> },
  { id: "3", content: <span>Third item</span> },
]);

<SortableList items={items} onReorder={setItems} removable onRemove={(item) => {
  setItems((prev) => prev.filter((i) => i.id !== item.id));
}} />`,
  },
  {
    name: "Animated Counter",
    slug: "animated-counter",
    category: "interactive",
    description: "Spring-animated number counter with format options (number, currency, percent, compact) and animate-on-view. Includes StatCard preset with trend indicators.",
    tags: ["counter", "number", "ticker", "spring", "animated", "stat", "dashboard"],
    isNew: true,
    props: [
      { name: "value", type: "number", required: true, description: "Target number to animate to" },
      { name: "format", type: '"number" | "currency" | "percent" | "compact"', default: '"number"', description: "Number formatting" },
      { name: "currency", type: "string", default: '"$"', description: "Currency symbol" },
      { name: "decimals", type: "number", default: "0", description: "Decimal places" },
      { name: "prefix", type: "string", description: "Text before number" },
      { name: "suffix", type: "string", description: "Text after number" },
      { name: "animateOnView", type: "boolean", default: "true", description: "Animate when scrolled into view" },
      { name: "springConfig", type: "{ stiffness, damping, mass? }", description: "Spring physics config" },
    ],
    code: `import { AnimatedCounter, StatCard } from "@/components/interactive/animated-counter";

<AnimatedCounter value={12847} format="compact" />
<AnimatedCounter value={99.7} format="percent" decimals={1} />
<AnimatedCounter value={4250} format="currency" />

<StatCard
  value={12847}
  label="Total Users"
  format="compact"
  trend={{ value: 12.5, label: "vs last month" }}
/>`,
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return componentRegistry.find((c) => c.slug === slug);
}

export function getComponentsByCategory(category: string): ComponentMeta[] {
  return componentRegistry.filter((c) => c.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(componentRegistry.map((c) => c.category)));
}

export function getNewComponents(): ComponentMeta[] {
  return componentRegistry.filter((c) => c.isNew);
}

export function getPremiumComponents(): ComponentMeta[] {
  return componentRegistry.filter((c) => c.isPremium);
}

export function searchComponents(query: string): ComponentMeta[] {
  const lower = query.toLowerCase();
  return componentRegistry.filter(
    (c) =>
      c.name.toLowerCase().includes(lower) ||
      c.description.toLowerCase().includes(lower) ||
      c.tags.some((t) => t.includes(lower))
  );
}

export function getAllSlugs(): { category: string; slug: string }[] {
  return componentRegistry.map((c) => ({ category: c.category, slug: c.slug }));
}

export function getRelatedComponents(slug: string, limit = 4): ComponentMeta[] {
  const component = getComponentBySlug(slug);
  if (!component) return [];

  return componentRegistry
    .filter((c) => c.slug !== slug)
    .map((c) => ({
      component: c,
      score:
        (c.category === component.category ? 3 : 0) +
        c.tags.filter((t) => component.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.component);
}
