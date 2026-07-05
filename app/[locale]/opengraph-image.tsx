import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "CreditFixs — Credit Score Repair & Dispute Resolution for India";

// English-only OG image (safe glyph coverage across social crawlers)
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #060f22 0%, #0b1b36 60%, #0d9488 160%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #10b981, #0d9488)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            ↗
          </div>
          <div style={{ display: "flex", fontSize: 52, fontWeight: 800 }}>
            <span>Credit</span>
            <span style={{ color: "#34d399" }}>Fixs</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          Fix your credit score. Unlock the loans you deserve.
        </div>
        <div style={{ marginTop: 32, fontSize: 30, color: "#94a3b8" }}>
          CIBIL · Experian · Equifax · CRIF High Mark — dispute resolution &
          credit repair for India
        </div>
        <div style={{ marginTop: 40, fontSize: 26, color: "#34d399", fontWeight: 700 }}>
          creditfixs.in
        </div>
      </div>
    ),
    size,
  );
}
