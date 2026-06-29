// Shim for next/navigation — no Next router in the portable bundle.
export function usePathname() { return "/"; }
export function useRouter() {
  const noop = () => {};
  return { push: noop, replace: noop, back: noop, forward: noop, prefetch: noop, refresh: noop };
}
export function useSearchParams() { return new URLSearchParams(); }
export function useParams() { return {} as Record<string, string>; }
export function useSelectedLayoutSegment() { return null; }
export function useSelectedLayoutSegments() { return [] as string[]; }
export function redirect() {}
export function notFound() {}
