"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SECTIONS } from "./explore-us.data";

// ─── Banner ───────────────────────────────────────────────────────────────────

function GradientBanner({ title, subtitle }) {
  return (
    <div className="relative flex h-[260px] w-full items-end overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d2152] via-[#1a3a8f] to-[#377dff] sm:h-[310px] lg:h-[360px]">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />
      <div className="absolute right-12 top-12 h-32 w-32 rounded-full bg-[#377dff]/30" />
      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <h1 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-blue-100/90 sm:text-[15px]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function ImageBanner({ src, alt }) {
  return (
    // bg-[#dde8f8] gives a brand-tinted placeholder while the image loads,
    // preventing a white flash and eliminating layout shift.
    <div className="overflow-hidden rounded-2xl bg-[#dde8f8]">
      <Image
        src={src}
        alt={alt}
        width={1885}
        height={670}
        className="block h-auto w-full"
        sizes="(max-width: 1024px) 100vw, calc(100vw - 320px)"
        priority
      />
    </div>
  );
}

function Banner({ section }) {
  if (section.banner) {
    return <ImageBanner src={section.banner} alt={section.bannerAlt} />;
  }
  return <GradientBanner title={section.title} subtitle={section.subtitle} />;
}

// ─── Prev / Next navigation ───────────────────────────────────────────────────
function PrevNextNav({ activeId, onNavigate }) {
  const idx = SECTIONS.findIndex((s) => s.id === activeId);
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];

  return (
    <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#e6edf5] bg-white px-5 py-4 shadow-sm">
      <div className="flex-1">
        {prev && (
          <button
            type="button"
            onClick={() => onNavigate(prev.id)}
            className="group flex items-center gap-2 text-left"
          >
            <ChevronRight className="h-4 w-4 rotate-180 text-slate-400 transition group-hover:text-[#377dff]" />
            <div>
              <p className="text-[11px] text-slate-400">Previous</p>
              <p className="text-[13px] font-semibold text-slate-600 transition group-hover:text-[#377dff]">
                {prev.label}
              </p>
            </div>
          </button>
        )}
      </div>
      <div className="flex-1 text-right">
        {next && (
          <button
            type="button"
            onClick={() => onNavigate(next.id)}
            className="group ml-auto flex items-center justify-end gap-2"
          >
            <div>
              <p className="text-[11px] text-slate-400">Next</p>
              <p className="text-[13px] font-semibold text-slate-600 transition group-hover:text-[#377dff]">
                {next.label}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-[#377dff]" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main content panel ───────────────────────────────────────────────────────
export default function ExploreUsContent({ activeId, onNavigate }) {
  const section = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0];
  const Icon = section.icon;

  // Preload the prev and next section banners so switching is instant.
  useEffect(() => {
    const idx = SECTIONS.findIndex((s) => s.id === activeId);
    [SECTIONS[idx - 1], SECTIONS[idx + 1]].forEach((s) => {
      if (s?.banner) {
        const img = new window.Image();
        img.src = s.banner;
      }
    });
  }, [activeId]);

  return (
    <div className="min-w-0 flex-1">
      {/* key resets the banner element so the new image fades in cleanly */}
      <div key={`banner-${activeId}`} className="animate-fade-in">
        <Banner section={section} />
      </div>

      <div
        key={`body-${activeId}`}
        className="animate-fade-in mt-6 rounded-2xl border border-[#e6edf5] bg-white p-6 shadow-sm sm:p-8 lg:p-9"
      >
        <div className="mb-6 flex items-start gap-3 border-b border-[#f0f4f9] pb-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff]">
            <Icon className="h-5 w-5 text-[#377dff]" />
          </span>
          <div>
            <h2 className="text-[20px] font-bold text-slate-800 sm:text-[22px]">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="mt-1 text-[14px] leading-relaxed text-slate-500">
                {section.subtitle}
              </p>
            )}
          </div>
        </div>

        {section.body}
      </div>

      <PrevNextNav activeId={activeId} onNavigate={onNavigate} />
    </div>
  );
}
