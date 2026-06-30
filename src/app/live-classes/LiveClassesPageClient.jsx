"use client";

import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import LiveClassCard from "@/components/live-classes/LiveClassCard";
import LiveClassesHeroBanner from "@/components/live-classes/LiveClassesHeroBanner";
import LiveClassesToolbar from "@/components/live-classes/LiveClassesToolbar";
import LiveClassListSkeleton from "@/components/live-classes/LiveClassListSkeleton";
import LiveClassPagination from "@/components/live-classes/LiveClassPagination";
import { useLiveClasses } from "@/lib/hooks/useLiveClasses";

export default function LiveClassesPageClient({
  initialPage = 1,
  initialSearch = "",
}) {
  const params = {
    page: initialPage,
    limit: 12,
  };

  if (initialSearch) params.search = initialSearch;

  const {
    data: liveClassesData,
    isLoading,
    isError,
  } = useLiveClasses(params);

  const liveClasses = liveClassesData?.items || [];
  const pagination = liveClassesData?.pagination;

  return (
    <div className="bg-white">
      <Container className="pt-10 sm:pt-12">
        <LiveClassesHeroBanner />

        <section className="py-14 sm:py-16">
          <LiveClassesToolbar
            search={initialSearch}
            resultCount={pagination?.total || liveClasses.length}
          />

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <LiveClassListSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {!isLoading && isError ? (
            <EmptyState
              title="Unable to load live classes"
              description="Please check your backend server and try again."
            />
          ) : null}

          {!isLoading && !isError && liveClasses.length === 0 ? (
            <EmptyState
              title="No live classes scheduled"
              description="Check back soon — new sessions are added regularly."
            />
          ) : null}

          {!isLoading && !isError && liveClasses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {liveClasses.map((liveClass, index) => (
                <LiveClassCard
                  key={liveClass.id || liveClass.slug}
                  liveClass={liveClass}
                  index={index}
                />
              ))}
            </div>
          ) : null}

          <LiveClassPagination pagination={pagination} search={initialSearch} />
        </section>
      </Container>
    </div>
  );
}
