import { NextRequest, NextResponse } from "next/server";
import { addComment, getComments } from "@/lib/comments";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Best-effort throttle on posting. This state is in-memory, so it is per
// serverless instance and resets on redeploy — it stops casual drive-by
// posting, it is not a hard guarantee. Anything serious should be gated in
// RLS or moved behind a Supabase Edge Function.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const MAX_TRACKED_KEYS = 5000;

const hits = new Map<string, number[]>();

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Drop fully-expired buckets so the map can't grow without bound.
  if (hits.size > MAX_TRACKED_KEYS) {
    hits.forEach((times, k) => {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    });
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });
  return NextResponse.json({ comments: await getComments(postId) });
}

export async function POST(req: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Comments are not configured" },
      { status: 503 },
    );
  }

  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      { error: "You're commenting too fast — try again shortly." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const comment = await addComment({
    postId: typeof body?.postId === "string" ? body.postId : "",
    author: typeof body?.author === "string" ? body.author : "",
    text: typeof body?.text === "string" ? body.text : "",
  });
  if (!comment) {
    return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
  }
  return NextResponse.json({ comment }, { status: 201 });
}