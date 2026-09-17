"use client";

import { Dock, DockItem, DockSeparator } from "@/components/interactive/dock";
import { Marquee, MarqueeItem } from "@/components/interactive/marquee";
import { NumberTicker } from "@/components/interactive/number-ticker";
import { MorphingText, TypingText } from "@/components/interactive/morphing-text";
import { SpotlightCard } from "@/components/interactive/spotlight-card";
import { MagneticButton } from "@/components/interactive/magnetic";
import { RippleButton } from "@/components/interactive/ripple";
import { ConfettiButton } from "@/components/interactive/confetti";
import { LiquidGlass, FrostedPanel } from "@/components/interactive/liquid-glass";
import { GlowingBorder, ShimmerBorder } from "@/components/interactive/border-beam";
import { ScrollReveal, StaggerReveal, TextReveal } from "@/components/interactive/scroll-reveal";
import { AnimatedGridPattern } from "@/components/interactive/wavy-background";
import { AnimatedTabs } from "@/components/interactive/animated-tabs";

// ─── Interactive Components Showcase ────────────────────────────────────────

export function InteractiveShowcase() {
  return (
    <section className="relative py-20 md:py-28 px-6 overflow-hidden">
      {/* Background pattern */}
      <AnimatedGridPattern
        className="text-primary/5 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        numSquares={30}
        maxOpacity={0.3}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-24">
            <p className="text-caption uppercase tracking-widest text-muted-foreground mb-4">
              New in v2.0
            </p>
            <h2 className="text-display-sm font-heading mb-6">
              Interactive{" "}
              <MorphingText
                texts={["Components", "Magic", "Delight", "Fire"]}
                className="text-primary"
              />
            </h2>
            <p className="text-body-lg text-muted-foreground max-w-xl mx-auto">
              <TypingText
                texts={[
                  "15 new components inspired by 21st.dev, MagicUI & Aceternity",
                  "Copy-paste ready. Direction-aware. Zero dependencies.",
                  "Built with Framer Motion. Fully typed. MIT licensed.",
                ]}
                speed={40}
                deleteSpeed={20}
                pauseTime={3000}
              />
            </p>
          </div>
        </ScrollReveal>

        {/* ─── Stats Row ──────────────────────────────────────────── */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {[
              { value: 110, suffix: "+", label: "Components" },
              { value: 4, label: "Design Systems" },
              { value: 20, suffix: "K+", label: "Lines of Code" },
              { value: 0, prefix: "$", label: "Cost (MIT)" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-display-sm font-heading text-foreground">
                  <NumberTicker
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={0.3 + i * 0.15}
                  />
                </div>
                <p className="text-body-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── macOS Dock ─────────────────────────────────────────── */}
        <ScrollReveal variant="fade-up" delay={0.15}>
          <div className="mb-24">
            <h3 className="text-heading-3 font-heading mb-2">Dock</h3>
            <p className="text-body-sm text-muted-foreground mb-6">
              macOS-style magnification dock. Hover to see the magic.
            </p>
            <div className="flex justify-center">
              <Dock magnification={64} distance={140}>
                <DockItem label="Home">
                  <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </DockItem>
                <DockItem label="Search">
                  <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </DockItem>
                <DockItem label="Components">
                  <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                  </svg>
                </DockItem>
                <DockSeparator />
                <DockItem label="Settings">
                  <svg className="w-6 h-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </DockItem>
              </Dock>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Spotlight Cards ────────────────────────────────────── */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-24">
            <h3 className="text-heading-3 font-heading mb-2">Spotlight Cards</h3>
            <p className="text-body-sm text-muted-foreground mb-6">
              Cursor-tracking radial spotlight. Move your mouse around.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: "Backgrounds", count: "12+", desc: "Particles, aurora, gradient mesh, shaders" },
                { title: "Cards", count: "10+", desc: "Tilt, glow, bento, stack, living system" },
                { title: "Scroll FX", count: "15+", desc: "Parallax, video scrub, stagger, reveal" },
              ].map((item, i) => (
                <SpotlightCard key={i}>
                  <p className="text-display-sm font-heading text-primary mb-2">{item.count}</p>
                  <h4 className="text-heading-3 font-heading mb-2">{item.title}</h4>
                  <p className="text-body-sm text-muted-foreground">{item.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Buttons Row ────────────────────────────────────────── */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-24">
            <h3 className="text-heading-3 font-heading mb-2">Interactive Buttons</h3>
            <p className="text-body-sm text-muted-foreground mb-6">
              Magnetic, ripple, and confetti effects. Click them.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticButton>Magnetic Pull</MagneticButton>
              <RippleButton>Click Ripple</RippleButton>
              <ConfettiButton>Celebrate</ConfettiButton>
              <MagneticButton variant="outline">Ghost Magnetic</MagneticButton>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Glass + Border Effects ─────────────────────────────── */}
        <StaggerReveal
          className="grid md:grid-cols-2 gap-6 mb-24"
          variant="fade-up"
          staggerDelay={0.15}
        >
          {[
            <LiquidGlass key="lg" className="p-8">
              <h4 className="text-heading-3 font-heading mb-2">Liquid Glass</h4>
              <p className="text-body-sm text-muted-foreground">
                iOS 26-style liquid glass with 3D tilt refraction. Hover to see the depth.
              </p>
            </LiquidGlass>,
            <GlowingBorder key="gb">
              <div className="p-8">
                <h4 className="text-heading-3 font-heading mb-2">Glowing Border</h4>
                <p className="text-body-sm text-muted-foreground">
                  Animated pulsing glow border. Uses the direction accent color.
                </p>
              </div>
            </GlowingBorder>,
            <ShimmerBorder key="sb">
              <div className="p-8">
                <h4 className="text-heading-3 font-heading mb-2">Shimmer Border</h4>
                <p className="text-body-sm text-muted-foreground">
                  Rotating gradient shimmer around the border. Pure CSS magic.
                </p>
              </div>
            </ShimmerBorder>,
            <FrostedPanel key="fp" className="p-8">
              <h4 className="text-heading-3 font-heading mb-2">Frosted Panel</h4>
              <p className="text-body-sm text-muted-foreground">
                Heavy frosted glass with noise texture overlay. Premium feel.
              </p>
            </FrostedPanel>,
          ]}
        </StaggerReveal>

        {/* ─── Animated Tabs ──────────────────────────────────────── */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-24">
            <h3 className="text-heading-3 font-heading mb-2">Animated Tabs</h3>
            <p className="text-body-sm text-muted-foreground mb-6">
              Smooth layout animations with spring physics.
            </p>
            <AnimatedTabs
              tabs={[
                {
                  id: "components",
                  label: "Components",
                  content: (
                    <div className="rounded-xl border border-border bg-surface/50 p-6">
                      <p className="text-body-sm text-muted-foreground">
                        110+ components across backgrounds, cards, scroll animations, text effects, 3D, buttons, layout, navigation, transitions, and interactive elements.
                      </p>
                    </div>
                  ),
                },
                {
                  id: "directions",
                  label: "Directions",
                  content: (
                    <div className="rounded-xl border border-border bg-surface/50 p-6">
                      <p className="text-body-sm text-muted-foreground">
                        4 complete design systems: Luxury (Rolex/Apple), Cyberpunk (Blade Runner), Kinetic (Stripe/Linear), Freestyle (Brutalist). All runtime-switchable.
                      </p>
                    </div>
                  ),
                },
                {
                  id: "performance",
                  label: "Performance",
                  content: (
                    <div className="rounded-xl border border-border bg-surface/50 p-6">
                      <p className="text-body-sm text-muted-foreground">
                        Lighthouse 90+. Dynamic imports for Three.js. Font swap for web fonts. prefers-reduced-motion support. Code-split animations.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </ScrollReveal>

        {/* ─── Marquee ────────────────────────────────────────────── */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-24">
            <h3 className="text-heading-3 font-heading mb-2">Marquee</h3>
            <p className="text-body-sm text-muted-foreground mb-6">
              Infinite scroll marquee. Pauses on hover.
            </p>
            <div className="space-y-4">
              <Marquee pauseOnHover speed={30}>
                {["GSAP", "Framer Motion", "Three.js", "Lenis", "Tailwind", "TypeScript", "Next.js 14", "React 18"].map((tech) => (
                  <MarqueeItem key={tech}>
                    <span className="text-body-sm font-medium text-foreground">{tech}</span>
                  </MarqueeItem>
                ))}
              </Marquee>
              <Marquee pauseOnHover speed={30} reverse>
                {["Particles", "Aurora", "Tilt Cards", "Spotlight", "Magnetic", "Confetti", "Dock", "Orbit"].map((comp) => (
                  <MarqueeItem key={comp}>
                    <span className="text-body-sm font-medium text-primary">{comp}</span>
                  </MarqueeItem>
                ))}
              </Marquee>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Text Reveal ────────────────────────────────────────── */}
        <ScrollReveal variant="blur-in" delay={0.1}>
          <div className="text-center mb-24">
            <TextReveal
              text="Every component is direction-aware, fully typed, and ready to copy-paste into your project."
              className="text-heading-2 font-heading justify-center"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
