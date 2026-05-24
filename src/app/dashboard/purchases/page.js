"use client";

import { ReceiptText } from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import { useMyPurchases } from "@/lib/hooks/usePayments";

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
          Review one-time purchases and payment history.
        </p>
      </section>

      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 animate-pulse rounded-[24px] bg-[#f4f7fb]"
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
  const course = purchase.course || purchase.coursePrice?.course;
  const status = purchase.status || "PAID";

  return (
    <article className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <ReceiptText className="h-6 w-6" />
          </div>

          <div className="min-w-0">
            <h3 className="break-words text-lg font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
              {course?.title || "Course purchase"}
            </h3>

            <p className="mt-1 text-sm font-medium text-[#66788f]">
              Status:{" "}
              <span className="font-bold text-[#20242a]">{status}</span>
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full bg-[#eef5ff] px-4 py-2 text-sm font-bold text-[#377dff]">
          {status}
        </span>
      </div>
    </article>
  );
}