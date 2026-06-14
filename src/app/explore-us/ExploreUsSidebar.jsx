"use client";

import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SECTIONS, SECTION_GROUPS } from "./explore-us.data";

// ─── Desktop sidebar item ─────────────────────────────────────────────────────
function SidebarItem({ section, isActive, onClick }) {
  const Icon = section.icon;
  return (
    <button
      type="button"
      onClick={() => onClick(section.id)}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-150",
        isActive
          ? "bg-[#377dff] text-white shadow-sm shadow-blue-200"
          : "text-slate-600 hover:bg-[#eef5ff] hover:text-[#377dff]",
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
          isActive
            ? "bg-white/20 text-white"
            : "bg-[#f0f5ff] text-[#377dff] group-hover:bg-[#ddeaff]",
        )}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="text-[13.5px] font-semibold">{section.label}</span>
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
    <div ref={scrollRef} className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:hidden">
      {SECTIONS.map((s) => {
        const Icon = s.icon;
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            type="button"
            data-active={isActive}
            onClick={() => onNavigate(s.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold whitespace-nowrap transition-all",
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
  return (
    <aside className="hidden w-[240px] shrink-0 lg:block xl:w-[256px]">
      <div className="sticky top-[90px] max-h-[calc(100vh-110px)] overflow-y-auto rounded-2xl border border-[#e6edf5] bg-white p-3 shadow-sm no-scrollbar">
        {SECTION_GROUPS.map((group) => {
          const groupSections = SECTIONS.filter((s) => s.group === group.id);
          return (
            <div key={group.id} className="mb-3 last:mb-0">
              <p className="mb-1.5 px-3 text-[10.5px] font-bold tracking-[2px] text-slate-400 uppercase">
                {group.label}
              </p>
              <nav className="flex flex-col gap-0.5">
                {groupSections.map((section) => (
                  <SidebarItem
                    key={section.id}
                    section={section}
                    isActive={section.id === activeId}
                    onClick={onNavigate}
                  />
                ))}
              </nav>
              <div className="mt-3 border-b border-[#f0f4f9] last:hidden" />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export { MobileTabStrip };
