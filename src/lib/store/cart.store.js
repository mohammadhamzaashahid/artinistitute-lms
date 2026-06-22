import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book) => {
        const existing = get().items.find((i) => i.id === book.id);
        if (existing) return;
        set((s) => ({ items: [...s.items, { ...book, quantity: 1 }] }));
      },

      removeItem: (bookId) => {
        set((s) => ({ items: s.items.filter((i) => i.id !== bookId) }));
      },

      updateQuantity: (bookId, quantity) => {
        const q = Math.max(1, Math.min(10, Number(quantity) || 1));
        set((s) => ({
          items: s.items.map((i) => (i.id === bookId ? { ...i, quantity: q } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + (i.quantity || 1), 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, i) => sum + Number(i.price || 0) * (i.quantity || 1),
          0
        ),
    }),
    {
      name: "artin-book-cart",
      skipHydration: true,
    }
  )
);
