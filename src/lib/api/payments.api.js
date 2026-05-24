import { apiClient } from "./client";

export async function createCheckoutSession(payload) {
  const { data } = await apiClient.post(
    "/api/payments/create-checkout-session",
    payload
  );

  return data.data;
}

export async function createCustomerPortalSession() {
  const { data } = await apiClient.post(
    "/api/payments/create-customer-portal-session",
    {}
  );

  return data.data;
}

export async function getMyCourses(params = {}) {
  const { data } = await apiClient.get("/api/payments/my-courses", {
    params,
  });

  return data.data;
}

export async function getMySubscriptions(params = {}) {
  const { data } = await apiClient.get("/api/payments/my-subscriptions", {
    params,
  });

  return data.data;
}

export async function getMyPurchases(params = {}) {
  const { data } = await apiClient.get("/api/payments/my-purchases", {
    params,
  });

  return data.data;
}