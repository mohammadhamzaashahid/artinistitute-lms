"use client";

import { useEffect, useRef } from "react";
import { getMe, refreshToken } from "@/lib/api/auth.api";
import { useAuthStore } from "@/lib/store/auth.store";

export default function AuthSessionProvider({ children }) {
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;

    async function bootstrapSession() {
      const { accessToken, setUser, setSession, clearSession, markAuthReady } =
        useAuthStore.getState();

      try {
        if (accessToken) {
          const me = await getMe();
          const user = me?.user || me;

          if (user?.id) {
            setUser(user);
            markAuthReady();
            return;
          }
        }

        const refreshed = await refreshToken();
        const refreshedAccessToken = refreshed?.accessToken;
        const refreshedUser = refreshed?.user;

        if (refreshedAccessToken && refreshedUser?.id) {
          setSession({
            user: refreshedUser,
            accessToken: refreshedAccessToken,
          });
          return;
        }

        clearSession();
      } catch {
        clearSession();
      }
    }

    bootstrapSession();
  }, []);

  return children;
}