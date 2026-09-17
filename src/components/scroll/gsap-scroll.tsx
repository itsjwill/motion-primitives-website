"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// =============================================================================
// Pinned Section - Section that pins while content animates
// =============================================================================

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  pinDuration?: number; // How long to pin (in viewport heights)
  scrub?: boolean | number;
  markers?: boolean;
}

export function PinnedSection({
  children,
  className,
  pinDuration = 2,
  scrub = true,
  markers = false,
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${pinDuration * 100}%`,
      pin: content,
      scrub: scrub,
      markers: markers,
    });

    return () => {
      trigger.kill();
    };
  }, [pinDuration, scrub, markers]);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${(pinDuration + 1) * 100}vh` }}
    >
      <div ref={contentRef} className="w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// Horizontal Scroll Section - Timeline-based horizontal scroll with pinning
// =============================================================================

interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
  scrub?: boolean | number;
  markers?: boolean;
  ease?: string;
}

export function HorizontalScrollSection({
  children,
  className,
  scrub = 1,
  markers = false,
  ease = "none",
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!container || !wrapper || !panel) return;

    // Get the total scrollable width
    const scrollWidth = panel.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = scrollWidth - viewportWidth;

    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: wrapper,
        scrub: scrub,
        markers: markers,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(panel, {
      x: -scrollDistance,
      ease: ease,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [scrub, markers, ease]);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div ref={wrapperRef} className="h-screen overflow-hidden">
        <div ref={panelRef} className="flex h-full items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Scrub Animation - Element animates based on scroll position
// =============================================================================

interface ScrubAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: "fade" | "scale" | "rotate" | "slideX" | "slideY" | "custom";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
}

export function ScrubAnimation({
  children,
  className,
  animation = "fade",
  from,
  to,
  start = "top bottom",
  end = "bottom top",
  scrub = true,
  markers = false,
}: ScrubAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Predefined animation presets
    const presets: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      scale: {
        from: { scale: 0.5, opacity: 0 },
        to: { scale: 1, opacity: 1 },
      },
      rotate: {
        from: { rotation: -180, opacity: 0 },
        to: { rotation: 0, opacity: 1 },
      },
      slideX: {
        from: { x: -100, opacity: 0 },
        to: { x: 0, opacity: 1 },
      },
      slideY: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1 },
      },
      custom: {
        from: from || {},
        to: to || {},
      },
    };

    const preset = presets[animation] || presets.fade;

    gsap.set(element, preset.from);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: start,
      end: end,
      scrub: scrub,
      markers: markers,
      onUpdate: (self) => {
        const progress = self.progress;
        const current: gsap.TweenVars = {};

        // Interpolate between from and to values
        Object.keys(preset.to).forEach((key) => {
          const fromVal = preset.from[key as keyof gsap.TweenVars] as number;
          const toVal = preset.to[key as keyof gsap.TweenVars] as number;
          if (typeof fromVal === "number" && typeof toVal === "number") {
            current[key as keyof gsap.TweenVars] = fromVal + (toVal - fromVal) * progress;
          }
        });

        gsap.set(element, current);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [animation, from, to, start, end, scrub, markers]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// =============================================================================
// Parallax Layers - Multiple layers moving at different speeds
// =============================================================================

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, where 0 is no movement
  direction?: "vertical" | "horizontal";
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  direction = "vertical",
}: ParallaxLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const movement = speed * 100;
    const axis = direction === "vertical" ? "y" : "x";

    gsap.to(layer, {
      [axis]: -movement,
      ease: "none",
      scrollTrigger: {
        trigger: layer.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === layer.parentElement) t.kill();
      });
    };
  }, [speed, direction]);

  return (
    <div ref={layerRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxContainer({ children, className }: ParallaxContainerProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}

// =============================================================================
// Scroll Progress Animation - Animate based on scroll progress
// =============================================================================

interface ScrollProgressAnimationProps {
  children: (progress: number) => ReactNode;
  className?: string;
  start?: string;
  end?: string;
}

export function ScrollProgressAnimation({
  children,
  className,
  start = "top bottom",
  end = "bottom top",
}: ScrollProgressAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(undefined);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: start,
      end: end,
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          // Force re-render by dispatching custom event
          container.dispatchEvent(new CustomEvent("progressupdate", {
            detail: { progress: progressRef.current },
          }));
        });
      },
    });

    return () => {
      trigger.kill();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [start, end]);

  return (
    <div ref={containerRef} className={className}>
      {children(progressRef.current)}
    </div>
  );
}

