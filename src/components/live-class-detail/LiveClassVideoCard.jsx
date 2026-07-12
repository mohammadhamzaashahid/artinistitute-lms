"use client";

import { Lock, Loader2, PlayCircle } from "lucide-react";

import { canPlayLiveClassVideo, isLiveClassVideoLocked } from "@/lib/utils/liveClass";
import { cn } from "@/lib/utils/cn";

function formatVideoDuration(seconds) {
  const total = Number(seconds || 0);
  if (!total) return null;

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remainingSeconds = Math.floor(total % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export default function LiveClassVideoCard({ video, index = 0, isLoading, onClick }) {
  const locked = isLiveClassVideoLocked(video);
  const playable = canPlayLiveClassVideo(video);
  const isFreePreview = Boolean(video?.isPreviewFree) && !locked;
  const duration = formatVideoDuration(video?.durationSeconds);
  const title = video?.title || `Video ${index + 1}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      aria-label={`${title}${locked ? " — locked, purchase to unlock" : isFreePreview ? " — free preview" : " — play video"}`}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-[20px] border bg-white text-left shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377dff] focus-visible:ring-offset-2 disabled:cursor-wait sm:min-h-43 sm:flex-row",
        isFreePreview
          ? "border-[#bfe9db] hover:border-[#00b887]"
          : "border-[#dfe7f1] hover:border-[#377dff]/50",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]",
      )}
    >
      <div
        className={cn(
          "relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-65 lg:w-75 xl:w-85",
          isFreePreview
            ? "bg-gradient-to-br from-[#0f2f28] via-[#134438] to-[#0a2019]"
            : "bg-gradient-to-br from-[#101826] via-[#16233a] to-[#0b1220]",
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]"
        />

        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-white backdrop-blur-sm">
          Session {video?.videoOrder || index + 1}
        </span>

        {isFreePreview ? (
          <span className="absolute right-3 top-3 rounded-full bg-[#00b887] px-2.5 py-1 text-[11px] font-extrabold whitespace-nowrap uppercase tracking-wide text-white">
            Free preview
          </span>
        ) : null}

        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full transition duration-300",
              locked
                ? "bg-white/10"
                : "bg-white/90 group-hover:scale-105 group-hover:bg-white",
            )}
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            ) : locked ? (
              <Lock className="h-5 w-5 text-white/80" />
            ) : (
              <PlayCircle
                className={cn(
                  "h-8 w-8",
                  isFreePreview ? "text-[#00b887]" : "text-[#377dff]",
                )}
                strokeWidth={1.75}
              />
            )}
          </span>
        </div>

        {duration ? (
          <span className="absolute bottom-3 right-3 rounded-md bg-black/55 px-2 py-0.5 text-[11px] font-bold tabular-nums whitespace-nowrap text-white backdrop-blur-sm">
            {duration}
          </span>
        ) : null}

        {locked ? <div aria-hidden="true" className="absolute inset-0 bg-black/20" /> : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-5">
        <h3
          title={title}
          className={cn(
            "line-clamp-2 min-w-0 text-[15.5px] font-bold leading-snug wrap-break-word sm:text-[16.5px]",
            locked ? "text-[#8d9faf]" : "text-[#20242a]",
          )}
        >
          {title}
        </h3>

        {video?.description ? (
          <p
            title={video.description}
            className="line-clamp-2 min-w-0 text-[13.5px] leading-6 wrap-break-word text-[#66788f]"
          >
            {video.description}
          </p>
        ) : null}

        <div className="mt-1.5 min-w-0 text-[12px] font-bold">
          {isLoading ? (
            <span className="inline-flex max-w-full items-center gap-1.5 text-[#377dff]">
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
              <span className="truncate whitespace-nowrap">Loading…</span>
            </span>
          ) : locked ? (
            <span className="inline-flex max-w-full items-center gap-1.5 text-[#b0bcc9]">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate whitespace-nowrap">Purchase to unlock</span>
            </span>
          ) : isFreePreview ? (
            <span className="inline-flex max-w-full items-center gap-1.5 text-[#00b887]">
              <PlayCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate whitespace-nowrap">Free preview</span>
            </span>
          ) : playable ? (
            <span className="inline-flex max-w-full items-center gap-1.5 text-[#377dff]">
              <PlayCircle className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate whitespace-nowrap">Play video</span>
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
