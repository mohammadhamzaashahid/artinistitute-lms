"use client";

import { useForm } from "react-hook-form";
import { Loader2, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRegister } from "@/lib/hooks/useAuth";

export default function RegisterForm({ onRegistered }) {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    await registerMutation.mutateAsync(values);
    onRegistered?.(values.email);
  }

  return (
    <div>
      <h2 className="text-[32px] font-bold tracking-[-0.05em] text-[#20242a]">
        Create account
      </h2>
      <p className="mt-2 text-[15px] leading-6 text-[#66788f]">
        Join Artin Institute and start learning from anywhere.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            label="First name"
            icon={User}
            error={errors.firstName?.message}
            inputProps={register("firstName", {
              required: "First name is required",
            })}
            placeholder="Student"
          />

          <AuthInput
            label="Last name"
            icon={User}
            error={errors.lastName?.message}
            inputProps={register("lastName", {
              required: "Last name is required",
            })}
            placeholder="User"
          />
        </div>

        <AuthInput
          label="Username"
          icon={User}
          error={errors.username?.message}
          inputProps={register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          placeholder="student_user"
        />

        <AuthInput
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

        <AuthInput
          label="Password"
          icon={Lock}
          type="password"
          error={errors.password?.message}
          inputProps={register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          placeholder="Minimum 8 characters"
        />

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="h-12 w-full rounded-xl bg-[#377dff] text-[15px] font-bold text-white hover:bg-[#236bf1]"
        >
          {registerMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>
    </div>
  );
}

function AuthInput({
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