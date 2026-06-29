import React from "react";
import { HorizontalScrollSection } from "motioncraft";
export function Panels() {
  return (
    <HorizontalScrollSection className="py-10">
      <div style={{ display: "flex", gap: 24, padding: "0 32px" }}>
        {["Discover", "Design", "Develop", "Deliver"].map((t) => (
          <div key={t} className="rounded-2xl" style={{ minWidth: 260, height: 160, background: "#161616", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>{t}</div>
        ))}
      </div>
    </HorizontalScrollSection>
  );
}
