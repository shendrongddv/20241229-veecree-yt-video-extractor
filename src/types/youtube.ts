export type InputType =
  | "video_url"
  | "channel_handle"
  | "username"
  | "channel_url"
  | "search_query";

export interface VideoDetails {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  publishedAt: string;
}

export interface ChannelDetails {
  id: string;
  title: string;
  description: string;
  customUrl?: string;
  thumbnails: {
    default: { url: string };
    medium: { url: string };
    high: { url: string };
  };
  statistics: {
    viewCount: number;
    subscriberCount: number;
    videoCount: number;
  };
  publishedAt: string;
}

export interface SingleVideo {
  kind: string; // Always "youtube#searchResult" for this type
  etag: string; // The ETag of the result
  id: {
    kind: string; // Type of resource, e.g., "youtube#video"
    videoId: string; // ID of the video
  };
  snippet: {
    publishedAt: string; // ISO 8601 format date-time string
    channelId: string; // ID of the channel
    title: string; // Title of the video
    description: string; // Description of the video
    thumbnails: {
      default: {
        url: string; // URL of the default thumbnail
        width: number; // Width of the default thumbnail
        height: number; // Height of the default thumbnail
      };
      medium: {
        url: string; // URL of the medium thumbnail
        width: number; // Width of the medium thumbnail
        height: number; // Height of the medium thumbnail
      };
      high: {
        url: string; // URL of the high thumbnail
        width: number; // Width of the high thumbnail
        height: number; // Height of the high thumbnail
      };
    };
    channelTitle: string; // Title of the channel
    liveBroadcastContent: string; // Broadcast status, e.g., "none"
    publishTime: string; // ISO 8601 format date-time string
  };
}
