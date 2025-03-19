"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface OrderPreviewProps {
  cartItems: any[]
  user: any
  selectedAddress: any
  newAddress: any
  paymentMethod: "cod" | "online"
  subtotal: number
  donation: number
  couponDiscount: number
  codHandlingFee: number
  onlinePaymentDiscount: number
  onBack: () => void
  onSubmit: () => void
}

export default function OrderPreview({
  cartItems,
  user,
  selectedAddress,
  newAddress,
  paymentMethod,
  subtotal,
  donation,
  couponDiscount,
  codHandlingFee,
  onlinePaymentDiscount,
  onBack,
  onSubmit,
}: OrderPreviewProps) {
  const address = selectedAddress || newAddress
  const deliveryCharge = subtotal >= 699 ? 0 : 60
  const total =
    subtotal +
    donation +
    deliveryCharge -
    couponDiscount +
    (paymentMethod === "cod" ? codHandlingFee : 0) -
    (paymentMethod === "online" ? onlinePaymentDiscount : 0)

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
          <div className="flex items-center justify-between">
            <Image src="/logo.png" alt="Swaadishta Logo" width={150} height={50} />
            <h2 className="text-3xl font-bold">Order Preview</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.mobile}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
              <p>{address.fullName}</p>
              <p>{address.addressLine1}</p>
              <p>{address.addressLine2}</p>
              <p>
                {address.city}, {address.state} - {address.pincode}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            <div className="space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>{deliveryCharge === 0 ? "FREE" : formatCurrency(deliveryCharge)}</span>
              </div>
              {donation > 0 && (
                <div className="flex justify-between">
                  <span>Donation</span>
                  <span>{formatCurrency(donation)}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
              )}
              {paymentMethod === "cod" && codHandlingFee > 0 && (
                <div className="flex justify-between">
                  <span>COD Handling Fee</span>
                  <span>{formatCurrency(codHandlingFee)}</span>
                </div>
              )}
              {paymentMethod === "online" && onlinePaymentDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Online Payment Discount</span>
                  <span>-{formatCurrency(onlinePaymentDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
            <p>{paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onBack}>
              Back to Payment Options
            </Button>
            <Button onClick={onSubmit} className="min-w-[200px]">
              Pay {formatCurrency(total)}
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
          <p>Thank you for choosing Swaadishta! We appreciate your business.</p>
        </div>
      </div>
    </div>
  )
}

