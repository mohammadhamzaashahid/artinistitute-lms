import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils/cn";

export default function AppLogo({
  className,
  imageClassName,
  priority = true,
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex h-[84px] w-[180px] items-center justify-center py-1",
        className,
      )}
    >
      <Image
        src="/assets/artin-logo.png"
        alt="Art-in Institute"
        width={1560}
        height={1084}
        className={cn("h-full w-full object-contain", imageClassName)}
        priority={priority}
      />
    </Link>
  );
}
