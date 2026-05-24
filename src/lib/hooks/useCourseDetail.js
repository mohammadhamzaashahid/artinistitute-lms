"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourseBySlug } from "@/lib/api/courses.api";
import { queryKeys } from "@/lib/constants/queryKeys";

export function useCourseDetail(slug) {
  return useQuery({
    queryKey: queryKeys.courses.detail(slug),
    queryFn: () => getCourseBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 1000 * 30,
  });
}