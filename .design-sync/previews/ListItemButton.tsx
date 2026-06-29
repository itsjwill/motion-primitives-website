import React from "react";
import { ListItemButton } from "motioncraft";
const Dot = <span style={{ width: 8, height: 8, borderRadius: 99, background: "#d4af37", display: "inline-block" }} />;
export function List() {
  return (
    <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 8, maxWidth: 520 }}>
      <ListItemButton icon={Dot} title="Annual plan" subtitle="Billed yearly" value="$240" chevron />
      <ListItemButton icon={Dot} title="Monthly plan" subtitle="Billed monthly" value="$29" chevron />
      <ListItemButton icon={Dot} title="Team plan" subtitle="Up to 10 seats" value="$99" chevron />
    </div>
  );
}
