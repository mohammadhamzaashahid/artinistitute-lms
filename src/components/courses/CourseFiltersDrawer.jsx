"use client";

import Link from "next/link";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";

export default function CourseFiltersDrawer({
  categories = [],
  activeCategory,
  search,
}) {
  const categoryList = Array.isArray(categories) ? categories : [];

  function getHref(categorySlug) {
    const params = new URLSearchParams();

    if (categorySlug) params.set("category", categorySlug);
    if (search) params.set("search", search);

    params.set("page", "1");

    const query = params.toString();
    return query ? `/courses?${query}` : "/courses";
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="h-11 rounded-xl border-[#dfe7f1] text-[#52657a] lg:hidden"
        >
          <Filter className="mr-2 h-4 w-4" />
          Categories
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[310px] border-[#e3eaf3]">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl font-bold tracking-[-0.04em] text-[#20242a]">
            Categories
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-3">
          <Link
            href={getHref("")}
            className={cn(
              "rounded-xl px-4 py-3 text-[15px] font-semibold text-[#617389] transition hover:bg-[#f5f8fc] hover:text-[#377dff]",
              !activeCategory && "bg-[#eef5ff] text-[#377dff]"
            )}
          >
            All categories
          </Link>

          {categoryList.map((category) => (
            <Link
              key={category.id || category.slug}
              href={getHref(category.slug)}
              className={cn(
                "rounded-xl px-4 py-3 text-[15px] font-semibold text-[#617389] transition hover:bg-[#f5f8fc] hover:text-[#377dff]",
                activeCategory === category.slug &&
                  "bg-[#eef5ff] text-[#377dff]"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
