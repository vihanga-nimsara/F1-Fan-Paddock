import { type NextRequest, NextResponse } from "next/server";

const OPENF1_BASE = "https://api.openf1.org/v1";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const { path } = await ctx.params;
  const url = `${OPENF1_BASE}/${path.join("/")}${req.nextUrl.search}`;
  try {
    const token = process.env.OPENF1_ACCESS_TOKEN;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 15 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream error ${res.status}` },
        { status: res.status },
      );
    }
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 502 },
    );
  }
}
