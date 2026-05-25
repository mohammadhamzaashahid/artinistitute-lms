"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, ReceiptText, XCircle } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import { useMyPurchases } from "@/lib/hooks/usePayments";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

const STATUS_CONFIG = {
  PAID: {
    label: "Paid",
    icon: CheckCircle2,
    className: "bg-[#ecfdf5] text-emerald-700",
    iconClass: "text-emerald-600",
  },
  PENDING: {
    label: "Pending",
    icon: CalendarDays,
    className: "bg-[#fff8e1] text-amber-700",
    iconClass: "text-amber-600",
  },
  FAILED: {
    label: "Failed",
    icon: XCircle,
    className: "bg-[#fff1f1] text-red-600",
    iconClass: "text-red-500",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-[#f4f7fb] text-[#66788f]",
    iconClass: "text-[#8a9aad]",
  },
  REFUNDED: {
    label: "Refunded",
    icon: XCircle,
    className: "bg-[#f4f7fb] text-[#66788f]",
    iconClass: "text-[#8a9aad]",
  },
};

function formatDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PurchasesPage() {
  const { data, isLoading, isError } = useMyPurchases({
    page: 1,
    limit: 20,
  });

  const items = data?.items || [];

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7">
        <h2 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#20242a] sm:text-[34px]">
          Purchases
        </h2>

        <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#66788f]">
          Review your one-time course purchases and payment history.
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-[24px] bg-[#f4f7fb]"
            />
          ))}
        </div>
      ) : null}

      {!isLoading && isError ? (
        <EmptyState
          title="Unable to load purchases"
          description="Please try again after a moment."
        />
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <EmptyState
          title="No purchases yet"
          description="When you buy a course, your purchase will appear here."
        />
      ) : null}

      {!isLoading && !isError && items.length > 0 ? (
        <div className="grid gap-4">
          {items.map((purchase) => (
            <PurchaseCard key={purchase.id} purchase={purchase} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PurchaseCard({ purchase }) {
  const course = purchase.course;
  const coursePrice = purchase.coursePrice;
  const status = purchase.status || "PAID";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const StatusIcon = config.icon;

  const purchasedAt = formatDate(purchase.purchasedAt || purchase.createdAt);

  return (
    <article className="overflow-hidden rounded-[24px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
              <ReceiptText className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <h3 className="break-words text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
                {course?.title || "Course purchase"}
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
              "flex w-fit shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-bold",
              config.className
            )}
          >
            <StatusIcon className={cn("h-3.5 w-3.5", config.iconClass)} />
            {config.label}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatCell
            icon={ReceiptText}
            label="Amount paid"
            value={
              purchase.amount && purchase.currency
                ? formatPrice({ amount: purchase.amount, currency: purchase.currency })
                : coursePrice
                  ? formatPrice(coursePrice)
                  : "—"
            }
          />

          <StatCell
            icon={CalendarDays}
            label="Purchase date"
            value={purchasedAt ?? "—"}
          />

          <StatCell
            icon={CheckCircle2}
            label="Access type"
            value="Lifetime access"
          />
        </div>
      </div>
    </article>
  );
}

function StatCell({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[12px] bg-[#f8fbff] px-4 py-3">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#8a9aad]">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      <p className="mt-1 text-[14px] font-bold text-[#20242a]">{value}</p>
    </div>
  );
}
