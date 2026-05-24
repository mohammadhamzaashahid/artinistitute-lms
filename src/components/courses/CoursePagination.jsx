"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function CoursePagination({
  pagination,
  activeCategory,
  search,
}) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const page = Number(pagination.page || 1);
  const totalPages = Number(pagination.totalPages || 1);

  function hrefFor(nextPage) {
    const params = new URLSearchParams();

    params.set("page", String(nextPage));

    if (activeCategory) params.set("category", activeCategory);
    if (search) params.set("search", search);

    return `/courses?${params.toString()}`;
  }

  const pages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let index = start; index <= end; index++) {
    pages.push(index);
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page <= 1}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe7f1] px-4 text-sm font-bold text-[#52657a] transition hover:border-[#377dff] hover:text-[#377dff]",
          page <= 1 && "pointer-events-none opacity-45"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        Prev
      </Link>

      {start > 1 ? (
        <>
          <Link
            href={hrefFor(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#dfe7f1] text-sm font-bold text-[#52657a] transition hover:border-[#377dff] hover:text-[#377dff]"
          >
            1
          </Link>
          <span className="px-1 text-[#8a9aad]">...</span>
        </>
      ) : null}

      {pages.map((pageNumber) => (
        <Link
          key={pageNumber}
          href={hrefFor(pageNumber)}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-xl border text-sm font-bold transition",
            pageNumber === page
              ? "border-[#377dff] bg-[#377dff] text-white"
              : "border-[#dfe7f1] text-[#52657a] hover:border-[#377dff] hover:text-[#377dff]"
          )}
        >
          {pageNumber}
        </Link>
      ))}

      {end < totalPages ? (
        <>
          <span className="px-1 text-[#8a9aad]">...</span>
          <Link
            href={hrefFor(totalPages)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#dfe7f1] text-sm font-bold text-[#52657a] transition hover:border-[#377dff] hover:text-[#377dff]"
          >
            {totalPages}
          </Link>
        </>
      ) : null}

      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page >= totalPages}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dfe7f1] px-4 text-sm font-bold text-[#52657a] transition hover:border-[#377dff] hover:text-[#377dff]",
          page >= totalPages && "pointer-events-none opacity-45"
        )}
      >
        Next
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}