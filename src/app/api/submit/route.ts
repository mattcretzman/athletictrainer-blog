import { NextRequest, NextResponse } from "next/server";

const RAILWAY_URL =
  process.env.FORM_WEBHOOK_URL ??
  "https://psi-form-server-production.up.railway.app/api/form-submission";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      "Full-Name": body["Full Name"] ?? "",
      Email: body["Email"] ?? "",
      Phone: body["Phone"] ?? "",
      Certification: body["Certification"] ?? "",
      "Years-Experience": body["Years Experience"] ?? "",
      base_locations: body["base_locations"] ?? "",
      Time: body["Time"] ?? "",
      "Heard-About": body["Heard About"] ?? "",
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
