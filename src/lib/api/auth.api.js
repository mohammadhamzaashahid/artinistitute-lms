import { apiClient } from "./client";

export async function registerUser(payload) {
  const { data } = await apiClient.post("/api/auth/register", payload);
  return data.data;
}

export async function verifyEmailOtp(payload) {
  const { data } = await apiClient.post("/api/auth/verify-email-otp", payload);
  return data.data;
}

export async function resendEmailOtp(payload) {
  const { data } = await apiClient.post("/api/auth/resend-email-otp", payload);
  return data.data;
}

export async function loginUser(payload) {
  const { data } = await apiClient.post("/api/auth/login", payload);
  return data.data;
}

export async function refreshToken() {
  const { data } = await apiClient.post("/api/auth/refresh-token", {});
  return data.data;
}

export async function getMe() {
  const { data } = await apiClient.get("/api/auth/me");
  return data.data;
}

export async function forgotPassword(payload) {
  const { data } = await apiClient.post("/api/auth/forgot-password", payload);
  return data.data;
}

export async function resetPassword(payload) {
  const { data } = await apiClient.post("/api/auth/reset-password", payload);
  return data.data;
}

export async function logoutUser() {
  const { data } = await apiClient.post("/api/auth/logout", {});
  return data.data;
}
export async function changePassword(payload) {
  const { data } = await apiClient.post("/api/auth/change-password", payload);
  return data.data;
}