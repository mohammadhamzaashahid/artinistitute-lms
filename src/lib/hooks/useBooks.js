"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getBookAudioPlayback,
  getBookBySlug,
  getBooks,
  getMyBookOrderDetail,
  getMyBookOrders,
  placeBookOrder,
} from "@/lib/api/books.api";
import { queryKeys } from "@/lib/constants/queryKeys";

export function useBooks(params = {}) {
  return useQuery({
    queryKey: queryKeys.books.list(params),
    queryFn: () => getBooks(params),
    staleTime: 1000 * 45,
  });
}

export function useBookBySlug(slug) {
  return useQuery({
    queryKey: queryKeys.books.detail(slug),
    queryFn: () => getBookBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 60,
  });
}

export function useBookAudioPlayback(bookId, audioFileId, enabled = false) {
  return useQuery({
    queryKey: queryKeys.books.audioPlayback(bookId, audioFileId),
    queryFn: () => getBookAudioPlayback(bookId, audioFileId),
    enabled: Boolean(bookId && audioFileId && enabled),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePlaceBookOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, payload }) => placeBookOrder(bookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.books.myOrders({}) });
      toast.success("Order placed successfully! We'll contact you shortly.");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to place order. Please try again."
      );
    },
  });
}

export function useMyBookOrders(params = {}) {
  return useQuery({
    queryKey: queryKeys.books.myOrders(params),
    queryFn: () => getMyBookOrders(params),
    staleTime: 1000 * 30,
  });
}

export function useMyBookOrderDetail(orderId) {
  return useQuery({
    queryKey: queryKeys.books.myOrderDetail(orderId),
    queryFn: () => getMyBookOrderDetail(orderId),
    enabled: Boolean(orderId),
    staleTime: 1000 * 60,
  });
}
