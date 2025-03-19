"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import CheckoutForm from "@/components/checkout/checkout-form"
import OrderSummary from "@/components/checkout/order-summary"
import { useCartDrawerStore } from "@/lib/store"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CheckoutPage() {
  const { openCart } = useCartDrawerStore()
  const { cartItems } = useCart()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"cod" | "online">("online")
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  // Add state for coupon discount
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Example: Replace with actual authentication check
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (isClient && isAuthenticated) {
      setStep(2) // Skip to address selection for authenticated users
    }
  }, [isClient, isAuthenticated])

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleBackToCart = () => {
    openCart()
  }

  const handleGoToShopping = () => {
    router.push("/")
  }

  const handlePaymentMethodChange = (method: "cod" | "online") => {
    setSelectedPaymentMethod(method)
  }

  // If we're on the client and the cart is empty, show error message
  if (isClient && cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-red-700 mb-2">Your Cart is Empty</h2>
            <p className="text-red-600 mb-6">Please add some items to your cart before proceeding to checkout.</p>
            <Button onClick={handleGoToShopping} className="w-full">
              Continue Shopping
            </Button>
          </div>

          <div className="mt-8">
            <p className="text-muted-foreground mb-4">Popular categories you might like:</p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => router.push("/category/sweets")}>
                Sweets
              </Button>
              <Button variant="outline" onClick={() => router.push("/category/namkeen")}>
                Namkeen
              </Button>
              <Button variant="outline" onClick={() => router.push("/category/dry-fruits")}>
                Dry Fruits
              </Button>
              <Button variant="outline" onClick={() => router.push("/category/festive")}>
                Festive Specials
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          <Button variant="outline" className="flex items-center gap-2" onClick={handleBackToCart}>
            <ShoppingCart className="h-4 w-4" />
            Back to Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              {/* Update the CheckoutForm component to receive the coupon discount */}
              <CheckoutForm onPaymentMethodChange={handlePaymentMethodChange} couponDiscount={couponDiscount} />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                {/* Update the OrderSummary component to pass the coupon discount */}
                <OrderSummary paymentMethod={selectedPaymentMethod} onCouponChange={setCouponDiscount} />
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Why Choose Swaadishta?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Image src="/icons/authentic.svg" alt="Authentic" width={24} height={24} />
                    <span>100% Authentic Recipes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Image src="/icons/natural.svg" alt="Natural" width={24} height={24} />
                    <span>No Preservatives</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Image src="/icons/delivery.svg" alt="Fast Delivery" width={24} height={24} />
                    <span>Fast & Secure Delivery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

