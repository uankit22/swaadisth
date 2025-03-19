"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { AddressManager } from "@/components/profile/address-manager"
import type { AddressFormValues } from "@/components/profile/address-form"
import { Loader2 } from "lucide-react"

// Mock function to simulate API calls - replace with actual API calls
const mockApiCall = async <T,>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}

export default function AddressesPage() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch addresses from API or use from user context
    const fetchAddresses = async () => {
      setLoading(true)
      try {
        // Use addresses from auth context if available
        if (user?.addresses) {
          setAddresses(user.addresses)
        } else {
          // If no addresses in auth context, use empty array
          setAddresses([])
        }
      } catch (error) {
        console.error("Error fetching addresses:", error)
        setAddresses([])
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [user])

  const handleAddAddress = async (address: AddressFormValues) => {
    // Replace with actual API call
    const newAddress = {
      ...address,
      id: `addr_${Date.now()}`, // Generate a temporary ID
    }

    await mockApiCall(newAddress)
    setAddresses((prev) => [...prev, newAddress])
  }

  const handleUpdateAddress = async (id: string, address: AddressFormValues) => {
    // Replace with actual API call
    await mockApiCall(address)
    setAddresses((prev) => prev.map((addr) => (addr.id === id ? { ...addr, ...address } : addr)))
  }

  const handleDeleteAddress = async (id: string) => {
    // Replace with actual API call
    await mockApiCall(id)
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <AddressManager
        addresses={addresses}
        onAddAddress={handleAddAddress}
        onUpdateAddress={handleUpdateAddress}
        onDeleteAddress={handleDeleteAddress}
      />
    </div>
  )
}

