"use client";

import { useState } from "react";
import { Headphones, Lock, Package, ShoppingBag, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import BookOrderModal from "@/components/books/BookOrderModal";
import { useAuthStore } from "@/lib/store/auth.store";
import { useCartStore } from "@/lib/store/cart.store";

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

export default function BookDetailSidebar({ book, hasAccess, onSignInClick }) {
  const [orderOpen, setOrderOpen] = useState(false);
  const isLoggedIn = useAuthStore((s) => Boolean(s.user && s.accessToken));
  const addToCart = useCartStore((s) => s.addItem);
  const inCart = useCartStore((s) => s.items.some((i) => i.id === book?.id));

  const isFree = Number(book?.price ?? 0) === 0;
  const priceLabel = formatBookPrice(book);
  const audioCount = book?.audioFiles?.length ?? 0;
  const freeCount = book?.audioFiles?.filter((a) => a.isPreviewFree)?.length ?? 0;

  function handleOrder() {
    if (!isLoggedIn) {
      onSignInClick?.();
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
      <div className="sticky top-[94px] rounded-2xl border border-[#e3eaf3] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        {/* Price */}
        <div className="mb-5">
          <p className="text-[36px] font-bold tracking-[-0.04em] text-[#20242a]">
            {priceLabel}
          </p>
          {!isFree && (
            <p className="mt-1 text-[13px] text-[#8a9aad]">
              One-time purchase · Physical delivery
            </p>
          )}
        </div>

        {/* CTA buttons */}
        {hasAccess ? (
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center">
              <p className="text-[14px] font-bold text-emerald-700">
                ✓ You already own this book
              </p>
              <p className="mt-0.5 text-[12px] text-emerald-600">
                All audio tracks are unlocked
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleOrder}
              className="h-11 w-full rounded-xl border-[#dfe7f1] text-[15px] font-semibold text-[#377dff] hover:border-[#377dff] hover:bg-[#eef5ff]"
            >
              <Package className="mr-2 h-4 w-4" />
              Order another copy
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleOrder}
              className="h-13 w-full rounded-xl bg-[#377dff] text-[16px] font-bold text-white shadow-[0_10px_28px_rgba(55,125,255,0.28)] hover:bg-[#236bf1]"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              {isLoggedIn ? "Order now" : "Sign in to order"}
            </Button>

            {!isFree && (
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
          </div>
        )}

        {/* What you get */}
        <div className="mt-6 border-t border-[#f0f4fb] pt-5">
          <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#8a9aad]">
            What's included
          </p>
          <ul className="space-y-2.5">
            {[
              { icon: Package, label: "Physical printed book" },
              {
                icon: Headphones,
                label:
                  audioCount > 0
                    ? `${audioCount} audio track${audioCount !== 1 ? "s" : ""}`
                    : "Full audio library",
              },
              {
                icon: freeCount > 0 ? Headphones : Lock,
                label:
                  freeCount > 0
                    ? `${freeCount} free preview track${freeCount !== 1 ? "s" : ""}`
                    : "Audio access after order",
              },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-[14px] text-[#52657a]">
                <Icon className="h-4 w-4 shrink-0 text-[#377dff]" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Audio access note */}
        {!hasAccess && audioCount > 0 && (
          <div className="mt-5 rounded-xl bg-[#f8fbff] px-4 py-3.5">
            <p className="text-[12.5px] leading-5 text-[#66788f]">
              <span className="font-bold text-[#20242a]">Audio access:</span>{" "}
              Unlocked automatically once your order is processed by our team.
            </p>
          </div>
        )}
      </div>

      <BookOrderModal
        open={orderOpen}
        onOpenChange={setOrderOpen}
        book={book}
      />
    </>
  );
}
