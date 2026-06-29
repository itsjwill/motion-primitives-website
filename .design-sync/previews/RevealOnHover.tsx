import React from "react";
import { RevealOnHover } from "motioncraft";
const img =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='200'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23d4af37'/><stop offset='1' stop-color='%23111'/></linearGradient></defs><rect width='320' height='200' fill='url(%23g)'/></svg>`
  );
export function Default() {
  return (
    <div style={{ padding: 64, fontSize: 40, fontWeight: 700 }}>
      <RevealOnHover text="Hover to reveal" imageSrc={img} imageAlt="Preview" imageWidth={320} imageHeight={200} />
    </div>
  );
}
