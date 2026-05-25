"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  changePassword,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resendEmailOtp,
  resetPassword,
  verifyEmailOtp,
} from "@/lib/api/auth.api";
import { useAuthStore } from "@/lib/store/auth.store";
import { getApiErrorMessage } from "@/lib/utils/errors";
import { queryKeys } from "@/lib/constants/queryKeys";

export function useLogin() {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const user = data?.user;
      const accessToken = data?.accessToken;

      if (!user?.id || !accessToken) {
        toast.error("Login response is missing user session");
        return;
      }

      setSession({
        user,
        accessToken,
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.auth.me,
      });

      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.courses.all,
      });

      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Login failed"));
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created. Please verify your email.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Registration failed"));
    },
  });
}

export function useVerifyEmailOtp() {
  return useMutation({
    mutationFn: verifyEmailOtp,
    onSuccess: () => {
      toast.success("Email verified successfully. Please login.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "OTP verification failed"));
    },
  });
}

export function useResendEmailOtp() {
  return useMutation({
    mutationFn: resendEmailOtp,
    onSuccess: () => {
      toast.success("OTP sent successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to resend OTP"));
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("If the email exists, a reset OTP has been sent.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Failed to request password reset"));
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully. Please login.");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Password reset failed"));
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Password change failed"));
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      clearSession();
      queryClient.clear();
      toast.success("Logged out successfully");
    },
  });
}
