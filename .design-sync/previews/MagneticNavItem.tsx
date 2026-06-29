import React from "react";
import { MagneticNavItem } from "motioncraft";
export function Nav() {
  return (
    <div style={{ padding: 40, display: "flex", gap: 40, alignItems: "center", fontSize: 16, fontWeight: 500 }}>
      <MagneticNavItem href="#">Home</MagneticNavItem>
      <MagneticNavItem href="#">Projects</MagneticNavItem>
      <MagneticNavItem href="#">Journal</MagneticNavItem>
    </div>
  );
}
