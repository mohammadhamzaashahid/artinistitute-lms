"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categories.api";
import { queryKeys } from "@/lib/constants/queryKeys";

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10,
  });
}