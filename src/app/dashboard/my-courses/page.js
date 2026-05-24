"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import CourseCard from "@/components/courses/CourseCard";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";
import { Button } from "@/components/ui/button";
import { useMyCourses } from "@/lib/hooks/usePayments";

export default function MyCoursesPage() {
  const { data, isLoading, isError } = useMyCourses({
    page: 1,
    limit: 20,
  });

  const items = data?.items || [];

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col gap-4 rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h2 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#20242a] sm:text-[34px]">
            My courses
          </h2>

          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#66788f]">
            Courses unlocked through active subscriptions or successful
            purchases.
          </p>
        </div>

        <Button
          asChild
          className="h-11 w-full rounded-xl bg-[#377dff] text-sm font-bold hover:bg-[#236bf1] md:w-auto md:px-5"
        >
          <Link href="/courses">
            Browse courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {!isLoading && isError ? (
        <EmptyState
          title="Unable to load your courses"
          description="Please try again after a moment."
        />
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <section className="rounded-[24px] border border-[#e3eaf3] bg-white p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <BookOpenCheck className="h-7 w-7" />
          </div>

          <h3 className="mt-5 text-xl font-bold tracking-[-0.035em] text-[#20242a]">
            No courses unlocked yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-[15px] leading-7 text-[#66788f]">
            After you purchase or subscribe to a course, it will appear here.
          </p>

          <Button asChild className="mt-6 h-11 rounded-xl bg-[#377dff]">
            <Link href="/courses">Explore courses</Link>
          </Button>
        </section>
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const course = item.course || item;

            return (
              <CourseCard
                key={course.id || item.id}
                course={course}
                index={index}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}