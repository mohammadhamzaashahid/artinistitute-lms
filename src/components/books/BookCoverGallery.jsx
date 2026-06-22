"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function BookCoverGallery({ coverImages = [], title = "" }) {
  const sorted = [...coverImages].sort(
    (a, b) => Number(a.displayOrder ?? 0) - Number(b.displayOrder ?? 0)
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImage = sorted[activeIndex];
  const activeSrc = activeImage?.mediaAsset?.url;

  function prev() {
    setActiveIndex((i) => (i - 1 + sorted.length) % sorted.length);
  }

  function next() {
    setActiveIndex((i) => (i + 1) % sorted.length);
  }

  if (sorted.length === 0) {
    return (
      <div className="flex aspect-[3/4] w-full max-w-[340px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#eef5ff] to-[#dce8ff]">
        <div className="text-center">
          <BookOpen className="mx-auto h-16 w-16 text-[#377dff]/40" />
          <p className="mt-3 text-sm text-[#8a9aad]">No cover available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="group relative aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#e3eaf3] bg-[#f8fbff] shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        {activeSrc ? (
          <Image
            key={activeSrc}
            src={activeSrc}
            alt={`${title} cover ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 640px) 90vw, 340px"
            className="object-cover transition duration-500"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-16 w-16 text-[#377dff]/30" />
          </div>
        )}

        {sorted.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous cover"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#20242a] opacity-0 shadow-md backdrop-blur transition group-hover:opacity-100 hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next cover"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#20242a] opacity-0 shadow-md backdrop-blur transition group-hover:opacity-100 hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex max-w-[340px] gap-2 overflow-x-auto pb-1">
          {sorted.map((cover, index) => (
            <button
              key={cover.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition",
                index === activeIndex
                  ? "border-[#377dff] shadow-[0_0_0_2px_rgba(55,125,255,0.2)]"
                  : "border-[#e3eaf3] opacity-60 hover:opacity-100"
              )}
              aria-label={`Cover ${index + 1}`}
            >
              {cover.mediaAsset?.url ? (
                <Image
                  src={cover.mediaAsset.url}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#f1f5f9]">
                  <BookOpen className="h-4 w-4 text-[#8a9aad]" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
