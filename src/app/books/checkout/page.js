"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";

import Container from "@/components/common/Container";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/store/cart.store";
import { usePlaceBookOrder } from "@/lib/hooks/useBooks";
import { useAuthStore } from "@/lib/store/auth.store";

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

export default function BooksCheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}

function CheckoutContent() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);
  const { mutateAsync, isPending } = usePlaceBookOrder();
  const [success, setSuccess] = useState(false);
  const [orderedCount, setOrderedCount] = useState(0);

  const defaultName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "";
  const defaultEmail = user?.email || "";

  const primaryCurrency = items[0]?.currency || "AED";
  const total = items.reduce(
    (sum, i) => sum + Number(i.price || 0) * (i.quantity || 1),
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryName: defaultName,
      deliveryEmail: defaultEmail,
      deliveryPhone: "",
      deliveryAddress: "",
      deliveryCity: "",
      deliveryNotes: "",
    },
  });

  async function onSubmit(values) {
    let count = 0;
    for (const item of items) {
      await mutateAsync({
        bookId: item.id,
        payload: {
          deliveryName: values.deliveryName.trim(),
          deliveryEmail: values.deliveryEmail.trim(),
          deliveryPhone: values.deliveryPhone.trim(),
          deliveryAddress: values.deliveryAddress.trim(),
          deliveryCity: values.deliveryCity.trim(),
          quantity: item.quantity || 1,
          deliveryNotes: values.deliveryNotes?.trim() || undefined,
        },
      });
      count += 1;
    }
    setOrderedCount(count);
    clearCart();
    setSuccess(true);
  }

  if (success) {
    return (
      <section className="bg-white pb-20 pt-14">
        <Container>
          <div className="mx-auto max-w-[540px] text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h1 className="mt-6 text-[34px] font-bold tracking-[-0.045em] text-[#20242a]">
              Order placed!
            </h1>
            <p className="mt-3 text-[17px] leading-7 text-[#66788f]">
              We&apos;ve received your{" "}
              {orderedCount === 1
                ? "order"
                : `${orderedCount} orders`}
              . You&apos;ll get a confirmation email shortly and audio access once
              we process your order.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="h-12 rounded-xl bg-[#377dff] px-8 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(55,125,255,0.25)] hover:bg-[#236bf1]"
              >
                <Link href="/dashboard/books">View my orders</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl border-[#dfe7f1] px-8 text-[15px] font-semibold text-[#52657a]"
              >
                <Link href="/books">Continue browsing</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="bg-white pb-20 pt-14">
        <Container>
          <div className="mx-auto max-w-[480px] text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f7fb] text-[#8a9aad]">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h1 className="mt-5 text-[28px] font-bold text-[#20242a]">
              Your cart is empty
            </h1>
            <p className="mt-2 text-[15px] text-[#66788f]">
              Add books before checking out.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-xl bg-[#377dff] px-8 font-bold text-white hover:bg-[#236bf1]"
            >
              <Link href="/books">Browse books</Link>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white pb-20 pt-8 sm:pt-12">
      <Container>
        {/* Back */}
        <Link
          href="/books"
          className="mb-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#66788f] transition hover:text-[#377dff]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to books
        </Link>

        <h1 className="mb-8 text-[32px] font-bold tracking-[-0.04em] text-[#20242a] sm:text-[40px]">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Form */}
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
            <section className="rounded-2xl border border-[#e3eaf3] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:p-8">
              <h2 className="mb-6 text-[20px] font-bold text-[#20242a]">
                Delivery details
              </h2>

              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-[#334155]">
                      Full name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Your full name"
                      className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                      disabled={isPending}
                      {...register("deliveryName", { required: "Name is required" })}
                    />
                    {errors.deliveryName && (
                      <p className="text-[12px] text-red-500">
                        {errors.deliveryName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-[#334155]">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                      disabled={isPending}
                      {...register("deliveryEmail", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Invalid email",
                        },
                      })}
                    />
                    {errors.deliveryEmail && (
                      <p className="text-[12px] text-red-500">
                        {errors.deliveryEmail.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-[#334155]">
                      Phone number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+971 50 000 0000"
                      className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                      disabled={isPending}
                      {...register("deliveryPhone", {
                        required: "Phone number is required",
                        minLength: { value: 7, message: "Enter a valid phone number" },
                      })}
                    />
                    {errors.deliveryPhone && (
                      <p className="text-[12px] text-red-500">
                        {errors.deliveryPhone.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[13px] font-semibold text-[#334155]">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Dubai"
                      className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                      disabled={isPending}
                      {...register("deliveryCity", {
                        required: "City is required",
                        minLength: { value: 2, message: "Enter a valid city" },
                      })}
                    />
                    {errors.deliveryCity && (
                      <p className="text-[12px] text-red-500">
                        {errors.deliveryCity.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-[#334155]">
                    Delivery address <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    placeholder="Street, apartment, building…"
                    rows={3}
                    className="rounded-xl border-[#dfe7f1] text-[15px] leading-6 focus:border-[#377dff] focus:ring-[#377dff]/10"
                    disabled={isPending}
                    {...register("deliveryAddress", {
                      required: "Address is required",
                      minLength: { value: 5, message: "Please enter a full address" },
                    })}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-[12px] text-red-500">
                      {errors.deliveryAddress.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-[13px] font-semibold text-[#334155]">
                    Order notes (optional)
                  </Label>
                  <Input
                    placeholder="Any special instructions…"
                    className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                    disabled={isPending}
                    {...register("deliveryNotes")}
                  />
                </div>
              </div>
            </section>

            <Button
              type="submit"
              disabled={isPending}
              className="mt-6 h-14 w-full rounded-xl bg-[#377dff] text-[17px] font-bold text-white shadow-[0_12px_30px_rgba(55,125,255,0.28)] hover:bg-[#236bf1] lg:hidden"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Placing order…
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Place order · {formatPrice(total, primaryCurrency)}
                </>
              )}
            </Button>
          </form>

          {/* Order summary */}
          <aside>
            <div className="rounded-2xl border border-[#e3eaf3] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
              <h2 className="mb-5 text-[18px] font-bold text-[#20242a]">
                Order summary
              </h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-xl bg-[#f1f5f9]">
                      {item.coverUrl ? (
                        <Image
                          src={item.coverUrl}
                          alt={item.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BookOpen className="h-5 w-5 text-[#8a9aad]" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-[#20242a]">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[12px] text-[#8a9aad]">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                    <p className="shrink-0 text-[14px] font-bold text-[#20242a]">
                      {formatPrice(
                        Number(item.price || 0) * (item.quantity || 1),
                        item.currency
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-[#f0f4fb]" />

              <div className="flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#66788f]">
                  Total
                </span>
                <span className="text-[22px] font-bold text-[#20242a]">
                  {formatPrice(total, primaryCurrency)}
                </span>
              </div>

              <div className="mt-2 flex items-start gap-2 rounded-xl bg-[#f8fbff] px-4 py-3">
                <Package className="mt-0.5 h-4 w-4 shrink-0 text-[#377dff]" />
                <p className="text-[12.5px] leading-5 text-[#66788f]">
                  Physical delivery + audio access unlocked after order processing.
                </p>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={isPending}
                onClick={handleSubmit(onSubmit)}
                className="mt-5 hidden h-13 w-full rounded-xl bg-[#377dff] text-[16px] font-bold text-white shadow-[0_10px_28px_rgba(55,125,255,0.25)] hover:bg-[#236bf1] lg:flex lg:items-center lg:justify-center"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Placing order…
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Place order
                  </>
                )}
              </Button>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
