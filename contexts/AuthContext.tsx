"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { sendOTP, verifyOTP } from "@/lib/auth-utils"

export type Address = {
  id: string
  fullName: string
  mobileNumber: string
  addressLine1: string
  addressLine2?: string
  landmark?: string
  pincode: string
  city: string
  state: string
  type: "Home" | "Work" | "Other"
}

export type Order = {
  id: string
  date: string
  total: number
  status: string
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
}

export type User = {
  uid: string
  name: string
  email: string
  mobile: string
  addresses: Address[]
  orders: Order[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (phoneNumber: string) => Promise<void>
  verifyOtp: (otp: string) => Promise<boolean>
  logout: () => Promise<void>
  authError: string | null
  clearAuthError: () => void
  updateUser: (userData: { name: string; email: string }) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        // Mock user data with addresses and orders
        const mockUser: User = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "Rahul Sharma",
          email: firebaseUser.email || "rahul.sharma@example.com",
          mobile: firebaseUser.phoneNumber || "9876543210",
          addresses: [
            {
              id: "address1",
              fullName: "Rahul Sharma",
              mobileNumber: "9876543210",
              addressLine1: "Flat 302, Sunshine Apartments",
              addressLine2: "Sector 15, Near City Mall",
              landmark: "Opposite Green Park",
              pincode: "110001",
              city: "New Delhi",
              state: "Delhi",
              type: "Home",
            },
            {
              id: "address2",
              fullName: "Rahul Sharma",
              mobileNumber: "9876543210",
              addressLine1: "Office 405, Tech Park",
              addressLine2: "MG Road",
              landmark: "Next to Metro Station",
              pincode: "560001",
              city: "Bangalore",
              state: "Karnataka",
              type: "Work",
            },
          ],
          orders: [
            {
              id: "order1",
              date: "2024-01-01",
              total: 100.0,
              status: "Delivered",
              items: [{ id: "item1", name: "Product 1", price: 50.0, quantity: 2, image: "/placeholder.svg" }],
            },
            {
              id: "order2",
              date: "2024-02-01",
              total: 200.0,
              status: "Shipped",
              items: [{ id: "item2", name: "Product 2", price: 100.0, quantity: 2, image: "/placeholder.svg" }],
            },
          ],
        }
        setUser(mockUser)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (phoneNumber: string) => {
    try {
      setAuthError(null)
      await sendOTP(phoneNumber)
    } catch (error: any) {
      setAuthError(error.message)
      throw error
    }
  }

  const verifyOtp = async (otp: string) => {
    try {
      setAuthError(null)
      const result = await verifyOTP(otp)
      return !!result.user
    } catch (error: any) {
      setAuthError(error.message)
      throw error
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error: any) {
      setAuthError(error.message)
      throw error
    }
  }

  const clearAuthError = () => {
    setAuthError(null)
  }

  const updateUser = (userData: { name: string; email: string }) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, name: userData.name, email: userData.email }
      }
      return prevUser
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        verifyOtp,
        logout,
        authError,
        clearAuthError,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

