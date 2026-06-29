import React from "react";
import { SplitColorText } from "motioncraft";
export function Duotone() {
  return (
    <div style={{ padding: 48, fontSize: 56, fontWeight: 800 }}>
      <SplitColorText text="MOTIONCRAFT" leftColor="#ffffff" rightColor="#d4af37" splitPosition={50} />
    </div>
  );
}
