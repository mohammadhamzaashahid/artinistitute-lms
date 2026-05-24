"use client";

import Link from "next/link";
import {
  CalendarDays,
  CheckCircle2,
  CreditCard,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreateCustomerPortalSession } from "@/lib/hooks/usePayments";
import { useAuthStore } from "@/lib/store/auth.store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const portalMutation = useCreateCustomerPortalSession();

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    "User";

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="overflow-hidden rounded-[24px] border border-[#e3eaf3] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px]">
        <div className="bg-[#377dff] px-5 py-6 text-white sm:px-7 sm:py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-[#377dff] shadow-sm sm:h-20 sm:w-20 sm:text-2xl">
                {getInitials(user)}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-[24px] font-bold leading-tight tracking-[-0.045em] sm:text-[32px]">
                  {displayName}
                </h2>

                <p className="mt-1 break-all text-sm font-medium text-white/78 sm:text-[15px]">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-bold text-white backdrop-blur">
              <CheckCircle2 className="h-4 w-4" />
              Active account
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-4 sm:p-7 xl:grid-cols-4">
          <ProfileInfo
            icon={UserRound}
            label="Username"
            value={user?.username || "-"}
          />

          <ProfileInfo icon={Mail} label="Email" value={user?.email || "-"} />

          <ProfileInfo
            icon={ShieldCheck}
            label="Role"
            value={user?.role || "USER"}
          />

          <ProfileInfo
            icon={CalendarDays}
            label="Member since"
            value={formatDate(user?.createdAt)}
          />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <ActionCard
          icon={KeyRound}
          title="Password and security"
          description="Use OTP verification to reset your password securely. This keeps password changes aligned with your backend auth flow."
          buttonLabel="Reset password"
          href="/auth/forgot-password"
        />

        <div className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <CreditCard className="h-6 w-6" />
          </div>

          <h3 className="mt-5 text-[21px] font-bold tracking-[-0.04em] text-[#20242a] sm:text-2xl">
            Billing portal
          </h3>

          <p className="mt-2 text-[15px] leading-7 text-[#66788f]">
            Manage your subscription, payment method, and billing details
            through the secure customer portal.
          </p>

          <Button
            type="button"
            disabled={portalMutation.isPending}
            onClick={() => portalMutation.mutate()}
            className="mt-6 h-11 w-full rounded-xl bg-[#377dff] text-sm font-bold hover:bg-[#236bf1] sm:w-auto sm:px-6"
          >
            {portalMutation.isPending ? "Opening..." : "Manage billing"}
          </Button>
        </div>
      </section>
    </div>
  );
}

function ProfileInfo({ icon: Icon, label, value }) {
  return (
    <div className="min-w-0 rounded-2xl bg-[#f8fbff] p-4 ring-1 ring-[#edf2f8]">
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#377dff] shadow-sm">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a9aad]">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-bold leading-5 text-[#20242a]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description, buttonLabel, href }) {
  return (
    <div className="rounded-[24px] border border-[#e3eaf3] bg-white p-5 shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-[21px] font-bold tracking-[-0.04em] text-[#20242a] sm:text-2xl">
        {title}
      </h3>

      <p className="mt-2 text-[15px] leading-7 text-[#66788f]">
        {description}
      </p>

      <Button
        asChild
        className="mt-6 h-11 w-full rounded-xl bg-[#377dff] text-sm font-bold hover:bg-[#236bf1] sm:w-auto sm:px-6"
      >
        <Link href={href}>{buttonLabel}</Link>
      </Button>
    </div>
  );
}

function getInitials(user) {
  const first = user?.firstName?.[0];
  const last = user?.lastName?.[0];

  if (first || last) return `${first || ""}${last || ""}`.toUpperCase();

  if (user?.username) return user.username.slice(0, 2).toUpperCase();

  return user?.email?.slice(0, 2).toUpperCase() || "U";
}

function formatDate(value) {
  if (!value) return "-";

  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
    }).format(new Date(value));
  } catch {
    return "-";
  }
}