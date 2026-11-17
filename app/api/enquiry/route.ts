import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * Delivery is by email, server-side, through the Resend API. Nothing is ever
 * reported as sent unless the provider has accepted the message for delivery:
 * a missing configuration returns 501 and a failed send returns 502, and the
 * form states plainly in both cases that the enquiry has NOT reached BSM.
 *
 * Configuration (see .env.example):
 *   RESEND_API_KEY      server-only; never exposed to the client
 *   ENQUIRY_FROM_EMAIL  a sender verified with Resend
 *   ENQUIRY_TO_EMAIL    defaults to contact@bsmsecurityagency.com
 *
 * ENQUIRY_WEBHOOK_URL is still honoured as a fallback for deployments that
 * forward enquiries to a CRM or chat webhook instead of email.
 */

export const runtime = "nodejs";

const DEFAULT_TO = "contact@bsmsecurityagency.com";

/** Rate limit: per-instance and best-effort, a speed bump rather than a wall. */
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < RATE_LIMIT.windowMs)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT.max;
}

type Enquiry = {
  /** The only two fields the form collects. */
  phone?: string;
  message?: string;
  /** Honeypot. */
  company_website?: string;
  /** Milliseconds between the form opening and submission. */
  elapsedMs?: number;
};

/**
 * Indian mobile number: ten digits beginning 6-9, optionally carrying the
 * +91 country code. Mirrors isIndianMobile() in
 * components/sections/EnquiryForm.tsx.
 */
function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` : null;
}

function clean(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Enquiry;
  try {
    body = (await request.json()) as Enquiry;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  /* ---- Spam protection -------------------------------------------------- */

  // Honeypot — quietly accept and discard, so a bot learns nothing.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  // Submitted implausibly fast to have been typed by a person.
  if (typeof body.elapsedMs === "number" && body.elapsedMs >= 0 && body.elapsedMs < 1500) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  /* ---- Validation (server side, independent of the client) -------------- */

  const rawPhone = clean(body.phone, 50);
  const message = clean(body.message, 5000);

  if (!rawPhone) {
    return NextResponse.json({ error: "A contact number is required." }, { status: 422 });
  }
  const phone = normalisePhone(rawPhone);
  if (!phone) {
    return NextResponse.json(
      { error: "Enter a 10-digit Indian mobile number, starting 6, 7, 8 or 9." },
      { status: 422 },
    );
  }

  const payload = {
    source: "bsm-website",
    form: "request-security",
    receivedAt: new Date().toISOString(),
    phone,
    message,
  };

  /* ---- Delivery --------------------------------------------------------- */

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL || DEFAULT_TO;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (!apiKey || !from) {
    // No email provider configured. Fall back to a webhook if one is set,
    // otherwise say so rather than pretending the enquiry was delivered.
    if (!webhook) {
      return NextResponse.json(
        {
          error: "not_configured",
          detail:
            "Set RESEND_API_KEY and ENQUIRY_FROM_EMAIL (and optionally ENQUIRY_TO_EMAIL) to deliver enquiries by email. See README.md.",
        },
        { status: 501 },
      );
    }
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch (error) {
      console.error("Enquiry forwarding failed", error);
      return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
    }
  }

  const rows: [string, string][] = [
    ["Contact number", payload.phone],
    ["Received", payload.receivedAt],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Enquiry:",
    payload.message || "(none provided)",
  ].join("\n");

  const html = [
    '<div style="font-family:Helvetica,Arial,sans-serif;color:#111;line-height:1.6">',
    '<h2 style="margin:0 0 16px">New enquiry from the BSM website</h2>',
    '<table cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:14px">',
    ...rows.map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #eee;color:#666">${escapeHtml(k)}</td>` +
        `<td style="border-bottom:1px solid #eee"><strong>${escapeHtml(v)}</strong></td></tr>`,
    ),
    "</table>",
    '<h3 style="margin:24px 0 8px;font-size:14px;color:#666">Enquiry</h3>',
    `<p style="white-space:pre-wrap;font-size:14px">${
      escapeHtml(payload.message) || "<em>(none provided)</em>"
    }</p>`,
    "</div>",
  ].join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Request Security — ${payload.phone}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Resend responded ${res.status} ${detail.slice(0, 300)}`);
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry email delivery failed", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
