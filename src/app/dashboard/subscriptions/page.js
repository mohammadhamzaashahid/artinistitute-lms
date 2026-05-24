"use client";

import { CreditCard } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import {
  useCreateCustomerPortalSession,
  useMySubscriptions,
} from "@/lib/hooks/usePayments";

export default function SubscriptionsPage() {
  const { data, isLoading, isError } = useMySubscriptions({
    page: 1,
    limit: 20,
  });

  const portalMutation = useCreateCustomerPortalSession();
  const items = data?.items || [];

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col gap-4 rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#20242a] sm:text-[34px]">
            Subscriptions
          </h2>

          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#66788f]">
            View and manage active course subscriptions.
          </p>
        </div>

        <Button
          type="button"
          disabled={portalMutation.isPending}
          onClick={() => portalMutation.mutate()}
          className="h-11 w-full rounded-xl bg-[#377dff] text-sm font-bold hover:bg-[#236bf1] md:w-auto md:px-5"
        >
          {portalMutation.isPending ? "Opening..." : "Manage billing"}
        </Button>
      </section>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-[24px] bg-[#f4f7fb]"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && isError ? (
        <EmptyState
          title="Unable to load subscriptions"
          description="Please try again after a moment."
        />
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <EmptyState
          title="No active subscriptions"
          description="When you subscribe to a course, it will appear here."
        />
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="grid gap-4">
          {items.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SubscriptionCard({ subscription }) {
  const course = subscription.course || subscription.coursePrice?.course;
  const status = subscription.status || "ACTIVE";

  return (
    <article className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <CreditCard className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-lg font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
              {course?.title || "Course subscription"}
            </h3>

            <p className="mt-1 text-sm font-medium text-[#66788f]">
              Status:{" "}
              <span className="font-bold text-[#20242a]">{status}</span>
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-[#ecfdf5] px-4 py-2 text-sm font-bold text-emerald-700">
          {status}
        </span>
      </div>
    </article>
  );
}