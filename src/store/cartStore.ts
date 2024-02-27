import { create } from "zustand";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  desc: string;
  buttonText: string;
  quantity: number;
}

interface CartState {
  cart: CartProduct[];
  total: number;
  addToCart: (product: CartProduct) => void;
  updateQuantity: (productId: string, quantityDelta: number) => void;
  removeProduct: (productId: string) => void;
  emptyCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  total: 0,

  addToCart: (product) => {
    set((state) => {
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        product.quantity = 1;
        state.cart.push(product);
      }
      return { cart: [...state.cart], total: calculateTotalPrice([...state.cart]) };
    });
  },

  updateQuantity: (productId, quantityDelta) => {
    set((state) => {
      const updatedCart = state.cart.map((item) => {
        if (item.id === productId) {
          item.quantity += quantityDelta;
        }
        return item;
      });
      return { cart: updatedCart, total: calculateTotalPrice(updatedCart) };
    });
  },

  removeProduct: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      return { cart: updatedCart, total: calculateTotalPrice(updatedCart) };
    });
  },

  emptyCart: () => {

    sessionStorage.removeItem("cart"); 

    set({ cart: []});

  }
}));

const calculateTotalPrice = (cart: CartProduct[]) => {
  return cart.reduce((total, product) => total + product.price * product.quantity, 0);
};
