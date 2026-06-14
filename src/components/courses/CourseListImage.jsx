"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { getCourseImage } from "@/lib/utils/media";
import { cn } from "@/lib/utils/cn";

const backgrounds = [
  "bg-[#86b9d7]",
  "bg-[#89a9cf]",
  "bg-[#ffdcca]",
  "bg-[#a8dad7]",
  "bg-[#b6c0c8]",
  "bg-[#d5a1c3]",
];

export default function CourseListImage({
  course,
  index = 0,
  className,
  imageClassName,
  imageWidth,
  imageHeight,
  type = "thumbnail",
  sizes = "(max-width: 768px) 100vw, 310px",
  priority = false,
}) {
  const imageUrl = getCourseImage(course, type);
  const hasImage = imageUrl && !imageUrl.includes("course-placeholder");
  const useIntrinsicImageSize = imageWidth && imageHeight;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[5px]",
        backgrounds[index % backgrounds.length],
        className
      )}
    >
      {hasImage && useIntrinsicImageSize ? (
        <Image
          src={imageUrl}
          alt={course?.title || "Course image"}
          width={imageWidth}
          height={imageHeight}
          priority={priority}
          sizes={sizes}
          className={cn(
            "h-auto w-full object-cover transition duration-500 group-hover:scale-[1.035]",
            imageClassName
          )}
        />
      ) : hasImage ? (
        <Image
          src={imageUrl}
          alt={course?.title || "Course image"}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover transition duration-500 group-hover:scale-[1.035]",
            imageClassName
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <BookOpen className="h-14 w-14 text-white/80" />
        </div>
      )}
    </div>
  );
}
