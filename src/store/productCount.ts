import { create } from "zustand";

interface InternalCountState {
  internalCount: number;
  internalIncrement: () => void;
  internalDecrement: () => void;
}

export const useInternalCountStore = create<InternalCountState>()((set) => ({
  internalCount: 0,
  internalDecrement: () => set((state) => ({ internalCount: state.internalCount - 1 })),
  internalIncrement: () => set((state) => ({ internalCount: state.internalCount + 1 })),
}));
