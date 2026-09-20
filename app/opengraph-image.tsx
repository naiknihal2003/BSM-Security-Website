import { ImageResponse } from "next/og";

export const alt = "BSM — Security agency in Goa, India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated share card, so the site never ships a missing OG image. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04060a",
          padding: 72,
          color: "#eceff3",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 10, height: 10, background: "#c8a45c" }} />
          <div
            style={{
              fontSize: 20,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#c8a45c",
            }}
          >
            Security Agency · Goa, India
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              fontWeight: 700,
              maxWidth: 940,
            }}
          >
            Security You Can Trust.
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              fontWeight: 700,
              color: "#98a1b0",
              maxWidth: 940,
            }}
          >
            Protection You Can Count On.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "1px solid #1a212c",
            paddingTop: 28,
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>BSM</div>
          <div style={{ fontSize: 18, letterSpacing: 4, color: "#656e7d", textTransform: "uppercase" }}>
            Corporate · Residential · Industrial · Events
          </div>
        </div>
      </div>
    ),
    size,
  );
}
