"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Clock3, Radio } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import LiveClassImage from "@/components/live-classes/LiveClassImage";
import LiveClassStatusBadge from "@/components/live-classes/LiveClassStatusBadge";
import { Button } from "@/components/ui/button";
import { useMyAccessibleLiveClasses } from "@/lib/hooks/usePayments";
import { formatDate, formatDuration } from "@/lib/utils/format";
import { formatLiveClassTime, getLiveClassPhase } from "@/lib/utils/liveClass";

export default function MyLiveClassesPage() {
  const { data, isLoading, isError } = useMyAccessibleLiveClasses({
    page: 1,
    limit: 20,
  });

  const items = data?.items || [];

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col gap-4 rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h2 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#20242a] sm:text-[34px]">
            Live classes
          </h2>

          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#66788f]">
            Sessions you have reserved a seat for, with joining links and schedules.
          </p>
        </div>

        <Button
          asChild
          className="h-11 w-full rounded-xl bg-[#377dff] text-sm font-bold hover:bg-[#236bf1] md:w-auto md:px-5"
        >
          <Link href="/live-classes">
            Browse live classes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-[24px] bg-[#f4f7fb]"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && isError ? (
        <EmptyState
          title="Unable to load your live classes"
          description="Please try again after a moment."
        />
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <section className="rounded-[24px] border border-[#e3eaf3] bg-white p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <Radio className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-xl font-bold tracking-[-0.035em] text-[#20242a]">
            No live classes reserved yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-[15px] leading-7 text-[#66788f]">
            After you reserve a seat in a live class, it will appear here.
          </p>

          <Button asChild className="mt-6 h-11 rounded-xl bg-[#377dff]">
            <Link href="/live-classes">Explore live classes</Link>
          </Button>
        </section>
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="grid gap-4">
          {items.map((liveClass) => (
            <LiveClassPurchaseCard key={liveClass.id} liveClass={liveClass} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function LiveClassPurchaseCard({ liveClass }) {
  const phase = getLiveClassPhase(liveClass);

  return (
    <article className="overflow-hidden rounded-[24px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="w-full shrink-0 sm:w-[160px]">
          <LiveClassImage
            liveClass={liveClass}
            sizes="160px"
            className="aspect-video rounded-[12px]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <LiveClassStatusBadge liveClass={liveClass} />
          </div>

          <Link
            href={`/live-classes/${liveClass.slug}`}
            className="mt-2 block break-words text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a] hover:text-[#377dff]"
          >
            {liveClass.title}
          </Link>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-[#66788f]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[#8a9aad]" />
              {formatDate(liveClass.startDate)} · {formatLiveClassTime(liveClass.startDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5 text-[#8a9aad]" />
              {formatDuration((liveClass.timeDuration || 0) * 60)}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          {phase === "LIVE" ? (
            <Button
              asChild
              className="h-11 w-full rounded-xl bg-[#e53e3e] text-sm font-bold text-white hover:bg-[#cc3636] sm:w-auto"
            >
              <a href={liveClass.joiningLink || "#"} target="_blank" rel="noopener noreferrer">
                <Radio className="mr-2 h-4 w-4" />
                Join now
              </a>
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-xl border-[#dfe7f1] text-sm font-bold text-[#52657a] hover:border-[#377dff] hover:text-[#377dff] sm:w-auto"
            >
              <Link href={`/live-classes/${liveClass.slug}`}>View details</Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
