import React from "react";
import { SnapScrollContainer, SnapSection } from "motioncraft";
export function Vertical() {
  return (
    <SnapScrollContainer direction="vertical" className="h-[260px] overflow-hidden rounded-xl">
      <SnapSection align="center" className="min-h-[260px] flex items-center justify-center bg-[#121212]">
        <span className="text-3xl font-bold">Section one</span>
      </SnapSection>
    </SnapScrollContainer>
  );
}
