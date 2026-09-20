import { getFacebookChat } from "@/lib/facebook";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Live feed for the Facebook "live chat" widget. Polled by the client; the
// Graph API is hit fresh each time so new comments appear without a page reload.
export async function GET() {
  const threads = await getFacebookChat(40);
  return Response.json(
    { threads, ts: Date.now() },
    { headers: { "Cache-Control": "no-store" } },
  );
}