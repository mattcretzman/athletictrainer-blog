import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Athletic Trainer Career Resources";
  const category = searchParams.get("category") ?? "Career Guide";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #4A5D3E 0%, #556B47 50%, #3D4F31 100%)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        {/* Top: Category pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#6B8E23",
              color: "#FFFFFF",
              padding: "10px 24px",
              borderRadius: "8px",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              color: "#FFFFFF",
              fontSize: title.length > 60 ? "44px" : "56px",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "950px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: Branding bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid rgba(255,255,255,0.25)",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            AthleticTrainerJob.com
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Cognito Systems, a PSI joint venture
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
