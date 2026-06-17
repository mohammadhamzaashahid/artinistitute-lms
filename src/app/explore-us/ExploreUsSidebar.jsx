"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
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
      title={section.label}
      aria-current={isActive ? "page" : undefined}
      onClick={() => onClick(section.id)}
      onMouseEnter={() => preloadSectionBanner(section)}
      className={cn(
        "group flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377dff]",
        isActive
          ? "bg-[#377dff] text-white shadow-sm shadow-blue-200"
          : "text-slate-600 hover:bg-[#eef5ff] hover:text-[#377dff]",
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
          isActive
            ? "bg-white/20 text-white"
            : "bg-[#f0f5ff] text-[#377dff] group-hover:bg-[#ddeaff]",
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1 text-[13.5px] font-semibold leading-snug">
        {section.label}
      </span>
      {isActive && <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0 text-white/70" />}
    </button>
  );
}

// ─── Mobile horizontal tab strip ─────────────────────────────────────────────
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
              "flex min-h-10 shrink-0 snap-start items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-all",
              isActive
                ? "bg-[#377dff] text-white shadow-sm"
                : "bg-[#f0f5ff] text-slate-600 hover:bg-[#ddeaff] hover:text-[#377dff]",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {s.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Desktop sidebar with group headers ──────────────────────────────────────
export function DesktopSidebar({ activeId, onNavigate }) {
  const visibleGroups = SECTION_GROUPS.map((group) => ({
    ...group,
    sections: SECTIONS.filter((s) => s.group === group.id),
  })).filter((group) => group.sections.length > 0);

  return (
    <aside className="hidden w-[256px] shrink-0 lg:block xl:w-[272px]">
      <div className="sticky top-[90px] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-[#e6edf5] bg-white p-3.5 shadow-sm [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin]">
        <div className="mb-3 border-b border-[#f0f4f9] px-2 pb-3">
          <p className="text-[11px] font-bold tracking-[2px] text-[#377dff] uppercase">
            Explore Us
          </p>
        </div>
        {visibleGroups.map((group, index) => {
          return (
            <div key={group.id} className="mb-3.5 last:mb-0">
              <div className="mb-2 flex items-center justify-between px-3">
                <p className="text-[10.5px] font-bold tracking-[2px] text-slate-400 uppercase">
                  {group.label}
                </p>
                <span className="rounded-full bg-[#f0f5ff] px-2 py-0.5 text-[10.5px] font-bold text-[#377dff]">
                  {group.sections.length}
                </span>
              </div>
              <nav className="flex flex-col gap-1">
                {group.sections.map((section) => (
                  <SidebarItem
                    key={section.id}
                    section={section}
                    isActive={section.id === activeId}
                    onClick={onNavigate}
                  />
                ))}
              </nav>
              {index < visibleGroups.length - 1 && (
                <div className="mt-3.5 border-b border-[#f0f4f9]" />
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export { MobileTabStrip };
