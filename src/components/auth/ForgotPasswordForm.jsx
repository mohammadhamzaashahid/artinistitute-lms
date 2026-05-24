"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useForgotPassword } from "@/lib/hooks/useAuth";

export default function ForgotPasswordForm({ onBack }) {
  const forgotMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    await forgotMutation.mutateAsync(values);
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#66788f] transition hover:text-[#377dff]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to login
      </button>

      <h2 className="text-[32px] font-bold tracking-[-0.05em] text-[#20242a]">
        Reset password
      </h2>

      <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
        Enter your email and we’ll send you a reset OTP.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-[#20242a]">
            Email
          </label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa8b8]" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              className="h-12 w-full rounded-xl border border-[#dfe7f1] pl-12 pr-4 text-[15px] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
              placeholder="student@example.com"
            />
          </div>

          {errors.email ? (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.email.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={forgotMutation.isPending}
          className="h-12 w-full rounded-xl bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
        >
          {forgotMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending OTP...
            </>
          ) : (
            "Send reset OTP"
          )}
        </Button>

        <p className="text-center text-sm leading-6 text-[#66788f]">
          After receiving the OTP, use the reset password page to set your new
          password.
        </p>
      </form>
    </div>
  );
}