"use client";

import Image from "next/image";
import { Radio } from "lucide-react";
import { getLiveClassImage } from "@/lib/utils/media";
import { cn } from "@/lib/utils/cn";

const backgrounds = [
  "bg-[#86b9d7]",
  "bg-[#89a9cf]",
  "bg-[#ffdcca]",
  "bg-[#a8dad7]",
  "bg-[#b6c0c8]",
  "bg-[#d5a1c3]",
];

export default function LiveClassImage({
  liveClass,
  index = 0,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 310px",
  priority = false,
}) {
  const imageUrl = getLiveClassImage(liveClass);
  const hasImage = imageUrl && !imageUrl.includes("course-placeholder");

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[5px]",
        backgrounds[index % backgrounds.length],
        className
      )}
    >
      {hasImage ? (
        <Image
          src={imageUrl}
          alt={liveClass?.title || "Live class image"}
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
          <Radio className="h-14 w-14 text-white/80" />
        </div>
      )}
    </div>
  );
}
