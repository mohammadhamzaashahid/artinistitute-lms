"use client";

import { Toaster } from "@/components/ui/sonner";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import QueryProvider from "@/components/providers/QueryProvider";

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthSessionProvider>
        {children}
        <Toaster position="top-center" richColors />
      </AuthSessionProvider>
    </QueryProvider>
  );
}