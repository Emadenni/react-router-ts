import { create } from "zustand";
import { useCountStore, getCountFromSessionStorage } from "./count";

export interface CartProduct {
  id: string;
  name: string;
  price: string;
  desc: string;
  buttonText: string;
  quantity: number; // Aggiungi quantity come parte di CartProduct
}

interface CartState {
  cart: CartProduct[];
  count:number,
  addToCart: (product: CartProduct) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  emptyCart:() => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")!) : [],
  count: getCountFromSessionStorage(),

  addToCart: (product) => {
    set((state) => {
      const existingProductIndex = state.cart.findIndex((p) => p.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      } else {
        const updatedCart = [...state.cart, { ...product, quantity: 1 }];
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }
    });
  },

  updateQuantity: (productId, quantityDelta) => {
    set((state) => {
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + quantityDelta };
        }
        return item;
      });
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },

  removeProduct: (productId: string) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));

      const removedProduct = state.cart.find((item) => item.id === productId);
      if (removedProduct) {
        const { quantity } = removedProduct;
        const { decrement } = useCountStore.getState(); 
        for (let i = 0; i < quantity; i++) {
          decrement(); 
        }
      }
      return { cart: updatedCart };
    });
  },
  emptyCart: () => {

    sessionStorage.removeItem("cart"); 
   
    set({ cart: []});
    
  }
}));

