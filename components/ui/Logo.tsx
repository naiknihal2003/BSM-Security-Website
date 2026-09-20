/**
 * BSM mark: a chamfered shield cut from the same geometry as the site's
 * corner ticks — sharp, engineered, no soft radii.
 */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M16 1.2 30.4 6.6v13.1c0 7.1-5.4 11.9-14.4 15.1C7 31.6 1.6 26.8 1.6 19.7V6.6L16 1.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M16 7.4 24.6 10.6v8.6c0 4.2-3.3 7.1-8.6 9-5.3-1.9-8.6-4.8-8.6-9v-8.6L16 7.4Z"
        fill="currentColor"
        opacity="0.16"
      />
      <path d="M16 12v11.6M10.6 15.2h10.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-8 w-7 text-brass" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-[-0.03em] text-bone">
          BSM
        </span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-dim">
          Security · Goa
        </span>
      </span>
    </span>
  );
}
