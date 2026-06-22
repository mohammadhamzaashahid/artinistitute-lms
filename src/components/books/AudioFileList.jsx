"use client";

import { Headphones, Lock } from "lucide-react";
import AudioFileRow from "@/components/books/AudioFileRow";

export default function AudioFileList({ audioFiles = [], bookId, hasAccess }) {
  const sorted = [...audioFiles].sort(
    (a, b) => Number(a.audioOrder ?? 0) - Number(b.audioOrder ?? 0)
  );

  if (sorted.length === 0) {
    return null;
  }

  const freeCount = sorted.filter((a) => a.isPreviewFree).length;
  const paidCount = sorted.length - freeCount;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#20242a]">
          Audio Tracks
          <span className="ml-2 text-[15px] font-medium text-[#8a9aad]">
            ({sorted.length})
          </span>
        </h2>

        <div className="flex items-center gap-3 text-[12px]">
          {freeCount > 0 && (
            <span className="flex items-center gap-1 font-medium text-emerald-700">
              <Headphones className="h-3.5 w-3.5" />
              {freeCount} free
            </span>
          )}
          {paidCount > 0 && !hasAccess && (
            <span className="flex items-center gap-1 font-medium text-[#8a9aad]">
              <Lock className="h-3.5 w-3.5" />
              {paidCount} locked
            </span>
          )}
        </div>
      </div>

      <div className="divide-y divide-[#f0f4fb] rounded-2xl border border-[#e3eaf3] bg-white">
        {sorted.map((audioFile, index) => (
          <AudioFileRow
            key={audioFile.id}
            audioFile={audioFile}
            bookId={bookId}
            index={index}
            hasAccess={hasAccess}
          />
        ))}
      </div>

      {!hasAccess && paidCount > 0 && (
        <p className="mt-3 text-center text-[13px] text-[#8a9aad]">
          <Lock className="mr-1 inline h-3.5 w-3.5" />
          Order this book to unlock all {paidCount} paid track{paidCount !== 1 ? "s" : ""}.
        </p>
      )}
    </div>
  );
}
