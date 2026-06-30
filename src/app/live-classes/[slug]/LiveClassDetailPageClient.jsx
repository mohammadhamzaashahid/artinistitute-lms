"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AuthModal from "@/components/auth/AuthModal";
import Container from "@/components/common/Container";
import LiveClassImage from "@/components/live-classes/LiveClassImage";
import LiveClassDetailHeader from "@/components/live-class-detail/LiveClassDetailHeader";
import LiveClassDetailSidebar from "@/components/live-class-detail/LiveClassDetailSidebar";
import LiveClassDetailSkeleton from "@/components/live-class-detail/LiveClassDetailSkeleton";
import MobileLiveClassActionBar from "@/components/live-class-detail/MobileLiveClassActionBar";
import { useLiveClassDetail } from "@/lib/hooks/useLiveClasses";
import { useAuthStore } from "@/lib/store/auth.store";
import {
  canUserAccessLiveClass,
  getLiveClassPhase,
  getLiveClassPrice,
  normalizeLiveClassDetail,
} from "@/lib/utils/liveClass";

export default function LiveClassDetailPageClient({ slug }) {
  const [authOpen, setAuthOpen] = useState(false);

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isLoggedIn = Boolean(user && accessToken);

  const liveClassQuery = useLiveClassDetail(slug);

  const liveClass = normalizeLiveClassDetail(liveClassQuery.data);
  const price = getLiveClassPrice(liveClass);
  const hasAccess = canUserAccessLiveClass(liveClass);
  const phase = getLiveClassPhase(liveClass);

  function handleCheckout() {
    if (!liveClass?.slug || !price?.id) {
      toast.error("Live class price is not available yet.");
      return;
    }

    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }

    router.push(`/live-classes/checkout?slug=${liveClass.slug}&priceId=${price.id}`);
  }

  if (liveClassQuery.isLoading) {
    return <LiveClassDetailSkeleton />;
  }

  if (liveClassQuery.isError || !liveClass) {
    return (
      <section className="bg-white py-16">
        <Container>
          <div className="mx-auto max-w-xl rounded-[28px] border border-[#e3eaf3] bg-white p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.05)]">
            <h1 className="text-2xl font-bold tracking-[-0.04em] text-[#20242a]">
              Live class not found
            </h1>
            <p className="mt-2 text-[#66788f]">
              The live class you are looking for is not available.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white pb-20 pt-6 sm:pt-10">
        <Container>
          {!user?.emailVerifiedAt && isLoggedIn ? (
            <div className="mb-8 rounded-[5px] bg-[#e8fbf5] px-5 py-4 text-[15px] font-medium text-[#00b887] sm:text-[17px]">
              Please confirm your email to keep your account secure.{" "}
              <button className="font-bold hover:underline">Resend email.</button>
            </div>
          ) : null}

          <LiveClassImage
            liveClass={liveClass}
            priority
            sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 64px), 1280px"
            className="mb-10 aspect-1885/670 w-full rounded-[10px] border border-[#dfe7f1] shadow-[0_18px_55px_rgba(15,23,42,0.08)] lg:mb-14"
          />

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_390px] xl:gap-14">
            <main className="min-w-0">
              <LiveClassDetailHeader liveClass={liveClass} />

              <div className="mt-12 lg:hidden">
                <LiveClassDetailSidebar
                  liveClass={liveClass}
                  hasAccess={hasAccess}
                  phase={phase}
                  price={price}
                  onCheckout={handleCheckout}
                  checkoutLoading={false}
                />
              </div>
            </main>

            <aside className="hidden lg:block">
              <div className="sticky top-[96px]">
                <LiveClassDetailSidebar
                  liveClass={liveClass}
                  hasAccess={hasAccess}
                  phase={phase}
                  price={price}
                  onCheckout={handleCheckout}
                  checkoutLoading={false}
                />
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <MobileLiveClassActionBar
        hasAccess={hasAccess}
        phase={phase}
        price={price}
        onCheckout={handleCheckout}
        checkoutLoading={false}
      />

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
}
