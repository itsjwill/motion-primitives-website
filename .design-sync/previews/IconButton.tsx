import React from "react";
import { IconButton } from "motioncraft";

const Bolt = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

export function Variants() {
  return (
    <div style={{ padding: 40, display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
      <IconButton icon={Bolt} label="Solid" variant="solid" />
      <IconButton icon={Bolt} label="Outline" variant="outline" />
      <IconButton icon={Bolt} label="Glass" variant="glass" />
      <IconButton icon={Bolt} label="Ghost" variant="ghost" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ padding: 40, display: "flex", gap: 20, alignItems: "center" }}>
      <IconButton icon={Bolt} variant="solid" size="sm" />
      <IconButton icon={Bolt} variant="solid" size="md" />
      <IconButton icon={Bolt} variant="solid" size="lg" />
    </div>
  );
}
