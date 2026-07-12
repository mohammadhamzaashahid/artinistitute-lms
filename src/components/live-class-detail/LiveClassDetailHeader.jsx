"use client";

import { Calendar, Clock3, Download, FileText } from "lucide-react";

import LiveClassStatusBadge from "@/components/live-classes/LiveClassStatusBadge";
import { formatDate, formatDurationDays } from "@/lib/utils/format";
import { formatLiveClassTime, getLiveClassMaterials } from "@/lib/utils/liveClass";
import { resolveAssetUrl } from "@/lib/utils/media";

export default function LiveClassDetailHeader({ liveClass }) {
  const materials = getLiveClassMaterials(liveClass);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <LiveClassStatusBadge liveClass={liveClass} />

        {liveClass?.course?.title ? (
          <span className="rounded-full bg-[#f5f8fc] px-3 py-1 text-[12px] font-extrabold text-[#20242a]">
            Part of {liveClass.course.title}
          </span>
        ) : null}
      </div>

      <h1 className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.045em] text-[#20242a] sm:text-[36px]">
        {liveClass?.title || "Live class"}
      </h1>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-bold text-[#66788f]">
        <span className="inline-flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#377dff]" />
          {formatDate(liveClass?.startDate)} · {formatLiveClassTime(liveClass?.startDate)} –{" "}
          {formatLiveClassTime(liveClass?.endDate)}
        </span>

        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#377dff]" />
          {formatDurationDays(liveClass?.durationDays)} access
        </span>
      </div>

      {liveClass?.description ? (
        <p className="mt-6 max-w-3xl whitespace-pre-line text-[16px] leading-7 text-[#475569]">
          {liveClass.description}
        </p>
      ) : null}

      {materials.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-[22px] font-bold tracking-[-0.04em] text-[#20242a]">
            Preparatory materials
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {materials.map(({ id, mediaAsset }) => {
              const url = resolveAssetUrl(mediaAsset);
              if (!url) return null;

              return (
                <a
                  key={id}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-[16px] border border-[#dfe7f1] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:border-[#377dff] hover:bg-[#f5f8ff]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#eef5ff]">
                    <FileText className="h-5 w-5 text-[#377dff]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold text-[#20242a]">
                      {mediaAsset?.originalFilename || "Material"}
                    </p>
                    <p className="text-[12px] text-[#66788f]">View or download</p>
                  </div>
                  <Download className="h-4 w-4 shrink-0 text-[#377dff]" />
                </a>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}
