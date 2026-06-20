import HeroSection from "@/components/home/HeroSection";
import FeatureStrip from "@/components/home/FeatureStrip";
import FeaturedCoursesSection from "@/components/home/FeaturedCoursesSection";
import TeachSection from "@/components/home/TeachSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      {/* <HeroSection />
      <FeatureStrip />
      <FeaturedCoursesSection />
      {/* <TeachSection /> */}
      {/* <TestimonialsSection /> */}

      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f4f2] px-6 py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%)]"
        />

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-400/50 to-transparent"
        />

        <section className="relative z-10 w-full max-w-3xl text-center">
          <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-300 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-7 w-7 text-neutral-700"
            >
              <path
                d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M18.36 5.64l-2.12 2.12M7.76 16.24l-2.12 2.12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              <circle
                cx="12"
                cy="12"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
            Work in progress
          </p>

          <h1 className="text-balance text-4xl font-medium tracking-[-0.04em] text-neutral-900 sm:text-5xl md:text-6xl">
            Something refined is on the way.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg">
            This page is currently under construction. We are carefully
            preparing the experience and will make it available soon.
          </p>

          <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-neutral-500 to-transparent" />

          <p className="mt-6 text-sm text-neutral-500">
            Thank you for your patience.
          </p>
        </section>

        <div
          aria-hidden="true"
          className="absolute bottom-[-180px] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/80 blur-3xl"
        />
      </main>
    </>
  );
}
