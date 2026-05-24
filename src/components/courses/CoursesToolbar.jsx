"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import CourseFiltersDrawer from "@/components/courses/CourseFiltersDrawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function CoursesToolbar({
  categories = [],
  activeCategory,
  search = "",
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState(search || "");
  const debouncedSearch = useDebounce(searchInput, 450);

  useEffect(() => {
    const params = new URLSearchParams();

    if (activeCategory) params.set("category", activeCategory);
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());

    params.set("page", "1");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [debouncedSearch, activeCategory, pathname, router]);

  return (
    <div className="mb-2 flex flex-col gap-4 border-b border-[#e1e8f2] pb-6 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <CourseFiltersDrawer
          categories={categories}
          activeCategory={activeCategory}
          search={debouncedSearch}
        />

        <div className="relative w-full max-w-[520px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#93a3b5]" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search courses..."
            className="h-11 w-full rounded-xl border border-[#dfe7f1] bg-white pl-11 pr-4 text-[15px] text-[#334155] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:justify-end">
        <span className="text-[15px] font-medium text-[#617389]">Sort by</span>

        <Select defaultValue="trending">
          <SelectTrigger className="h-12 w-[140px] rounded-[5px] border-[#dfe7f1] text-[15px] font-medium text-[#617389]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}