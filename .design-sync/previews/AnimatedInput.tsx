import React from "react";
import { AnimatedInput } from "motioncraft";
export function Variants() {
  return (
    <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 28, maxWidth: 420 }}>
      <AnimatedInput label="Email address" variant="underline" />
      <AnimatedInput label="Full name" variant="border" />
      <AnimatedInput label="Company" variant="filled" />
    </div>
  );
}
