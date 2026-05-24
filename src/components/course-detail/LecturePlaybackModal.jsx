"use client";

import { Headphones } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function LecturePlaybackModal({
  open,
  onOpenChange,
  playbackData,
}) {
  const lecture = playbackData?.lecture;
  const playback = playbackData?.playback;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-24px)] max-w-[560px] rounded-[28px] border-[#e3eaf3] p-0">
        <div className="overflow-hidden rounded-[28px] bg-white">
          <div className="bg-[#377dff] p-6 text-white sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Headphones className="h-7 w-7" />
            </div>

            <DialogHeader className="mt-5">
              <DialogTitle className="text-left text-[26px] font-bold leading-tight tracking-[-0.04em] sm:text-[32px]">
                {lecture?.title || "Lecture playback"}
              </DialogTitle>
            </DialogHeader>

            <p className="mt-2 text-sm font-medium text-white/75">
              {lecture?.mediaKind || "AUDIO"} lesson
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {playback?.url ? (
              <audio
                key={playback.url}
                controls
                autoPlay
                className="w-full"
                controlsList="nodownload"
              >
                <source src={playback.url} type={playback.mimeType || "audio/mpeg"} />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="rounded-2xl bg-[#f8fbff] p-5 text-center text-sm font-semibold text-[#66788f]">
                Playback URL is not available.
              </div>
            )}

            <p className="mt-4 text-center text-xs leading-5 text-[#8a9aad]">
              This playback link is securely signed and may expire. If playback
              stops later, reopen the lecture to generate a new link.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}