import { CalendarClock, CheckCircle2, Radio } from "lucide-react";
import { getLiveClassPhase, getLiveClassPhaseLabel } from "@/lib/utils/liveClass";
import { cn } from "@/lib/utils/cn";

const STYLES = {
  UPCOMING: { bg: "bg-[#eef5ff]", text: "text-[#377dff]", icon: CalendarClock },
  LIVE: { bg: "bg-[#fff1f1]", text: "text-[#e53e3e]", icon: Radio },
  ENDED: { bg: "bg-[#f4f7fb]", text: "text-[#66788f]", icon: CheckCircle2 },
};

export default function LiveClassStatusBadge({ liveClass, className }) {
  const phase = getLiveClassPhase(liveClass);
  const { bg, text, icon: Icon } = STYLES[phase];
  const label = getLiveClassPhaseLabel(phase);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-extrabold",
        bg,
        text,
        className
      )}
    >
      {phase === "LIVE" ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e53e3e] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e53e3e]" />
        </span>
      ) : (
        <Icon className="h-3.5 w-3.5" />
      )}
      {label}
    </span>
  );
}
