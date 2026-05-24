"use client";

import PriceText from "@/components/common/PriceText";
import { Button } from "@/components/ui/button";

export default function MobileCourseActionBar({
  hasCourseAccess,
  hasFreePreview,
  primaryPrice,
  onStartListening,
  onCheckout,
  checkoutLoading,
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e3eaf3] bg-white/95 px-4 py-3 shadow-[0_-18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-[520px] items-center gap-3">
        {hasCourseAccess ? (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9aad]">
                Unlocked
              </p>
              <p className="truncate text-sm font-bold text-[#20242a]">
                Start learning now
              </p>
            </div>

            <Button
              type="button"
              onClick={onStartListening}
              className="h-11 rounded-xl bg-[#377dff] px-5 text-sm font-bold text-white hover:bg-[#236bf1]"
            >
              Listen
            </Button>
          </>
        ) : hasFreePreview ? (
          <>
            <Button
              type="button"
              onClick={onStartListening}
              variant="outline"
              className="h-11 flex-1 rounded-xl border-[#00b887] text-sm font-bold text-[#00b887] hover:bg-[#f0faf7]"
            >
              Preview free
            </Button>

            <Button
              type="button"
              disabled={checkoutLoading}
              onClick={onCheckout}
              className="h-11 flex-1 rounded-xl bg-[#377dff] text-sm font-bold text-white hover:bg-[#236bf1] disabled:opacity-60"
            >
              {checkoutLoading ? "Opening..." : "Unlock"}
            </Button>
          </>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9aad]">
                Course access
              </p>
              <p className="truncate text-sm font-bold text-[#20242a]">
                {primaryPrice ? <PriceText price={primaryPrice} /> : "Unlock course"}
              </p>
            </div>

            <Button
              type="button"
              disabled={checkoutLoading}
              onClick={onCheckout}
              className="h-11 rounded-xl bg-[#377dff] px-5 text-sm font-bold text-white hover:bg-[#236bf1] disabled:opacity-60"
            >
              {checkoutLoading ? "Opening..." : "Unlock"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
