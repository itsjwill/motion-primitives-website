import React from "react";
import { WobbleCard } from "motioncraft";
export function Default() {
  return (
    <div style={{ padding: 40, maxWidth: 460 }}>
      <WobbleCard containerClassName="bg-[#141414] rounded-2xl p-8">
        <h3 className="text-2xl font-bold">Spatial motion</h3>
        <p className="mt-3 opacity-70">A card that wobbles toward the cursor with spring physics.</p>
      </WobbleCard>
    </div>
  );
}
