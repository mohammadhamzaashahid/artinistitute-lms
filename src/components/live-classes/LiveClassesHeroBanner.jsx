import { Radio } from "lucide-react";

export default function LiveClassesHeroBanner() {
  return (
    <section className="overflow-hidden rounded-[5px] bg-gradient-to-br from-[#377dff] to-[#1a5ce6] px-7 py-10 text-white sm:px-12 sm:py-14">
      <div className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.18em] text-white/75">
        <Radio className="h-4 w-4" />
        Live classes
      </div>

      <h1 className="mt-3 max-w-xl text-[28px] font-bold leading-tight tracking-[-0.04em] sm:text-[36px]">
        Learn live with our instructors
      </h1>

      <p className="mt-3 max-w-xl text-[15px] leading-7 text-white/80 sm:text-[16px]">
        Reserve your seat in a scheduled session, get reminders before it starts,
        and join instantly the moment it goes live.
      </p>
    </section>
  );
}
