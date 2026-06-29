import React from "react";
import { Section } from "motioncraft";

export function Default() {
  return (
    <Section className="px-12 py-16">
      <h2 className="text-4xl font-bold tracking-tight">Section heading</h2>
      <p className="mt-4 text-lg opacity-70 max-w-xl">
        A semantic layout wrapper that applies the direction's section rhythm and spacing tokens.
      </p>
    </Section>
  );
}
