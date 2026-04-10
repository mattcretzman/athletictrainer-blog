import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ??
  "https://leadstorm.app.n8n.cloud/webhook/psi-recruitment-submission";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const payload = {
      payload: {
        data: {
          "Full Name": body["Full Name"] ?? "",
          Email: body["Email"] ?? "",
          Phone: body["Phone"] ?? "",
          Certification: body["Certification"] ?? "",
          base_locations: body["base_locations"] ?? "",
          "Years Experience": body["Years Experience"] ?? "",
          Time: body["Time"] ?? "",
          File: body["File"] ?? "",
        },
      },
    };

    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Webhook failed", status: res.status },
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
