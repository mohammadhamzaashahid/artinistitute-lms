"use client";

import { useQuery } from "@tanstack/react-query";
import { getCourses } from "@/lib/api/courses.api";
import { queryKeys } from "@/lib/constants/queryKeys";

export function useCourses(params = {}) {
  return useQuery({
    queryKey: queryKeys.courses.list(params),
    queryFn: () => getCourses(params),
    keepPreviousData: true,
    staleTime: 1000 * 45,
  });
}