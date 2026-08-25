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
      return new Response("Upstream error", { status: 502 });
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
    return new Response("Fetch failed", { status: 502 });
  }
}
