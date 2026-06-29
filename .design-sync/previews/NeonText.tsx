import React from "react";
import { NeonText } from "motioncraft";
export function Palette() {
  return (
    <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 18, fontSize: 40, fontWeight: 700 }}>
      <NeonText color="cyan">Cyan Signal</NeonText>
      <NeonText color="purple">Purple Haze</NeonText>
      <NeonText color="pink">Pink Pulse</NeonText>
      <NeonText color="green">Green Room</NeonText>
    </div>
  );
}
