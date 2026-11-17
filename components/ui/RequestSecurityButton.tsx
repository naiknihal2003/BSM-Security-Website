"use client";

import { useEnquiry } from "@/components/layout/EnquiryModal";
import { Button } from "@/components/ui/Button";

/**
 * The site-wide "Request Security" trigger. Opens the two-field enquiry
 * drawer rather than navigating; the full enquiry form on /contact is still
 * reachable from the Contact Us routes.
 */
export function RequestSecurityButton({
  children = "Request Security",
  variant = "primary",
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "outline" | "quiet";
  className?: string;
}) {
  const { open } = useEnquiry();
  return (
    <Button variant={variant} className={className} onClick={open}>
      {children}
    </Button>
  );
}

/** Flat variant for chrome (navbar, footer) that uses its own styling. */
export function RequestSecurityTrigger({
  className = "",
  onActivate,
  children = "Request Security",
}: {
  className?: string;
  onActivate?: () => void;
  children?: React.ReactNode;
}) {
  const { open } = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => {
        onActivate?.();
        open();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
