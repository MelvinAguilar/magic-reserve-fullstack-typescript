import { AddCartType, CartType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartState = {
  cart: AddCartType[];
  addToCart: (item: AddCartType) => void;
  removeFromCart: (id: string) => void;
  removeItem: (name: CartType) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => {
        set((state) => {
          const exists = state.cart.find((i) => i.id === item.id);

          if (exists) {
            const newCart = state.cart.map((i: AddCartType) => {
              if (i.id === item.id) {
                return { ...i, quantity: i.quantity! + 1 };
              }
              return i;
            });
            return { cart: newCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        });
      },
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),
      removeItem: (item) =>
        set((state) => {
          const exists = state.cart.find((i) => i.id === item.id);

          if (exists && exists.quantity! > 1) {
            const newCart = state.cart.map((i: AddCartType) => {
              if (i.id === item.id) {
                return { ...i, quantity: i.quantity! - 1 };
              }
              return i;
            });
            return { cart: newCart };
          } else {
            const filteredCart = state.cart.filter((i) => i.id !== item.id);
            return { cart: filteredCart };
          }
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    },
  ),
);
