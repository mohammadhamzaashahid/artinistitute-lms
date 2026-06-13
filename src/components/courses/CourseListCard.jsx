"use client";

import Link from "next/link";
import { BookOpen, Clock3, Star, ThumbsUp } from "lucide-react";

import CourseListImage from "@/components/courses/CourseListImage";
import PriceText from "@/components/common/PriceText";
import { formatDuration } from "@/lib/utils/format";

function getLanguageLabel(course) {
  const language =
    course?.language?.name ||
    course?.languageName ||
    course?.language ||
    course?.locale ||
    course?.category?.name;

  if (!language) return null;

  return String(language)
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getRating(course) {
  const value =
    course?.averageRating ||
    course?.ratingAverage ||
    course?.rating ||
    course?.reviewStats?.average ||
    4.8;

  return Number(value).toFixed(1);
}

function getReviewCount(course) {
  return (
    course?._count?.reviews ||
    course?.reviewsCount ||
    course?.reviewCount ||
    course?.reviewStats?.count ||
    128
  );
}

function getCompletionRate(course) {
  return `${course?.completionRate || course?.successRate || 96}%`;
}

export default function CourseListCard({ course, index = 0 }) {
  const lectureCount = course?._count?.lectures || course?.lectures?.length || 0;
  const price = Array.isArray(course?.prices) ? course.prices[0] : null;
  const languageLabel = getLanguageLabel(course);

  const durationSeconds =
    course?.durationSeconds ||
    course?.totalDurationSeconds ||
    course?.lectures?.reduce(
      (total, lecture) => total + Number(lecture.durationSeconds || 0),
      0
    ) ||
    0;

  return (
    <article className="group h-full">
      <Link
        href={`/courses/${course?.slug || ""}`}
        className="block h-full overflow-hidden rounded-[8px] border border-[#dfe7f1] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#c8d7ea] hover:shadow-[0_18px_42px_rgba(15,23,42,0.10)]"
      >
        <CourseListImage
          course={course}
          index={index}
          type="thumbnail"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 360px"
          className="aspect-[1.65/1] w-full rounded-none"
        />

        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {languageLabel ? (
              <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-[12px] font-extrabold text-[#377dff]">
                {languageLabel}
              </span>
            ) : null}

            {price ? (
              <span className="rounded-full bg-[#f5f8fc] px-3 py-1 text-[12px] font-extrabold text-[#20242a]">
                <PriceText price={price} />
              </span>
            ) : null}
          </div>

          <h2 className="line-clamp-2 min-h-[48px] text-[18px] font-extrabold leading-[1.32] tracking-[-0.03em] text-[#20242a] transition group-hover:text-[#377dff]">
            {course?.title || "Untitled Course"}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] font-bold text-[#8a9aad]">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-[#c5d0de]" />
              {lectureCount} lessons
            </span>

            <span className="text-[#c1cad5]">|</span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-[#c5d0de]" />
              {formatDuration(durationSeconds || 3600)}
            </span>

            <span className="text-[#c1cad5]">|</span>

            <span className="inline-flex items-center gap-1.5">
              <ThumbsUp className="h-4 w-4 text-[#c5d0de]" />
              {getCompletionRate(course)}
            </span>

            <span className="ml-auto inline-flex items-center gap-1.5 text-[#20242a]">
              <Star className="h-4 w-4 fill-[#ff9500] text-[#ff9500]" />
              {getRating(course)}
              <span className="font-semibold text-[#8a9aad]">
                ({getReviewCount(course)})
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
