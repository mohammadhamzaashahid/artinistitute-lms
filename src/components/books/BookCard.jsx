"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Headphones, Lock } from "lucide-react";

import { cn } from "@/lib/utils/cn";

function formatBookPrice(book) {
  if (!book) return null;
  const price = Number(book.price ?? 0);
  if (price === 0) return "Free";
  const currency = book.currency || "AED";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  } catch {
    return `${currency} ${price}`;
  }
}

export default function BookCard({ book, index = 0, className, priority = false }) {
  const coverUrl = book?.coverImages?.[0]?.mediaAsset?.url;
  const audioCount = book?.audioFiles?.length ?? book?._count?.audioFiles ?? 0;
  const freeCount = book?.audioFiles?.filter((a) => a.isPreviewFree)?.length ?? 0;
  const priceLabel = formatBookPrice(book);
  const isFree = Number(book?.price ?? 0) === 0;

  const gradients = [
    "from-blue-100 to-indigo-200",
    "from-emerald-100 to-teal-200",
    "from-amber-100 to-orange-200",
    "from-rose-100 to-pink-200",
    "from-violet-100 to-purple-200",
    "from-sky-100 to-cyan-200",
  ];
  const gradient = gradients[index % gradients.length];

  return (
    <Link
      href={`/books/${book?.slug || book?.id || ""}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-[#e3eaf3] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.11)]",
        className
      )}
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={book?.title || "Book cover"}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={cn(
              "flex h-full w-full items-center justify-center bg-gradient-to-br",
              gradient
            )}
          >
            <BookOpen className="h-16 w-16 text-white/60" />
          </div>
        )}

        {/* Price pill */}
        {priceLabel && (
          <div
            className={cn(
              "absolute right-3 top-3 rounded-full px-3 py-1 text-[13px] font-bold shadow-md backdrop-blur",
              isFree
                ? "bg-emerald-500 text-white"
                : "bg-white/92 text-[#20242a]"
            )}
          >
            {priceLabel}
          </div>
        )}

        {/* Free preview badge */}
        {freeCount > 0 && !isFree && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-[#377dff]/90 px-2.5 py-1 text-[11px] font-bold text-white shadow">
            <Headphones className="h-3 w-3" />
            Free preview
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="line-clamp-2 text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a] transition group-hover:text-[#377dff]">
          {book?.title || "Untitled Book"}
        </h3>

        {book?.description ? (
          <p className="mt-2 line-clamp-2 text-[13.5px] leading-5 text-[#66788f]">
            {book.description}
          </p>
        ) : null}

        <div className="mt-4 flex items-center gap-3 text-[13px] font-medium text-[#8a9aad]">
          {audioCount > 0 ? (
            <span className="inline-flex items-center gap-1.5">
              <Headphones className="h-3.5 w-3.5" />
              {audioCount} audio track{audioCount !== 1 ? "s" : ""}
            </span>
          ) : null}
          {!isFree && audioCount > 0 && (
            <>
              <span className="text-[#dde5f0]">·</span>
              <span className="inline-flex items-center gap-1 text-[#8a9aad]">
                <Lock className="h-3 w-3" />
                Paid access
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
