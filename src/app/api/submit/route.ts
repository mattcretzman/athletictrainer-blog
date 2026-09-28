import { NextRequest, NextResponse } from "next/server";

const RAILWAY_URL =
  process.env.FORM_WEBHOOK_URL ??
  "https://psi-form-server-production.up.railway.app/api/form-submission";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const attr =
      body["Attribution"] && typeof body["Attribution"] === "object"
        ? body["Attribution"]
        : {};
    const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 500) : "");

    const payload = {
      "Full-Name": body["Full Name"] ?? "",
      Email: body["Email"] ?? "",
      Phone: body["Phone"] ?? "",
      Certification: body["Certification"] ?? "",
      "Years-Experience": body["Years Experience"] ?? "",
      base_locations: body["base_locations"] ?? "",
      Time: body["Time"] ?? "",
      "Heard-About": body["Heard About"] ?? "",
      Source: str(attr.Source) || "Website",
      "First-Source": str(attr["First Source"]),
      utm_source: str(attr.utm_source),
      utm_medium: str(attr.utm_medium),
      utm_campaign: str(attr.utm_campaign),
      utm_term: str(attr.utm_term),
      utm_content: str(attr.utm_content),
      gclid: str(attr.gclid) || str(attr.gbraid) || str(attr.wbraid),
      fbclid: str(attr.fbclid),
      referrer: str(attr.referrer),
      landing_page: str(attr.landing_page),
      submit_page: str(attr.submit_page),
    };

    const res = await fetch(RAILWAY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Form server failed", status: res.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
