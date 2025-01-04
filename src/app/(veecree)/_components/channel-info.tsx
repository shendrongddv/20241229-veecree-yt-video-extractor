"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Download, Loader2 } from "lucide-react";
import { getChannelDetailsFromId } from "../_actions/youtube";
import type { ChannelDetails } from "@/types/youtube";
import { formatNumber } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface ExportOptions {
  title: boolean;
  url: boolean;
}

interface ChannelInfoProps {
  channelId: string;
  videoCount: number;
  onExport: (options: ExportOptions) => void;
  onLoadMore: () => void;
  isLoadingMore: boolean;
  onDisplayOptionsChange: (options: ExportOptions) => void;
}

export function ChannelInfo({
  channelId,
  videoCount,
  onExport,
  onLoadMore,
  isLoadingMore,
  onDisplayOptionsChange,
}: ChannelInfoProps) {
  const [channelDetails, setChannelDetails] = useState<ChannelDetails | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    title: true,
    url: true,
  });

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      const details = await getChannelDetailsFromId(channelId);
      setChannelDetails(details);
      setIsLoading(false);
    };

    fetchDetails();
  }, [channelId]);

  useEffect(() => {
    onDisplayOptionsChange(exportOptions);
  }, [exportOptions, onDisplayOptionsChange]);

  const handleCopy = () => {
    navigator.clipboard.writeText(channelId);
    toast.success("Channel ID berhasil disalin!");
  };

  if (isLoading) {
    return <div className="rounded-lg border bg-card p-4">Memuat...</div>;
  }

  if (!channelDetails) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card">
        <div className="border-b p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{channelDetails.title}</h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {channelDetails.description}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm font-medium leading-none">Channel ID</p>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              {channelId}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Subscriber</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatNumber(channelDetails.statistics.subscriberCount)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Total Views</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatNumber(channelDetails.statistics.viewCount)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Total Video</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {formatNumber(channelDetails.statistics.videoCount)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Custom URL</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {channelDetails.customUrl || "-"}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Dibuat Pada</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(channelDetails.publishedAt).toLocaleDateString(
                "id-ID",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Menampilkan {videoCount} dari {channelDetails.statistics.videoCount}{" "}
          video
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={exportOptions.title}
                onCheckedChange={(checked) =>
                  setExportOptions((prev) => ({ ...prev, title: !!checked }))
                }
              />
              Judul
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={exportOptions.url}
                onCheckedChange={(checked) =>
                  setExportOptions((prev) => ({ ...prev, url: !!checked }))
                }
              />
              URL
            </label>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport(exportOptions)}
            disabled={!exportOptions.title && !exportOptions.url}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export ke TXT
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoadingMore ? "Memuat..." : "Muat Lebih Banyak"}
          </Button>
        </div>
      </div>
    </div>
  );
}
