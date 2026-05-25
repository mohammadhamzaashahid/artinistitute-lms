"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Headphones,
  Loader2,
  Lock,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/common/Container";
import CourseListImage from "@/components/courses/CourseListImage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useCourseDetail } from "@/lib/hooks/useCourseDetail";
import { useCreateCheckoutSession } from "@/lib/hooks/usePayments";
import { formatDuration, formatPrice } from "@/lib/utils/format";
import {
  getCourseLectures,
  getCoursePrices,
  getTotalDurationSeconds,
  normalizeCourseDetail,
} from "@/lib/utils/course";

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<CheckoutPageFallback />}>
        <CheckoutContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function CheckoutPageFallback() {
  return (
    <section className="min-h-screen bg-[#f6f9ff] py-14">
      <Container>
        <div className="mx-auto max-w-5xl">
          <CheckoutSkeleton />
        </div>
      </Container>
    </section>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const priceId = searchParams.get("priceId");

  const courseQuery = useCourseDetail(slug);
  const checkoutMutation = useCreateCheckoutSession();

  const course = normalizeCourseDetail(courseQuery.data);
  const lectures = useMemo(() => getCourseLectures(course), [course]);
  const prices = useMemo(() => getCoursePrices(course), [course]);

  const selectedPrice = useMemo(
    () => prices.find((p) => p.id === priceId) || prices[0] || null,
    [prices, priceId]
  );

  const totalDuration = useMemo(
    () => getTotalDurationSeconds(lectures),
    [lectures]
  );

  const isSubscription = selectedPrice?.priceType === "SUBSCRIPTION";
  const billingInterval = selectedPrice?.billingInterval?.toLowerCase() ?? "month";
  const intervalDays = billingInterval === "year" ? 365 : 30;

  async function handlePay() {
    if (!course?.id || !selectedPrice?.id) return;
    try {
      await checkoutMutation.mutateAsync({
        courseId: course.id,
        coursePriceId: selectedPrice.id,
      });
    } catch {}
  }

  if (!slug || !priceId) {
    return <InvalidCheckout message="Invalid checkout link. Please return to the course and try again." />;
  }

  if (courseQuery.isLoading) {
    return (
      <section className="min-h-screen bg-[#f6f9ff] py-14">
        <Container>
          <div className="mx-auto max-w-5xl">
            <CheckoutSkeleton />
          </div>
        </Container>
      </section>
    );
  }

  if (courseQuery.isError || !course || !selectedPrice) {
    return (
      <InvalidCheckout message="Course or pricing information could not be loaded. Please try again." />
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f9ff] py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => router.push(`/courses/${course.slug}`)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#66788f] transition hover:text-[#377dff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to course
          </button>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-8">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[20px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <div className="border-b border-[#e3eaf3] px-6 py-5">
                  <h1 className="text-[22px] font-bold tracking-[-0.04em] text-[#20242a] sm:text-[26px]">
                    Review your order
                  </h1>
                  <p className="mt-1 text-sm text-[#66788f]">
                    Confirm the details below before proceeding to secure payment.
                  </p>
                </div>

                <div className="flex gap-5 p-6 sm:gap-7">
                  <div className="hidden w-[130px] shrink-0 sm:block">
                    <CourseListImage
                      course={course}
                      index={0}
                      className="aspect-square rounded-[10px]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
                      {course.title}
                    </h2>

                    {course.shortDescription ? (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[#66788f]">
                        {course.shortDescription}
                      </p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <CourseStat icon={BookOpenCheck} label={`${lectures.length} lecture${lectures.length !== 1 ? "s" : ""}`} />
                      {totalDuration > 0 ? (
                        <CourseStat icon={Clock} label={formatDuration(totalDuration)} />
                      ) : null}
                      <CourseStat icon={Headphones} label="Audio course" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[20px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <div className="border-b border-[#e3eaf3] px-6 py-5">
                  <h2 className="text-[17px] font-bold tracking-[-0.03em] text-[#20242a]">
                    What you get
                  </h2>
                </div>

                <ul className="divide-y divide-[#f1f5fb] px-6">
                  <AccessFeature
                    icon={BookOpenCheck}
                    title="Full lecture access"
                    description={`All ${lectures.length} lecture${lectures.length !== 1 ? "s" : ""} unlocked immediately after payment.`}
                  />
                  <AccessFeature
                    icon={Headphones}
                    title="Audio-first learning"
                    description="Stream every lecture from any device, anytime."
                  />
                  {isSubscription ? (
                    <>
                      <AccessFeature
                        icon={CalendarDays}
                        title={`${intervalDays} days of access per billing period`}
                        description={`Your access renews automatically every ${billingInterval}.`}
                      />
                      <AccessFeature
                        icon={RefreshCcw}
                        title="Cancel anytime"
                        description="Manage or cancel your subscription from the billing portal at any time."
                      />
                    </>
                  ) : (
                    <AccessFeature
                      icon={CalendarDays}
                      title="Lifetime access"
                      description="One-time purchase — access this course forever."
                    />
                  )}
                </ul>
              </div>
            </div>

            <div className="lg:sticky lg:top-[96px]">
              <div className="overflow-hidden rounded-[20px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
                <div className="border-b border-[#e3eaf3] px-6 py-5">
                  <h2 className="text-[17px] font-bold tracking-[-0.03em] text-[#20242a]">
                    Order summary
                  </h2>
                </div>

                <div className="space-y-5 px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-[#66788f]">
                      {course.title}
                    </span>
                    <span className="shrink-0 text-sm font-bold text-[#20242a]">
                      {formatPrice(selectedPrice)}
                    </span>
                  </div>

                  {isSubscription ? (
                    <div className="rounded-[10px] bg-[#f4f9ff] px-4 py-3">
                      <p className="text-[13px] font-semibold text-[#377dff]">
                        Billed every {billingInterval} · {intervalDays} days of access
                      </p>
                      <p className="mt-0.5 text-[12px] text-[#66788f]">
                        Renews automatically. Cancel anytime.
                      </p>
                    </div>
                  ) : null}

                  <div className="border-t border-[#e3eaf3] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold text-[#20242a]">
                        Total {isSubscription ? `/ ${billingInterval}` : ""}
                      </span>
                      <span className="text-[22px] font-bold tracking-[-0.03em] text-[#20242a]">
                        {formatPrice(selectedPrice)}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={handlePay}
                    disabled={checkoutMutation.isPending}
                    className="h-[54px] w-full rounded-[10px] bg-[#377dff] text-[16px] font-bold text-white hover:bg-[#236bf1] disabled:opacity-70"
                  >
                    {checkoutMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting to payment...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Pay with Stripe
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-[12px] font-semibold text-[#8a9aad]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Secured by Stripe · 256-bit SSL encryption
                  </div>

                  <div className="space-y-2 border-t border-[#f1f5fb] pt-4">
                    <GuaranteeLine icon={CheckCircle2} label="Instant access after payment" />
                    <GuaranteeLine icon={CheckCircle2} label="No hidden fees" />
                    {isSubscription ? (
                      <GuaranteeLine icon={CheckCircle2} label="Cancel anytime from billing portal" />
                    ) : (
                      <GuaranteeLine icon={CheckCircle2} label="Lifetime access — pay once" />
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-[12px] leading-5 text-[#8a9aad]">
                By completing your purchase you agree to our{" "}
                <Link href="/" className="font-bold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/" className="font-bold hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CourseStat({ icon: Icon, label }) {
  return (
    <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#66788f]">
      <Icon className="h-3.5 w-3.5 text-[#377dff]" />
      {label}
    </span>
  );
}

function AccessFeature({ icon: Icon, title, description }) {
  return (
    <li className="flex gap-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#377dff]">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div>
        <p className="text-[14px] font-bold text-[#20242a]">{title}</p>
        <p className="mt-0.5 text-[13px] leading-5 text-[#66788f]">{description}</p>
      </div>
    </li>
  );
}

function GuaranteeLine({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 text-[13px] font-medium text-[#66788f]">
      <Icon className="h-3.5 w-3.5 shrink-0 text-[#00b887]" />
      {label}
    </div>
  );
}

function InvalidCheckout({ message }) {
  return (
    <section className="min-h-screen bg-[#f6f9ff] py-14">
      <Container>
        <div className="mx-auto max-w-md rounded-[24px] border border-[#e3eaf3] bg-white p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
          <h1 className="text-xl font-bold tracking-[-0.04em] text-[#20242a]">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#66788f]">{message}</p>
          <Button asChild className="mt-6 h-11 rounded-xl bg-[#377dff]">
            <Link href="/courses">Browse courses</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

function CheckoutSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
      <div className="space-y-5">
        <div className="h-48 animate-pulse rounded-[20px] bg-[#e8eef6]" />
        <div className="h-64 animate-pulse rounded-[20px] bg-[#e8eef6]" />
      </div>
      <div className="h-80 animate-pulse rounded-[20px] bg-[#e8eef6]" />
    </div>
  );
}
