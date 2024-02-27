import { create } from "zustand";

interface CountState {
  count: number;
  increment: () => void;
  decrement: () => void;
  resetCounts: () => void; 
}

export const getCountFromSessionStorage = () => {
  const countString = sessionStorage.getItem("count");
  //all data from session storage are strigns
  return countString ? parseInt(countString, 10) : 0;
};

export const useCountStore = create<CountState>((set) => ({
  count: getCountFromSessionStorage(),
  decrement: () => set((state) => {
    const newCount = state.count - 1;
    sessionStorage.setItem("count", newCount.toString());
    return { count: newCount };
  }),
  increment: () => set((state) => {
    const newCount = state.count + 1;
    sessionStorage.setItem("count", newCount.toString());
    return { count: newCount };
  }),
  resetCounts: () => set({ count: 0 }),
}))
