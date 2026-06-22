"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock4,
  Headphones,
  Package,
  ReceiptText,
  Truck,
  XCircle,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import { useMyBookOrders } from "@/lib/hooks/useBooks";
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";

const STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    icon: Clock4,
    pill: "bg-amber-50 text-amber-700",
    iconClass: "text-amber-500",
    description: "We've received your order and will process it shortly.",
  },
  PROCESSING: {
    label: "Processing",
    icon: Package,
    pill: "bg-blue-50 text-blue-700",
    iconClass: "text-blue-500",
    description: "Your order is being prepared. Audio access is now unlocked.",
  },
  SHIPPED: {
    label: "Shipped",
    icon: Truck,
    pill: "bg-purple-50 text-purple-700",
    iconClass: "text-purple-500",
    description: "Your book is on its way.",
  },
  DELIVERED: {
    label: "Delivered",
    icon: CheckCircle2,
    pill: "bg-emerald-50 text-emerald-700",
    iconClass: "text-emerald-500",
    description: "Book delivered. Enjoy reading & listening!",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    pill: "bg-[#f4f7fb] text-[#66788f]",
    iconClass: "text-[#8a9aad]",
    description: "This order has been cancelled.",
  },
};

function formatBookPrice(price, currency = "AED") {
  const num = Number(price ?? 0);
  if (num === 0) return "Free";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(num);
  } catch {
    return `${currency} ${num}`;
  }
}

export default function DashboardBooksPage() {
  const { data, isLoading, isError } = useMyBookOrders({ page: 1, limit: 30 });

  const orders = data?.orders ?? data?.items ?? (Array.isArray(data) ? data : []);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page header card */}
      <section className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7">
        <h2 className="text-[28px] font-bold leading-tight tracking-[-0.05em] text-[#20242a] sm:text-[34px]">
          My Books
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#66788f]">
          Track your book orders and access your audio libraries.
        </p>
        <Link
          href="/books"
          className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[#eef5ff] px-4 text-[14px] font-semibold text-[#377dff] transition hover:bg-[#ddeaff]"
        >
          <BookOpen className="h-4 w-4" />
          Browse more books
        </Link>
      </section>

      {/* Loading */}
      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-[24px] bg-[#f4f7fb]"
            />
          ))}
        </div>
      ) : null}

      {/* Error */}
      {!isLoading && isError ? (
        <EmptyState
          title="Unable to load orders"
          description="Please try again in a moment."
        />
      ) : null}

      {/* Empty */}
      {!isLoading && !isError && orders.length === 0 ? (
        <EmptyState
          title="No book orders yet"
          description="When you order a book, it'll appear here with status updates and audio access."
        />
      ) : null}

      {/* Orders */}
      {!isLoading && !isError && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <BookOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BookOrderCard({ order }) {
  const status = order.status || "PENDING";
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const StatusIcon = config.icon;

  const coverUrl = order.book?.coverImages?.[0]?.mediaAsset?.url;
  const audioCount = order.book?.audioFiles?.length ?? 0;
  const hasAudioAccess =
    status === "PROCESSING" || status === "SHIPPED" || status === "DELIVERED";

  const placedAt = formatDate(order.createdAt);
  const price = formatBookPrice(order.book?.price, order.book?.currency);

  return (
    <article className="overflow-hidden rounded-[24px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="p-5 sm:p-6">
        {/* Top row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            {/* Book cover */}
            <div className="relative h-[72px] w-[52px] shrink-0 overflow-hidden rounded-xl bg-[#f1f5f9]">
              {coverUrl ? (
                <Image
                  src={coverUrl}
                  alt={order.book?.title || "Book"}
                  fill
                  sizes="52px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#8a9aad]" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="break-words text-[17px] font-bold leading-snug tracking-[-0.03em] text-[#20242a]">
                {order.book?.title || "Book order"}
              </h3>

              {order.book?.slug && (
                <Link
                  href={`/books/${order.book.slug}`}
                  className="mt-0.5 block text-[13px] font-semibold text-[#377dff] hover:underline"
                >
                  View book
                </Link>
              )}

              <p className="mt-1 text-[13px] text-[#8a9aad]">
                Qty: {order.quantity || 1}
                {price !== "Free" && (
                  <span className="ml-2 font-semibold text-[#20242a]">
                    · {price}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Status pill */}
          <span
            className={cn(
              "flex w-fit shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-bold",
              config.pill
            )}
          >
            <StatusIcon className={cn("h-3.5 w-3.5", config.iconClass)} />
            {config.label}
          </span>
        </div>

        {/* Status description */}
        <p className="mt-3 text-[13.5px] text-[#66788f]">{config.description}</p>

        {/* Stats row */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatCell
            icon={CalendarDays}
            label="Order placed"
            value={placedAt || "—"}
          />
          <StatCell
            icon={ReceiptText}
            label="Delivery to"
            value={order.deliveryName || "—"}
          />
          <StatCell
            icon={hasAudioAccess ? Headphones : Package}
            label="Audio access"
            value={
              hasAudioAccess
                ? audioCount > 0
                  ? `${audioCount} track${audioCount !== 1 ? "s" : ""} unlocked`
                  : "Unlocked"
                : "After processing"
            }
          />
        </div>

        {/* Audio access banner */}
        {hasAudioAccess && audioCount > 0 && order.book?.slug && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-2xl bg-[#eef5ff] px-4 py-3">
            <div className="flex items-center gap-2.5 text-[13.5px] font-semibold text-[#377dff]">
              <Headphones className="h-4 w-4 shrink-0" />
              Your audio library is unlocked
            </div>
            <Link
              href={`/books/${order.book.slug}`}
              className="shrink-0 text-[13px] font-bold text-[#377dff] hover:underline"
            >
              Listen now →
            </Link>
          </div>
        )}
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
