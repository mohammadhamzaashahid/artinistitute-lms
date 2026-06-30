"use client";

import { Radio } from "lucide-react";

import PriceText from "@/components/common/PriceText";
import { Button } from "@/components/ui/button";

export default function MobileLiveClassActionBar({
  hasAccess,
  phase,
  price,
  onCheckout,
  checkoutLoading,
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e3eaf3] bg-white/95 px-4 py-3 shadow-[0_-18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-[520px] items-center gap-3">
        {hasAccess && phase === "LIVE" ? (
          <Button
            asChild
            className="h-11 w-full rounded-xl bg-[#e53e3e] text-sm font-bold text-white hover:bg-[#cc3636]"
          >
            <a href="#join">
              <Radio className="mr-2 h-4 w-4" />
              Join class now
            </a>
          </Button>
        ) : hasAccess ? (
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#00b887]">
              Seat confirmed
            </p>
            <p className="truncate text-sm font-bold text-[#20242a]">
              {phase === "ENDED" ? "This class has ended" : "Joining link unlocks when live"}
            </p>
          </div>
        ) : (
          <>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a9aad]">
                Seat price
              </p>
              <p className="truncate text-sm font-bold text-[#20242a]">
                <PriceText price={price} />
              </p>
            </div>

            <Button
              type="button"
              disabled={checkoutLoading || phase === "ENDED"}
              onClick={onCheckout}
              className="h-11 rounded-xl bg-[#377dff] px-5 text-sm font-bold text-white hover:bg-[#236bf1] disabled:opacity-60"
            >
              {phase === "ENDED" ? "Ended" : checkoutLoading ? "Opening..." : "Reserve seat"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
