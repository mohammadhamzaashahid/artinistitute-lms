"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";
import CourseCard from "@/components/courses/CourseCard";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/lib/hooks/useCourses";

export default function FeaturedCoursesSection() {
  const { data, isLoading, isError } = useCourses({
    page: 1,
    limit: 6,
  });

  const courses = data?.items || [];

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          title="Featured courses"
          description="Get unlimited, unrestricted access to our entire course library."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
            : null}

          {!isLoading && !isError
            ? courses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                  priority={index < 3}
                />
              ))
            : null}
        </div>

        {!isLoading && !courses.length ? (
          <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-[#dbe5f0] bg-[#f8fbff] p-8 text-center">
            <h3 className="text-xl font-bold text-[#20242a]">
              No published courses yet
            </h3>
            <p className="mt-2 text-[#66788f]">
              Once courses are published from the admin panel, they will appear
              here automatically.
            </p>
          </div>
        ) : null}

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            className="h-12 rounded-[5px] bg-[#377dff] px-7 text-[16px] font-bold text-white hover:bg-[#236bf1]"
          >
            <Link href="/courses">
              Browse all courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}