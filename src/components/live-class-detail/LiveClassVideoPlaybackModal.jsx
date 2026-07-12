"use client";

import { PlayCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LiveClassVideoPlaybackModal({
  open,
  onOpenChange,
  playbackData,
}) {
  const video = playbackData?.video;
  const playback = playbackData?.playback;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-24px)] max-w-[860px] overflow-hidden rounded-[28px] border-[#e3eaf3] bg-white p-0">
        <div className="relative aspect-video w-full bg-black">
          {playback?.url ? (
            <video
              key={playback.url}
              controls
              autoPlay
              className="h-full w-full"
              controlsList="nodownload"
            >
              <source src={playback.url} type={playback.mimeType || "video/mp4"} />
              Your browser does not support the video element.
            </video>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-white/70">
              <PlayCircle className="h-8 w-8" />
              <p className="text-sm font-semibold">Playback URL is not available.</p>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-left text-[19px] font-bold leading-snug tracking-[-0.03em] text-[#20242a] sm:text-[22px]">
              {video?.title || "Video playback"}
            </DialogTitle>
          </DialogHeader>

          {video?.isPreviewFree ? (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#e8fbf5] px-3 py-1 text-[12px] font-extrabold uppercase tracking-wide text-[#00b887]">
              Free preview
            </span>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
