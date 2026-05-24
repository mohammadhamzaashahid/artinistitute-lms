import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No results found",
  description = "Try changing your search or selected category.",
}) {
  return (
    <div className="rounded-3xl border border-dashed border-[#dbe5f0] bg-[#f8fbff] px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
        <SearchX className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-[#20242a]">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-[15px] leading-6 text-[#66788f]">
        {description}
      </p>
    </div>
  );
}