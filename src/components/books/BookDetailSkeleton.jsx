export default function BookDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)_300px] lg:gap-14">
        {/* Cover skeleton */}
        <div>
          <div className="aspect-[3/4] w-full max-w-[340px] rounded-2xl bg-[#f1f5f9]" />
          <div className="mt-3 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 w-10 rounded-lg bg-[#f1f5f9]" />
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="space-y-5">
          <div className="h-4 w-24 rounded-full bg-[#f1f5f9]" />
          <div className="h-10 w-5/6 rounded-xl bg-[#f1f5f9]" />
          <div className="h-7 w-3/6 rounded-xl bg-[#f1f5f9]" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-full rounded-lg bg-[#f1f5f9]" />
            ))}
            <div className="h-4 w-3/4 rounded-lg bg-[#f1f5f9]" />
          </div>

          <div className="mt-8 space-y-3 rounded-2xl border border-[#e3eaf3] p-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#f1f5f9]" />
                <div className="h-4 flex-1 rounded-lg bg-[#f1f5f9]" />
                <div className="h-4 w-12 rounded-lg bg-[#f1f5f9]" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div className="rounded-2xl border border-[#e3eaf3] p-6">
          <div className="h-10 w-3/4 rounded-xl bg-[#f1f5f9]" />
          <div className="mt-2 h-4 w-2/4 rounded-lg bg-[#f1f5f9]" />
          <div className="mt-5 h-13 rounded-xl bg-[#f1f5f9]" />
          <div className="mt-3 h-11 rounded-xl bg-[#f1f5f9]" />
          <div className="mt-6 space-y-3 border-t border-[#f0f4fb] pt-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 w-3/4 rounded-lg bg-[#f1f5f9]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
