"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import AuthModal from "@/components/auth/AuthModal";
import Container from "@/components/common/Container";
import CourseCard from "@/components/courses/CourseCard";
import CourseDetailHeader from "@/components/course-detail/CourseDetailHeader";
import CourseDetailSidebar from "@/components/course-detail/CourseDetailSidebar";
import CourseDetailSkeleton from "@/components/course-detail/CourseDetailSkeleton";
import LectureList from "@/components/course-detail/LectureList";
import LecturePlaybackModal from "@/components/course-detail/LecturePlaybackModal";
import MobileCourseActionBar from "@/components/course-detail/MobileCourseActionBar";
import { useCourseDetail } from "@/lib/hooks/useCourseDetail";
import { useCourses } from "@/lib/hooks/useCourses";
import { useCreateCheckoutSession } from "@/lib/hooks/usePayments";
import { useLecturePlayback } from "@/lib/hooks/useLecturePlayback";
import { useAuthStore } from "@/lib/store/auth.store";
import {
  canPlayLecture,
  canUserAccessCourse,
  getCourseLectures,
  getPrimaryCoursePrice,
  normalizeCourseDetail,
} from "@/lib/utils/course";

export default function CourseDetailPageClient({ slug }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [playbackOpen, setPlaybackOpen] = useState(false);
  const [activePlayback, setActivePlayback] = useState(null);

  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(user && accessToken);

  const courseQuery = useCourseDetail(slug);
  const playbackMutation = useLecturePlayback();
  const checkoutMutation = useCreateCheckoutSession();

  const course = normalizeCourseDetail(courseQuery.data);
  const lectures = useMemo(() => getCourseLectures(course), [course]);
  const primaryPrice = getPrimaryCoursePrice(course);
  const hasCourseAccess = canUserAccessCourse(course);
  const hasFreePreview = lectures.some((l) => l.isPreviewFree && l.canPlay);

  const relatedCategorySlug = course?.category?.slug;

  const relatedCoursesQuery = useCourses({
    page: 1,
    limit: 3,
    ...(relatedCategorySlug ? { category: relatedCategorySlug } : {}),
  });

  const relatedCourses = (relatedCoursesQuery.data?.items || [])
    .filter((item) => item.slug !== course?.slug)
    .slice(0, 3);

  async function handleLectureClick(lecture) {
    if (!canPlayLecture(lecture)) {
      if (!isLoggedIn) {
        setAuthOpen(true);
        return;
      }

      toast.info("Subscribe or purchase this course to unlock all lectures.");
      return;
    }

    const result = await playbackMutation.mutateAsync(lecture.id);
    setActivePlayback(result);
    setPlaybackOpen(true);
  }

  function handleStartListening() {
    const firstPlayableLecture =
      lectures.find((lecture) => lecture.canPlay) ||
      lectures.find((lecture) => lecture.isPreviewFree);

    if (firstPlayableLecture) {
      handleLectureClick(firstPlayableLecture);
      return;
    }

    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }

    toast.info("Subscribe or purchase this course to start listening.");
  }

  async function handleCheckout() {
    if (!course?.id || !primaryPrice?.id) {
      toast.error("Course price is not available yet.");
      return;
    }

    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }

    await checkoutMutation.mutateAsync({
      courseId: course.id,
      coursePriceId: primaryPrice.id,
    });
  }

  if (courseQuery.isLoading) {
    return <CourseDetailSkeleton />;
  }

  if (courseQuery.isError || !course) {
    return (
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-[28px] border border-[#e3eaf3] bg-white p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
            <h1 className="text-2xl font-bold tracking-[-0.04em] text-[#20242a]">
              Course not found
            </h1>
            <p className="mt-2 text-[#66788f]">
              The course you are looking for is not available.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white pb-20 pt-6 sm:pt-10">
        <Container>
          {!user?.emailVerifiedAt && isLoggedIn ? (
            <div className="mb-8 rounded-[5px] bg-[#e8fbf5] px-5 py-4 text-[15px] font-medium text-[#00b887] sm:text-[17px]">
              Please confirm your email to keep your account secure.{" "}
              <button className="font-bold hover:underline">
                Resend email.
              </button>
            </div>
          ) : null}

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_390px] xl:gap-14">
            <main className="min-w-0">
              <CourseDetailHeader course={course} lectures={lectures} />

              <div className="mt-12 lg:hidden">
                <CourseDetailSidebar
                  course={course}
                  lectures={lectures}
                  hasCourseAccess={hasCourseAccess}
                  primaryPrice={primaryPrice}
                  onStartListening={handleStartListening}
                  onCheckout={handleCheckout}
                  checkoutLoading={checkoutMutation.isPending}
                />
              </div>

              <section className="mt-14 sm:mt-20">
                <h2 className="text-[26px] font-bold tracking-[-0.04em] text-[#20242a]">
                  Lessons
                </h2>

                <LectureList
                  lectures={lectures}
                  activeLectureId={activePlayback?.lecture?.id}
                  loadingLectureId={
                    playbackMutation.isPending
                      ? playbackMutation.variables
                      : null
                  }
                  onLectureClick={handleLectureClick}
                />
              </section>

              {relatedCourses.length > 0 ? (
                <section className="mt-20 border-t border-[#e1e8f2] pt-14 sm:mt-24 sm:pt-16">
                  <h2 className="text-[26px] font-bold tracking-[-0.04em] text-[#20242a]">
                    Related courses
                  </h2>

                  <div className="mt-8 grid gap-7 sm:grid-cols-2">
                    {relatedCourses.map((item, index) => (
                      <CourseCard
                        key={item.id || item.slug}
                        course={item}
                        index={index}
                      />
                    ))}
                  </div>
                </section>
              ) : null}
            </main>

            <aside className="hidden lg:block">
              <div className="sticky top-[96px]">
                <CourseDetailSidebar
                  course={course}
                  lectures={lectures}
                  hasCourseAccess={hasCourseAccess}
                  primaryPrice={primaryPrice}
                  onStartListening={handleStartListening}
                  onCheckout={handleCheckout}
                  checkoutLoading={checkoutMutation.isPending}
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <MobileCourseActionBar
        hasCourseAccess={hasCourseAccess}
        hasFreePreview={hasFreePreview}
        primaryPrice={primaryPrice}
        onStartListening={handleStartListening}
        onCheckout={handleCheckout}
        checkoutLoading={checkoutMutation.isPending}
      />

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />

      <LecturePlaybackModal
        open={playbackOpen}
        onOpenChange={setPlaybackOpen}
        playbackData={activePlayback}
      />
    </>
  );
}