import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import siteData from "@data/site.json";

export const runtime = "nodejs";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default async function Icon() {
  // ロゴ画像を読み込み（logo-square.pngを優先）
  const logoFileName = siteData.images.logoSquare?.replace("/images/", "") || "logo-square.png";
  const logoPath = join(process.cwd(), "public/images", logoFileName);

  let logoBase64: string | null = null;
  try {
    const logoData = await readFile(logoPath);
    logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;
  } catch {
    // ロゴが見つからない場合はテキストで表示
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a3a5c",
        }}
      >
        {logoBase64 ? (
          <img
            src={logoBase64}
            alt="icon"
            style={{
              width: 140,
              height: 140,
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            {(siteData.company.nameShort || siteData.company.name || "Co").slice(0, 2)}
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
