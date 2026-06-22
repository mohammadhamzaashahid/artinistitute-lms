"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Package, ShoppingBag } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePlaceBookOrder } from "@/lib/hooks/useBooks";
import { useAuthStore } from "@/lib/store/auth.store";

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

export default function BookOrderModal({ open, onOpenChange, book }) {
  const user = useAuthStore((state) => state.user);
  const { mutateAsync, isPending } = usePlaceBookOrder();

  const defaultName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "";
  const defaultEmail = user?.email || "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      deliveryName: defaultName,
      deliveryEmail: defaultEmail,
      deliveryAddress: "",
      quantity: 1,
      note: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        deliveryName: defaultName,
        deliveryEmail: defaultEmail,
        deliveryAddress: "",
        quantity: 1,
        note: "",
      });
    }
  }, [open, defaultName, defaultEmail, reset]);

  async function onSubmit(values) {
    await mutateAsync({
      bookId: book?.id,
      payload: {
        deliveryName: values.deliveryName.trim(),
        deliveryEmail: values.deliveryEmail.trim(),
        deliveryAddress: values.deliveryAddress.trim(),
        quantity: Number(values.quantity) || 1,
        note: values.note?.trim() || undefined,
      },
    });
    onOpenChange(false);
  }

  const priceLabel = formatBookPrice(book);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] w-full max-w-[520px] overflow-y-auto rounded-3xl p-0">
        {/* Header */}
        <DialogHeader className="border-b border-[#f0f4fb] px-6 pb-5 pt-6">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <DialogTitle className="text-[22px] font-bold tracking-[-0.04em] text-[#20242a]">
            Place your order
          </DialogTitle>
          <DialogDescription className="mt-1 text-[14px] text-[#66788f]">
            Fill in your delivery details. We'll process and ship your book shortly.
          </DialogDescription>
        </DialogHeader>

        {/* Book summary */}
        <div className="mx-6 mt-5 flex items-start gap-4 rounded-2xl bg-[#f8fbff] px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5ff] text-[#377dff]">
            <Package className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-bold text-[#20242a]">
              {book?.title}
            </p>
            <p className="mt-0.5 text-[13px] font-semibold text-[#377dff]">
              {priceLabel}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 pt-4">
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deliveryName" className="text-[13px] font-semibold text-[#334155]">
                  Full name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deliveryName"
                  placeholder="Your full name"
                  className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                  disabled={isPending}
                  {...register("deliveryName", { required: "Name is required" })}
                />
                {errors.deliveryName && (
                  <p className="text-[12px] text-red-500">{errors.deliveryName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryEmail" className="text-[13px] font-semibold text-[#334155]">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deliveryEmail"
                  type="email"
                  placeholder="your@email.com"
                  className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                  disabled={isPending}
                  {...register("deliveryEmail", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
                  })}
                />
                {errors.deliveryEmail && (
                  <p className="text-[12px] text-red-500">{errors.deliveryEmail.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryAddress" className="text-[13px] font-semibold text-[#334155]">
                Delivery address <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="deliveryAddress"
                placeholder="Street, city, country…"
                rows={3}
                className="rounded-xl border-[#dfe7f1] text-[15px] leading-6 focus:border-[#377dff] focus:ring-[#377dff]/10"
                disabled={isPending}
                {...register("deliveryAddress", { required: "Address is required" })}
              />
              {errors.deliveryAddress && (
                <p className="text-[12px] text-red-500">{errors.deliveryAddress.message}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-[13px] font-semibold text-[#334155]">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                  disabled={isPending}
                  {...register("quantity", { min: 1, max: 10 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="note" className="text-[13px] font-semibold text-[#334155]">
                  Note (optional)
                </Label>
                <Input
                  id="note"
                  placeholder="Any special requests…"
                  className="h-11 rounded-xl border-[#dfe7f1] text-[15px] focus:border-[#377dff] focus:ring-[#377dff]/10"
                  disabled={isPending}
                  {...register("note")}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-xl border-[#dfe7f1] px-6 text-[15px] font-semibold text-[#52657a]"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 rounded-xl bg-[#377dff] px-8 text-[15px] font-bold text-white shadow-[0_10px_24px_rgba(55,125,255,0.25)] hover:bg-[#236bf1]"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing order…
                </>
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Place order
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
