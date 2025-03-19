"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import OrderPreview from "@/components/checkout/order-preview"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/contexts/AuthContext"

export default function OrderPreviewPage() {
  const router = useRouter()
  const { cartItems, donation } = useCart()
  const { user } = useAuth()
  const [orderData, setOrderData] = useState(null)

  useEffect(() => {
    const storedOrderData = localStorage.getItem("orderPreviewData")
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData))
    } else {
      router.push("/checkout")
    }
  }, [router])

  const handleBack = () => {
    router.push("/checkout")
  }

  const handleSubmit = () => {
    // Here you would typically handle the final submission
    // For now, we'll just log the order data
    console.log("Submitting order:", orderData)
    // Clear the stored order data
    localStorage.removeItem("orderPreviewData")
    // Redirect to a confirmation page or handle payment processing
    router.push("/order-confirmation")
  }

  if (!orderData) {
    return <div>Loading...</div>
  }

  return (
    <OrderPreview
      cartItems={cartItems}
      user={user}
      selectedAddress={orderData.selectedAddress}
      newAddress={orderData.newAddress}
      paymentMethod={orderData.paymentMethod}
      subtotal={orderData.subtotal}
      donation={donation}
      couponDiscount={orderData.couponDiscount}
      codHandlingFee={orderData.codHandlingFee}
      onlinePaymentDiscount={orderData.onlinePaymentDiscount}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  )
}

