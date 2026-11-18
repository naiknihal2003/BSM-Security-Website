import type { ReactNode } from "react";

/**
 * Renders a supplied string, giving the listed phrases the brass treatment.
 *
 * The copy itself is never edited here — the phrases are matched verbatim in
 * the text, so a phrase that does not appear simply does not highlight rather
 * than altering what is written.
 */
export function Marked({ text, marks }: { text: string; marks?: readonly string[] }) {
  const phrases = (marks ?? []).filter((m) => text.includes(m));
  if (!phrases.length) return <>{text}</>;

  // Longest first, so an overlapping shorter phrase cannot split a longer one.
  const ordered = [...phrases].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${ordered.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  );

  const parts = text.split(pattern).filter(Boolean);
  const nodes: ReactNode[] = parts.map((part, i) =>
    ordered.includes(part) ? (
      <mark key={i} className="bg-transparent font-medium text-brass">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

  return <>{nodes}</>;
}
