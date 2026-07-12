"use client";

import { Suspense, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  Radio,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/common/Container";
import LiveClassImage from "@/components/live-classes/LiveClassImage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { useLiveClassDetail } from "@/lib/hooks/useLiveClasses";
import { useCreateLiveClassCheckoutSession } from "@/lib/hooks/usePayments";
import { formatDate, formatDurationDays, formatPrice } from "@/lib/utils/format";
import {
  formatLiveClassTime,
  getLiveClassPrice,
  normalizeLiveClassDetail,
} from "@/lib/utils/liveClass";

export default function LiveClassCheckoutPage() {
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

  const liveClassQuery = useLiveClassDetail(slug);
  const checkoutMutation = useCreateLiveClassCheckoutSession();
  const checkoutInFlightRef = useRef(false);

  const liveClass = normalizeLiveClassDetail(liveClassQuery.data);

  const selectedPrice = useMemo(() => {
    const fallback = getLiveClassPrice(liveClass);
    return liveClass?.prices?.find((p) => p.id === priceId) || fallback;
  }, [liveClass, priceId]);

  async function handlePay() {
    if (!liveClass?.id || !selectedPrice?.id || checkoutInFlightRef.current) return;

    checkoutInFlightRef.current = true;

    try {
      await checkoutMutation.mutateAsync({
        liveClassId: liveClass.id,
        liveClassPriceId: selectedPrice.id,
      });
    } catch {
      checkoutInFlightRef.current = false;
    }
  }

  if (!slug || !priceId) {
    return (
      <InvalidCheckout message="Invalid checkout link. Please return to the live class and try again." />
    );
  }

  if (liveClassQuery.isLoading) {
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

  if (liveClassQuery.isError || !liveClass || !selectedPrice) {
    return (
      <InvalidCheckout message="Live class or pricing information could not be loaded. Please try again." />
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f9ff] py-10 sm:py-14">
      <Container>
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => router.push(`/live-classes/${liveClass.slug}`)}
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#66788f] transition hover:text-[#377dff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to live class
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
                    <LiveClassImage
                      liveClass={liveClass}
                      index={0}
                      className="aspect-square rounded-[10px]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
                      {liveClass.title}
                    </h2>

                    {liveClass.description ? (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-[#66788f]">
                        {liveClass.description}
                      </p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <LiveClassStat
                        icon={Calendar}
                        label={`${formatDate(liveClass.startDate)} · ${formatLiveClassTime(liveClass.startDate)}`}
                      />
                      <LiveClassStat
                        icon={Clock}
                        label={formatDurationDays(liveClass.durationDays)}
                      />
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
                    icon={Radio}
                    title="Joining link unlocked"
                    description="Your live session link appears here and on the class page the moment it goes live."
                  />
                  <AccessFeature
                    icon={Calendar}
                    title="Calendar reminder"
                    description="Add this session to your calendar so you never miss the start time."
                  />
                  <AccessFeature
                    icon={CheckCircle2}
                    title="One-time seat"
                    description="A single reserved seat for this scheduled session — no recurring charges."
                  />
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
                      {liveClass.title}
                    </span>
                    <span className="shrink-0 text-sm font-bold text-[#20242a]">
                      {formatPrice(selectedPrice)}
                    </span>
                  </div>

                  <div className="border-t border-[#e3eaf3] pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold text-[#20242a]">Total</span>
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
                    <GuaranteeLine icon={CheckCircle2} label="Instant seat confirmation" />
                    <GuaranteeLine icon={CheckCircle2} label="No hidden fees" />
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

function LiveClassStat({ icon: Icon, label }) {
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
            <Link href="/live-classes">Browse live classes</Link>
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
