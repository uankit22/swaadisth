"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export type CartItem = {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  quantity: number
  isCombo: boolean
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number, isCombo: boolean) => void
  updateQuantity: (id: number, quantity: number, isCombo: boolean) => void
  clearCart: () => void
  donation: number
  setDonation: (amount: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [donation, setDonation] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    const storedDonation = localStorage.getItem("donation")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
    if (storedDonation) {
      setDonation(JSON.parse(storedDonation))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
    localStorage.setItem("donation", JSON.stringify(donation))
  }, [cartItems, donation])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id && i.isCombo === item.isCombo)
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.isCombo === item.isCombo ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prevItems, { ...item, quantity: 1 }]
    })
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
      className: "bg-green-500 text-white",
    })
  }

  const removeFromCart = (id: number, isCombo: boolean) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.isCombo === isCombo)))
  }

  const updateQuantity = (id: number, quantity: number, isCombo: boolean) => {
    setCartItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => !(item.id === id && item.isCombo === isCombo))
      }
      return prevItems.map((item) => (item.id === id && item.isCombo === isCombo ? { ...item, quantity } : item))
    })
  }

  const clearCart = () => {
    setCartItems([])
    setDonation(0)
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, donation, setDonation }}
    >
      {children}
    </CartContext.Provider>
  )
}

