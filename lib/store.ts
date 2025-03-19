import { create } from "zustand"

type CartDrawerStore = {
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

export const useCartDrawerStore = create<CartDrawerStore>((set) => ({
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}))

