"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Headphones,
  Loader2,
  Sparkles,
} from "lucide-react";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/lib/constants/queryKeys";
import { useSessionStatus } from "@/lib/hooks/usePayments";
import { useAuthStore } from "@/lib/store/auth.store";

const CONFIRMED_STATUSES = ["PAID", "ACTIVE", "TRIALING"];
const POLL_TIMEOUT_MS = 40_000;

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<RedirectingState message="Loading payment status..." />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const courseSlug = searchParams.get("slug");

  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = Boolean(user);

  const [timedOut, setTimedOut] = useState(false);
  const timerRef = useRef(null);

  const sessionQuery = useSessionStatus(sessionId, {
    enabled: isLoggedIn && Boolean(sessionId) && !timedOut,
  });

  const status = sessionQuery.data?.status;
  const resolvedSlug = sessionQuery.data?.courseSlug || courseSlug;
  const isConfirmed = CONFIRMED_STATUSES.includes(status);

  useEffect(() => {
    if (!isConfirmed) return;

    clearTimeout(timerRef.current);

    queryClient.invalidateQueries({ queryKey: ["courses"] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });

    if (resolvedSlug) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.detail(resolvedSlug),
      });
    }
  }, [isConfirmed, resolvedSlug, queryClient]);

  useEffect(() => {
    if (!sessionId || isConfirmed) return;

    timerRef.current = setTimeout(() => setTimedOut(true), POLL_TIMEOUT_MS);
    return () => clearTimeout(timerRef.current);
  }, [sessionId, isConfirmed]);

  if (!isLoggedIn) {
    return (
      <RedirectingState message="Redirecting you to sign in..." />
    );
  }

  if (!sessionId) {
    return <GenericSuccess queryClient={queryClient} courseSlug={courseSlug} />;
  }

  if (!isConfirmed && !timedOut) {
    return (
      <section className="min-h-screen bg-[#f6f9ff] py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-[28px] border border-[#e3eaf3] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="bg-gradient-to-br from-[#377dff] to-[#1a5ce6] px-8 py-10 text-center text-white">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Loader2 className="h-10 w-10 animate-spin text-white" />
                </div>

                <h1 className="mt-5 text-[28px] font-bold tracking-[-0.05em] sm:text-[32px]">
                  Activating your access...
                </h1>

                <p className="mt-2 text-[15px] leading-6 text-white/80">
                  Payment received. We&apos;re confirming your course access — this usually takes a few seconds.
                </p>
              </div>

              <div className="px-8 py-7 text-center">
                <p className="text-sm text-[#8a9aad]">
                  Please keep this page open. You&apos;ll be ready to start learning shortly.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (timedOut && !confirmed) {
    return (
      <section className="min-h-screen bg-[#f6f9ff] py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-lg">
            <div className="overflow-hidden rounded-[28px] border border-[#e3eaf3] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <div className="px-8 py-10 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff8e1]">
                  <AlertCircle className="h-10 w-10 text-amber-500" />
                </div>

                <h1 className="mt-5 text-[26px] font-bold tracking-[-0.05em] text-[#20242a] sm:text-[30px]">
                  Payment received
                </h1>

                <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
                  Your payment was successful, but access activation is taking longer than usual. This happens occasionally — your course will be available within a few minutes.
                </p>

                <div className="mt-7 space-y-3">
                  <Button
                    asChild
                    className="h-[52px] w-full rounded-[10px] bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
                  >
                    <Link href="/dashboard/my-courses">
                      Check my courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="h-11 w-full rounded-[10px] text-[14px] font-bold text-[#66788f] hover:bg-[#f4f7fb]"
                  >
                    <Link href="/dashboard/subscriptions">
                      View subscriptions
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f6f9ff] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="overflow-hidden rounded-[28px] border border-[#e3eaf3] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="bg-gradient-to-br from-[#377dff] to-[#1a5ce6] px-8 py-10 text-center text-white">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>

              <h1 className="mt-5 text-[30px] font-bold tracking-[-0.05em] sm:text-[34px]">
                You&apos;re all set!
              </h1>

              <p className="mt-2 text-[15px] leading-6 text-white/80">
                Access confirmed. Every lecture is now unlocked and ready to play.
              </p>
            </div>

            <div className="px-8 py-7">
              <div className="space-y-3">
                <ConfirmItem
                  icon={BookOpenCheck}
                  title="All lectures unlocked"
                  description="Every lesson in the course is now available to you."
                />
                <ConfirmItem
                  icon={Headphones}
                  title="Stream from any device"
                  description="Listen on mobile, tablet, or desktop — wherever you learn best."
                />
                <ConfirmItem
                  icon={Sparkles}
                  title="Subscription active"
                  description="Your billing cycle and renewal dates are tracked in your dashboard."
                />
              </div>

              {sessionId ? (
                <p className="mt-5 text-center text-[11px] text-[#aab8cc]">
                  Ref: {sessionId}
                </p>
              ) : null}

              <div className="mt-7 space-y-3">
                {resolvedSlug ? (
                  <Button
                    onClick={() => router.push(`/courses/${resolvedSlug}`)}
                    className="h-[52px] w-full rounded-[10px] bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
                  >
                    Start listening now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="h-[52px] w-full rounded-[10px] bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
                  >
                    <Link href="/dashboard/my-courses">
                      Go to my courses
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}

                <Button
                  asChild
                  variant="ghost"
                  className="h-11 w-full rounded-[10px] text-[14px] font-bold text-[#66788f] hover:bg-[#f4f7fb] hover:text-[#20242a]"
                >
                  <Link href="/courses">Browse more courses</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[13px] leading-6 text-[#8a9aad]">
            Questions?{" "}
            <Link href="/" className="font-bold text-[#377dff] hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

function ConfirmItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4 rounded-[12px] bg-[#f6f9ff] px-4 py-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#377dff]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[14px] font-bold text-[#20242a]">{title}</p>
        <p className="mt-0.5 text-[12px] leading-5 text-[#66788f]">{description}</p>
      </div>
    </div>
  );
}

function RedirectingState({ message }) {
  return (
    <section className="min-h-screen bg-[#f6f9ff] py-20">
      <Container>
        <div className="mx-auto max-w-sm text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#377dff]" />
          <p className="mt-4 text-sm font-semibold text-[#66788f]">{message}</p>
        </div>
      </Container>
    </section>
  );
}

function GenericSuccess({ queryClient, courseSlug }) {
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["courses"] });
    queryClient.invalidateQueries({ queryKey: ["payments"] });
  }, [queryClient]);

  return (
    <section className="min-h-screen bg-[#f6f9ff] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg">
          <div className="overflow-hidden rounded-[28px] border border-[#e3eaf3] bg-white p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eef5ff]">
              <CheckCircle2 className="h-10 w-10 text-[#377dff]" strokeWidth={2.5} />
            </div>

            <h1 className="mt-5 text-[28px] font-bold tracking-[-0.05em] text-[#20242a]">
              Payment successful!
            </h1>

            <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
              Your access will be activated shortly.
            </p>

            <div className="mt-7 space-y-3">
              {courseSlug ? (
                <Button asChild className="h-[52px] w-full rounded-[10px] bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]">
                  <Link href={`/courses/${courseSlug}`}>
                    Go to course <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild className="h-[52px] w-full rounded-[10px] bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]">
                  <Link href="/dashboard/my-courses">
                    My courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
