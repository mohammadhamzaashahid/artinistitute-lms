"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  BookOpen,
  Calendar,
  Download,
  FileText,
  Images,
  Tag,
} from "lucide-react";

import AuthModal from "@/components/auth/AuthModal";
import Container from "@/components/common/Container";
import CourseCard from "@/components/courses/CourseCard";
import CourseListImage from "@/components/courses/CourseListImage";
import CourseDetailHeader from "@/components/course-detail/CourseDetailHeader";
import CourseDetailSidebar from "@/components/course-detail/CourseDetailSidebar";
import CourseDetailSkeleton from "@/components/course-detail/CourseDetailSkeleton";
import LectureList from "@/components/course-detail/LectureList";
import LecturePlaybackModal from "@/components/course-detail/LecturePlaybackModal";
import MobileCourseActionBar from "@/components/course-detail/MobileCourseActionBar";
import { useCourseDetail } from "@/lib/hooks/useCourseDetail";
import { useCourses } from "@/lib/hooks/useCourses";
import { useLecturePlayback } from "@/lib/hooks/useLecturePlayback";
import { useAuthStore } from "@/lib/store/auth.store";
import {
  canPlayLecture,
  canUserAccessCourse,
  getCourseLectures,
  getPrimaryCoursePrice,
  normalizeCourseDetail,
} from "@/lib/utils/course";
import { formatBatchFee, formatDateRange } from "@/lib/utils/format";
import { resolveAssetUrl } from "@/lib/utils/media";

const BATCH_STATUS_STYLES = {
  UPCOMING: { bg: "bg-[#eef5ff]", text: "text-[#377dff]", label: "Upcoming" },
  ONGOING: { bg: "bg-[#e8fbf5]", text: "text-[#00b887]", label: "Ongoing" },
  COMPLETED: { bg: "bg-[#f5f5f5]", text: "text-[#66788f]", label: "Completed" },
  CANCELLED: { bg: "bg-[#fff0f0]", text: "text-[#e05252]", label: "Cancelled" },
};

function BatchStatusBadge({ status }) {
  const s = BATCH_STATUS_STYLES[status] || BATCH_STATUS_STYLES.UPCOMING;
  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

export default function CourseDetailPageClient({ slug }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [playbackOpen, setPlaybackOpen] = useState(false);
  const [activePlayback, setActivePlayback] = useState(null);

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(user && accessToken);

  const courseQuery = useCourseDetail(slug);
  const playbackMutation = useLecturePlayback();

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

  function handleCheckout() {
    if (!course?.slug || !primaryPrice?.id) {
      toast.error("Course price is not available yet.");
      return;
    }

    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }

    router.push(`/checkout?slug=${course.slug}&priceId=${primaryPrice.id}`);
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
        </Container>

        <Container className="max-w-[1885px]">
          <CourseListImage
            course={course}
            type="banner"
            priority
            imageWidth={1885}
            imageHeight={670}
            sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1885px) calc(100vw - 64px), 1885px"
            className="mb-10 w-full rounded-[10px] border border-[#dfe7f1] shadow-[0_18px_55px_rgba(15,23,42,0.08)] lg:mb-14"
            imageClassName="group-hover:scale-100"
          />
        </Container>

        <Container>
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
                  checkoutLoading={false}
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

              {course.batches?.length > 0 && (
                <section className="mt-14 sm:mt-20">
                  <h2 className="text-[26px] font-bold tracking-[-0.04em] text-[#20242a]">
                    Upcoming Batches
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {course.batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="rounded-[16px] border border-[#dfe7f1] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-[#20242a]">
                            {batch.title || "Batch"}
                          </p>
                          <BatchStatusBadge status={batch.status} />
                        </div>

                        <div className="mt-4 space-y-2.5">
                          <div className="flex items-center gap-2 text-sm text-[#66788f]">
                            <Calendar className="h-4 w-4 shrink-0 text-[#8a9aad]" />
                            <span>{formatDateRange(batch.startDate, batch.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#66788f]">
                            <BookOpen className="h-4 w-4 shrink-0 text-[#8a9aad]" />
                            <span>{batch.numberOfSessions} sessions</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#20242a]">
                            <Tag className="h-4 w-4 shrink-0 text-[#8a9aad]" />
                            <span>{formatBatchFee(batch.fee, batch.currency)}</span>
                          </div>
                        </div>

                        {batch.description ? (
                          <p className="mt-4 border-t border-[#f0f4f9] pt-4 text-sm leading-relaxed text-[#66788f]">
                            {batch.description}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {course.outlineDocumentAsset ? (
                <section className="mt-14 sm:mt-20">
                  <h2 className="text-[26px] font-bold tracking-[-0.04em] text-[#20242a]">
                    Course Outline
                  </h2>
                  <a
                    href={resolveAssetUrl(course.outlineDocumentAsset)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center gap-4 rounded-[16px] border border-[#dfe7f1] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition hover:border-[#377dff] hover:bg-[#f5f8ff]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#eef5ff]">
                      <FileText className="h-6 w-6 text-[#377dff]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#20242a]">
                        {course.outlineDocumentAsset.originalFilename || "Course Outline"}
                      </p>
                      <p className="mt-0.5 text-sm text-[#66788f]">
                        View or download the full course outline
                      </p>
                    </div>
                    <Download className="h-5 w-5 shrink-0 text-[#377dff]" />
                  </a>
                </section>
              ) : null}

              {course.flyerAssets?.length > 0 && (
                <section className="mt-14 sm:mt-20">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[26px] font-bold tracking-[-0.04em] text-[#20242a]">
                      Course Flyers
                    </h2>
                    <Images className="h-5 w-5 text-[#8a9aad]" />
                  </div>
                  <div className="-mx-5 mt-6 flex gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
                    {[...course.flyerAssets]
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map(({ id, mediaAsset }) => {
                        const url = resolveAssetUrl(mediaAsset);
                        return url ? (
                          <a
                            key={id}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 overflow-hidden rounded-[10px] border border-[#dfe7f1] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
                          >
                            <img
                              src={url}
                              alt="Course flyer"
                              className="h-[220px] w-auto max-w-[340px] object-cover"
                            />
                          </a>
                        ) : null;
                      })}
                  </div>
                </section>
              )}

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
                  checkoutLoading={false}
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
        checkoutLoading={false}
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
