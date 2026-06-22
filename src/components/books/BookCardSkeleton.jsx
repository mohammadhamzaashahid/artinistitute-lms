export default function BookCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e3eaf3] bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
      <div className="aspect-[3/4] animate-pulse bg-[#f1f5f9]" />
      <div className="p-5">
        <div className="h-5 w-4/5 animate-pulse rounded-lg bg-[#f1f5f9]" />
        <div className="mt-2 h-4 w-3/5 animate-pulse rounded-lg bg-[#f1f5f9]" />
        <div className="mt-5 h-3.5 w-2/5 animate-pulse rounded-lg bg-[#f1f5f9]" />
      </div>
    </div>
  );
}
