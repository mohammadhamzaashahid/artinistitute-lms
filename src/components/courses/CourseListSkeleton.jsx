import { Skeleton } from "@/components/ui/skeleton";

export default function CourseListSkeleton() {
  return (
    <div className="border-t border-[#e1e8f2] py-7 first:border-t-0 md:py-8">
      <div className="grid gap-5 md:grid-cols-[300px_1fr] md:gap-7 lg:grid-cols-[320px_1fr]">
        <Skeleton className="aspect-[1.18/1] w-full rounded-[5px] md:h-[238px]" />

        <div className="flex flex-col justify-center">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="mt-4 h-8 w-4/5" />
          <Skeleton className="mt-3 h-8 w-3/5" />
          <div className="mt-5 flex gap-3">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-7 w-20" />
          </div>
          <Skeleton className="mt-5 h-5 w-full" />
          <Skeleton className="mt-2 h-5 w-5/6" />
          <Skeleton className="mt-2 h-5 w-3/5" />
        </div>
      </div>
    </div>
  );
}