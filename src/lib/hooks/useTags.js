"use client";

import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/api/tags.api";
import { queryKeys } from "@/lib/constants/queryKeys";

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: getTags,
    staleTime: 1000 * 60 * 10,
  });
}