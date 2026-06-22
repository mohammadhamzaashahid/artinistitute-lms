"use client";

import { useState } from "react";
import { Headphones, Lock, Loader2, Play, Pause } from "lucide-react";

import { formatDuration } from "@/lib/utils/format";
import { useBookAudioPlayback } from "@/lib/hooks/useBooks";
import BookAudioPlayer from "@/components/books/BookAudioPlayer";

export default function AudioFileRow({ audioFile, bookId, index, hasAccess }) {
  const [playEnabled, setPlayEnabled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const canPlay = audioFile.isPreviewFree || hasAccess;

  const { data: playbackData, isLoading } = useBookAudioPlayback(
    bookId,
    audioFile.id,
    playEnabled && canPlay
  );

  function handlePlay() {
    if (!canPlay) return;
    setPlayEnabled(true);
    setShowPlayer(true);
  }

  return (
    <div className="group">
      <div className="flex items-center gap-4 rounded-xl px-4 py-3.5 transition hover:bg-[#f8fbff]">
        {/* Track number / play button */}
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-[#8a9aad] transition group-hover:opacity-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          {canPlay ? (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center text-[#377dff] opacity-0 transition group-hover:opacity-100"
              aria-label={`Play ${audioFile.title}`}
            >
              {isLoading && playEnabled ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : showPlayer ? (
                <Pause className="h-5 w-5 fill-[#377dff]" />
              ) : (
                <Play className="h-5 w-5 fill-[#377dff]" />
              )}
            </button>
          ) : null}
        </div>

        {/* Title + description */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[#20242a]">
            {audioFile.title}
          </p>
          {audioFile.description ? (
            <p className="mt-0.5 truncate text-[13px] text-[#8a9aad]">
              {audioFile.description}
            </p>
          ) : null}
        </div>

        {/* Duration + access badge */}
        <div className="flex shrink-0 items-center gap-3">
          {audioFile.durationSeconds ? (
            <span className="text-[13px] text-[#8a9aad]">
              {formatDuration(audioFile.durationSeconds)}
            </span>
          ) : null}

          {audioFile.isPreviewFree ? (
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
              <Headphones className="h-3 w-3" />
              Free
            </span>
          ) : hasAccess ? (
            <span className="flex items-center gap-1 rounded-full bg-[#eef5ff] px-2.5 py-0.5 text-[11px] font-bold text-[#377dff]">
              <Headphones className="h-3 w-3" />
              Unlocked
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[13px] text-[#b0bfd0]">
              <Lock className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Inline player */}
      {showPlayer && canPlay && (
        <div className="mx-4 mb-3">
          {playbackData?.playback?.url ? (
            <BookAudioPlayer
              src={playbackData.playback.url}
              title={audioFile.title}
              onClose={() => {
                setShowPlayer(false);
                setPlayEnabled(false);
              }}
            />
          ) : isLoading ? (
            <div className="flex items-center gap-2 rounded-xl bg-[#f8fbff] px-4 py-3 text-[13px] text-[#8a9aad]">
              <Loader2 className="h-4 w-4 animate-spin text-[#377dff]" />
              Loading audio…
            </div>
          ) : (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-[13px] text-red-600">
              Failed to load audio. Please try again.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
