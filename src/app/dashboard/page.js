"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CreditCard,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { useMyCourses, useMyPurchases, useMySubscriptions } from "@/lib/hooks/usePayments";
import { useAuthStore } from "@/lib/store/auth.store";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const myCoursesQuery = useMyCourses({ page: 1, limit: 6 });
  const subscriptionsQuery = useMySubscriptions({ page: 1, limit: 6 });
  const purchasesQuery = useMyPurchases({ page: 1, limit: 6 });

  const myCourses = myCoursesQuery.data?.items || [];
  const subscriptions = subscriptionsQuery.data?.items || [];
  const purchases = purchasesQuery.data?.items || [];

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="overflow-hidden rounded-[24px] bg-[#377dff] shadow-[0_24px_70px_rgba(55,125,255,0.20)] sm:rounded-[28px]">
        <div className="relative p-5 text-white sm:p-8">
          <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-white/10" />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
              Welcome back
            </p>

            <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-[-0.055em] sm:text-[38px]">
              {user?.firstName || user?.username || "Learner"}
            </h2>

            <p className="mt-2 max-w-2xl text-[15px] leading-7 text-white/78 sm:text-[16px]">
              Continue learning, manage your subscriptions, and review your
              course access from one place.
            </p>

            <Link
              href="/courses"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-bold text-[#377dff] transition hover:bg-[#f4f8ff]"
            >
              Browse courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
        <DashboardStat
          title="Accessible courses"
          mobileTitle="Courses"
          value={myCourses.length}
          icon={BookOpenCheck}
          href="/dashboard/my-courses"
        />

        <DashboardStat
          title="Subscriptions"
          mobileTitle="Subs"
          value={subscriptions.length}
          icon={CreditCard}
          href="/dashboard/subscriptions"
        />

        <DashboardStat
          title="Purchases"
          mobileTitle="Orders"
          value={purchases.length}
          icon={ReceiptText}
          href="/dashboard/purchases"
        />

        <DashboardStat
          title="Profile"
          mobileTitle="Profile"
          value="View"
          icon={UserRound}
          href="/dashboard/profile"
        />
      </section>

      <section className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7">
        <h3 className="text-[21px] font-bold tracking-[-0.04em] text-[#20242a] sm:text-2xl">
          Your learning access
        </h3>

        <p className="mt-2 text-[15px] leading-7 text-[#66788f]">
          After checkout integration, successful course purchases and active
          subscriptions will appear here automatically through the payment APIs.
        </p>
      </section>
    </div>
  );
}

function DashboardStat({ title, mobileTitle, value, icon: Icon, href }) {
  return (
    <Link
      href={href}
      className="rounded-[22px] border border-[#e3eaf3] bg-white p-4 shadow-[0_14px_36px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:rounded-[24px] sm:p-5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff] sm:h-12 sm:w-12">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>

      <p className="mt-4 text-xs font-bold text-[#66788f] sm:hidden">
        {mobileTitle}
      </p>

      <p className="mt-4 hidden text-sm font-bold text-[#66788f] sm:block">
        {title}
      </p>

      <p className="mt-1 text-[26px] font-bold leading-none tracking-[-0.05em] text-[#20242a] sm:text-3xl">
        {value}
      </p>
    </Link>
  );
}