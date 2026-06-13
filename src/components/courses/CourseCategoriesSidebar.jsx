"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const PRICES = ["All", "Free", "Paid"];
const LANGUAGES = ["Arabic", "English"];
const RATINGS = [5, 4, 3, 2, 1];

function StarRow({ count }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "#f59e0b" : "none"}
          stroke={i < count ? "#f59e0b" : "#d1d5db"}
          strokeWidth="1.2"
          className="h-4 w-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function FilterCheckbox({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-0.5 group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer rounded border-[#c8d5e4] accent-[#377dff]"
      />
      <span className="text-[14px] text-[#52657a] group-hover:text-[#20242a] transition-colors">
        {children}
      </span>
    </label>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="text-[14px] font-bold text-[#20242a]">{children}</p>
  );
}

export default function CourseCategoriesSidebar({
  categories = [],
  activeCategory,
  search,
  activeLevel = [],
  activePrice = "",
  activeLanguage = [],
  activeRating = "",
}) {
  const router = useRouter();
  const pathname = usePathname();
  const categoryList = Array.isArray(categories) ? categories : [];

  function buildHref(overrides = {}) {
    const params = new URLSearchParams();

    const cat = overrides.category !== undefined ? overrides.category : activeCategory;
    const lvl = overrides.level !== undefined ? overrides.level : activeLevel;
    const price = overrides.price !== undefined ? overrides.price : activePrice;
    const lang = overrides.language !== undefined ? overrides.language : activeLanguage;
    const rating = overrides.rating !== undefined ? overrides.rating : activeRating;
    const q = overrides.search !== undefined ? overrides.search : search;

    if (cat) params.set("category", cat);
    if (q) params.set("search", q);
    if (Array.isArray(lvl) && lvl.length) params.set("level", lvl.join(","));
    if (price && price !== "All") params.set("price", price.toLowerCase());
    if (Array.isArray(lang) && lang.length) params.set("language", lang.join(","));
    if (rating) params.set("rating", String(rating));
    params.set("page", "1");

    const query = params.toString();
    return query ? `/courses?${query}` : "/courses";
  }

  function navigate(overrides) {
    router.push(buildHref(overrides), { scroll: false });
  }

  function toggleMulti(current, value) {
    return current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
  }

  const hasFilters =
    activeLevel.length > 0 ||
    (activePrice && activePrice !== "All") ||
    activeLanguage.length > 0 ||
    activeRating !== "";

  function clearAll() {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (search) params.set("search", search);
    params.set("page", "1");
    const query = params.toString();
    router.push(query ? `/courses?${query}` : "/courses", { scroll: false });
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[96px] space-y-6">
        {/* Categories */}
        <div>
          <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#20242a]">
            Categories
          </h2>

          <nav className="mt-4 flex flex-col gap-1">
            <Link
              href={buildHref({ category: "" })}
              className={cn(
                "rounded-lg px-3 py-2 text-[14.5px] font-medium text-[#617389] transition hover:text-[#377dff]",
                !activeCategory && "bg-[#eef5ff] font-semibold text-[#377dff]"
              )}
            >
              All categories
            </Link>

            {categoryList.map((cat) => (
              <Link
                key={cat.id || cat.slug}
                href={buildHref({ category: cat.slug })}
                className={cn(
                  "rounded-lg px-3 py-2 text-[14.5px] font-medium text-[#617389] transition hover:text-[#377dff]",
                  activeCategory === cat.slug && "bg-[#eef5ff] font-semibold text-[#377dff]"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-[#e3eaf3]" />

        {/* Filters */}
        <div className="space-y-5">
          <h2 className="text-[22px] font-bold tracking-[-0.03em] text-[#20242a]">
            Filters
          </h2>

          {/* Level */}
          <div className="space-y-2">
            <SectionTitle>Level</SectionTitle>
            {LEVELS.map((lvl) => (
              <FilterCheckbox
                key={lvl}
                checked={activeLevel.includes(lvl.toLowerCase())}
                onChange={() =>
                  navigate({ level: toggleMulti(activeLevel, lvl.toLowerCase()) })
                }
              >
                {lvl}
              </FilterCheckbox>
            ))}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <SectionTitle>Price</SectionTitle>
            {PRICES.map((p) => {
              const val = p === "All" ? "" : p.toLowerCase();
              const checked = p === "All" ? !activePrice || activePrice === "" : activePrice === val;
              return (
                <FilterCheckbox
                  key={p}
                  checked={checked}
                  onChange={() => navigate({ price: p === "All" ? "" : p })}
                >
                  {p}
                </FilterCheckbox>
              );
            })}
          </div>

          {/* Language */}
          <div className="space-y-2">
            <SectionTitle>Language</SectionTitle>
            {LANGUAGES.map((lang) => (
              <FilterCheckbox
                key={lang}
                checked={activeLanguage.includes(lang.toLowerCase())}
                onChange={() =>
                  navigate({ language: toggleMulti(activeLanguage, lang.toLowerCase()) })
                }
              >
                {lang}
              </FilterCheckbox>
            ))}
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <SectionTitle>Rating</SectionTitle>
            {RATINGS.map((stars) => (
              <FilterCheckbox
                key={stars}
                checked={activeRating === String(stars)}
                onChange={() =>
                  navigate({ rating: activeRating === String(stars) ? "" : stars })
                }
              >
                <span className="flex items-center gap-1.5">
                  <StarRow count={stars} />
                  <span className="text-[13px] text-[#617389]">& up</span>
                </span>
              </FilterCheckbox>
            ))}
          </div>

          {/* Clear all */}
          <button
            onClick={clearAll}
            disabled={!hasFilters}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-[13.5px] font-semibold transition",
              hasFilters
                ? "border-[#377dff] text-[#377dff] hover:bg-[#eef5ff]"
                : "cursor-not-allowed border-[#e3eaf3] text-[#b0bec8]"
            )}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear all filters
          </button>
        </div>
      </div>
    </aside>
  );
}
