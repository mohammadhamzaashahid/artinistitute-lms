"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/lib/hooks/useAuth";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email") ?? "";

  const resetMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromParams,
      otp: "",
      newPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      await resetMutation.mutateAsync(values);
      router.push("/");
    } catch {}
  }

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

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <h1 className="mt-5 text-[34px] font-bold tracking-[-0.055em] text-[#20242a]">
            Create new password
          </h1>

          <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
            Enter the OTP sent to your email and choose a new secure password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <Field
              label="Email"
              icon={Mail}
              error={errors.email?.message}
              inputProps={register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="student@example.com"
            />

            <div>
              <label className="mb-2 block text-sm font-bold text-[#20242a]">
                OTP code
              </label>

              <input
                {...register("otp", {
                  required: "OTP is required",
                })}
                inputMode="numeric"
                className="h-13 w-full rounded-xl border border-[#dfe7f1] px-4 text-center text-[22px] font-bold tracking-[0.35em] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
                placeholder="000000"
              />

              {errors.otp ? (
                <p className="mt-1.5 text-sm font-medium text-red-500">
                  {errors.otp.message}
                </p>
              ) : null}
            </div>

            <Field
              label="New password"
              icon={Lock}
              type="password"
              error={errors.newPassword?.message}
              inputProps={register("newPassword", {
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                  message: "Must include uppercase, lowercase, and a number",
                },
              })}
              placeholder="Minimum 8 characters"
            />

            <Button
              type="submit"
              disabled={resetMutation.isPending}
              className="h-12 w-full rounded-xl bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
            >
              {resetMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                "Reset password"
              )}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}

function ResetPasswordFallback() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-[480px] rounded-[28px] border border-[#e3eaf3] bg-white p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-[#377dff]" />
          <p className="mt-4 text-sm font-semibold text-[#66788f]">
            Loading reset form...
          </p>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  error,
  inputProps,
  type = "text",
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-[#20242a]">
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa8b8]" />
        <input
          type={type}
          {...inputProps}
          className="h-12 w-full rounded-xl border border-[#dfe7f1] pl-12 pr-4 text-[15px] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
          placeholder={placeholder}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-sm font-medium text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
