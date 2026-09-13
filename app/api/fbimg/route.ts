import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Proxies time-limited / hotlink-blocked Facebook CDN images through our own
// origin. The URL is passed from the server-rendered post (still fresh) and is
// fetched server-side, so the browser never hits fbcdn directly.
export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get("u");
  if (!u || !/^https:\/\/(scontent\.|.*\.fbcdn\.net|www\.facebook\.com|m\.facebook\.com|platform-lookaside\.fbcdn\.net)/.test(u)) {
    return new Response("Invalid URL", { status: 400 });
  }

  try {
    const upstream = await fetch(u, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
      redirect: "follow",
      cache: "no-store",
    });
    if (!upstream.ok) {
      return placeholderResponse();
    }
    const buf = Buffer.from(await upstream.arrayBuffer());
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=3600, immutable",
      },
    });
  } catch {
    return placeholderResponse();
  }
}

// Facebook image URLs carry short-lived signed tokens (expiry `oe=` param). When
// one expires mid-feed the CDN rejects it — instead of serving a broken image we
// return a branded placeholder so layout stays intact.
function placeholderResponse(): Response {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#111114"/>
      <stop offset="1" stop-color="#1c1917"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g fill="#ffffff" opacity="0.04">
    ${Array.from({ length: 10 }, (_, r) =>
      Array.from({ length: 16 }, (_, c) =>
        `<rect x="${c * 80 + (r % 2 ? 40 : 0)}" y="${r * 75}" width="40" height="40"/>`,
      ).join(""),
    ).join("")}
  </g>
  <rect x="0" y="0" width="10" height="675" fill="#e10600"/>
  <text x="600" y="330" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="700" fill="#ffffff">F1 FAN PADDOCK</text>
  <text x="600" y="386" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="6" fill="#e10600">F1 · PADDOCK · SL</text>
</svg>`;
  return new Response(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}