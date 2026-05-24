"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export default function CourseCategoriesSidebar({
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
    <aside className="hidden lg:block">
      <div className="sticky top-[96px]">
        <h2 className="text-[24px] font-bold tracking-[-0.03em] text-[#20242a]">
          Categories
        </h2>

        <nav className="mt-5 flex flex-col gap-3">
          <Link
            href={getHref("")}
            className={cn(
              "text-[16px] font-medium leading-6 text-[#617389] transition hover:text-[#377dff]",
              !activeCategory && "font-semibold text-[#377dff]"
            )}
          >
            All categories
          </Link>

          {categoryList.map((category) => (
            <Link
              key={category.id || category.slug}
              href={getHref(category.slug)}
              className={cn(
                "text-[16px] font-medium leading-6 text-[#617389] transition hover:text-[#377dff]",
                activeCategory === category.slug && "font-semibold text-[#377dff]"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
