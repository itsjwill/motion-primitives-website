import React from "react";

// Shim for next/link — the portable bundle has no Next runtime.
// Renders a plain anchor; absorbs Next-specific props (prefetch, scroll, …).
type Props = {
  href?: string | { pathname?: string };
  children?: React.ReactNode;
  [k: string]: any;
};
export default function Link({ href, children, prefetch, scroll, replace, shallow, passHref, locale, ...rest }: Props) {
  const h = typeof href === "string" ? href : href?.pathname ?? "#";
  return (
    <a href={h} {...rest}>
      {children}
    </a>
  );
}
