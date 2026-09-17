import Parser from "rss-parser";

const parser = new Parser({
  customFields: { item: [["yt:videoId", "videoId"]] },
  timeout: 15000,
});

export type PlaylistVideo = {
  id: string;
  title: string;
  published: string;
};

export async function getPlaylistVideos(
  playlistId: string,
  limit = 6,
): Promise<PlaylistVideo[]> {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const feed = await parser.parseURL(url);
    return (feed.items ?? [])
      .slice(0, limit)
      .map((item: any) => {
        const id =
          item.videoId ??
          (typeof item.id === "string"
            ? item.id.replace("yt:video:", "")
            : "");
        return {
          id,
          title: item.title ?? "",
          published: item.pubDate ?? "",
        };
      })
      .filter((v) => v.id);
  } catch {
    return [];
  }
}

export async function getChannelVideos(
  channelId: string,
  limit = 3,
): Promise<PlaylistVideo[]> {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const feed = await parser.parseURL(url);
    return (feed.items ?? [])
      .slice(0, limit)
      .map((item: any) => {
        const id =
          item.videoId ??
          (typeof item.id === "string"
            ? item.id.replace("yt:video:", "")
            : "");
        return {
          id,
          title: item.title ?? "",
          published: item.pubDate ?? "",
        };
      })
      .filter((v) => v.id);
  } catch {
    return [];
  }
}
