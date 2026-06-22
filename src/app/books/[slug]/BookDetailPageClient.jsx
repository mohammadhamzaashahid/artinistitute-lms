"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Package, ShoppingCart } from "lucide-react";

import Container from "@/components/common/Container";
import EmptyState from "@/components/common/EmptyState";
import BookCoverGallery from "@/components/books/BookCoverGallery";
import AudioFileList from "@/components/books/AudioFileList";
import BookDetailSidebar from "@/components/books/BookDetailSidebar";
import BookDetailSkeleton from "@/components/books/BookDetailSkeleton";
import BookOrderModal from "@/components/books/BookOrderModal";
import AuthModal from "@/components/auth/AuthModal";
import { useBookBySlug } from "@/lib/hooks/useBooks";
import { useAuthStore } from "@/lib/store/auth.store";
import { useCartStore } from "@/lib/store/cart.store";
import { Button } from "@/components/ui/button";

function formatBookPrice(book) {
  const price = Number(book?.price ?? 0);
  if (price === 0) return "Free";
  const currency = book?.currency || "AED";
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${currency} ${price}`;
  }
}

export default function BookDetailPageClient({ slug }) {
  const { data: book, isLoading, isError } = useBookBySlug(slug);
  const [authOpen, setAuthOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const isLoggedIn = useAuthStore((s) => Boolean(s.user && s.accessToken));
  const addToCart = useCartStore((s) => s.addItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.id === book?.id));

  const hasAccess = book?.access?.hasAccess ?? false;
  const audioFiles = book?.audioFiles ?? [];
  const coverImages = book?.coverImages ?? [];

  function handleSignIn() {
    setAuthOpen(true);
  }

  function handleOrder() {
    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }
    setOrderOpen(true);
  }

  function handleAddToCart() {
    if (!book) return;
    addToCart({
      id: book.id,
      slug: book.slug,
      title: book.title,
      price: Number(book.price ?? 0),
      currency: book.currency || "AED",
      coverUrl: book.coverImages?.[0]?.mediaAsset?.url || null,
    });
  }

  return (
    <>
      <div className="bg-white pb-20 pt-6 sm:pt-10">
        <Container>
          {/* Breadcrumb */}
          <Link
            href="/books"
            className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#66788f] transition hover:text-[#377dff]"
          >
            <ArrowLeft className="h-4 w-4" />
            All books
          </Link>

          {/* Loading */}
          {isLoading ? <BookDetailSkeleton /> : null}

          {/* Error */}
          {!isLoading && isError ? (
            <EmptyState
              title="Book not found"
              description="This book may not exist or is not published yet."
            />
          ) : null}

          {/* Content */}
          {!isLoading && !isError && book ? (
            <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)_300px] lg:gap-12 xl:gap-16">
              {/* Left: Cover gallery */}
              <div>
                <BookCoverGallery coverImages={coverImages} title={book.title} />
              </div>

              {/* Center: Info */}
              <div>
                {/* Tag */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef5ff] px-3 py-1 text-[12px] font-bold text-[#377dff]">
                    <BookOpen className="h-3.5 w-3.5" />
                    Printed Book
                  </span>
                  {hasAccess && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-bold text-emerald-700">
                      ✓ You own this
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-[32px] font-bold leading-[1.1] tracking-[-0.045em] text-[#20242a] sm:text-[40px] lg:text-[44px]">
                  {book.title}
                </h1>

                {/* Price (mobile/tablet) */}
                <p className="mt-4 text-[28px] font-bold text-[#377dff] lg:hidden">
                  {formatBookPrice(book)}
                </p>

                {/* Description */}
                {book.description ? (
                  <p className="mt-5 max-w-2xl whitespace-pre-line text-[16px] leading-7 text-[#52657a] sm:text-[17px] sm:leading-8">
                    {book.description}
                  </p>
                ) : null}

                {/* Mobile CTA */}
                <div className="mt-6 flex flex-col gap-3 lg:hidden">
                  {hasAccess ? (
                    <Button
                      variant="outline"
                      onClick={handleOrder}
                      className="h-11 w-full rounded-xl border-[#dfe7f1] text-[15px] font-semibold text-[#377dff] hover:border-[#377dff] hover:bg-[#eef5ff]"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Order another copy
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleOrder}
                        className="h-13 w-full rounded-xl bg-[#377dff] text-[16px] font-bold text-white shadow-[0_10px_28px_rgba(55,125,255,0.28)] hover:bg-[#236bf1]"
                      >
                        <Package className="mr-2 h-5 w-5" />
                        {isLoggedIn ? "Order now" : "Sign in to order"}
                      </Button>
                      {Number(book.price ?? 0) > 0 && (
                        <Button
                          variant="outline"
                          onClick={handleAddToCart}
                          disabled={inCart}
                          className="h-11 w-full rounded-xl border-[#dfe7f1] text-[15px] font-semibold text-[#377dff] hover:border-[#377dff] hover:bg-[#eef5ff]"
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {inCart ? "Added to cart" : "Add to cart"}
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-[#f0f4fb]" />

                {/* Audio files */}
                <AudioFileList
                  audioFiles={audioFiles}
                  bookId={book.id}
                  hasAccess={hasAccess}
                />

                {/* What's included blurb */}
                {audioFiles.length === 0 && (
                  <div className="rounded-2xl border border-[#e3eaf3] bg-[#f8fbff] p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#377dff]">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-[#20242a]">
                          Physical book
                        </p>
                        <p className="text-[13px] text-[#66788f]">
                          Audio tracks coming soon.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Sticky sidebar */}
              <div className="hidden lg:block">
                <BookDetailSidebar
                  book={book}
                  hasAccess={hasAccess}
                  onSignInClick={handleSignIn}
                />
              </div>
            </div>
          ) : null}
        </Container>
      </div>

      {/* Modals */}
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <BookOrderModal open={orderOpen} onOpenChange={setOrderOpen} book={book} />
    </>
  );
}