// =============================================================================
// Reveal On Scroll - Elements reveal as they enter viewport
// =============================================================================

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  direction = "up",
  distance = 50,
  duration = 0.8,
  delay = 0,
  stagger = 0.1,
  once = true,
}: RevealOnScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.children;
    const directionMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
    };

    gsap.set(elements, {
      opacity: 0,
      ...directionMap[direction],
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: "power2.out",
        });
      },
      onLeaveBack: once
        ? undefined
        : () => {
            gsap.set(elements, {
              opacity: 0,
              ...directionMap[direction],
            });
          },
      once: once,
    });

    return () => {
      trigger.kill();
    };
  }, [direction, distance, duration, delay, stagger, once]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

// =============================================================================
// Text Reveal Scrub - Text that reveals character by character on scroll
// =============================================================================

interface TextRevealScrubProps {
  text: string;
  className?: string;
  start?: string;
  end?: string;
}

export function TextRevealScrub({
  text,
  className,
  start = "top 80%",
  end = "bottom 20%",
}: TextRevealScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll("span");

    gsap.set(chars, { opacity: 0.2 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: start,
      end: end,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        chars.forEach((char, i) => {
          const charProgress = (progress * chars.length - i) / 1;
          const opacity = Math.max(0.2, Math.min(1, charProgress));
          gsap.set(char, { opacity });
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text, start, end]);

  return (
    <div ref={containerRef} className={className}>
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

// =============================================================================
// Counter Animation - Numbers that count up/down on scroll
// =============================================================================

interface CounterAnimationProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CounterAnimation({
  from = 0,
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CounterAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const number = numberRef.current;
    if (!container || !number) return;

    const obj = { value: from };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: to,
          duration: duration,
          ease: "power1.out",
          onUpdate: () => {
            number.textContent = prefix + obj.value.toFixed(decimals) + suffix;
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [from, to, duration, prefix, suffix, decimals]);

  return (
    <div ref={containerRef} className={className}>
      <span ref={numberRef}>
        {prefix}
        {from.toFixed(decimals)}
        {suffix}
      </span>
    </div>
  );
}

// =============================================================================
// Split Screen Scroll - Two sections that scroll at different rates
// =============================================================================

interface SplitScreenScrollProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
  className?: string;
  leftSpeed?: number;
  rightSpeed?: number;
}

export function SplitScreenScroll({
  leftContent,
  rightContent,
  className,
  leftSpeed = 0.5,
  rightSpeed = 1,
}: SplitScreenScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!container || !left || !right) return;

    // Set up parallax for left side
    gsap.to(left, {
      y: () => (1 - leftSpeed) * container.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Set up parallax for right side
    gsap.to(right, {
      y: () => (1 - rightSpeed) * container.offsetHeight,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [leftSpeed, rightSpeed]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="grid grid-cols-2 gap-0">
        <div ref={leftRef} className="will-change-transform">
          {leftContent}
        </div>
        <div ref={rightRef} className="will-change-transform">
          {rightContent}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Zoom Scroll - Element that zooms based on scroll
// =============================================================================

interface ZoomScrollProps {
  children: ReactNode;
  className?: string;
  fromScale?: number;
  toScale?: number;
  start?: string;
  end?: string;
}

export function ZoomScroll({
  children,
  className,
  fromScale = 0.5,
  toScale = 1,
  start = "top bottom",
  end = "center center",
}: ZoomScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      { scale: fromScale, opacity: 0 },
      {
        scale: toScale,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === element) t.kill();
      });
    };
  }, [fromScale, toScale, start, end]);

  return (
    <div ref={elementRef} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
