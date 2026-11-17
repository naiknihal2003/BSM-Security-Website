import Image from "next/image";
import { logo } from "@/lib/media";

/**
 * BSM mark: a chamfered shield cut from the same geometry as the site's
 * corner ticks. Retained for places that need a monochrome vector mark.
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

/**
 * The official BSM logo. Square artwork rendered at its native 1:1 ratio —
 * never stretched, cropped or recoloured. The artwork carries its own yellow
 * keyline, so no extra border is added around it.
 */
export function Logo({
  className = "",
  size = 48,
  priority = false,
  imgClassName,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
  /** Tailwind width classes; when set, they replace the fixed pixel width. */
  imgClassName?: string;
}) {
  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={size}
        height={size}
        priority={priority}
        sizes={`${size}px`}
        className={`block h-auto object-contain ${imgClassName ?? ""}`}
        style={imgClassName ? undefined : { width: size }}
      />
    </span>
  );
}
