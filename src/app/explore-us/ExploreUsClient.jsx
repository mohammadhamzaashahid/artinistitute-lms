"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import { SECTIONS } from "./explore-us.data";
import { DesktopSidebar, MobileTabStrip } from "./ExploreUsSidebar";
import ExploreUsContent from "./ExploreUsContent";

const DEFAULT_SECTION = SECTIONS[0].id;

export default function ExploreUsClient() {
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState(
    () => searchParams.get("section") ?? DEFAULT_SECTION,
  );

  const activeSection = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];

  function navigate(id) {
    setActiveId(id);
    window.history.replaceState(null, "", `/explore-us?section=${id}`);
  }

  // Keep state in sync when browser back/forward is used
  useEffect(() => {
    function onPopState() {
      const id =
        new URLSearchParams(window.location.search).get("section") ??
        DEFAULT_SECTION;
      setActiveId(id);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 lg:py-10">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-[13px] text-slate-400">
          <Link href="/" className="transition hover:text-[#377dff]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-600">Explore Us</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#377dff]">
            {activeSection.label}
          </span>
        </nav>

        {/* Mobile tab strip */}
        <div className="mb-4">
          <MobileTabStrip activeId={activeId} onNavigate={navigate} />
        </div>

        {/* Page layout */}
        <div className="flex items-start gap-6 lg:gap-8">
          <DesktopSidebar activeId={activeId} onNavigate={navigate} />
          <ExploreUsContent activeId={activeId} onNavigate={navigate} />
        </div>
      </Container>
    </div>
  );
}
