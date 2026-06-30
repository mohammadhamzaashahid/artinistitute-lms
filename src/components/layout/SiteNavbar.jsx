"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Compass,
  Grid3X3,
  Menu,
  Radio,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";

import AppLogo from "@/components/common/AppLogo";
import Container from "@/components/common/Container";
import AuthModal from "@/components/auth/AuthModal";
import CartDrawer from "@/components/books/CartDrawer";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/layout/UserMenu";
import { useAuthStore } from "@/lib/store/auth.store";
import { useCartStore } from "@/lib/store/cart.store";
import { cn } from "@/lib/utils/cn";

export default function SiteNavbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(user && accessToken);
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    user?.username ||
    user?.email;

  const cartCount = useCartStore((s) => s.totalItems());

  function handleSearchSubmit(event) {
    event.preventDefault();
    const value = search.trim();
    router.push(value ? `/courses?search=${encodeURIComponent(value)}` : "/courses");
    setMobileOpen(false);
  }

  const navLinks = [
    { href: "/courses", icon: Grid3X3, label: "All courses" },
    { href: "/books", icon: BookOpen, label: "Books" },
    { href: "/explore-us", icon: Compass, label: "Explore Us" },
    { href: "/live-classes", icon: Radio, label: "Live Classes" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-transparent bg-white/92 backdrop-blur-xl">
        <Container>
          <div className="flex h-[70px] items-center gap-3 lg:h-[74px] xl:gap-6">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <AppLogo className="h-[62px] w-[138px] lg:h-[66px] lg:w-[146px]" />
            </div>

            {/* Desktop nav */}
            <nav className="hidden shrink-0 items-center gap-5 lg:flex xl:gap-7">
              {navLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap text-[16px] font-medium text-[#68798d] transition hover:text-[#377dff] xl:text-[17px]"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden min-w-[260px] flex-1 lg:block lg:max-w-[440px] xl:max-w-[560px] 2xl:max-w-[680px]"
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-[19px] w-[19px] -translate-y-1/2 text-[#93a3b5]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="What do you want to learn?"
                  className="h-[44px] w-full rounded-[5px] border border-[#dfe7f1] bg-white pl-12 pr-4 text-[16px] text-[#334155] outline-none transition placeholder:text-[#9aa8b8] focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
                />
              </div>
            </form>

            {/* Right controls */}
            <div className="ml-auto hidden shrink-0 items-center gap-3 lg:flex">
              {/* Cart button */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e3eaf3] text-[#52657a] transition hover:border-[#377dff] hover:bg-[#eef5ff] hover:text-[#377dff]"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#377dff] text-[10px] font-bold text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

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

            {/* Mobile: cart + hamburger */}
            <div className="ml-auto flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e9f3] text-[#52657a]"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#377dff] text-[10px] font-bold text-white">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e1e9f3] text-[#52657a]"
                aria-label="Toggle navigation"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div
            className={cn(
              "grid overflow-hidden transition-all duration-300 lg:hidden",
              mobileOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
            )}
          >
            <div className="min-h-0">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#93a3b5]" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="What do you want to learn?"
                    className="h-[46px] w-full rounded-xl border border-[#dfe7f1] bg-white pl-12 pr-4 text-[15px] text-[#334155] outline-none focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
                  />
                </div>
              </form>

              <div className="flex flex-col gap-3">
                {navLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#f5f8fc] px-4 text-[15px] font-semibold text-[#52657a]"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}

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
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
