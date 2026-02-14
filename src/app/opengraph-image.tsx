import { ImageResponse } from "next/og";
import siteData from "@data/site.json";

export const runtime = "edge";
export const alt = siteData.company.name || "会社名";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a3a5c",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          {siteData.company.name || "会社名"}
        </div>
        {siteData.company.catchphrase && (
          <div
            style={{
              marginTop: 32,
              fontSize: 36,
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {siteData.company.catchphrase}
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
