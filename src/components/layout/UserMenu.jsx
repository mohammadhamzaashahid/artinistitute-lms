"use client";

import Link from "next/link";
import {
  BookOpenCheck,
  ChevronDown,
  CreditCard,
  LayoutDashboard,
  LogOut,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/auth.store";

export default function UserMenu() {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();

  if (!user) return null;

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    user.email;

  const initials = getInitials(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex h-[44px] items-center gap-3 rounded-full border border-[#dfe7f1] bg-white py-1 pl-1 pr-3 transition hover:border-[#377dff]/50 hover:shadow-sm">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#377dff] text-sm font-bold text-white">
            {initials}
          </span>

          <span className="hidden max-w-[140px] truncate text-sm font-bold text-[#20242a] xl:inline">
            {displayName}
          </span>

          <ChevronDown className="h-4 w-4 text-[#8a9aad]" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[260px] rounded-2xl border-[#e3eaf3] p-2 shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
      >
        <DropdownMenuLabel className="p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#377dff] text-sm font-bold text-white">
              {initials}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#20242a]">
                {displayName}
              </p>
              <p className="truncate text-xs font-medium text-[#8a9aad]">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-3">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-3 h-4 w-4 text-[#66788f]" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-3">
            <Link href="/dashboard/profile">
              <UserRound className="mr-3 h-4 w-4 text-[#66788f]" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-3">
            <Link href="/dashboard/my-courses">
              <BookOpenCheck className="mr-3 h-4 w-4 text-[#66788f]" />
              My courses
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer rounded-xl p-3">
            <Link href="/dashboard/subscriptions">
              <CreditCard className="mr-3 h-4 w-4 text-[#66788f]" />
              Subscriptions
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          className="cursor-pointer rounded-xl p-3 text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-3 h-4 w-4" />
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function getInitials(user) {
  const first = user?.firstName?.[0];
  const last = user?.lastName?.[0];

  if (first || last) return `${first || ""}${last || ""}`.toUpperCase();

  if (user?.username) return user.username.slice(0, 2).toUpperCase();

  return user?.email?.slice(0, 2).toUpperCase() || "U";
}