"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, Lock, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useResetPassword } from "@/lib/hooks/useAuth";

export default function ResetPasswordForm({ email, onBack, onSuccess }) {
  const resetMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      await resetMutation.mutateAsync({ email, otp: values.otp, newPassword: values.newPassword });
      onSuccess?.();
    } catch {}
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
        <ShieldCheck className="h-7 w-7" />
      </div>

      <h2 className="mt-5 text-[32px] font-bold tracking-[-0.05em] text-[#20242a]">
        Create new password
      </h2>

      <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
        Enter the OTP sent to{" "}
        <span className="font-bold text-[#20242a]">{email}</span> and choose a
        new password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-[#20242a]">
            OTP code
          </label>

          <input
            {...register("otp", {
              required: "OTP is required",
              minLength: { value: 6, message: "OTP must be 6 digits" },
              maxLength: { value: 6, message: "OTP must be 6 digits" },
              pattern: { value: /^[0-9]+$/, message: "OTP must contain digits only" },
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

        <div>
          <label className="mb-2 block text-sm font-bold text-[#20242a]">
            New password
          </label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa8b8]" />
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                  message: "Must include uppercase, lowercase, and a number",
                },
              })}
              className="h-12 w-full rounded-xl border border-[#dfe7f1] pl-12 pr-4 text-[15px] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
              placeholder="Minimum 8 characters"
            />
          </div>

          {errors.newPassword ? (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>

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
  );
}
