"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart.store";

function formatPrice(amount, currency = "AED") {
  const num = Number(amount || 0);
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

export default function CartDrawer({ open, onOpenChange }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalItems = useCartStore((s) => s.totalItems());

  const primaryCurrency = items[0]?.currency || "AED";
  const total = items.reduce(
    (sum, i) => sum + Number(i.price || 0) * (i.quantity || 1),
    0
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-dvh w-full max-w-[420px] flex-col gap-0 p-0"
      >
        {/* Header */}
        <SheetHeader className="flex-row items-center justify-between border-b border-[#f0f4fb] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef5ff] text-[#377dff]">
              <ShoppingCart className="h-4.5 w-4.5" />
            </div>
            <SheetTitle className="text-[18px] font-bold text-[#20242a]">
              Cart
              {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-[#377dff] px-2 py-0.5 text-[11px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </SheetTitle>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e3eaf3] text-[#66788f] transition hover:bg-[#f4f7fb] hover:text-[#20242a]"
          >
            <X className="h-4 w-4" />
          </button>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f7fb] text-[#8a9aad]">
                <ShoppingCart className="h-8 w-8" />
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#20242a]">
                  Your cart is empty
                </p>
                <p className="mt-1 text-[13px] text-[#66788f]">
                  Add books to start your order.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="mt-2 h-10 rounded-xl border-[#dfe7f1] px-5 text-[14px] font-semibold text-[#377dff]"
                onClick={() => onOpenChange(false)}
              >
                <Link href="/books">Browse books</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onQtyChange={(q) => updateQuantity(item.id, q)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#f0f4fb] px-5 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-[#66788f]">
                Subtotal
              </span>
              <span className="text-[20px] font-bold text-[#20242a]">
                {formatPrice(total, primaryCurrency)}
              </span>
            </div>

            <Button
              asChild
              className="h-13 w-full rounded-xl bg-[#377dff] text-[16px] font-bold text-white shadow-[0_10px_28px_rgba(55,125,255,0.25)] hover:bg-[#236bf1]"
              onClick={() => onOpenChange(false)}
            >
              <Link href="/books/checkout">Proceed to checkout</Link>
            </Button>

            <p className="mt-3 text-center text-[12px] text-[#8a9aad]">
              You'll add delivery details at checkout.
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItem({ item, onRemove, onQtyChange }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#e3eaf3] bg-white p-4">
      {/* Cover thumbnail */}
      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f1f5f9]">
        {item.coverUrl ? (
          <Image
            src={item.coverUrl}
            alt={item.title}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-6 w-6 text-[#8a9aad]" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[14px] font-bold leading-snug text-[#20242a]">
          {item.title}
        </p>
        <p className="mt-1 text-[14px] font-bold text-[#377dff]">
          {Number(item.price || 0) === 0
            ? "Free"
            : `${formatPrice(item.price, item.currency)}`}
        </p>

        <div className="mt-3 flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center rounded-xl border border-[#e3eaf3] bg-[#f8fbff]">
            <button
              type="button"
              onClick={() => onQtyChange((item.quantity || 1) - 1)}
              className="flex h-8 w-8 items-center justify-center text-[#8a9aad] transition hover:text-[#20242a]"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-7 text-center text-[14px] font-bold text-[#20242a]">
              {item.quantity || 1}
            </span>
            <button
              type="button"
              onClick={() => onQtyChange((item.quantity || 1) + 1)}
              className="flex h-8 w-8 items-center justify-center text-[#8a9aad] transition hover:text-[#20242a]"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#b0bfd0] transition hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
