"use client";

import { useQuery } from "@tanstack/react-query";
import { getLiveClassBySlug, getLiveClasses } from "@/lib/api/live-classes.api";
import { queryKeys } from "@/lib/constants/queryKeys";
import { useAuthStore } from "@/lib/store/auth.store";

export function useLiveClasses(params = {}) {
  return useQuery({
    queryKey: queryKeys.liveClasses.list(params),
    queryFn: () => getLiveClasses(params),
    keepPreviousData: true,
    staleTime: 1000 * 45,
  });
}

export function useLiveClassDetail(slug) {
  const userId = useAuthStore((state) => state.user?.id);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const viewerKey = userId && accessToken ? userId : "guest";

  return useQuery({
    queryKey: [...queryKeys.liveClasses.detail(slug), viewerKey],
    queryFn: () => getLiveClassBySlug(slug),
    enabled: Boolean(slug) && isAuthReady,
    staleTime: 0,
  });
}
