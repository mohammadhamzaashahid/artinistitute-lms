"use client";

import { Loader2, Lock, PlayCircle } from "lucide-react";

import { canPlayLecture, isLectureLocked } from "@/lib/utils/course";
import { cn } from "@/lib/utils/cn";

export default function LectureRow({
  lecture,
  index,
  isActive,
  isLoading,
  onClick,
}) {
  const locked = isLectureLocked(lecture);
  const playable = canPlayLecture(lecture);
  const isFreePreview = Boolean(lecture.isPreviewFree) && !locked;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex min-h-18 w-full items-center gap-4 border-b border-[#e8eef6] px-5 py-4 text-left transition last:border-b-0 sm:min-h-20 sm:px-7",
        isFreePreview
          ? "bg-[#f6fbf8] hover:bg-[#ecf7f2]"
          : playable
            ? "hover:bg-[#f5f8ff]"
            : "hover:bg-[#fafbfc]",
        isActive && "bg-[#eef5ff] hover:bg-[#e6f0ff]",
      )}
    >
      {isFreePreview && (
        <span className="absolute inset-y-0 left-0 w-0.75 rounded-r-sm bg-[#00b887]" />
      )}

      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition",
          isFreePreview
            ? "bg-[#e0f5ed] group-hover:bg-[#caeee1]"
            : playable
              ? "bg-[#eef5ff] group-hover:bg-[#deeaff]"
              : "bg-[#f2f4f6]",
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4.5 w-4.5 animate-spin text-[#377dff]" />
        ) : locked ? (
          <Lock className="h-4 w-4 text-[#b0bcc9]" />
        ) : isFreePreview ? (
          <PlayCircle className="h-5 w-5 text-[#00b887]" />
        ) : (
          <PlayCircle className="h-5 w-5 text-[#377dff]" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-[15px] font-semibold leading-snug sm:text-[16px]",
            locked ? "text-[#8d9faf]" : "text-[#20242a]",
          )}
        >
          {lecture.title || `Lesson ${index + 1}`}
        </span>

        {isFreePreview ? (
          <span className="mt-0.5 block text-[12px] font-bold uppercase tracking-widest text-[#00b887]">
            Free preview
          </span>
        ) : locked ? (
          <span className="mt-0.5 block text-[12px] font-medium text-[#b0bcc9]">
            Subscribe to unlock
          </span>
        ) : null}
      </span>

      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-[13px] font-semibold tabular-nums",
          locked
            ? "text-[#b0bcc9]"
            : isFreePreview
              ? "bg-[#e0f5ed] text-[#00a070]"
              : "bg-[#eef5ff] text-[#377dff]",
        )}
      >
        {formatDurationShort(lecture.durationSeconds)}
      </span>
    </button>
  );
}

function formatDurationShort(seconds) {
  const total = Number(seconds || 0);
  if (!total) return "—";
  const minutes = Math.floor(total / 60);
  const remainingSeconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}
