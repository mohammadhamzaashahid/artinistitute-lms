"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Retry once on network/server errors only. Retrying a 4xx (including 429
// rate limiting) can't succeed and just adds load when the API is busiest.
function shouldRetryQuery(failureCount, error) {
  const status = error?.response?.status;
  if (status && status < 500) return false;
  return failureCount < 1;
}

export default function QueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            refetchOnWindowFocus: false,
            retry: shouldRetryQuery,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}