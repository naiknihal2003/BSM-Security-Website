import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * There is deliberately no default delivery mechanism: silently accepting an
 * enquiry and dropping it would be worse than telling the visitor the form is
 * not wired up. Set ENQUIRY_WEBHOOK_URL (any endpoint that accepts JSON — an
 * email service, a CRM, a Slack/Teams webhook) and enquiries are forwarded to
 * it. Until then this returns 501 and the form shows the direct phone, email
 * and WhatsApp routes instead.
 */

export const runtime = "nodejs";

type Enquiry = {
  name?: string;
  organisation?: string;
  phone?: string;
  email?: string;
  area?: string;
  service?: string;
  message?: string;
  consent?: string;
  company_website?: string;
};

export async function POST(request: Request) {
  let body: Enquiry;
  try {
    body = (await request.json()) as Enquiry;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — quietly accept and discard.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name?.trim() || !body.message?.trim()) {
    return NextResponse.json({ error: "Name and message are required." }, { status: 422 });
  }
  if (!body.phone?.trim() && !body.email?.trim()) {
    return NextResponse.json(
      { error: "A phone number or email address is required." },
      { status: 422 },
    );
  }
  if (body.consent !== "yes") {
    return NextResponse.json({ error: "Consent is required." }, { status: 422 });
  }

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) {
    return NextResponse.json(
      {
        error: "not_configured",
        detail:
          "Set ENQUIRY_WEBHOOK_URL to forward enquiries. See README.md for setup.",
      },
      { status: 501 },
    );
  }

  const payload = {
    source: "bsm-website",
    receivedAt: new Date().toISOString(),
    name: body.name.trim().slice(0, 200),
    organisation: body.organisation?.trim().slice(0, 200) ?? "",
    phone: body.phone?.trim().slice(0, 50) ?? "",
    email: body.email?.trim().slice(0, 200) ?? "",
    area: body.area?.trim().slice(0, 100) ?? "",
    service: body.service?.trim().slice(0, 100) ?? "",
    message: body.message.trim().slice(0, 5000),
  };

  try {
    const res = await fetch(endpoint, {
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
