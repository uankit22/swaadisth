"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2, MapPin } from "lucide-react"
import AddressForm, { type AddressFormValues } from "./address-form"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Define the address type
interface Address {
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

interface AddressManagerProps {
  addresses: Address[]
  onAddAddress: (address: AddressFormValues) => Promise<void>
  onUpdateAddress: (id: string, address: AddressFormValues) => Promise<void>
  onDeleteAddress: (id: string) => Promise<void>
}

export function AddressManager({ addresses, onAddAddress, onUpdateAddress, onDeleteAddress }: AddressManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const handleAddAddress = async (data: AddressFormValues) => {
    try {
      await onAddAddress(data)
      setShowAddForm(false)
      toast({
        title: "Address added",
        description: "Your new address has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding address:", error)
    }
  }

  const handleUpdateAddress = async (data: AddressFormValues) => {
    if (!editingAddress) return

    try {
      await onUpdateAddress(editingAddress.id, data)
      setEditingAddress(null)
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating address:", error)
    }
  }

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return

    try {
      await onDeleteAddress(addressToDelete)
      setAddressToDelete(null)
      toast({
        title: "Address deleted",
        description: "Your address has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting address:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Your Addresses</h2>
        {!showAddForm && !editingAddress && (
          <Button onClick={() => setShowAddForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddressForm onSubmit={handleAddAddress} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {editingAddress && (
        <div className="mb-6">
          <AddressForm
            defaultValues={editingAddress}
            onSubmit={handleUpdateAddress}
            onCancel={() => setEditingAddress(null)}
            isEditing
          />
        </div>
      )}

      {addresses.length === 0 && !showAddForm ? (
        <div className="bg-white p-8 rounded-md shadow-sm border border-gray-200 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">
            You don't have any saved addresses yet. Add an address to make checkout faster.
          </p>
          <Button onClick={() => setShowAddForm(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs font-medium rounded mb-2">
                    {address.type}
                  </span>
                  <h3 className="font-medium">{address.fullName}</h3>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingAddress(address)}
                    disabled={!!editingAddress || showAddForm}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAddressToDelete(address.id)}
                    className="h-8 w-8 p-0 text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                {address.landmark && <p>Landmark: {address.landmark}</p>}
                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="pt-1 text-gray-800">Mobile: {address.mobileNumber}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <AlertDialog open={!!addressToDelete} onOpenChange={(open) => !open && setAddressToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this address. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAddress} className="bg-red-500 hover:bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

