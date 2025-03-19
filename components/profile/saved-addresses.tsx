"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Check } from "lucide-react"
import type { Address } from "@/contexts/AuthContext"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import AddressForm from "./address-form"

export default function SavedAddresses({ addresses }: { addresses: Address[] }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const { toast } = useToast()

  const handleEdit = (address: Address) => {
    setSelectedAddress(address)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (addressId: string) => {
    // In a real app, this would call an API to delete the address
    toast({
      title: "Address Deleted",
      description: "The address has been deleted successfully.",
    })
  }

  const handleSetDefault = (addressId: string) => {
    // In a real app, this would call an API to set the address as default
    toast({
      title: "Default Address Updated",
      description: "Your default address has been updated successfully.",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Saved Addresses</CardTitle>
          <CardDescription>Manage your delivery addresses</CardDescription>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
              <DialogDescription>Fill in the details to add a new delivery address.</DialogDescription>
            </DialogHeader>
            <AddressForm
              onSubmit={() => {
                setIsAddDialogOpen(false)
                toast({
                  title: "Address Added",
                  description: "Your new address has been added successfully.",
                })
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-6">
        {addresses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You don't have any saved addresses yet.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4 relative hover:border-primary transition-colors">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{address.name}</h3>
                    <Badge variant={address.type === "Home" ? "default" : "outline"}>{address.type}</Badge>
                    {address.isDefault && (
                      <Badge variant="secondary" className="ml-2">
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm">{address.phone}</p>
                  <p className="text-sm">
                    {address.address}, {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEdit(address)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDelete(address.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {!address.isDefault && (
                    <Button variant="outline" size="icon" onClick={() => handleSetDefault(address.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>Update your delivery address details.</DialogDescription>
          </DialogHeader>
          {selectedAddress && (
            <AddressForm
              address={selectedAddress}
              onSubmit={() => {
                setIsEditDialogOpen(false)
                toast({
                  title: "Address Updated",
                  description: "Your address has been updated successfully.",
                })
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

