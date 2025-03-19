"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const addressFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  mobileNumber: z.string().regex(/^\d{10}$/, {
    message: "Mobile number must be a 10 digit number",
  }),
  addressLine1: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, {
    message: "Pincode must be a 6 digit number",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  type: z.enum(["Home", "Work", "Other"]),
})

export type AddressFormValues = z.infer<typeof addressFormSchema>

interface AddressFormProps {
  onSubmit: (values: AddressFormValues) => void
  address?: AddressFormValues
  onCancel?: () => void
  isSubmitting?: boolean
}

const AddressForm: React.FC<AddressFormProps> = ({ onSubmit, address, onCancel, isSubmitting = false }) => {
  const [isPincodeLoading, setIsPincodeLoading] = React.useState(false)
  const [isStateReadOnly, setIsStateReadOnly] = React.useState(false)
  const { toast } = useToast()

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: address || {
      fullName: "",
      mobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
      type: "Home",
    },
  })

  // This is the exact same fetchPincodeData function from the checkout form
  const fetchPincodeData = async (pincode: string) => {
    if (pincode.length !== 6) return

    setIsPincodeLoading(true)

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()

      if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0]
        form.setValue("city", postOffice.District)
        form.setValue("state", postOffice.State)
        setIsStateReadOnly(true)

        toast({
          title: "Address details found",
          description: `Found ${postOffice.District}, ${postOffice.State} for this pincode.`,
        })
      } else {
        setIsStateReadOnly(false)

        toast({
          title: "Pincode not found",
          description: "Please enter a valid pincode or enter city and state manually.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error)
      setIsStateReadOnly(false)

      toast({
        title: "Error",
        description: "Failed to fetch location data. Please enter manually.",
        variant: "destructive",
      })
    } finally {
      setIsPincodeLoading(false)
    }
  }

  const handleSubmit = (values: AddressFormValues) => {
    onSubmit(values)
  }

  return (
    <div className="max-h-[80vh] overflow-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 10-digit mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="House No., Building, Company, Apartment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2 (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Area, Street, Sector, Village" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="landmark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Near Apollo Hospital" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Enter 6-digit pincode"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            if (e.target.value.length === 6) {
                              fetchPincodeData(e.target.value)
                            } else {
                              setIsStateReadOnly(false)
                            }
                          }}
                        />
                        {isPincodeLoading && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter state"
                        {...field}
                        readOnly={isStateReadOnly}
                        className={isStateReadOnly ? "bg-muted" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Address Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Home" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Home</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Work" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Work</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Other" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4 sticky bottom-0 bg-background p-4 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Address"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddressForm

