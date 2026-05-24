"use client";

import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import CourseCategoriesSidebar from "@/components/courses/CourseCategoriesSidebar";
import CourseListCard from "@/components/courses/CourseListCard";
import CourseListSkeleton from "@/components/courses/CourseListSkeleton";
import CoursePagination from "@/components/courses/CoursePagination";
import CoursesHeroBanner from "@/components/courses/CoursesHeroBanner";
import CoursesToolbar from "@/components/courses/CoursesToolbar";
import { useCategories } from "@/lib/hooks/useCategories";
import { useCourses } from "@/lib/hooks/useCourses";

function getList(data, keys = []) {
  if (Array.isArray(data)) return data;

  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }

  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data)) return data.data;

  return [];
}

export default function CoursesPageClient({
  initialPage = 1,
  initialCategory = "",
  initialSearch = "",
}) {
  const params = {
    page: initialPage,
    limit: 12,
  };

  if (initialCategory) params.category = initialCategory;
  if (initialSearch) params.search = initialSearch;

  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: coursesError,
  } = useCourses(params);

  const categories = getList(categoriesData, ["categories"]);
  const courses = getList(coursesData, ["courses"]);
  const pagination = coursesData?.pagination;

  return (
    <div className="bg-white">
      <Container className="pt-10 sm:pt-12">
        <CoursesHeroBanner />

        <div className="grid gap-10 py-14 lg:grid-cols-[250px_1fr] lg:gap-16 lg:py-16">
          <CourseCategoriesSidebar
            categories={categories}
            activeCategory={initialCategory}
            search={initialSearch}
          />

          <section>
            <CoursesToolbar
              categories={categories}
              activeCategory={initialCategory}
              search={initialSearch}
            />

            {categoriesLoading ? (
              <p className="mb-4 text-sm text-[#8a9aad]">
                Loading categories...
              </p>
            ) : null}

            <div>
              {coursesLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <CourseListSkeleton key={index} />
                ))
              ) : null}

              {!coursesLoading && coursesError ? (
                <EmptyState
                  title="Unable to load courses"
                  description="Please check your backend server and try again."
                />
              ) : null}

              {!coursesLoading && !coursesError && courses.length === 0 ? (
                <EmptyState
                  title="No courses found"
                  description="Try changing your category or search keyword."
                />
              ) : null}

              {!coursesLoading && !coursesError
                ? courses.map((course, index) => (
                    <CourseListCard
                      key={course.id || course.slug}
                      course={course}
                      index={index}
                    />
                  ))
                : null}
            </div>

            <CoursePagination
              pagination={pagination}
              activeCategory={initialCategory}
              search={initialSearch}
            />
          </section>
        </div>
      </Container>
    </div>
  );
}
