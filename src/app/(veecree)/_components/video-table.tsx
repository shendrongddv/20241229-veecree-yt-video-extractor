"use client";

import { VideoDetails } from "@/types/youtube";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface VideoTableProps {
  videos: VideoDetails[];
  showTitle?: boolean;
  showUrl?: boolean;
}

export function VideoTable({
  videos,
  showTitle = true,
  showUrl = true,
}: VideoTableProps) {
  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL video berhasil disalin!");
  };

  return (
    <div className="rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="h-12 px-4 text-left align-middle font-medium">
                No
              </th>
              {showTitle && (
                <th className="h-12 px-4 text-left align-middle font-medium">
                  Judul
                </th>
              )}
              {showUrl && (
                <th className="h-12 px-4 text-left align-middle font-medium">
                  URL
                </th>
              )}
              {showUrl && (
                <th className="h-12 w-[50px] px-4 align-middle font-medium"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => {
              const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
              return (
                <tr key={video.id} className="border-b text-sm">
                  <td className="p-4 align-middle">{index + 1}</td>
                  {showTitle && (
                    <td className="p-4 align-middle">
                      <p className="line-clamp-1">{video.title}</p>
                    </td>
                  )}
                  {showUrl && (
                    <>
                      <td className="max-w-[300px] p-4 align-middle">
                        <p className="line-clamp-1">{videoUrl}</p>
                      </td>
                      <td className="p-4 align-middle">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(videoUrl)}
                          className="h-8 w-8"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
