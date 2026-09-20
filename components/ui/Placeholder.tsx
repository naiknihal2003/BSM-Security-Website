import type { ReactNode } from "react";

/**
 * Marks information BSM has not supplied yet. Everything bracketed in
 * lib/site.ts is routed through here so unverified content is visually
 * unmistakable — and impossible to confuse with a claim the site is making.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block border-b border-dashed border-brass/60 font-mono text-[0.82em] uppercase tracking-[0.12em] text-brass/90"
      data-placeholder="true"
    >
      {children}
    </span>
  );
}

const BRACKETED = /(\[[^\]]+\])/g;

/**
 * Renders a string, wrapping any [BRACKETED PLACEHOLDER] segments in the
 * placeholder treatment while leaving real copy untouched.
 */
export function Copy({ text, className }: { text: string; className?: string }) {
  const parts = text.split(BRACKETED).filter(Boolean);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <Placeholder key={i}>{part}</Placeholder>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
