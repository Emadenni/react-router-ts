import { create } from "zustand";

export interface CartProduct {
  id: string;
  name: string;
  price: string;
  desc: string;
  buttonText: string;
}

interface CartState {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")!) : [],

  addToCart: (product) => {
    set((state) => {
      const updatedCart = [...state.cart, product];
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
}));
