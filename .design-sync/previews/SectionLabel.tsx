import React from "react";
import { SectionLabel } from "motioncraft";
export function Colors() {
  return (
    <div style={{ padding: 40, display: "flex", flexWrap: "wrap", gap: 16 }}>
      <SectionLabel color="blue">Features</SectionLabel>
      <SectionLabel color="purple">Pricing</SectionLabel>
      <SectionLabel color="green">Changelog</SectionLabel>
      <SectionLabel color="orange">Roadmap</SectionLabel>
      <SectionLabel color="pink">Community</SectionLabel>
    </div>
  );
}
