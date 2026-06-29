# design-sync notes — motioncraft

## Shape: package / synth-from-src (this is a Next.js app, not a built library)

motioncraft ships no `dist/` and `package.json` has no `main`/`module`/`exports`. The bundle is **synthesized from `src/components`**. Key rigging:

- **Self-package symlink** — `node_modules/motioncraft` is a symlink to the repo root so the converter resolves `PKG_DIR` to the source. Recreate on a fresh clone:
  `ln -sfn "$PWD" node_modules/motioncraft`
- **Curated source root** — `cfg.srcDir = .design-sync/srcroot` is a **copy** of `src/components` with non-visual / non-bundlable groups removed. Regenerate before every build:
  ```sh
  rm -rf .design-sync/srcroot && cp -r src/components .design-sync/srcroot
  rm -rf .design-sync/srcroot/seo .design-sync/srcroot/docs .design-sync/srcroot/index.ts
  # r3f components drag react-reconciler→scheduler into the shared IIFE (converter's scheduler shim throws) — exclude:
  rm -f .design-sync/srcroot/three/{floating-shapes,globe,scroll-progress-3d,neural-network,particle-morph}.tsx \
        .design-sync/srcroot/backgrounds/shader-backgrounds.tsx
  ```
- **Compiled Tailwind** — `cfg.cssEntry = .design-sync/compiled.css` is generated (globals.css has only `@tailwind` directives). Regenerate before every build:
  `npx tailwindcss -i src/app/globals.css -o .design-sync/compiled.css`
  (Note: it's a **purged** build — only classes the components use ship. The `--token` CSS vars in the `[data-direction]` blocks always ship; that's the durable styling surface — see conventions.md.)

`compiled.css` and `srcroot/` are **gitignored** (regenerated each sync). The symlink is gitignored too.

## next/* shims — do NOT set cfg.tsconfig

Two files import `next/link` + `next/navigation` (`navigation/index.tsx`, `transitions/page-transition.tsx`). Unshimmed, `next/link`'s `process.env.__NEXT_*` references throw `process is not defined` at bundle eval and poison **all** components.

Fix: `.design-sync/tsconfig.json` (committed) aliases `next/link`→shim, `next/navigation`→shim, and keeps the `@/*` paths. esbuild **auto-discovers** it (it sits one level above `srcroot`), so it resolves both the shims and `@/` correctly.

**`cfg.tsconfig` is intentionally UNSET.** The converter's `tsconfigPathsPlugin` has a directory-resolution bug (matches a barrel dir before `/index`), so a parseable tsconfig there breaks `@/components/*`. The repo's own `tsconfig.json` only "works" because the plugin fails to parse it and silently falls back to esbuild-native discovery. Leaving `cfg.tsconfig` unset keeps the buggy plugin off and lets esbuild-native + the adjacent tsconfig do the work.

## Excluded from the sync (importable count = 201 of ~254 source exports)

- **seo** (11) and **docs** (3) groups — `next/og`/server-only, not visual.
- **r3f / Three.js components** — FloatingShapes, Globe, NeuralNetwork, ParticleMorph, ScrollProgress3D, and shader-backgrounds (NoiseGradientBackground, LiquidMetalBackground, WaveDistortionBackground, PlasmaBackground, OrganicBlobBackground, GlitchBackground). They pull `react-reconciler`→`scheduler`, which the converter's `scheduler-shim` throws on (don't fork `lib/bundle.mjs`). These are also non-static (canvas). **To restore them you'd need to fork the scheduler shim to bundle the real `scheduler@0.21.0`.**

## Preview wrapper

`.design-sync/ds-wrapper.tsx` (`DirectionWrapper`, wired via `cfg.provider`) wraps every preview in `<div data-direction="luxury" className="dark">` so the direction-scoped tokens resolve. It deliberately sets **no** min-height/padding — that lets content-less components collapse so the converter's floor-card swap fires instead of rendering blank boxes.

## Authored previews: 23 graded good

19 content components + 4 scroll components. All in `.design-sync/previews/` (committed). Default direction = luxury.

## Known render warns / deferred

- **VideoReveal** — the one `bad`/blank component. Its reveal animation stays hidden without a live scroll/video, so it can't render in a static card. Deliberately left as floor/blank. Importable and works in a real app. Authorable later only with a live video asset.
- **CounterAnimation** — authored with `from === to` so the static card shows the resolved value (the count-up only plays in a scrolled viewport).
- **TextParallax** — static frame catches the parallax mid-offset (text slightly clipped); acceptable as "large kinetic text".

## Re-sync risks (watch-list)

- **Brand fonts not shipped.** `src/lib/fonts.ts` loads 8 Google fonts via `next/font` (Space Grotesk, Inter, JetBrains Mono, IBM Plex Mono, Outfit, DM Sans, Syne, Manrope), setting `--font-*` CSS vars. `next/font` doesn't run in the bundle, so those vars are undefined and type falls back to the literal family names → ultimately **system-ui** (no `@font-face` ships). Previews looked clean in system-ui, but this is a fidelity gap. To fix: author a fonts CSS with Google-Fonts `@import`s + map `--font-luxury-heading` etc., and point `cfg.extraFonts`/`cfg.cssEntry` at it.
- **srcroot/compiled.css are regenerated** — if the three prep commands above aren't run, a fresh clone builds stale/empty. They're gitignored by design.
- **The symlink** `node_modules/motioncraft` must exist (gitignored) — recreate per clone.
- **Component count drift** — new files under `src/components` are auto-picked once srcroot is regenerated; new r3f/server files must be added to the exclusion `rm` list above or the bundle breaks.
- **`general` group is large** — 178 of 201 components land in group `general` because synth-mode src-matching only resolved 40 src paths (multi-export files). Grouping is cosmetic; not worth chasing unless the DS pane needs finer sections (would need `cfg.docsMap`/regroup stubs).
