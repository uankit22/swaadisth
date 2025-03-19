"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard, Landmark, User, AlertCircle, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import OrderPreview from "@/components/checkout/order-preview"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Invalid phone number"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    mobileNumber: z.string().regex(/^\d{10}$/, "Invalid mobile number"),
    addressLine1: z.string().min(5, "Address must be at least 5 characters"),
    addressLine2: z.string().optional(),
    landmark: z.string().optional(),
    pincode: z.string().regex(/^\d{6}$/, "Invalid pincode"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
  }),
  paymentMethod: z.enum(["cod", "online"]),
  selectedAddressId: z.string().optional(),
})

interface CheckoutFormProps {
  onPaymentMethodChange: (method: "cod" | "online") => void
  couponDiscount?: number
}

export default function CheckoutForm({ onPaymentMethodChange, couponDiscount = 0 }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [pincodeData, setPincodeData] = useState<{ city: string; state: string } | null>(null)
  const [step, setStep] = useState(1)
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)
  const [otp, setOtp] = useState("")
  const { cartItems, donation } = useCart()
  const { user, isAuthenticated } = useAuth()
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [showOrderPreview, setShowOrderPreview] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      phone: user?.mobile || "",
      fullName: user?.name || "",
      address: {
        fullName: "",
        mobileNumber: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
      },
      paymentMethod: "online",
      selectedAddressId: "",
    },
  })

  const watchSelectedAddressId = form.watch("selectedAddressId")

  useEffect(() => {
    if (isAuthenticated && user) {
      form.setValue("email", user.email)
      form.setValue("phone", user.mobile)
      form.setValue("fullName", user.name)
      setStep(2) // Skip to address selection for authenticated users
    }
  }, [isAuthenticated, user, form])

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const total = subtotal + (donation || 0)
  const isCodAvailable = total >= 499
  const codHandlingFee = total >= 499 && total < 1499 ? 48 : 0
  const codAdvancePayment = total >= 499 && total < 1499 ? 99 : 0
  const onlinePaymentDiscount = 0.05 * total

  const watchPaymentMethod = form.watch("paymentMethod")

  // Update parent component when payment method changes
  useEffect(() => {
    onPaymentMethodChange(watchPaymentMethod as "cod" | "online")
  }, [watchPaymentMethod, onPaymentMethodChange])

  useEffect(() => {
    const savedFormData = localStorage.getItem("checkoutFormData")
    if (savedFormData) {
      form.reset(JSON.parse(savedFormData))
    }
  }, [form])

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("checkoutFormData", JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(values)
    setIsLoading(false)
    // Here you would typically send the form data to your backend
    // and handle the response (e.g., redirect to payment gateway)
  }

  const fetchPincodeData = async (pincode: string) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()
      if (data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0]
        setPincodeData({ city: postOffice.District, state: postOffice.State })
        form.setValue("address.city", postOffice.District)
        form.setValue("address.state", postOffice.State)
      } else {
        setPincodeData(null)
      }
    } catch (error) {
      console.error("Error fetching pincode data:", error)
      setPincodeData(null)
    }
  }

  const nextStep = () => {
    if (step === 1) {
      form.trigger(["email", "phone", "fullName"]).then((isValid) => {
        if (isValid) {
          setIsOtpDialogOpen(true)
          // Here you would typically send the OTP to the user's phone
          console.log("Sending OTP to", form.getValues("phone"))
        }
      })
    } else if (step < 3) {
      if (watchSelectedAddressId || showNewAddressForm) {
        form.trigger("address").then((isValid) => {
          if (isValid) {
            setStep(step + 1)
          }
        })
      } else {
        setStep(step + 1)
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const verifyOtp = () => {
    // Here you would typically verify the OTP with your backend
    console.log("Verifying OTP:", otp)
    // For this example, we'll just accept any 6-digit OTP
    if (otp.length === 6) {
      setIsOtpDialogOpen(false)
      setStep(2)
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleOrderPreview = () => {
    const orderData = {
      selectedAddress: user?.addresses?.find((addr) => addr.id === form.getValues("selectedAddressId")),
      newAddress: form.getValues("address"),
      paymentMethod: form.getValues("paymentMethod"),
      subtotal,
      couponDiscount,
      codHandlingFee,
      onlinePaymentDiscount,
    }
    localStorage.setItem("orderPreviewData", JSON.stringify(orderData))
    router.push("/order-preview")
  }

  const handleBackToPaymentMethod = () => {
    setShowOrderPreview(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Already a user?{" "}
                <Link href="/login?redirectTo=/checkout" className="text-primary hover:underline font-medium">
                  Sign In Here
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button className="mt-6" onClick={nextStep}>
              Continue to Delivery Address
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Landmark className="h-5 w-5" />
              Delivery Address
            </h2>
            {isAuthenticated && user?.addresses && user.addresses.length > 0 && (
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="selectedAddressId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select a saved address</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value)
                          setShowNewAddressForm(false)
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an address" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {user.addresses.map((address) => (
                            <SelectItem key={address.id} value={address.id}>
                              {address.type} - {address.address}, {address.city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="outline" className="mt-2" onClick={() => setShowNewAddressForm(!showNewAddressForm)}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  {showNewAddressForm ? "Cancel New Address" : "Deliver to New Address"}
                </Button>
              </div>
            )}
            {(!watchSelectedAddressId || showNewAddressForm) && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name for delivery" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mobile number for delivery" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address.addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Flat, House No., Building, Company, Apartment" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Area, Street, Sector, Village" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.landmark"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Landmark (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter a landmark" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="address.pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter pincode"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e)
                              if (e.target.value.length === 6) {
                                fetchPincodeData(e.target.value)
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Town/City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter town/city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              {!isAuthenticated && (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              <Button onClick={nextStep}>Proceed to Payment</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && !showOrderPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </h2>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value)
                        // This is handled by the useEffect now
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="online" id="online-payment" />
                        </FormControl>
                        <FormLabel htmlFor="online-payment" className="font-normal">
                          UPI / Google Pay / PhonePe / Paytm / Credit Card / Debit Card / Net Banking
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cod" id="cod" disabled={!isCodAvailable} />
                        </FormControl>
                        <FormLabel
                          htmlFor="cod"
                          className={`font-normal ${!isCodAvailable ? "text-muted-foreground" : ""}`}
                        >
                          Cash on Delivery
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isCodAvailable && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Cash on Delivery Unavailable</AlertTitle>
                <AlertDescription>
                  Cash on Delivery is only available for orders above ₹499. Please add more items to your cart or choose
                  online payment.
                </AlertDescription>
              </Alert>
            )}

            {watchPaymentMethod === "cod" && isCodAvailable && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-amber-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">Cash on Delivery Information</h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          A COD handling fee of <span className="font-semibold">₹48</span> will be added to your order.
                          This fee is charged by our delivery partners.
                        </li>
                        {codAdvancePayment > 0 && (
                          <>
                            <li>
                              You'll need to pay <span className="font-semibold">₹99</span> in advance to confirm your
                              order. This helps us prevent food wastage and ensure order commitment.
                            </li>
                            <li>
                              Remaining amount:{" "}
                              <span className="font-semibold">
                                {formatCurrency(total + codHandlingFee - codAdvancePayment - couponDiscount)}
                              </span>{" "}
                              to be paid at the time of delivery.
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded-md border border-amber-200">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-amber-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm text-amber-800 font-medium">
                          Our delivery partner will call you before delivery to confirm your order.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {watchPaymentMethod === "online" && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Online Payment Discount</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        You'll receive a <span className="font-semibold">5% discount</span> (
                        {formatCurrency(onlinePaymentDiscount)}) on your order total for choosing online payment!
                      </p>
                    </div>
                    <div className="mt-3 p-2 bg-white rounded-md border border-green-200">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        <p className="text-sm text-green-800 font-medium">
                          Secure payment gateway with multiple payment options available.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Calculate total for button display */}
            {(() => {
              const deliveryCharge = subtotal >= 699 ? 0 : 60
              const baseTotal = subtotal + (donation || 0) + deliveryCharge

              // For online payment, first apply 5% discount, then apply coupon discount
              const onlineTotal = baseTotal - 0.05 * subtotal - couponDiscount

              // For COD, add handling fee and subtract coupon discount
              const codTotal = baseTotal + (total >= 499 && total < 1499 ? 48 : 0) - couponDiscount

              // For COD with advance payment, calculate the remaining amount
              const codRemainingAmount = total >= 499 && total < 1499 ? codTotal - 99 : codTotal

              return (
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button onClick={handleOrderPreview} className="min-w-[200px]">
                    Order Preview
                  </Button>
                </div>
              )
            })()}
          </motion.div>
        )}

        {step === 3 && showOrderPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <OrderPreview
              cartItems={cartItems}
              user={user}
              selectedAddress={user?.addresses?.find((addr) => addr.id === form.getValues("selectedAddressId"))}
              newAddress={form.getValues("address")}
              paymentMethod={form.getValues("paymentMethod")}
              subtotal={subtotal}
              donation={donation}
              couponDiscount={couponDiscount}
              codHandlingFee={codHandlingFee}
              onlinePaymentDiscount={onlinePaymentDiscount}
              onBack={handleBackToPaymentMethod}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          </motion.div>
        )}
      </form>

      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Phone Number</DialogTitle>
            <DialogDescription>
              We've sent a 6-digit OTP to {form.getValues("phone")}. Please enter it below to verify your phone number.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
            />
            <Button onClick={verifyOtp} className="w-full">
              Verify OTP
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  )
}

