"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseBySlug } from "@/lib/api/courses.api";
import { queryKeys } from "@/lib/constants/queryKeys";
import { useAuthStore } from "@/lib/store/auth.store";

export function useCourseDetail(slug) {
  const userId = useAuthStore((state) => state.user?.id);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthReady = useAuthStore((state) => state.isAuthReady);
  const viewerKey = userId && accessToken ? userId : "guest";

  return useQuery({
    queryKey: [...queryKeys.courses.detail(slug), viewerKey],
    queryFn: () => getCourseBySlug(slug),
    enabled: Boolean(slug) && isAuthReady,
    staleTime: 0,
  });
}
