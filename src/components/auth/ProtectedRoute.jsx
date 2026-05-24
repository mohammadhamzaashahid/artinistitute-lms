"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store/auth.store";

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);

  if (!isAuthReady) {
    return (
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-md rounded-[24px] border border-[#e3eaf3] p-6 text-center shadow-[0_18px_45px_rgba(15,23,42,0.04)] sm:rounded-[28px] sm:p-8">
            <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-[#eef5ff]" />
            <p className="mt-4 text-sm font-semibold text-[#66788f]">
              Checking your session...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (!user || !accessToken) {
    return (
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-md rounded-[24px] border border-[#e3eaf3] p-6 text-center shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:rounded-[28px] sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
              <LockKeyhole className="h-7 w-7" />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-[-0.04em] text-[#20242a]">
              Login required
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#66788f]">
              Please sign in to view your profile, courses, subscriptions, and
              billing details.
            </p>

            <Button asChild className="mt-6 h-11 w-full rounded-xl bg-[#377dff] sm:w-auto sm:px-6">
              <Link href="/">Go to home</Link>
            </Button>
          </div>
        </Container>
      </section>
    );
  }

  return children;
}