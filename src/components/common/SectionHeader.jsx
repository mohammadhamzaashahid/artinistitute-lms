import { cn } from "@/lib/utils/cn";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#377dff]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-[32px] font-bold tracking-[-0.045em] text-[#20242a] sm:text-[40px] lg:text-[44px]">
        {title}
      </h2>

      {description ? (
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#66788f] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}