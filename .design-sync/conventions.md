## motioncraft — how to build with these components

motioncraft is a Tailwind-based animation/UI library (GSAP + Framer Motion + Lenis). 201 components: buttons, cards, text effects, backgrounds, layout, navigation, scroll/parallax, transitions, preloaders.

### Required wrapper — tokens are direction-scoped

Every visual token in this DS is a CSS variable scoped to a `[data-direction]` ancestor plus the `.dark`/light class. **Wrap your app (or any tree using these components) in a direction root, or everything renders unstyled** (the `var(--*)` tokens resolve to nothing):

```jsx
<div data-direction="luxury" className="dark">
  {/* motioncraft components here */}
</div>
```

There are **4 directions**, each a complete visual system — switch the attribute to restyle the whole tree:

- `luxury` — black / ivory / gold, ultra-thin uppercase type (default)
- `cyberpunk` — cyan / magenta neon, monospace, hard edges
- `kinetic` — energetic, motion-forward
- `freestyle` — expressive / experimental

### Styling idiom — CSS variables first

The shipped stylesheet is a **purged** Tailwind build: only the utility classes the library itself uses are present. So the durable way to style is the **CSS variables** (always defined in every `[data-direction]` block), via inline style or Tailwind arbitrary values:

```jsx
<div style={{ background: "hsl(var(--surface))", color: "hsl(var(--foreground))", borderRadius: "var(--radius-md)" }}>
```

Color tokens are **HSL triples** — always wrap in `hsl(var(--…))`. Available color tokens: `--background --foreground --primary --primary-foreground --secondary --muted --muted-foreground --accent --accent-foreground --border --surface --glow`. Layout/typography tokens (raw values, no `hsl()`): `--radius-sm/md/lg/full --space-section --space-block --heading-weight --heading-tracking --button-padding --button-radius --nav-height --container-max --transition-duration --transition-ease`.

These library utility classes are also compiled in and safe to use: `bg-background bg-surface bg-accent text-foreground text-accent text-muted-foreground border-border font-heading`. Beyond these, prefer `hsl(var(--token))` over inventing new Tailwind classes (they won't be in the purged CSS).

### Component API

Every component takes `className` and composes normally. Read each component's `<Name>.d.ts` for its props and `<Name>.prompt.md` for usage before composing. The full token definitions live in the bound `styles.css` → `_ds_bundle.css` (`[data-direction]` blocks).

### Idiomatic example

```jsx
import { GradientText, IconButton, Section } from "motioncraft";

export default function Hero() {
  return (
    <div data-direction="luxury" className="dark" style={{ background: "hsl(var(--background))" }}>
      <Section className="px-12 py-16">
        <GradientText animate className="text-6xl font-bold tracking-tight">
          Build award-winning sites
        </GradientText>
        <p className="mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
          Motion that feels alive on every scroll.
        </p>
        <IconButton icon={<BoltIcon />} label="Get started" variant="solid" />
      </Section>
    </div>
  );
}
```
