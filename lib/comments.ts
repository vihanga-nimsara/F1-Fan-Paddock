import fs from "fs";
import path from "path";

export type UserComment = {
  id: string;
  postId: string;
  author: string;
  date: string;
  text: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "comments.json");

function readAll(): UserComment[] {
  try {
    if (fs.existsSync(FILE)) {
      const raw = fs.readFileSync(FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as UserComment[];
    }
  } catch {
    // ignore corrupt file
  }
  return [];
}

function writeAll(comments: UserComment[]) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(comments, null, 2));
  } catch {
    // ignore write failures (e.g. read-only FS)
  }
}

export function getComments(postId: string): UserComment[] {
  return readAll()
    .filter((c) => c.postId === postId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function addComment(input: {
  postId: string;
  author: string;
  text: string;
}): UserComment | null {
  const author = input.author.trim().slice(0, 40);
  const text = input.text.trim().slice(0, 1000);
  if (!input.postId || !author || !text) return null;

  const comment: UserComment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    postId: input.postId,
    author,
    date: new Date().toISOString(),
    text,
  };
  const all = readAll();
  all.push(comment);
  writeAll(all);
  return comment;
}