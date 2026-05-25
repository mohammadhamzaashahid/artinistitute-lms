"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, XCircle } from "lucide-react";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<PaymentCancelFallback />}>
      <PaymentCancelContent />
    </Suspense>
  );
}

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  return (
    <section className="min-h-screen bg-[#f6f9ff] py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-[28px] border border-[#e3eaf3] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
            <div className="px-8 py-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1f1]">
                <XCircle className="h-10 w-10 text-[#e53e3e]" strokeWidth={2} />
              </div>

              <h1 className="mt-5 text-[26px] font-bold tracking-[-0.05em] text-[#20242a] sm:text-[30px]">
                Payment cancelled
              </h1>

              <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
                Your payment was not completed and you have not been charged. You
                can try again whenever you&apos;re ready.
              </p>

              <div className="mt-8 space-y-3">
                {slug ? (
                  <Button
                    asChild
                    className="h-[52px] w-full rounded-[10px] bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
                  >
                    <Link href={`/courses/${slug}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Return to course
                    </Link>
                  </Button>
                ) : null}

                <Button
                  asChild
                  variant="ghost"
                  className="h-11 w-full rounded-[10px] text-[14px] font-bold text-[#66788f] hover:bg-[#f4f7fb] hover:text-[#20242a]"
                >
                  <Link href="/courses">Browse courses</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[13px] leading-6 text-[#8a9aad]">
            Having trouble?{" "}
            <Link href="/" className="font-bold text-[#377dff] hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

function PaymentCancelFallback() {
  return (
    <section className="min-h-screen bg-[#f6f9ff] py-20">
      <Container>
        <div className="mx-auto max-w-sm text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#377dff]" />
          <p className="mt-4 text-sm font-semibold text-[#66788f]">
            Loading payment status...
          </p>
        </div>
      </Container>
    </section>
  );
}
