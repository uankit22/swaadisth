"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuth } from "@/contexts/AuthContext"

// Define the address structure
export interface Address {
  id: string
  fullName: string
  mobileNumber: string
  addressLine1: string
  addressLine2?: string
  landmark?: string
  pincode: string
  city: string
  state: string
  type: string
}

interface AddressContextType {
  addresses: Address[]
  addAddress: (address: Omit<Address, "id">) => Promise<void>
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>
  deleteAddress: (id: string) => Promise<void>
}

const AddressContext = createContext<AddressContextType | undefined>(undefined)

// Sample addresses in the correct format
const sampleAddresses: Address[] = [
  {
    id: "addr1",
    fullName: "Rahul Sharma",
    mobileNumber: "9876543210",
    addressLine1: "123, Green Park Colony",
    addressLine2: "Near City Mall",
    landmark: "Opposite to SBI Bank",
    pincode: "110016",
    city: "New Delhi",
    state: "Delhi",
    type: "Home",
  },
  {
    id: "addr2",
    fullName: "Rahul Sharma",
    mobileNumber: "9876543210",
    addressLine1: "456, Sector 18",
    addressLine2: "Cyber City",
    landmark: "Near Metro Station",
    pincode: "122001",
    city: "Gurgaon",
    state: "Haryana",
    type: "Work",
  },
]

export function AddressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  // Use sample addresses instead of user.addresses
  const addresses = sampleAddresses

  const addAddress = async (address: Omit<Address, "id">) => {
    // Mock implementation
    console.log("Adding address:", address)
    // In a real implementation, this would call an API
  }

  const updateAddress = async (id: string, address: Partial<Address>) => {
    // Mock implementation
    console.log("Updating address:", id, address)
    // In a real implementation, this would call an API
  }

  const deleteAddress = async (id: string) => {
    // Mock implementation
    console.log("Deleting address:", id)
    // In a real implementation, this would call an API
  }

  return (
    <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress }}>
      {children}
    </AddressContext.Provider>
  )
}

export function useAddresses() {
  const context = useContext(AddressContext)
  if (context === undefined) {
    throw new Error("useAddresses must be used within an AddressProvider")
  }
  return context
}

