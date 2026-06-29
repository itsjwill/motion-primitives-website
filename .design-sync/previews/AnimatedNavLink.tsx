import React from "react";
import { AnimatedNavLink } from "motioncraft";
export function Variants() {
  return (
    <div style={{ padding: 40, display: "flex", gap: 36, alignItems: "center", fontSize: 16, fontWeight: 500 }}>
      <AnimatedNavLink href="#" variant="underline">Work</AnimatedNavLink>
      <AnimatedNavLink href="#" variant="highlight">Studio</AnimatedNavLink>
      <AnimatedNavLink href="#" variant="bracket">About</AnimatedNavLink>
      <AnimatedNavLink href="#" variant="fill">Contact</AnimatedNavLink>
    </div>
  );
}
