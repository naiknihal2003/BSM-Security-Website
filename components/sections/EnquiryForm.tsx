"use client";

import { useRef, useState } from "react";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

/**
 * Indian mobile number: ten digits beginning 6–9, dialled with +91.
 * Mirrored on the server in app/api/enquiry/route.ts.
 */
export function isIndianMobile(digits: string) {
  return /^[6-9]\d{9}$/.test(digits);
}

const fieldCls =
  "w-full border border-line bg-void px-4 py-3.5 text-sm text-bone placeholder:text-dim focus:border-brass focus:outline-none focus:ring-0 transition-colors duration-300";
const labelCls = "block font-mono text-[10px] uppercase tracking-[0.2em] text-dim";

/**
 * The enquiry form, used both on the contact page and inside the Request
 * Security drawer. Two fields only: a mandatory contact number and an
 * optional free-text enquiry.
 *
 * Delivery is server-side (see /api/enquiry). The success state appears only
 * once the email provider has accepted the message — never on a failure, and
 * never when email delivery is not configured.
 */
export default function EnquiryForm({
  idPrefix = "enquiry",
  rowClass = "",
  onSent,
  children,
}: {
  /** Keeps field ids unique when the form is mounted twice on one page. */
  idPrefix?: string;
  /** Applied to each block, so a parent can stagger them. */
  rowClass?: string;
  onSent?: () => void;
  /** Rendered in the success state, e.g. a Close button. */
  children?: React.ReactNode;
}) {
  const openedAt = useRef(Date.now());
  const phoneRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [phoneError, setPhoneError] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const digits = (data.phone ?? "").replace(/\D/g, "");
    if (!digits) {
      setPhoneError("A contact number is required so we can call you back.");
      phoneRef.current?.focus();
      return;
    }
    if (!isIndianMobile(digits)) {
      setPhoneError("Enter a 10-digit Indian mobile number, starting 6, 7, 8 or 9.");
      phoneRef.current?.focus();
      return;
    }

    setPhoneError("");
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: `+91${digits}`,
          message: data.message ?? "",
          company_website: data.company_website ?? "",
          elapsedMs: Date.now() - openedAt.current,
        }),
      });

      if (res.status === 501) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as { error?: string } | null;
        if (res.status === 422) {
          setPhoneError(payload?.error ?? "Please check the contact number and try again.");
          setStatus("idle");
          phoneRef.current?.focus();
          return;
        }
        setError(
          res.status === 429
            ? "Too many enquiries from this connection. Please try again shortly."
            : "",
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
      onSent?.();
    } catch {
      setError("");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`border-2 border-brass/55 bg-ink p-8 md:p-10 ${rowClass}`} role="status">
        <Check className="h-6 w-6 text-brass" strokeWidth={1.5} />
        <h3 className="mt-6 font-display text-title font-semibold text-bone">Enquiry received.</h3>
        <p className="mt-4 max-w-md text-mist">
          Your enquiry has been delivered. Someone from BSM will call the number you left. If it is
          urgent, call us directly rather than waiting on a call back.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          {children}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass underline underline-offset-4"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot: bots fill this, people never see it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company-website`}>Do not fill this in</label>
        <input
          id={`${idPrefix}-company-website`}
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={rowClass}>
        <label htmlFor={`${idPrefix}-phone`} className={labelCls}>
          Contact number <span className="text-brass">* required</span>
        </label>
        <div
          className={`mt-3 flex items-stretch border ${
            phoneError ? "border-alert" : "border-line"
          } bg-void transition-colors duration-300 focus-within:border-brass`}
        >
          <span
            className="flex shrink-0 items-center border-r border-line px-4 font-mono text-sm text-mist"
            aria-hidden="true"
          >
            +91
          </span>
          <input
            ref={phoneRef}
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={13}
            required
            aria-required="true"
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={phoneError ? `${idPrefix}-phone-error` : `${idPrefix}-phone-hint`}
            onChange={() => phoneError && setPhoneError("")}
            placeholder="Your mobile number"
            className="w-full bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-dim focus:outline-none"
          />
        </div>
        {phoneError ? (
          <p
            id={`${idPrefix}-phone-error`}
            role="alert"
            className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-alert"
          >
            {phoneError}
          </p>
        ) : (
          <p
            id={`${idPrefix}-phone-hint`}
            className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-dim"
          >
            10-digit Indian mobile number
          </p>
        )}
      </div>

      <div className={rowClass}>
        <label htmlFor={`${idPrefix}-message`} className={labelCls}>
          Enquiry
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          maxLength={5000}
          placeholder="Your Enquiry here"
          className={`mt-3 resize-none ${fieldCls}`}
        />
      </div>

      {status === "error" && (
        <div
          role="alert"
          className={`flex items-start gap-3 border border-alert/50 bg-alert/5 p-4 ${rowClass}`}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-alert" strokeWidth={1.5} />
          <p className="text-sm text-mist">
            {error ? (
              error
            ) : (
              <>
                The enquiry could not be delivered, so it has not reached BSM. Please call{" "}
                {site.contact.phone} or email {site.contact.email} instead.
              </>
            )}
          </p>
        </div>
      )}

      {status === "unconfigured" && (
        <div
          role="alert"
          className={`flex items-start gap-3 border border-brass/50 bg-brass/5 p-4 ${rowClass}`}
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
          <p className="text-sm text-mist">
            Email delivery is not configured on this deployment, so this enquiry has{" "}
            <strong className="text-bone">not</strong> been sent. Please call {site.contact.phone}{" "}
            or email {site.contact.email}.
          </p>
        </div>
      )}

      <div className={`flex flex-wrap items-center gap-5 pt-2 ${rowClass}`}>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-3 bg-brass px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-void transition-colors duration-300 hover:bg-brass-lit disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {status === "sending" ? "Sending" : "Send"}
        </button>
      </div>
    </form>
  );
}
