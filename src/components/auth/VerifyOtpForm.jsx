"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, MailCheck, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  useResendEmailOtp,
  useVerifyEmailOtp,
} from "@/lib/hooks/useAuth";

export default function VerifyOtpForm({ email, onBack, onVerified }) {
  const verifyMutation = useVerifyEmailOtp();
  const resendMutation = useResendEmailOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(values) {
    await verifyMutation.mutateAsync({
      email,
      otp: values.otp,
    });

    onVerified?.();
  }

  async function handleResend() {
    if (!email) return;
    await resendMutation.mutateAsync({ email });
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#66788f] transition hover:text-[#377dff]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5ff] text-[#377dff]">
        <MailCheck className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-[32px] font-bold tracking-[-0.05em] text-[#20242a]">
        Verify your email
      </h2>

      <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
        Enter the verification OTP sent to{" "}
        <span className="font-bold text-[#20242a]">{email}</span>.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-[#20242a]">
            OTP code
          </label>

          <input
            {...register("otp", {
              required: "OTP is required",
              minLength: {
                value: 4,
                message: "Enter a valid OTP",
              },
            })}
            inputMode="numeric"
            className="h-14 w-full rounded-xl border border-[#dfe7f1] px-4 text-center text-[24px] font-bold tracking-[0.35em] text-[#20242a] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
            placeholder="000000"
          />

          {errors.otp ? (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.otp.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={verifyMutation.isPending}
          className="h-12 w-full rounded-xl bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
        >
          {verifyMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify email"
          )}
        </Button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resendMutation.isPending}
          className="mx-auto flex items-center justify-center gap-2 text-sm font-bold text-[#377dff] hover:underline disabled:opacity-60"
        >
          <RotateCcw className="h-4 w-4" />
          {resendMutation.isPending ? "Sending..." : "Resend OTP"}
        </button>
      </form>
    </div>
  );
}