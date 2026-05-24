"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock3, ThumbsUp } from "lucide-react";

import PriceText from "@/components/common/PriceText";
import { cn } from "@/lib/utils/cn";
import { getCourseImage } from "@/lib/utils/media";
import { formatDuration } from "@/lib/utils/format";

const fallbackImages = [
  "/images/courses/course-1.svg",
  "/images/courses/course-2.svg",
  "/images/courses/course-3.svg",
  "/images/courses/course-4.svg",
  "/images/courses/course-5.svg",
  "/images/courses/course-6.svg",
];

const fallbackBackgrounds = [
  "bg-[#ffdfce]",
  "bg-[#a8dad7]",
  "bg-[#97bbae]",
  "bg-[#8aaad1]",
  "bg-[#aeb7bd]",
  "bg-[#d6a4c5]",
];

export default function CourseCard({
  course,
  index = 0,
  className,
  priority = false,
}) {
  const imageUrl = getCourseImage(course);
  const hasRealImage = imageUrl && !imageUrl.includes("course-placeholder");
  const fallbackImage = fallbackImages[index % fallbackImages.length];
  const bg = fallbackBackgrounds[index % fallbackBackgrounds.length];

  const price = Array.isArray(course?.prices) ? course.prices[0] : null;
  const lectureCount = course?._count?.lectures || course?.lectures?.length || 0;

  const durationSeconds =
    course?.durationSeconds ||
    course?.totalDurationSeconds ||
    course?.lectures?.reduce(
      (total, lecture) => total + Number(lecture.durationSeconds || 0),
      0
    ) ||
    0;

  return (
    <Link
      href={`/courses/${course?.slug || ""}`}
      className={cn(
        "group block overflow-hidden rounded-[5px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)]",
        className
      )}
    >
      <div className={cn("relative aspect-[1.05/1] overflow-hidden", bg)}>
        <Image
          src={hasRealImage ? imageUrl : fallbackImage}
          alt={course?.title || "Course"}
          fill
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />

        {price ? (
          <div className="absolute right-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-sm font-bold text-[#20242a] shadow-sm backdrop-blur">
            <PriceText price={price} />
          </div>
        ) : null}
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="line-clamp-2 min-h-[68px] text-[24px] font-bold leading-[1.23] tracking-[-0.035em] text-[#20242a]">
          {course?.title || "Untitled Course"}
        </h3>

        {course?.shortDescription ? (
          <p className="mt-3 line-clamp-2 text-[15px] leading-6 text-[#66788f]">
            {course.shortDescription}
          </p>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[14px] font-medium text-[#8a9aad]">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#eef5ff]">
            <span className="text-xs font-bold text-[#377dff]">
              {(course?.title || "A").slice(0, 1)}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 fill-[#8a9aad]/20" />
            {lectureCount || 0} lessons
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
      </div>
    </Link>
  );
}