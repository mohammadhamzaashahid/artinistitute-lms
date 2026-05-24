"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { getCourseImage } from "@/lib/utils/media";
import { cn } from "@/lib/utils/cn";

const fallbackImages = [
  "/images/courses/course-1.svg",
  "/images/courses/course-2.svg",
  "/images/courses/course-3.svg",
  "/images/courses/course-4.svg",
  "/images/courses/course-5.svg",
  "/images/courses/course-6.svg",
];

const backgrounds = [
  "bg-[#86b9d7]",
  "bg-[#89a9cf]",
  "bg-[#ffdcca]",
  "bg-[#a8dad7]",
  "bg-[#b6c0c8]",
  "bg-[#d5a1c3]",
];

export default function CourseListImage({ course, index = 0, className }) {
  const imageUrl = getCourseImage(course);
  const hasImage = imageUrl && !imageUrl.includes("course-placeholder");
  const fallback = fallbackImages[index % fallbackImages.length];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[5px]",
        backgrounds[index % backgrounds.length],
        className
      )}
    >
      {hasImage || fallback ? (
        <Image
          src={hasImage ? imageUrl : fallback}
          alt={course?.title || "Course image"}
          fill
          sizes="(max-width: 768px) 100vw, 310px"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <BookOpen className="h-14 w-14 text-white/80" />
        </div>
      )}
    </div>
  );
}