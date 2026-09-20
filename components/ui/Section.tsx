import type { ElementType, ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  bleed = false,
  label,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  bleed?: boolean;
  label?: string;
}) {
  return (
    <Tag
      id={id}
      aria-label={label}
      className={`relative border-t border-line py-24 md:py-32 lg:py-40 ${className}`}
    >
      {bleed ? children : <div className="shell">{children}</div>}
    </Tag>
  );
}

/** Numbered section label: the mono counter is the site's structural signature. */
export function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4" data-reveal="up">
      {index && <span className="font-mono text-[11px] tracking-[0.2em] text-dim">{index}</span>}
      <span className="h-px w-8 bg-brass" />
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
