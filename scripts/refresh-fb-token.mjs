#!/usr/bin/env node
/**
 * Keeps the Facebook Page Access Token (FB_PAGE_ACCESS_TOKEN) alive so the
 * live follower count never stops working.
 *
 * How it works
 *  1. Reads .env.local
 *  2. If FB_APP_ID + FB_APP_SECRET are set, exchanges the stored long-lived
 *     user token for a freshly-extended 60-day one (fb_exchange_token).
 *  3. Calls /me/accounts and picks the page token for FB_PAGE_ID.
 *  4. Verifies it against Graph API, then writes both tokens back into
 *     .env.local (masked output, secrets never printed).
 *
 * One-time setup
 *  a) Graph API Explorer -> long-lived (extended) User Access Token
 *  b) add to .env.local:
 *      FB_LONG_LIVED_USER_TOKEN=...
 *      (optional) FB_APP_ID=... and FB_APP_SECRET=... to auto-extend each run
 *
 * Schedule it monthly (cron / Task Scheduler / GitHub Action):
 *   npm run fb:refresh
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ENV_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", ".env.local");
const API = "https://graph.facebook.com/v22.0";

function loadEnv() {
  const env = {};
  try {
    for (const line of readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
      if (!m) continue;
      let v = m[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      env[m[1]] = v;
    }
  } catch (e) {
    console.error(`! ${ENV_PATH} not found. Create it first.`);
    process.exit(1);
  }
  return env;
}

function setEnvValue(env, key, value) {
  env[key] = value;
  const lines = readFileSync(ENV_PATH, "utf8").split(/\r?\n/);
  const idx = lines.findIndex((l) => l.startsWith(`${key}=`));
  if (idx >= 0) lines[idx] = `${key}=${value}`;
  else lines.push(`${key}=${value}`);
  writeFileSync(ENV_PATH, lines.join("\n") + "\n");
  console.log(`  * ${key} updated in .env.local`);
}

async function graph(path, params) {
  const url = `${API}/${path}?${new URLSearchParams(params)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.error || !res.ok) {
    throw new Error(
      `Graph API ${res.status}: ${json.error?.message ?? JSON.stringify(json)}`,
    );
  }
  return json;
}

function mask(token) {
  if (!token) return "";
  return token.length > 12 ? `${token.slice(0, 6)}…${token.slice(-4)}` : "";
}

const env = loadEnv();
const pageId = env.FB_PAGE_ID;
if (!pageId) {
  console.error("! FB_PAGE_ID is missing in .env.local");
  process.exit(1);
}

let userToken = env.FB_LONG_LIVED_USER_TOKEN;

if (userToken && env.FB_APP_ID && env.FB_APP_SECRET) {
  console.log("-> Refreshing long-lived user token…");
  try {
    const ex = await graph("oauth/access_token", {
      grant_type: "fb_exchange_token",
      client_id: env.FB_APP_ID,
      client_secret: env.FB_APP_SECRET,
      fb_exchange_token: userToken,
    });
    userToken = ex.access_token;
    setEnvValue(env, "FB_LONG_LIVED_USER_TOKEN", userToken);
    console.log(`   user token extended: ${mask(userToken)}`);
  } catch (e) {
    console.warn(`   (skipped — ${e.message})`);
  }
}

if (!userToken) {
  console.error(`
! FB_LONG_LIVED_USER_TOKEN is not set, and there's nothing to refresh.

One-time setup:
  1) Graph API Explorer -> select your app -> "Add a permission"
     -> pages_show_list + pages_read_engagement.
  2) Set "To:" to your profile, generate a User Access Token, click
     "Extend Access Token".
  3) Add to .env.local:
       FB_LONG_LIVED_USER_TOKEN=<that extended user token>
       FB_APP_ID=<your app id>
       FB_APP_SECRET=<your app secret>   (only if you want auto-extension)
  4) Run: npm run fb:refresh`);
  process.exit(1);
}

console.log("-> Fetching page access token…");
const accounts = await graph("me/accounts", { access_token: userToken });
const page = (accounts.data ?? []).find((a) => String(a.id) === String(pageId));
if (!page?.access_token) {
  console.error(
    `! No page token found for "${pageId}". Make sure the user token can see `
      + "the page (check pages_show_list) and that the ids match.",
  );
  process.exit(1);
}
const pageName = page.name || env.FB_PAGE_NAME || "Facebook";

setEnvValue(env, "FB_PAGE_ACCESS_TOKEN", page.access_token);
console.log(`   page: ${pageName}  token: ${mask(page.access_token)}`);

const stats = await graph(pageId, {
  fields: "name,fan_count,followers_count",
  access_token: page.access_token,
});
console.log(
  `-> Verified OK: ${stats.name} — ${stats.followers_count ?? stats.fan_count} followers/likes`,
);
await pushToVercel(page.access_token, env);
console.log("Done. Restart the dev server to pick up the new token.");

async function pushToVercel(token, env) {
  const { VERCEL_TOKEN, VERCEL_PROJECT_ID } = env;
  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    console.log(
      "   (VERCEL_TOKEN / VERCEL_PROJECT_ID not set — skipping Vercel push)",
    );
    return;
  }
  const headers = {
    Authorization: `Bearer ${VERCEL_TOKEN}`,
    "Content-Type": "application/json",
  };
  const targets = ["production", "preview", "development"];

  // List existing env vars once so we update instead of duplicating.
  const listRes = await fetch(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(VERCEL_PROJECT_ID)}/env`,
    { headers },
  );
  const listJson = await listRes.json().catch(() => ({}));
  const existing = listJson.envs ?? [];

  const values = {
    FB_PAGE_ACCESS_TOKEN: token,
    FB_PAGE_ID: env.FB_PAGE_ID,
    FB_PAGE_NAME: env.FB_PAGE_NAME || "Facebook",
  };

  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    const found = existing.find((e) => e.key === key);
    try {
      if (found?.id) {
        const res = await fetch(
          `https://api.vercel.com/v9/projects/${encodeURIComponent(VERCEL_PROJECT_ID)}/env/${found.id}`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({ value, target: targets }),
          },
        );
        if (!res.ok) throw new Error(`PATCH ${res.status}`);
        console.log(`   * updated ${key} on Vercel`);
      } else {
        const res = await fetch(
          `https://api.vercel.com/v10/projects/${encodeURIComponent(VERCEL_PROJECT_ID)}/env`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              key,
              value,
              type: "encrypted",
              target: targets,
            }),
          },
        );
        if (!res.ok) throw new Error(`POST ${res.status}`);
        console.log(`   * created ${key} on Vercel`);
      }
    } catch (e) {
      console.warn(
        `   (${key} push skipped — ${e.message}. Value is still updated locally.)`,
      );
    }
  }
}