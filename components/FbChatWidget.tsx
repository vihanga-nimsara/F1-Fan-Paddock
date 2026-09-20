"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, RefreshCw } from "lucide-react";
import type { FbChatThread } from "@/lib/facebook";
import { cn } from "@/lib/utils";

const POLL_MS = 45_000;

function timeAgo(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function FbChatWidget() {
  const [open, setOpen] = useState(false);
  const [threads, setThreads] = useState<FbChatThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<number | null>(null);
  const [viewAll, setViewAll] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const CHAT_MAX = 12;

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/fb-chat", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { threads: FbChatThread[]; ts: number };
      setThreads(data.threads ?? []);
      setLastUpdate(data.ts ?? Date.now());
    } catch {
      // server unreachable — keep the last snapshot
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  useEffect(() => {
    if (open) {
      scroller.current?.scrollTo({ top: 0 });
    }
  }, [open]);

  useEffect(() => {
    if (open && lastUpdate) {
      scroller.current?.scrollTo({ top: 999999 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads.length]);

  const totalComments = threads.reduce(
    (acc, t) => acc + t.comments.length,
    0,
  );

  const botFlair = totalComments > 0 ? "Live" : "Idle";
  const visibleThreads = viewAll ? threads : threads.slice(0, CHAT_MAX);

  return (
    <div className="fixed right-4 bottom-4 z-[80] flex flex-col items-end">
      {open && (
        <div className="mb-3 flex h-[min(560px,70vh)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="flex items-center gap-3 bg-f1red px-4 py-3 text-white">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              {threads[0]?.pageAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={threads[0].pageAvatar}
                  alt=""
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-white/40"
                />
              ) : (
                <MessageCircle className="h-5 w-5" />
              )}
              <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-bold">
                F1 Paddock chat
              </p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/80">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-300" />
                </span>
                {botFlair} · from Facebook
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scroller}
            className="flex-1 space-y-4 overflow-y-auto bg-muted/40 p-3"
          >
            {loading && !threads.length ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Loading chat…
              </p>
            ) : !threads.length ? (
              <div className="py-8 text-center">
                <p className="text-sm font-medium text-foreground">
                  No recent activity
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Comments from our Facebook page will appear here.
                </p>
              </div>
            ) : (
              visibleThreads.map((t, ti) => (
                <div key={t.postId} className="space-y-2.5">
                  {/* Post message — page bubble */}
                  <div
                    className={cn(
                      "flex gap-2",
                      ti % 2 === 0 ? "flex-row" : "flex-row-reverse",
                    )}
                  >
                    {t.pageAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={t.pageAvatar}
                        alt=""
                        className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover"
                      />
                    ) : null}
                    <div
                      className={cn(
                        "max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-sm",
                        ti % 2 === 0
                          ? "rounded-tl-sm bg-f1red text-white"
                          : "rounded-tr-sm bg-card text-foreground ring-1 ring-border",
                      )}
                    >
                      <p className="whitespace-pre-line">{t.postMessage}</p>
                      <p
                        className={cn(
                          "mt-1 text-[10px]",
                          ti % 2 === 0 ? "text-white/70" : "text-muted-foreground",
                        )}
                      >
                        {t.author} · {timeAgo(t.postTime)}
                      </p>
                    </div>
                  </div>

                  {/* Comment thread */}
                  {t.comments.length > 0 && (
                    <div className="ml-7 space-y-2 border-l-2 border-border pl-3">
                      {t.comments.map((c, ci) => (
                        <div key={c.id || `${t.postId}-${ci}`}>
                          <div
                            className={cn(
                              "flex gap-2",
                              ci % 2 === 1 && "flex-row-reverse",
                            )}
                          >
                            {c.avatar ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={c.avatar}
                                alt=""
                                className="mt-0.5 h-6 w-6 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold uppercase text-muted-foreground">
                                {c.name?.[0] ?? "?"}
                              </span>
                            )}
                            <div className="max-w-[82%] rounded-2xl bg-card px-3 py-2 text-[12.5px] leading-snug shadow-sm ring-1 ring-border">
                              <p className="text-[11px] font-semibold text-f1red">
                                {c.name}
                              </p>
                              <p className="whitespace-pre-line">
                                {c.message}
                              </p>
                              <p className="mt-0.5 text-[10px] text-muted-foreground">
                                {timeAgo(c.created_time)}
                              </p>
                            </div>
                          </div>
                          {c.replies.length > 0 && (
                            <div className="ml-6 mt-1.5 space-y-1.5 border-l border-border pl-2.5">
                              {c.replies.map((r, ri) => (
                                <div
                                  key={r.id || `${c.id}-${ri}`}
                                  className="flex items-start gap-2"
                                >
                                  {r.avatar ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={r.avatar}
                                      alt=""
                                      className="mt-0.5 h-5 w-5 shrink-0 rounded-full object-cover"
                                    />
                                  ) : (
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-bold uppercase text-muted-foreground">
                                      {r.name?.[0] ?? "?"}
                                    </span>
                                  )}
                                  <div className="max-w-[80%] rounded-xl bg-muted px-2.5 py-1.5 text-[12px] leading-snug">
                                    <span className="mr-1 text-[10px] font-semibold text-f1red">
                                      {r.name}
                                    </span>
                                    {r.message}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Show all / collapse toggle */}
          {threads.length > CHAT_MAX && (
            <button
              type="button"
              onClick={() => setViewAll((v) => !v)}
              className="border-t border-border px-3 py-2 text-center text-[11px] font-semibold text-f1red transition-colors hover:bg-muted/40"
            >
              {viewAll
                ? `Collapse to latest ${CHAT_MAX}`
                : `Show all ${threads.length} posts`}
            </button>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2 border-t border-border px-3 py-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <RefreshCw
                className={cn(
                  "size-3",
                  loading && "animate-spin",
                )}
              />
              {lastUpdate
                ? `Updated ${timeAgo(new Date(lastUpdate).toISOString())} ago`
                : "Connecting…"}
            </span>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium text-f1red hover:underline"
            >
              <Send className="size-3" />
              View on Facebook
            </Link>
          </div>
        </div>
      )}

      {/* Toggle bubble */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close live chat" : "Open live chat"}
        className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-f1red text-white shadow-xl shadow-black/30 transition-transform hover:scale-105 active:scale-95"
      >
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white ring-2 ring-background">
            {threads.length > 0 ? threads.length : 0}
          </span>
        )}
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}