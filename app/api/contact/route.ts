import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  issue_type?: string;
  bureau?: string;
  message?: string;
  locale?: string;
  website?: string; // honeypot
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (clean(body.website, 10)) {
    return NextResponse.json({ ok: true }); // pretend success to bots
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 20);
  const message = clean(body.message, 4000);

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("Supabase env vars are not configured");
    return NextResponse.json({ error: "Server not configured" }, { status: 500 });
  }

  const record = {
    name,
    email,
    phone,
    issue_type: clean(body.issue_type, 200),
    bureau: clean(body.bureau, 100),
    message,
    locale: clean(body.locale, 10) || "en",
    user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
  };

  // Insert via Supabase REST API — no SDK needed, works on Node and Workers.
  const res = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(record),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Supabase insert failed:", res.status, detail);
    return NextResponse.json({ error: "Could not save submission" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
