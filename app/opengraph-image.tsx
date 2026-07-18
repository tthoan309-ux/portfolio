import { ImageResponse } from "next/og";

export const alt = "Tran Thuan Hoan — Computational Economics Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "72px",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 20,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#475569",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 99,
              background: "#14b8a6",
            }}
          />
          Computational economics research
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: "-0.055em",
              lineHeight: 0.95,
            }}
          >
            Tran Thuan Hoan
          </div>
          <div
            style={{
              marginTop: 28,
              maxWidth: 900,
              fontSize: 31,
              lineHeight: 1.3,
              color: "#334155",
            }}
          >
            Econometrics · machine learning · data engineering · research
            software
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
            fontSize: 18,
            color: "#2563eb",
          }}
        >
          <span>Undergraduate Researcher</span>
          <span>Foreign Trade University</span>
          <span>Hanoi, Vietnam</span>
        </div>
      </div>
    </div>,
    size,
  );
}
