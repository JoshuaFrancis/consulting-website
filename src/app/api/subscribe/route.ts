import { NextResponse } from "next/server";

// Server-side proxy to Kit (formerly ConvertKit). The browser can't POST to
// Kit directly (CORS), so the audit form posts here and we forward to Kit's
// v4 API with the account API key kept in a server env var.
const FORM_ID = process.env.KIT_FORM_ID || "9836515";
const API_KEY = process.env.KIT_API_KEY;
const KIT_BASE = "https://api.kit.com/v4";

export async function POST(req: Request) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "KIT_API_KEY is not set" },
      { status: 500 },
    );
  }

  let email = "";
  let first_name = "";
  try {
    const data = await req.json();
    email = String(data.email ?? "").trim();
    first_name = String(data.first_name ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": API_KEY,
  };

  try {
    // 1) Upsert the subscriber so the first name is captured.
    const sub = await fetch(`${KIT_BASE}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
        ...(first_name ? { first_name } : {}),
      }),
    });
    if (!sub.ok) {
      const detail = await sub.text();
      return NextResponse.json(
        { error: "Kit subscriber create failed", detail: detail.slice(0, 400) },
        { status: 502 },
      );
    }

    // 2) Add them to the form. On a form with double opt-in this triggers the
    //    confirmation / incentive email that delivers the audit.
    const form = await fetch(`${KIT_BASE}/forms/${FORM_ID}/subscribers`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email_address: email }),
    });
    if (!form.ok) {
      const detail = await form.text();
      return NextResponse.json(
        { error: "Kit form subscribe failed", detail: detail.slice(0, 400) },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not reach Kit" }, { status: 502 });
  }
}
