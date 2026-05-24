"use client";

import Link from "next/link";
import { BookOpen, Clock3, ThumbsUp } from "lucide-react";

import CourseListImage from "@/components/courses/CourseListImage";
import PriceText from "@/components/common/PriceText";
import { formatDuration } from "@/lib/utils/format";

export default function CourseListCard({ course, index = 0 }) {
  const lectureCount = course?._count?.lectures || course?.lectures?.length || 0;
  const price = Array.isArray(course?.prices) ? course.prices[0] : null;

  const durationSeconds =
    course?.durationSeconds ||
    course?.totalDurationSeconds ||
    course?.lectures?.reduce(
      (total, lecture) => total + Number(lecture.durationSeconds || 0),
      0
    ) ||
    0;

  return (
    <article className="group border-t border-[#e1e8f2] py-7 first:border-t-0 md:py-8">
      <Link
        href={`/courses/${course?.slug || ""}`}
        className="grid gap-5 md:grid-cols-[300px_1fr] md:gap-7 lg:grid-cols-[320px_1fr]"
      >
        <CourseListImage
          course={course}
          index={index}
          className="aspect-[1.18/1] w-full md:h-[238px] md:aspect-auto"
        />

        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {course?.category?.name ? (
              <span className="rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-bold text-[#377dff]">
                {course.category.name}
              </span>
            ) : null}

            {price ? (
              <span className="rounded-full bg-[#f6f8fb] px-3 py-1 text-xs font-bold text-[#20242a]">
                <PriceText price={price} />
              </span>
            ) : null}
          </div>

          <h2 className="max-w-[760px] text-[25px] font-bold leading-[1.24] tracking-[-0.035em] text-[#20242a] transition group-hover:text-[#377dff] sm:text-[30px]">
            {course?.title || "Untitled Course"}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] font-medium text-[#8a9aad] sm:text-[15px]">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef5ff] text-[11px] font-bold text-[#377dff]">
                {(course?.title || "A").slice(0, 1)}
              </div>
              <span>{course?.instructorName || "Artin Institute"}</span>
            </div>

            <span className="hidden text-[#c1cad5] sm:inline">|</span>

            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 fill-[#8a9aad]/20" />
              {lectureCount} lessons
            </span>

            <span className="text-[#c1cad5]">|</span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 fill-[#8a9aad]/20" />
              {formatDuration(durationSeconds || 3600)}
            </span>

            <span className="text-[#c1cad5]">|</span>

            <span className="inline-flex items-center gap-1.5">
              <ThumbsUp className="h-4 w-4" />
              96%
            </span>
          </div>

          <p className="mt-4 max-w-[760px] text-[16px] leading-7 text-[#66788f] sm:text-[17px]">
            {course?.shortDescription ||
              course?.description ||
              "Explore this course and learn through focused, easy-to-follow lessons designed for flexible learning."}
          </p>
        </div>
      </Link>
    </article>
  );
}