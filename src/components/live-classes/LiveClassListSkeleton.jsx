import { Skeleton } from "@/components/ui/skeleton";

export default function LiveClassListSkeleton() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#dfe7f1] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
      <Skeleton className="aspect-[1.65/1] w-full rounded-none" />

      <div className="p-5">
        <Skeleton className="h-6 w-[100px] rounded-full" />
        <Skeleton className="mt-4 h-6 w-11/12" />
        <Skeleton className="mt-2 h-6 w-8/12" />

        <div className="mt-5 flex items-center gap-3">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}
