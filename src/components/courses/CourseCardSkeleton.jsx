import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[5px] border border-[#e3eaf3] bg-white">
      <Skeleton className="aspect-[1.05/1] w-full rounded-none" />
      <div className="p-6 sm:p-7">
        <Skeleton className="h-7 w-4/5" />
        <Skeleton className="mt-3 h-7 w-3/5" />
        <div className="mt-6 flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}