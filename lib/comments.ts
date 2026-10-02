import { supabase } from "./supabase";

export type UserComment = {
  id: string;
  postId: string;
  author: string;
  date: string;
  text: string;
};

const MAX_AUTHOR = 40;
const MAX_TEXT = 1000;
const MAX_POST_ID = 200;
// Guards against a single post being used to dump an unbounded amount of data
// into every page render.
const MAX_FETCH = 200;

// Every comment this table holds belongs to a story on the site. The
// target_type/target_id pair is a polymorphic reference the table already had.
const TARGET_TYPE = "post";

const COLUMNS = "id,post_id,author,body,created_at";

type CommentRow = {
  // bigint in Postgres — PostgREST hands it back as a JSON number, so accept
  // either and normalise to a string for the client.
  id: number | string;
  post_id: string;
  author: string;
  body: string;
  created_at: string;
};

function toUserComment(row: CommentRow): UserComment {
  return {
    id: String(row.id),
    postId: row.post_id,
    author: row.author,
    date: row.created_at,
    text: row.body,
  };
}

// Comments live in Supabase so they survive redeploys and are shared across
// every server instance. Previously this was a JSON file under data/, which is
// lost on Vercel (read-only FS) and silently swallowed write failures.
export async function getComments(postId: string): Promise<UserComment[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("comments")
    .select(COLUMNS)
    .eq("post_id", postId)
    .order("created_at", { ascending: false })
    .limit(MAX_FETCH);
  if (error || !data) return [];
  return (data as CommentRow[]).map(toUserComment);
}

export async function addComment(input: {
  postId: string;
  author: string;
  text: string;
}): Promise<UserComment | null> {
  if (!supabase) return null;

  const author = input.author.trim().slice(0, MAX_AUTHOR);
  const text = input.text.trim().slice(0, MAX_TEXT);
  const postId = input.postId.trim().slice(0, MAX_POST_ID);
  if (!postId || !author || !text) return null;

  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author,
      body: text,
      // Pre-existing NOT NULL polymorphic-target columns (they predate the
      // site comments work and look built for Facebook comments). Filled
      // rather than dropped so the constraint stays meaningful.
      target_type: TARGET_TYPE,
      target_id: postId,
    })
    .select(COLUMNS)
    .single();
  if (error || !data) return null;

  return toUserComment(data as CommentRow);
}
