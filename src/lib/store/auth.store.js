import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthReady: false,

      setSession: ({ user, accessToken }) => {
        set({
          user: user || null,
          accessToken: accessToken || null,
          isAuthReady: true,
        });
      },

      setUser: (user) => {
        set({ user: user || null });
      },

      setAccessToken: (accessToken) => {
        set({ accessToken: accessToken || null });
      },

      clearSession: () => {
        set({
          user: null,
          accessToken: null,
          isAuthReady: true,
        });
      },

      markAuthReady: () => {
        set({ isAuthReady: true });
      },

      isAuthenticated: () => {
        const state = get();
        return Boolean(state.user && state.accessToken);
      },
    }),
    {
      name: "artin-auth-session",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);