 "use client";

import { useForm } from "react-hook-form";
import { Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLogin } from "@/lib/hooks/useAuth";

export default function LoginForm({ onForgot, onSuccess }) {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      await loginMutation.mutateAsync(values);
      onSuccess?.();
    } catch {}
  }

  return (
    <div>
      <h2 className="text-[32px] font-bold tracking-[-0.05em] text-[#20242a]">
        Welcome back
      </h2>
      <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
        Sign in to continue your courses and subscriptions.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-bold text-[#20242a]">
            Email or username
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa8b8]" />
            <input
              {...register("emailOrUsername", {
                required: "Email or username is required",
              })}
              className="h-12 w-full rounded-xl border border-[#dfe7f1] pl-12 pr-4 text-[15px] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
              placeholder="student@example.com"
            />
          </div>
          {errors.emailOrUsername ? (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.emailOrUsername.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-[#20242a]">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9aa8b8]" />
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="h-12 w-full rounded-xl border border-[#dfe7f1] pl-12 pr-4 text-[15px] outline-none transition focus:border-[#377dff] focus:ring-4 focus:ring-[#377dff]/10"
              placeholder="Enter password"
            />
          </div>
          {errors.password ? (
            <p className="mt-1.5 text-sm font-medium text-red-500">
              {errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onForgot}
            className="text-sm font-bold text-[#377dff] hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="h-12 w-full rounded-xl bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  );
}