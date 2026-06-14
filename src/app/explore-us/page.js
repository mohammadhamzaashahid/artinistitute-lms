import { Suspense } from "react";
import ExploreUsClient from "./ExploreUsClient";

export const metadata = {
  title: "Explore Us",
  description:
    "Learn more about Artin Institute — our story, instructors, KHDA certification, student reviews, news, and how to get in touch.",
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-6 lg:py-10">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8">
        <div className="mb-5 h-4 w-48 animate-pulse rounded-md bg-slate-200" />
        <div className="flex gap-8">
          <div className="hidden w-[250px] shrink-0 lg:block xl:w-[268px]">
            <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
          </div>
          <div className="min-w-0 flex-1 space-y-4">
            <div className="h-[260px] animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreUsPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ExploreUsClient />
    </Suspense>
  );
}
