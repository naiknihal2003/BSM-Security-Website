"use client";

import { cloneElement, isValidElement, useRef, useState, type ReactElement } from "react";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { site, services } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

const AREAS = [
  "North Goa",
  "South Goa",
  "Panaji / capital region",
  "Industrial estate",
  "Other / multiple sites",
];

const field =
  "w-full border border-line bg-void px-4 py-3.5 text-sm text-bone placeholder:text-dim focus:border-brass focus:outline-none focus:ring-0 transition-colors duration-300";
const labelCls =
  "block font-mono text-[10px] uppercase tracking-[0.2em] text-dim";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = "Please tell us your name.";
    if (!data.phone?.trim() && !data.email?.trim())
      next.phone = "Leave a phone number or an email so we can reply.";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "That email address does not look right.";
    if (!data.message?.trim()) next.message = "Tell us briefly what needs protecting.";
    if (!data.consent) next.consent = "We need your permission to reply to this enquiry.";

    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 501) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-brass/40 bg-ink p-10" role="status">
        <Check className="h-6 w-6 text-brass" strokeWidth={1.5} />
        <h3 className="mt-6 font-display text-title font-semibold text-bone">Enquiry received.</h3>
        <p className="mt-4 max-w-md text-mist">
          Thank you. We will come back to you to arrange a site survey. If it is urgent, call the
          number on this page rather than waiting on email.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-brass underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot: bots fill this, people never see it. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company-website">Do not fill this in</label>
        <input id="company-website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name *" error={errors.name}>
          <input id="name" name="name" autoComplete="name" className={field} placeholder="Your name" />
        </Field>
        <Field id="organisation" label="Organisation">
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            className={field}
            placeholder="Company, society or venue"
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            className={field}
            placeholder="+91"
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            placeholder="you@example.com"
          />
        </Field>
        <Field id="area" label="Where is the site?">
          <select id="area" name="area" className={field} defaultValue="">
            <option value="" disabled>
              Select an area
            </option>
            {AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field id="service" label="Service required">
          <select id="service" name="service" className={field} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field id="message" label="What needs protecting? *" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={`${field} resize-y`}
          placeholder="Site type, hours to be covered, number of entry points, and anything that has already gone wrong."
        />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
          <input
            type="checkbox"
            name="consent"
            value="yes"
            aria-describedby={errors.consent ? "consent-error" : undefined}
            aria-invalid={errors.consent ? true : undefined}
            className="mt-1 h-4 w-4 shrink-0 appearance-none border border-line bg-void checked:border-brass checked:bg-brass focus:outline-brass"
          />
          <span>
            I agree that BSM may contact me about this enquiry using the details above. *
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-alert">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send enquiry"}
        </Button>
        {status === "sending" && (
          <Loader2 className="h-4 w-4 animate-spin text-brass" aria-hidden="true" />
        )}
      </div>

      <div aria-live="polite">
        {status === "unconfigured" && (
          <Notice tone="warn" title="Form delivery is not connected yet.">
            This enquiry form is built and validated, but no delivery endpoint has been configured
            for it yet (see the README). Until it is, please email{" "}
            <a href={site.contact.emailHref} className="text-brass underline underline-offset-4">
              {site.contact.email}
            </a>{" "}
            or message us on WhatsApp — both reach BSM directly.
          </Notice>
        )}
        {status === "error" && (
          <Notice tone="warn" title="That did not send.">
            Something went wrong on our side. Please call{" "}
            <a href={site.contact.phoneHref} className="text-brass underline underline-offset-4">
              {site.contact.phone}
            </a>{" "}
            or try again in a moment.
          </Notice>
        )}
      </div>

      <p className="text-xs leading-relaxed text-dim">
        Fields marked * are required. Enquiry details are used only to respond to your enquiry.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  // The description and invalid state belong on the control itself, not on a
  // wrapper, or assistive technology never announces them.
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        "aria-describedby": error ? `${id}-error` : undefined,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div>
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="mt-2">{control}</div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function Notice({
  tone,
  title,
  children,
}: {
  tone: "warn";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mt-2 flex gap-4 border border-line bg-ink p-6 ${tone === "warn" ? "" : ""}`}>
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brass" strokeWidth={1.5} />
      <div>
        <p className="font-display text-base font-semibold text-bone">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-mist">{children}</p>
      </div>
    </div>
  );
}
