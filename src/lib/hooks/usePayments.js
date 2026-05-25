"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCheckoutSession,
  createCustomerPortalSession,
  getMyCourses,
  getMyPurchases,
  getMySubscriptions,
  getSessionStatus,
} from "@/lib/api/payments.api";
import { queryKeys } from "@/lib/constants/queryKeys";
import { getApiErrorMessage } from "@/lib/utils/errors";
import { toast } from "sonner";

const CONFIRMED_STATUSES = ["PAID", "ACTIVE", "TRIALING"];

export function useMyCourses(params = { page: 1, limit: 20 }) {
  return useQuery({
    queryKey: queryKeys.payments.myCourses(params),
    queryFn: () => getMyCourses(params),
    enabled: true,
    staleTime: 1000 * 60,
  });
}

export function useMySubscriptions(params = { page: 1, limit: 20 }) {
  return useQuery({
    queryKey: queryKeys.payments.mySubscriptions(params),
    queryFn: () => getMySubscriptions(params),
    enabled: true,
    staleTime: 1000 * 60,
  });
}

export function useMyPurchases(params = { page: 1, limit: 20 }) {
  return useQuery({
    queryKey: queryKeys.payments.myPurchases(params),
    queryFn: () => getMyPurchases(params),
    enabled: true,
    staleTime: 1000 * 60,
  });
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSession,
    onSuccess: (data) => {
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      toast.error("Checkout URL was not returned");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to start checkout"));
    },
  });
}

export function useCreateCustomerPortalSession() {
  return useMutation({
    mutationFn: createCustomerPortalSession,
    onSuccess: (data) => {
      const url = data?.portalUrl || data?.url;

      if (url) {
        window.location.href = url;
        return;
      }

      toast.error("Customer portal URL was not returned");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, "Unable to open billing portal"));
    },
  });
}

export function useSessionStatus(sessionId, { enabled = true } = {}) {
  return useQuery({
    queryKey: queryKeys.payments.sessionStatus(sessionId),
    queryFn: () => getSessionStatus(sessionId),
    enabled: Boolean(sessionId) && enabled,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (CONFIRMED_STATUSES.includes(status)) return false;
      return 2000;
    },
  });
}