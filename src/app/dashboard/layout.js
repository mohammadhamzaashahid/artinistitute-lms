"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  UserRound,
} from "lucide-react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils/cn";

const navItems = [
  {
    label: "Overview",
    shortLabel: "Home",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My courses",
    shortLabel: "Courses",
    href: "/dashboard/my-courses",
    icon: BookOpenCheck,
  },
  {
    label: "Subscriptions",
    shortLabel: "Subs",
    href: "/dashboard/subscriptions",
    icon: CreditCard,
  },
  {
    label: "Purchases",
    shortLabel: "Orders",
    href: "/dashboard/purchases",
    icon: ReceiptText,
  },
  {
    label: "Profile",
    shortLabel: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <ProtectedRoute>
      <section className="bg-white pb-14 pt-6 sm:pb-16 sm:pt-10">
        <Container>
          <div className="mb-5 sm:mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#377dff]">
              Account
            </p>

            <h1 className="mt-2 text-[30px] font-bold leading-tight tracking-[-0.055em] text-[#20242a] sm:text-[40px] lg:text-[44px]">
              My learning
            </h1>

            <p className="mt-2 max-w-2xl text-[14px] leading-6 text-[#66788f] sm:text-[16px] sm:leading-7">
              Manage your profile, courses, subscriptions, and purchases.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-8">
            <aside className="lg:sticky lg:top-[96px] lg:self-start">
              <nav className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto border-y border-[#e8eef6] bg-white px-5 py-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:mb-0 lg:flex-col lg:overflow-visible lg:rounded-[26px] lg:border lg:border-[#e3eaf3] lg:bg-[#f8fbff] lg:p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "inline-flex min-w-[92px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-2xl px-3 py-3 text-xs font-bold transition sm:min-w-[118px] sm:flex-row sm:gap-2 sm:text-sm lg:min-w-0 lg:w-full lg:flex-row lg:justify-start lg:px-4",
                        isActive
                          ? "bg-[#377dff] text-white shadow-[0_10px_24px_rgba(55,125,255,0.22)]"
                          : "bg-[#f8fbff] text-[#617389] hover:bg-[#eef5ff] hover:text-[#377dff] lg:bg-transparent lg:hover:bg-white"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="sm:hidden">{item.shortLabel}</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </aside>

            <div className="min-w-0">{children}</div>
          </div>
        </Container>
      </section>
    </ProtectedRoute>
  );
}