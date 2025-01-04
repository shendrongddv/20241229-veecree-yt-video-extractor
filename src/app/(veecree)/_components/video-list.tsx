import { VideoDetails } from "@/types/youtube";
import Image from "next/image";

interface VideoListProps {
  videos: VideoDetails[];
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <a
          key={video.id}
          href={`https://youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent"
        >
          <div className="relative aspect-video">
            <Image
              src={video.thumbnails.medium.url}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="line-clamp-2 font-semibold group-hover:text-accent-foreground">
              {video.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {video.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
