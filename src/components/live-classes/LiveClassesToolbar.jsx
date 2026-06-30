"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { useDebounce } from "@/lib/hooks/useDebounce";

export default function LiveClassesToolbar({ search = "", resultCount = 0 }) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchInput, setSearchInput] = useState(search || "");
  const debouncedSearch = useDebounce(searchInput, 450);

  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    params.set("page", "1");

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [debouncedSearch, pathname, router]);

  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-[#e1e8f2] pb-6 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full max-w-130">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[#93a3b5]" />
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search live classes..."
          className="h-11 w-full rounded-xl border border-[#dfe7f1] bg-white pl-11 pr-4 text-[15px] text-[#334155] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
        />
      </div>

      <span className="text-[14px] font-semibold text-[#8a9aad] md:shrink-0">
        {resultCount} live class{resultCount === 1 ? "" : "es"}
      </span>
    </div>
  );
}
