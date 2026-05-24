"use client";

import { BookOpen, Clock3, ThumbsUp } from "lucide-react";

import { formatDuration } from "@/lib/utils/format";
import {
  getCourseTags,
  getTotalDurationSeconds,
} from "@/lib/utils/course";

export default function CourseDetailHeader({ course, lectures = [] }) {
  const tags = getCourseTags(course);
  const totalDuration = getTotalDurationSeconds(lectures);
  const lessonCount = lectures.length || course?._count?.lectures || 0;

  return (
    <header>
      <div className="flex flex-wrap gap-2">
        {course?.category?.name ? (
          <span className="rounded-full bg-[#06c5a8] px-4 py-2 text-xs font-bold uppercase tracking-[-0.01em] text-white">
            {course.category.name}
          </span>
        ) : null}

        {tags.slice(0, 2).map((tag) => (
          <span
            key={tag.id || tag.slug || tag.name}
            className="rounded-full bg-[#06c5a8] px-4 py-2 text-xs font-bold uppercase tracking-[-0.01em] text-white"
          >
            {tag.name}
          </span>
        ))}
      </div>

      <h1 className="mt-5 max-w-[900px] text-[36px] font-bold leading-[1.12] tracking-[-0.055em] text-[#20242a] sm:text-[48px] lg:text-[54px]">
        {course.title}
      </h1>

      {course.description || course.shortDescription ? (
        <div className="mt-5 max-w-[860px] space-y-5 text-[17px] leading-8 text-[#617389] sm:text-[19px] sm:leading-9">
          <p>{course.description || course.shortDescription}</p>

          {course.shortDescription && course.description ? (
            <p>{course.shortDescription}</p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-[15px] font-medium text-[#7f91a6] sm:text-[16px]">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef5ff] text-xs font-bold text-[#377dff]">
            {(course.title || "A").slice(0, 1)}
          </div>
          <span>
            Created by{" "}
            <span className="border-b border-[#9fb0c2] text-[#66788f]">
              Artin Institute
            </span>
          </span>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 text-[15px] font-medium text-[#7f91a6] sm:text-[16px]">
        <span className="inline-flex items-center gap-2">
          <BookOpen className="h-5 w-5 fill-[#7f91a6]/20" />
          {lessonCount} lessons
        </span>

        <span className="text-[#c1cad5]">|</span>

        <span className="inline-flex items-center gap-2">
          <Clock3 className="h-5 w-5 fill-[#7f91a6]/20" />
          {formatDuration(totalDuration)}
        </span>

        <span className="text-[#c1cad5]">|</span>

        <span className="inline-flex items-center gap-2">
          <ThumbsUp className="h-5 w-5" />
          96%
        </span>
      </div>
    </header>
  );
}