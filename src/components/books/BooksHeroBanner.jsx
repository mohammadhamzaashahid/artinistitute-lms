import Image from "next/image";
import { BookOpen } from "lucide-react";

export default function BooksHeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f1f3d] via-[#162952] to-[#0b1629] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#377dff]/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-600/8 blur-2xl" />
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex-1">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-[12px] font-bold uppercase tracking-widest text-blue-300">
            <BookOpen className="h-3.5 w-3.5" />
            printed Books &audio Library
          </p>

          <h1 className="text-[36px] font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-[48px] lg:text-[56px]">
            Deepen your learning
            <br />
            <span className="text-blue-400">beyond the screen</span>
          </h1>

          <p className="mt-4 max-w-xl text-[16px] leading-7 text-slate-400 sm:text-[18px]">
            explore our curated collection of printed bookeach paired with a full
            audio library so you can learn while commutin exercising, or winding down.
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-[13px] text-slate-400">
            {[
              "Physical book delivered",
              "Full audio access",
              "Free chapter previews",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-900" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative h-[200px] w-[280px]">
            <Image
              src="/assets/explore/Books.png"
              alt="Books collection"
              fill
              priority
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
