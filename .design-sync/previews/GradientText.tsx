import React from "react";
import { GradientText } from "motioncraft";

export function Hero() {
  return (
    <div style={{ padding: 48 }}>
      <GradientText animate className="text-6xl font-bold tracking-tight">
        Build award-winning sites
      </GradientText>
    </div>
  );
}

export function Inline() {
  return (
    <div style={{ padding: 48, fontSize: 28, fontWeight: 600 }}>
      Motion that feels <GradientText>alive</GradientText> on every scroll.
    </div>
  );
}
