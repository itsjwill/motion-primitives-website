import React from "react";
import { CounterAnimation } from "motioncraft";
// from === to so the static card shows the resolved value (the count-up
// animation only plays in a live, scrolled viewport).
export function Stats() {
  return (
    <div style={{ padding: 48, display: "flex", gap: 64, fontSize: 56, fontWeight: 800 }}>
      <CounterAnimation from={95} to={95} suffix="+" />
      <CounterAnimation from={4} to={4} suffix=" systems" />
      <CounterAnimation from={100} to={100} suffix="%" />
    </div>
  );
}
