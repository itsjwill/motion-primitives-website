import React from "react";

// Preview wrapper: motioncraft tokens are scoped to [data-direction] + .dark.
// Components only resolve their CSS vars inside this wrapper.
// No forced height/padding — so a content-less component collapses and the
// converter's floor-card swap fires (height<2) instead of rendering a blank box.
// Authored previews supply their own padding/layout.
export function DirectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div data-direction="luxury" className="dark" style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
      {children}
    </div>
  );
}
