"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils/cn";
import { SECTIONS, SECTION_GROUPS } from "./explore-us.data";

function preloadSectionBanner(section) {
  if (!section.banner) return;
  const img = new window.Image();
  img.src = section.banner;
}

// ─── Desktop sidebar item ─────────────────────────────────────────────────────
function SidebarItem({ section, isActive, onClick }) {
  const Icon = section.icon;
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      onClick={() => onClick(section.id)}
      onMouseEnter={() => preloadSectionBanner(section)}
      className={cn(
        "group flex w-full items-center gap-2.5 border-l-2 py-2 pr-4 pl-3.5 text-left transition-colors duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#377dff]",
        isActive
          ? "border-[#377dff] bg-[#f4f8ff] text-[#377dff]"
          : "border-transparent text-slate-500 hover:border-slate-200 hover:bg-slate-50/70 hover:text-slate-700",
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 shrink-0 transition-colors",
          isActive ? "text-[#377dff]" : "text-slate-350 group-hover:text-slate-500",
        )}
      />
      <span className={cn("text-[12.5px] leading-snug", isActive ? "font-semibold" : "font-medium")}>
        {section.label}
      </span>
    </button>
  );
}
function MobileTabStrip({ activeId, onNavigate }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const active = el.querySelector("[data-active='true']");
    active?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeId]);

  return (
    <div ref={scrollRef} className="no-scrollbar flex snap-x gap-2 overflow-x-auto pb-1 lg:hidden">
      {SECTIONS.map((s) => {
        const Icon = s.icon;
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            type="button"
            data-active={isActive}
            onClick={() => onNavigate(s.id)}
            onMouseEnter={() => preloadSectionBanner(s)}
            className={cn(
              "flex min-h-9 shrink-0 snap-start items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors",
              isActive
                ? "border-[#377dff] bg-[#377dff] text-white"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-700",
            )}
          >
            <Icon className="h-3 w-3" />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
export function DesktopSidebar({ activeId, onNavigate }) {
  const visibleGroups = SECTION_GROUPS.map((group) => ({
    ...group,
    sections: SECTIONS.filter((s) => s.group === group.id),
  })).filter((group) => group.sections.length > 0);

  return (
    <aside className="hidden w-57 shrink-0 lg:block xl:w-61">
      <div className="sticky top-22.5 rounded-xl border border-slate-100 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
        {/* Header */}
        <div className="border-b border-slate-100 px-4 py-3">
          <p className="text-[9.5px] font-bold tracking-[3px] text-slate-400 uppercase">
            Explore Us
          </p>
        </div>

        {/* Groups */}
        <div className="py-1.5">
          {visibleGroups.map((group, index) => (
            <div key={group.id}>
              {/* Group label */}
              <div className="px-4 pb-1 pt-3">
                <p className="text-[9px] font-bold tracking-[2.5px] text-slate-300 uppercase">
                  {group.label}
                </p>
              </div>

              {/* Items */}
              <nav>
                {group.sections.map((section) => (
                  <SidebarItem
                    key={section.id}
                    section={section}
                    isActive={section.id === activeId}
                    onClick={onNavigate}
                  />
                ))}
              </nav>

              {/* Divider */}
              {index < visibleGroups.length - 1 && (
                <div className="mx-4 mt-2.5 border-b border-slate-100" />
              )}
            </div>
          ))}
        </div>

        {/* Footer rule */}
        <div className="border-t border-slate-100 px-4 py-2.5">
          <p className="text-[9px] tracking-wide text-slate-300">
            Artin Institute &mdash; All sections
          </p>
        </div>
      </div>
    </aside>
  );
}

export { MobileTabStrip };
