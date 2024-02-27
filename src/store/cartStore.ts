import { create } from "zustand";

export interface CartProduct {
  id: string;
  name: string;
  price: string;
  desc: string;
  quantity?: number | undefined;
}

interface CartState {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")!) : [],

  addToCart: (product) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex((p) => p.id === product.id);
      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: (updatedCart[existingProductIndex].quantity ?? 0) + 1,  // Increase quantity
        };
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      } else {
        // If the product is not in the cart, add it
        const updatedCart = [...state.cart, { ...product, quantity: 1 }];
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
    });
  },
}));
