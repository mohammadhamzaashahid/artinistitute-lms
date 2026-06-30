"use client";

import Link from "next/link";
import { Calendar, Clock3 } from "lucide-react";

import LiveClassImage from "@/components/live-classes/LiveClassImage";
import LiveClassStatusBadge from "@/components/live-classes/LiveClassStatusBadge";
import PriceText from "@/components/common/PriceText";
import { formatDate, formatDuration } from "@/lib/utils/format";
import { formatLiveClassTime, getLiveClassPrice } from "@/lib/utils/liveClass";

export default function LiveClassCard({ liveClass, index = 0 }) {
  const price = getLiveClassPrice(liveClass);

  return (
    <article className="group h-full">
      <Link
        href={`/live-classes/${liveClass?.slug || ""}`}
        className="block h-full overflow-hidden rounded-[8px] border border-[#dfe7f1] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#c8d7ea] hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]"
      >
        <div className="relative">
          <LiveClassImage
            liveClass={liveClass}
            index={index}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 360px"
            className="aspect-[1.65/1] w-full rounded-none"
          />
          <LiveClassStatusBadge
            liveClass={liveClass}
            className="absolute left-3 top-3 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.12)]"
          />
        </div>

        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#f5f8fc] px-3 py-1 text-[12px] font-extrabold text-[#20242a]">
              <PriceText price={price} />
            </span>
          </div>

          <h2 className="line-clamp-2 min-h-[48px] text-[18px] font-extrabold leading-[1.32] tracking-[-0.03em] text-[#20242a] transition group-hover:text-[#377dff]">
            {liveClass?.title || "Untitled live class"}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] font-bold text-[#8a9aad]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-[#c5d0de]" />
              {formatDate(liveClass?.startDate)} · {formatLiveClassTime(liveClass?.startDate)}
            </span>

            <span className="text-[#c1cad5]">|</span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-[#c5d0de]" />
              {formatDuration((liveClass?.timeDuration || 0) * 60)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
