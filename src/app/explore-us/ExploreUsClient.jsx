"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/common/Container";
import { SECTIONS } from "./explore-us.data";
import { DesktopSidebar, MobileTabStrip } from "./ExploreUsSidebar";
import ExploreUsContent from "./ExploreUsContent";

const DEFAULT_SECTION = SECTIONS[0].id;

export default function ExploreUsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sectionId = searchParams.get("section") ?? DEFAULT_SECTION;
  const activeSection = SECTIONS.find((s) => s.id === sectionId) ?? SECTIONS[0];

  function navigate(id) {
    router.push(`/explore-us?section=${id}`, { scroll: false });
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 lg:py-10">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-[13px] text-slate-400">
          <Link href="/" className="transition hover:text-[#377dff]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-slate-600">Explore Us</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#377dff]">{activeSection.label}</span>
        </nav>

        {/* Mobile tab strip */}
        <div className="mb-4">
          <MobileTabStrip activeId={activeSection.id} onNavigate={navigate} />
        </div>

        {/* Page layout */}
        <div className="flex items-start gap-6 lg:gap-8">
          <DesktopSidebar activeId={activeSection.id} onNavigate={navigate} />
          <ExploreUsContent activeId={activeSection.id} onNavigate={navigate} />
        </div>
      </Container>
    </div>
  );
}
