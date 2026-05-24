"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Grid3X3, Menu, Search, X } from "lucide-react";
import { useState } from "react";

import AppLogo from "@/components/common/AppLogo";
import Container from "@/components/common/Container";
import AuthModal from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/layout/UserMenu";
import { useAuthStore } from "@/lib/store/auth.store";
import { cn } from "@/lib/utils/cn";

export default function SiteNavbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [search, setSearch] = useState("");

  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(user && accessToken);
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    user?.email;

  function handleSearchSubmit(event) {
    event.preventDefault();

    const value = search.trim();

    if (value) {
      router.push(`/courses?search=${encodeURIComponent(value)}`);
    } else {
      router.push("/courses");
    }

    setMobileOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-transparent bg-white/92 backdrop-blur-xl">
        <Container>
          <div className="flex h-[70px] items-center gap-4 lg:h-[74px]">
            <div className="flex min-w-fit items-center">
              <AppLogo />
            </div>

            <Link
              href="/courses"
              className="ml-8 hidden items-center gap-2 text-[17px] font-medium text-[#68798d] transition hover:text-[#377dff] lg:inline-flex"
            >
              <Grid3X3 className="h-4 w-4" />
              All courses
            </Link>

            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto hidden w-full max-w-[560px] lg:block"
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-[#93a3b5]" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="What do you want to learn?"
                  className="h-[44px] w-full rounded-[5px] border border-[#dfe7f1] bg-white pl-12 pr-4 text-[16px] text-[#334155] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
                />
              </div>
            </form>

            <div className="ml-auto hidden items-center lg:flex">
              {isLoggedIn ? (
                <UserMenu />
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAuthOpen(true)}
                  className="h-[42px] rounded-full border-[#377dff] px-7 text-[16px] font-medium text-[#377dff] hover:bg-[#377dff] hover:text-white"
                >
                  Sign in
                </Button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e9f3] text-[#52657a] lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          <div
            className={cn(
              "grid overflow-hidden transition-all duration-300 lg:hidden",
              mobileOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]",
            )}
          >
            <div className="min-h-0">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#93a3b5]" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="What do you want to learn?"
                    className="h-[46px] w-full rounded-xl border border-[#dfe7f1] bg-white pl-12 pr-4 text-[15px] text-[#334155] outline-none focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
                  />
                </div>
              </form>

              <div className="flex flex-col gap-3">
                <Link
                  href="/courses"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#f5f8fc] px-4 text-[15px] font-semibold text-[#52657a]"
                >
                  <Grid3X3 className="h-4 w-4" />
                  All courses
                </Link>

                {isLoggedIn ? (
                  <div className="rounded-2xl border border-[#e3eaf3] bg-[#f8fbff] p-3">
                    <div className="mb-3">
                      <p className="text-sm font-bold text-[#20242a]">
                        {displayName}
                      </p>
                      <p className="text-xs font-medium text-[#8a9aad]">
                        {user?.email}
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#52657a]"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setMobileOpen(false)}
                        className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#52657a]"
                      >
                        Profile
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      setAuthOpen(true);
                      setMobileOpen(false);
                    }}
                    className="h-11 rounded-xl bg-[#377dff] text-[15px] font-semibold text-white hover:bg-[#236bf1]"
                  >
                    Sign in / Sign up
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
