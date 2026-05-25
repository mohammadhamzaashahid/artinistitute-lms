"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import Container from "@/components/common/Container";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-[480px] rounded-[28px] border border-[#e3eaf3] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#66788f] transition hover:text-[#377dff]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <ForgotPasswordForm
            onSuccess={(email) => {
              router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
            }}
          />
        </div>
      </Container>
    </section>
  );
}