import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { OWN_POSTS } from "@/lib/own-posts";
import { getAuthoredBlogs } from "@/lib/authored-blogs";
import { getDriverStandings } from "@/lib/f1";

export const revalidate = 86400;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/calendar", priority: 0.9, changeFrequency: "weekly" },
  { path: "/standings", priority: 0.9, changeFrequency: "daily" },
  { path: "/stories", priority: 0.9, changeFrequency: "daily" },
  { path: "/news", priority: 0.8, changeFrequency: "hourly" },
  { path: "/drivers", priority: 0.8, changeFrequency: "weekly" },
  { path: "/constructors", priority: 0.7, changeFrequency: "weekly" },
  { path: "/seasons", priority: 0.6, changeFrequency: "monthly" },
  { path: "/schedule", priority: 0.6, changeFrequency: "weekly" },
  { path: "/dashboard", priority: 0.6, changeFrequency: "hourly" },
  { path: "/video", priority: 0.6, changeFrequency: "daily" },
  { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
  { path: "/lists", priority: 0.5, changeFrequency: "monthly" },
  { path: "/showcase", priority: 0.5, changeFrequency: "monthly" },
  { path: "/team", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.4, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [drivers, authoredBlogs] = await Promise.all([
    getDriverStandings("current").catch(() => []),
    getAuthoredBlogs().catch(() => []),
  ]);

  const driverEntries: MetadataRoute.Sitemap = drivers.map((d) => ({
    url: `${SITE_URL}/drivers/${d.driverId}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const postEntries: MetadataRoute.Sitemap = [...authoredBlogs, ...OWN_POSTS].map(
    (p) => ({
      url: `${SITE_URL}/stories/${p.id}`,
      lastModified: new Date(p.pubDate),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...driverEntries, ...postEntries];
}
