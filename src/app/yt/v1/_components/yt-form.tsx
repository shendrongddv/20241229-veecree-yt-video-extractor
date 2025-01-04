"use client";

import { useState } from "react";
import { toast } from "sonner";
import { InputType, VideoDetails } from "@/types/youtube";
import {
  getChannelIdFromInput,
  getChannelVideosFromId,
} from "../_actions/youtube";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VideoList } from "./video-list";
import { VideoTable } from "./video-table";
import { ChannelInfo } from "./channel-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Video, AtSign, User, Link, Search } from "lucide-react";

const INPUT_OPTIONS = [
  { value: "video_url", label: "Video URL", icon: Video },
  { value: "channel_handle", label: "Channel Handle", icon: AtSign },
  { value: "username", label: "Username", icon: User },
  { value: "channel_url", label: "Channel URL", icon: Link },
  { value: "search_query", label: "Search Query", icon: Search },
] as const;

export function YTForm() {
  const [inputType, setInputType] = useState<InputType>("video_url");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [videos, setVideos] = useState<VideoDetails[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string>();
  const [channelId, setChannelId] = useState<string>();
  const [displayOptions, setDisplayOptions] = useState({
    title: true,
    url: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setVideos([]);
    setNextPageToken(undefined);

    try {
      const foundChannelId = await getChannelIdFromInput(inputType, inputValue);

      if (!foundChannelId) {
        toast.error("Tidak dapat menemukan Channel ID");
        return;
      }

      setChannelId(foundChannelId);
      const { videos: channelVideos, nextPageToken: token } =
        await getChannelVideosFromId(foundChannelId);
      setVideos(channelVideos);
      setNextPageToken(token);
      toast.success(`Ditemukan ${channelVideos.length} video`);
    } catch {
      toast.error("Terjadi kesalahan saat mengambil data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (!channelId || !nextPageToken || isLoadingMore) return;
    setIsLoadingMore(true);

    try {
      const { videos: moreVideos, nextPageToken: token } =
        await getChannelVideosFromId(channelId, nextPageToken);
      setVideos((prev) => [...prev, ...moreVideos]);
      setNextPageToken(token);
      toast.success(`Berhasil memuat ${moreVideos.length} video tambahan`);
    } catch {
      toast.error("Gagal memuat video tambahan");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleExport = (options: { title: boolean; url: boolean }) => {
    const content = videos
      .map((video, index) => {
        const parts = [];
        if (options.title) {
          parts.push(`${index + 1}. ${video.title}`);
        }
        if (options.url) {
          parts.push(`https://youtube.com/watch?v=${video.id}`);
        }
        return parts.join("\n");
      })
      .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "youtube-videos.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Daftar video berhasil diexport!");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {INPUT_OPTIONS.map((option) => {
            const Icon = option.icon;
            return (
              <Button
                key={option.value}
                type="button"
                variant={inputType === option.value ? "default" : "outline"}
                className="flex-1 sm:flex-none"
                onClick={() => setInputType(option.value)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {option.label}
              </Button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Input
            value={inputValue}
            required
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Masukkan ${
              INPUT_OPTIONS.find((opt) => opt.value === inputType)?.label
            }`}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Mencari..." : "Cari"}
          </Button>
        </div>
      </form>

      {channelId && videos.length > 0 && (
        <div className="space-y-6">
          <ChannelInfo
            channelId={channelId}
            videoCount={videos.length}
            onExport={handleExport}
            onLoadMore={handleLoadMore}
            isLoadingMore={isLoadingMore}
            onDisplayOptionsChange={setDisplayOptions}
          />

          <Tabs defaultValue="table">
            <TabsList>
              <TabsTrigger value="table">Tabel</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <VideoTable
                videos={videos}
                showTitle={displayOptions.title}
                showUrl={displayOptions.url}
              />
            </TabsContent>
            <TabsContent value="grid">
              <VideoList videos={videos} />
            </TabsContent>
          </Tabs>

          {nextPageToken && (
            <Button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full"
            >
              {isLoadingMore ? "Memuat..." : "Muat Lebih Banyak"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
