"use client";

import Link from "next/link";
import { AlertCircle, CalendarDays, CreditCard, RefreshCcw } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import {
  useCreateCustomerPortalSession,
  useMySubscriptions,
} from "@/lib/hooks/usePayments";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    className: "bg-[#ecfdf5] text-emerald-700",
  },
  TRIALING: {
    label: "Trialing",
    className: "bg-[#eef5ff] text-[#377dff]",
  },
  PAST_DUE: {
    label: "Past due",
    className: "bg-[#fff8e1] text-amber-700",
  },
  CANCELED: {
    label: "Cancelled",
    className: "bg-[#fff1f1] text-red-600",
  },
  INCOMPLETE: {
    label: "Incomplete",
    className: "bg-[#f4f7fb] text-[#66788f]",
  },
  PAUSED: {
    label: "Paused",
    className: "bg-[#f4f7fb] text-[#66788f]",
  },
  UNPAID: {
    label: "Unpaid",
    className: "bg-[#fff1f1] text-red-600",
  },
};

function getDaysRemaining(endDate) {
  if (!endDate) return null;
  const now = new Date();
  const end = new Date(endDate);
  const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function formatDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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
            Track your active course subscriptions, billing cycles, and renewal
            dates.
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
              className="h-36 animate-pulse rounded-[24px] bg-[#f4f7fb]"
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
  const course = subscription.course;
  const coursePrice = subscription.coursePrice;
  const status = subscription.status || "ACTIVE";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.INCOMPLETE;

  const billingInterval = coursePrice?.billingInterval?.toLowerCase() ?? "month";
  const intervalDays = billingInterval === "year" ? 365 : 30;

  const renewalDate = formatDate(subscription.currentPeriodEnd);
  const daysRemaining = getDaysRemaining(subscription.currentPeriodEnd);

  const isActive = status === "ACTIVE" || status === "TRIALING";
  const isPastDue = status === "PAST_DUE" || status === "UNPAID";
  const cancelAtPeriodEnd = subscription.cancelAtPeriodEnd;

  return (
    <article className="overflow-hidden rounded-[24px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
              <CreditCard className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h3 className="break-words text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
                {course?.title || "Course subscription"}
              </h3>

              {course?.slug ? (
                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-0.5 block text-sm font-semibold text-[#377dff] hover:underline"
                >
                  View course
                </Link>
              ) : null}
            </div>
          </div>

          <span
            className={cn(
              "w-fit shrink-0 rounded-full px-4 py-1.5 text-[13px] font-bold",
              config.className
            )}
          >
            {config.label}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatCell
            icon={CreditCard}
            label="Billing amount"
            value={
              coursePrice
                ? `${formatPrice(coursePrice)} / ${billingInterval}`
                : "—"
            }
          />

          <StatCell
            icon={CalendarDays}
            label={cancelAtPeriodEnd ? "Access until" : "Renews on"}
            value={renewalDate ?? "—"}
          />

          <StatCell
            icon={RefreshCcw}
            label="Days remaining"
            value={
              daysRemaining !== null
                ? `${daysRemaining} of ${intervalDays} days`
                : "—"
            }
            highlight={
              isActive && daysRemaining !== null && daysRemaining <= 5
                ? "warning"
                : null
            }
          />
        </div>

        {isPastDue ? (
          <div className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#fff8e1] px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-[13px] font-medium text-amber-700">
              Your last payment failed. Please update your payment method to
              keep access to this course.
            </p>
          </div>
        ) : null}

        {cancelAtPeriodEnd && isActive ? (
          <div className="mt-4 flex items-start gap-2 rounded-[10px] bg-[#fff8e1] px-4 py-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-[13px] font-medium text-amber-700">
              Subscription will not renew. Access ends on {renewalDate ?? "the current period end"}.
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function StatCell({ icon: Icon, label, value, highlight }) {
  return (
    <div className="rounded-[12px] bg-[#f8fbff] px-4 py-3">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#8a9aad]">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-[14px] font-bold",
          highlight === "warning" ? "text-amber-600" : "text-[#20242a]"
        )}
      >
        {value}
      </p>
    </div>
  );
}
