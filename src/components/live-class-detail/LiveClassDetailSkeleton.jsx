import Container from "@/components/common/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function LiveClassDetailSkeleton() {
  return (
    <section className="bg-white pb-20 pt-10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px] xl:gap-14">
          <main>
            <Skeleton className="h-9 w-32 rounded-full" />

            <Skeleton className="mt-6 h-14 w-full max-w-[760px]" />
            <Skeleton className="mt-3 h-14 w-full max-w-[640px]" />

            <div className="mt-6 flex gap-6">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="mt-6 space-y-3">
              <Skeleton className="h-6 w-full max-w-[850px]" />
              <Skeleton className="h-6 w-full max-w-[760px]" />
              <Skeleton className="h-6 w-full max-w-[700px]" />
            </div>
          </main>

          <aside className="hidden lg:block">
            <div className="sticky top-[96px] overflow-hidden rounded-[5px] border border-[#e3eaf3] p-2">
              <Skeleton className="aspect-[16/9] rounded-[4px]" />
              <div className="space-y-5 p-5">
                <Skeleton className="h-[58px] rounded-[5px]" />
                <Skeleton className="h-[56px] rounded-[5px]" />
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
