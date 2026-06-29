import React from "react";
import { Hamburger } from "motioncraft";
const noop = () => {};
export function States() {
  return (
    <div style={{ padding: 48, display: "flex", gap: 48, alignItems: "center" }}>
      <Hamburger isOpen={false} onClick={noop} variant="cross" size="md" />
      <Hamburger isOpen={true} onClick={noop} variant="cross" size="md" />
      <Hamburger isOpen={false} onClick={noop} variant="arrow" size="md" />
    </div>
  );
}
