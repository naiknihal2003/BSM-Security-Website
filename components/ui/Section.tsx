import type { ElementType, ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  bleed = false,
  label,
  fill = false,
}: {
  children: ReactNode;
  className?: string;
  /** Also marks the section as a shortcut target (data-anchor). */
  id?: string;
  as?: ElementType;
  bleed?: boolean;
  label?: string;
  /**
   * Desktop: exactly the screen height left below the sticky navbar and
   * shortcut bar, with the content centred — so the section is seen whole
   * when a shortcut lands on it, and never needs scrolling within.
   */
  fill?: boolean;
}) {
  return (
    <Tag
      id={id}
      data-anchor={id ? "" : undefined}
      aria-label={label}
      className={`relative border-t border-line ${
        fill
          ? "py-24 md:py-28 lg:flex lg:min-h-[calc(100svh-var(--nav-h)-var(--subnav-h)-1.5rem)] lg:flex-col lg:justify-center lg:py-[clamp(1.5rem,4svh,3rem)]"
          : "section-pad"
      } ${className}`}
    >
      {/* Section divider: a brass hairline that fades across the top edge, so
          one section visibly ends before the next begins. */}
      <span
        className="section-divider pointer-events-none absolute inset-x-0 top-0"
        aria-hidden="true"
      />
      {bleed ? children : <div className="shell w-full">{children}</div>}
    </Tag>
  );
}

/** Numbered section label: a pill carrying the mono counter and the eyebrow. */
export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div
      className="inline-flex h-10 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.025] pl-1.5 pr-4"
      data-reveal="up"
    >
      {index ? (
        <span className="grid h-7 min-w-7 place-items-center rounded-full bg-brass/12 px-2 font-mono text-[10px] tracking-[0.12em] text-brass">
          {index}
        </span>
      ) : (
        <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-brass" aria-hidden="true" />
      )}
      <span className="eyebrow">{children}</span>
    </div>
  );
}

export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag data-split className={`text-display font-semibold text-bone ${className}`}>
      {children}
    </Tag>
  );
}

export function Lead({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p data-reveal="up" className={`text-lead text-mist ${className}`}>
      {children}
    </p>
  );
}
