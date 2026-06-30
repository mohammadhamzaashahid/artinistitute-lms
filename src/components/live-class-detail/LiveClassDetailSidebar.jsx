"use client";

import { CalendarPlus, CheckCircle2, Radio, ShieldCheck, Video } from "lucide-react";

import LiveClassImage from "@/components/live-classes/LiveClassImage";
import PriceText from "@/components/common/PriceText";
import { Button } from "@/components/ui/button";
import { buildGoogleCalendarUrl, formatTimeUntil } from "@/lib/utils/liveClass";
import { cn } from "@/lib/utils/cn";

export default function LiveClassDetailSidebar({
  liveClass,
  hasAccess,
  phase,
  price,
  onCheckout,
  checkoutLoading,
}) {
  const calendarUrl = buildGoogleCalendarUrl(liveClass);
  const startsIn = formatTimeUntil(liveClass?.startDate);

  return (
    <div className="overflow-hidden rounded-[5px] border border-[#dfe7f1] bg-white shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
      <div className="p-2">
        <LiveClassImage
          liveClass={liveClass}
          index={0}
          sizes="(max-width: 1024px) 100vw, 390px"
          className="aspect-[16/9] rounded-[4px]"
        />
      </div>

      <div className="space-y-4 px-5 py-6 sm:px-7">
        {hasAccess ? (
          <AccessGrantedActions
            liveClass={liveClass}
            phase={phase}
            calendarUrl={calendarUrl}
            startsIn={startsIn}
          />
        ) : (
          <>
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-[#8a9aad]">
                Seat price
              </span>
              <span className="text-[24px] font-bold tracking-[-0.03em] text-[#20242a]">
                <PriceText price={price} />
              </span>
            </div>

            <Button
              type="button"
              onClick={onCheckout}
              disabled={checkoutLoading || phase === "ENDED"}
              className="h-[58px] w-full rounded-[5px] bg-[#377dff] text-[17px] font-bold text-white hover:bg-[#236bf1] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === "ENDED"
                ? "Class has ended"
                : checkoutLoading
                  ? "Opening checkout..."
                  : "Reserve your seat"}
            </Button>

            {phase !== "ENDED" ? (
              <p className="text-center text-[13px] font-medium leading-6 text-[#66788f]">
                {startsIn ? `Starts in ${startsIn}.` : "Starts soon."} The joining link
                unlocks right here after payment.
              </p>
            ) : null}

            <div className="flex items-center justify-center gap-2 border-t border-[#f1f5fb] pt-4 text-[12px] font-semibold text-[#8a9aad]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secured by Stripe · 256-bit SSL encryption
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AccessGrantedActions({ liveClass, phase, calendarUrl, startsIn }) {
  if (phase === "LIVE") {
    return (
      <>
        <a
          href={liveClass?.joiningLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex h-[58px] w-full items-center justify-center gap-2 rounded-[5px] bg-[#e53e3e] text-[17px] font-bold text-white transition hover:bg-[#cc3636]",
            !liveClass?.joiningLink && "pointer-events-none opacity-60"
          )}
        >
          <Radio className="h-5 w-5" />
          Join class now
        </a>
        <p className="text-center text-[13px] font-medium leading-6 text-[#e53e3e]">
          This session is live right now.
        </p>
      </>
    );
  }

  if (phase === "ENDED") {
    return (
      <div className="space-y-3 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4f7fb] text-[#66788f]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="text-[15px] font-bold text-[#20242a]">This class has ended</p>
        <p className="text-[13px] leading-6 text-[#66788f]">
          You had full access to this session as a registered attendee.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-[10px] bg-[#e8fbf5] px-4 py-3 text-center">
        <p className="flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#00b887]">
          <CheckCircle2 className="h-4 w-4" />
          Your seat is confirmed
        </p>
        {startsIn ? (
          <p className="mt-0.5 text-[12px] text-[#0c8d6c]">Starts in {startsIn}</p>
        ) : null}
      </div>

      <Button
        disabled
        className="h-[58px] w-full cursor-not-allowed rounded-[5px] bg-[#eef5ff] text-[16px] font-bold text-[#377dff] opacity-90"
      >
        <Video className="mr-2 h-5 w-5" />
        Joining link unlocks when live
      </Button>

      {calendarUrl ? (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[5px] bg-[#eaf1ff] text-[15px] font-bold text-[#377dff] transition hover:bg-[#dfeaff]"
        >
          <CalendarPlus className="h-4.5 w-4.5" />
          Add to calendar
        </a>
      ) : null}
    </>
  );
}
