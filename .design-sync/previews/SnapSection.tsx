import React from "react";
import { SnapSection } from "motioncraft";
export function Default() {
  return (
    <SnapSection align="center" className="min-h-[220px] flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold tracking-tight">Snap into place</h2>
      <p className="mt-3 opacity-70">A full-viewport section that snaps as you scroll.</p>
    </SnapSection>
  );
}
