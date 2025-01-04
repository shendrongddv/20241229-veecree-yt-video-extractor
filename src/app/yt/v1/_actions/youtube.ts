"use server";

import { SingleVideo, VideoDetails, ChannelDetails } from "@/types/youtube";

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function extractChannelId(url: string): string | null {
  const match = url.match(/youtube\.com\/channel\/(UC[\w-]+)/);
  return match ? match[1] : null;
}

function extractCustomName(url: string): string | null {
  const match = url.match(/youtube\.com\/c\/([^/]+)/);
  return match ? match[1] : null;
}

export async function getChannelIdFromInput(
  inputType: string,
  value: string,
): Promise<string | null> {
  try {
    switch (inputType) {
      case "video_url": {
        const videoId = extractVideoId(value);
        const response = await fetch(
          `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`,
        );
        const data = await response.json();
        return data.items[0]?.snippet?.channelId || null;
      }

      case "channel_handle":
      case "username": {
        const username = value.replace("@", "");
        const response = await fetch(
          `${BASE_URL}/channels?part=id&forUsername=${username}&key=${YOUTUBE_API_KEY}`,
        );
        const data = await response.json();
        return data.items[0]?.id || null;
      }

      case "channel_url": {
        const channelId = extractChannelId(value);
        if (channelId) return channelId;

        const customName = extractCustomName(value);
        if (customName) {
          const response = await fetch(
            `${BASE_URL}/channels?part=id&forUsername=${customName}&key=${YOUTUBE_API_KEY}`,
          );
          const data = await response.json();
          return data.items[0]?.id || null;
        }
        return null;
      }

      case "search_query": {
        const response = await fetch(
          `${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(value)}&key=${YOUTUBE_API_KEY}`,
        );
        const data = await response.json();
        return data.items[0]?.snippet?.channelId || null;
      }

      default:
        return null;
    }
  } catch (error) {
    console.error("Error fetching channel ID:", error);
    return null;
  }
}

export async function getChannelVideosFromId(
  channelId: string,
  pageToken?: string,
): Promise<{
  videos: VideoDetails[];
  nextPageToken?: string;
}> {
  try {
    const response = await fetch(
      `${BASE_URL}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=50${
        pageToken ? `&pageToken=${pageToken}` : ""
      }&key=${YOUTUBE_API_KEY}`,
    );
    const data = await response.json();

    return {
      videos: data.items.map((item: SingleVideo) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        publishedAt: item.snippet.publishedAt,
      })),
      nextPageToken: data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching channel videos:", error);
    return { videos: [] };
  }
}

export async function getChannelDetailsFromId(
  channelId: string,
): Promise<ChannelDetails | null> {
  try {
    const response = await fetch(
      `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`,
    );
    const data = await response.json();
    const channel = data.items[0];

    if (!channel) return null;

    return {
      id: channel.id,
      title: channel.snippet.title,
      description: channel.snippet.description,
      customUrl: channel.snippet.customUrl,
      thumbnails: channel.snippet.thumbnails,
      statistics: {
        viewCount: parseInt(channel.statistics.viewCount),
        subscriberCount: parseInt(channel.statistics.subscriberCount),
        videoCount: parseInt(channel.statistics.videoCount),
      },
      publishedAt: channel.snippet.publishedAt,
    };
  } catch (error) {
    console.error("Error fetching channel details:", error);
    return null;
  }
}
