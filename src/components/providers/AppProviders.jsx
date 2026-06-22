"use client";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { useCartStore } from "@/lib/store/cart.store";

function StoreHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  return null;
}

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <AuthSessionProvider>
        <StoreHydrator />
        {children}
        <Toaster position="top-center" richColors />
      </AuthSessionProvider>
    </QueryProvider>
  );
}