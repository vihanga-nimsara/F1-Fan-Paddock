"use client";

import { useState } from "react";
import { timeAgo } from "@/lib/blog";

type Comment = {
  id: string;
  author: string;
  date: string;
  text: string;
};

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "posting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("Something went wrong — try again.");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !text.trim() || status === "posting") return;
    setStatus("posting");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, author, text }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) throw new Error(json?.error ?? "Something went wrong — try again.");
      const { comment } = json;
      setComments((prev) => [comment, ...prev]);
      setText("");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong — try again.",
      );
      setStatus("error");
      return;
    }
    setStatus("idle");
  }

  return (
    <section className="flex flex-col gap-4 pt-6">
      <h2 className="m-0 font-headline text-[20px] font-semibold text-pebble">
        Comments ({comments.length})
      </h2>

      {comments.length ? (
        <div className="flex flex-col gap-4">
          {comments.map((c) => (
            <div key={c.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-carbon-deep font-display text-xs font-semibold text-pebble">
                {c.author.charAt(0)}
              </span>
              <div className="flex flex-col gap-1 rounded-xl bg-pebble-5 px-4 py-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[13px] font-semibold text-pebble">
                    {c.author}
                  </span>
                  <span className="text-[11px] text-pebble-80">
                    {timeAgo(c.date)} ago
                  </span>
                </div>
                <p className="m-0 text-[14px] leading-[1.6] text-pebble-80">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="m-0 text-sm text-pebble-80">
          No comments yet — be the first to join the paddock chat.
        </p>
      )}

      <form onSubmit={submit} className="flex flex-col gap-3 rounded-xl bg-pebble-5 p-4">
        <h3 className="m-0 font-display text-sm font-semibold text-pebble">
          Leave a comment
        </h3>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          maxLength={40}
          required
          className="rounded-lg border border-pebble-15 bg-carbon-deep px-3 py-2 font-body text-sm text-pebble placeholder:text-pebble-40 focus:border-f1red focus:outline-none"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add to the paddock chat…"
          maxLength={1000}
          rows={3}
          required
          className="resize-none rounded-lg border border-pebble-15 bg-carbon-deep px-3 py-2 font-body text-sm text-pebble placeholder:text-pebble-40 focus:border-f1red focus:outline-none"
        />
        {status === "error" && (
          <p className="m-0 text-xs text-f1red">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === "posting"}
          className="w-fit rounded-lg bg-pebble px-4 py-2 font-display text-[12px] font-semibold tracking-[0.08em] text-carbon transition-colors hover:bg-f1red hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "posting" ? "Posting…" : "Post comment"}
        </button>
      </form>
    </section>
  );
}