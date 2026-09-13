import { NextRequest, NextResponse } from "next/server";
import { addComment, getComments } from "@/lib/comments";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get("postId");
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });
  return NextResponse.json({ comments: getComments(postId) });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const comment = addComment({
    postId: body?.postId ?? "",
    author: body?.author ?? "",
    text: body?.text ?? "",
  });
  if (!comment) {
    return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
  }
  return NextResponse.json({ comment }, { status: 201 });
}