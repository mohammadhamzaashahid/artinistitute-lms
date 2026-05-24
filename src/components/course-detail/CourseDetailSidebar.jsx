"use client";

import { Bookmark, PlayCircle, Share2 } from "lucide-react";

import CourseListImage from "@/components/courses/CourseListImage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export default function CourseDetailSidebar({
  course,
  lectures = [],
  hasCourseAccess,
  primaryPrice,
  onStartListening,
  onCheckout,
  checkoutLoading,
}) {
  const hasFreePreview = lectures.some((l) => l.isPreviewFree && !l.isLocked);

  return (
    <div className="overflow-hidden rounded-[5px] border border-[#dfe7f1] bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
      <div className="p-2">
        <CourseListImage
          course={course}
          index={0}
          className="aspect-[1.03/1] rounded-[4px]"
        />
      </div>

      <div className="space-y-4 px-5 py-6 sm:px-7">
        <Button
          type="button"
          onClick={onStartListening}
          className={cn(
            "h-[58px] w-full rounded-[5px] text-[17px] font-bold transition",
            hasCourseAccess
              ? "bg-[#377dff] text-white hover:bg-[#236bf1]"
              : hasFreePreview
                ? "border border-[#00b887] bg-white text-[#00b887] hover:bg-[#f0faf7]"
                : "border border-[#377dff] bg-white text-[#377dff] hover:bg-[#eef5ff]",
          )}
        >
          {hasCourseAccess ? (
            "Start listening"
          ) : hasFreePreview ? (
            <span className="flex items-center justify-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Preview free lesson
            </span>
          ) : (
            "Preview course"
          )}
        </Button>

        <Button
          type="button"
          onClick={onCheckout}
          disabled={checkoutLoading || hasCourseAccess}
          className="h-[58px] w-full rounded-[5px] bg-[#377dff] text-[17px] font-bold text-white hover:bg-[#236bf1] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {hasCourseAccess
            ? "Course unlocked"
            : checkoutLoading
              ? "Opening checkout..."
              : primaryPrice
                ? `Unlock — ${formatPriceLabel(primaryPrice)}`
                : "Unlock course"}
        </Button>

        {!hasCourseAccess ? (
          <div className="space-y-2 text-center">
            {hasFreePreview ? (
              <p className="flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#00b887]">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00b887]" />
                First lesson available for free
              </p>
            ) : null}
            <p className="text-[13px] font-medium leading-6 text-[#66788f]">
              Full access to all lessons after purchase or subscription.
            </p>
          </div>
        ) : (
          <p className="text-center text-[13px] font-medium leading-6 text-[#00a981]">
            You have full access to this course.
          </p>
        )}

        <button
          type="button"
          className="flex h-13 w-full items-center justify-center gap-2 rounded-[5px] bg-[#eaf1ff] text-[15px] font-bold text-[#377dff] transition hover:bg-[#dfeaff]"
        >
          <Bookmark className="h-4.5 w-4.5" />
          Save for later
        </button>
      </div>

      <div className="border-t border-[#e1e8f2] px-5 py-4 sm:px-7">
        <button
          type="button"
          className="mx-auto flex items-center justify-center gap-2 text-[15px] font-bold text-[#377dff] transition hover:underline"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}

function formatPriceLabel(price) {
  if (!price) return "";

  if (price.priceType === "SUBSCRIPTION" && price.billingInterval) {
    return `${price.currency || "USD"} ${Number(price.amount || 0).toFixed(2)}/${price.billingInterval.toLowerCase()}`;
  }

  return `${price.currency || "USD"} ${Number(price.amount || 0).toFixed(2)}`;
}
