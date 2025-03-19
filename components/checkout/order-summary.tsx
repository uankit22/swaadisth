"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/components/cart-provider"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Info, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import CouponInput from "@/components/checkout/coupon-input"
import { formatCurrency } from "@/lib/utils"

// Add a prop to expose the coupon discount
export default function OrderSummary({
  paymentMethod,
  onCouponChange,
}: {
  paymentMethod: "cod" | "online"
  onCouponChange?: (discount: number) => void
}) {
  const { cartItems, donation, setDonation } = useCart()
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string
    discount: number
    type: "percentage" | "fixed"
  } | null>(null)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const mrpTotal = cartItems.reduce((total, item) => total + item.originalPrice * item.quantity, 0)
  const discountTotal = mrpTotal - subtotal
  const deliveryCharge = subtotal >= 699 ? 0 : 60
  const platformFee = 0

  const calculateCouponDiscount = () => {
    if (!appliedCoupon) return 0
    if (appliedCoupon.type === "fixed") return appliedCoupon.discount
    return Math.min((subtotal * appliedCoupon.discount) / 100, subtotal)
  }

  const couponDiscount = calculateCouponDiscount()

  // After calculating couponDiscount, add this effect to notify parent component
  useEffect(() => {
    if (onCouponChange) {
      onCouponChange(couponDiscount)
    }
  }, [couponDiscount, onCouponChange])

  // Apply COD handling fee only if COD is selected and order is between ₹499 and ₹1499
  const codHandlingFee = paymentMethod === "cod" && subtotal >= 499 && subtotal < 1499 ? 48 : 0

  // Apply online payment discount only if online payment is selected
  const onlinePaymentDiscount = paymentMethod === "online" ? 0.05 * subtotal : 0

  // Calculate total with all applicable fees and discounts
  const total =
    subtotal + deliveryCharge + platformFee + donation - couponDiscount + codHandlingFee - onlinePaymentDiscount

  // For COD orders between ₹499 and ₹1499, split payment into advance and delivery
  const codAdvancePayment = paymentMethod === "cod" && subtotal >= 499 && subtotal < 1499 ? 99 : 0
  const codRemainingPayment = codAdvancePayment > 0 ? total - codAdvancePayment : 0

  // Calculate total savings
  const deliveryFeeSaved = subtotal >= 699 ? 60 : 0
  const platformFeeSaved = 10
  const totalSavings = discountTotal + couponDiscount + deliveryFeeSaved + platformFeeSaved + onlinePaymentDiscount

  const handleApplyCoupon = (discount: number, discountType: "percentage" | "fixed", code: string) => {
    setAppliedCoupon({ code, discount, type: discountType })
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      {/* Total Savings Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold text-green-700 mb-2">Your Total Savings</h3>
        <div className="text-3xl font-bold text-green-600">{formatCurrency(totalSavings)}</div>
        <p className="text-sm text-green-600 mt-1">
          You're saving on MRP, {appliedCoupon ? "coupon discount, " : ""}
          {deliveryFeeSaved > 0 ? "delivery fee, " : ""}
          {onlinePaymentDiscount > 0 ? "online payment, " : ""}
          and platform fee!
        </p>
      </div>

      <div className="space-y-2">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.isCombo}`} className="flex flex-col space-y-1">
            <div className="flex justify-between text-sm">
              <span className="flex-grow">
                {item.name} <span className="text-muted-foreground">x {item.quantity}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(item.originalPrice * item.quantity)}
                </span>
              </div>
            </div>
            <div className="text-xs text-green-600">
              You save {formatCurrency((item.originalPrice - item.price) * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Total MRP</span>
          <span className="font-medium">{formatCurrency(mrpTotal)}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Discount on MRP</span>
          <span className="font-medium">-{formatCurrency(discountTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <span>Delivery Charge</span>
                  <Info className="h-4 w-4 text-muted-foreground ml-1" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Free delivery on orders above ₹699</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {deliveryCharge === 0 ? (
            <span className="font-medium text-green-600">FREE</span>
          ) : (
            <span className="font-medium">{formatCurrency(deliveryCharge)}</span>
          )}
        </div>
        {deliveryCharge > 0 && (
          <p className="text-sm font-medium text-blue-600">
            Add {formatCurrency(699 - subtotal)} more to get free delivery!
          </p>
        )}
        <div className="flex justify-between text-sm">
          <span>Platform Fee</span>
          <span className="font-medium">
            <span className="line-through text-red-500 mr-1">₹10.00</span>
            <span className="text-green-600">{formatCurrency(platformFee)}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="feed-india"
            checked={donation === 5}
            onCheckedChange={(checked) => setDonation(checked ? 5 : 0)}
          />
          <label
            htmlFor="feed-india"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Donate ₹5 to Feed India
          </label>
        </div>
      </div>
      {donation > 0 && (
        <div className="flex justify-between text-sm">
          <span>Donation to Feed India</span>
          <span className="font-medium">₹5</span>
        </div>
      )}
      {appliedCoupon && (
        <div className="flex justify-between items-center text-sm text-green-600">
          <span>Coupon Discount ({appliedCoupon.code})</span>
          <div className="flex items-center">
            <span className="font-medium mr-2">-{formatCurrency(couponDiscount)}</span>
            <button onClick={removeCoupon} className="text-red-500 hover:text-red-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      {codHandlingFee > 0 && (
        <div className="flex justify-between text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <span>COD Handling Fee</span>
                  <Info className="h-4 w-4 text-muted-foreground ml-1" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>This fee is charged by our delivery partners for cash handling.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-medium">{formatCurrency(codHandlingFee)}</span>
        </div>
      )}

      {onlinePaymentDiscount > 0 && (
        <div className="flex justify-between text-sm text-green-600">
          <span>Online Payment Discount (5%)</span>
          <span className="font-medium">-{formatCurrency(onlinePaymentDiscount)}</span>
        </div>
      )}

      <Separator />
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {/* Payment breakdown for COD with advance payment */}
      {paymentMethod === "cod" && codAdvancePayment > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4 shadow-sm">
          <h4 className="font-semibold text-blue-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cash on Delivery Payment Breakdown
          </h4>
          <div className="mt-3 space-y-3">
            <div className="flex justify-between items-center bg-white p-2 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-blue-700">Pay Now (Advance):</span>
              </div>
              <span className="font-bold text-blue-700">{formatCurrency(codAdvancePayment)}</span>
            </div>

            <div className="flex justify-between items-center bg-white p-2 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-indigo-700">Pay at Delivery:</span>
              </div>
              <span className="font-bold text-indigo-700">{formatCurrency(codRemainingPayment)}</span>
            </div>

            <div className="mt-2 bg-blue-100 p-2 rounded-md flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
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
              <p className="text-sm text-blue-700">
                The advance payment helps us confirm your order and prevent food wastage. The remaining amount will be
                collected by our delivery partner when your order is delivered.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4">
        <h3 className="text-sm font-medium mb-2">Apply Coupon</h3>
        <CouponInput onApplyCoupon={handleApplyCoupon} subtotal={subtotal} />
      </div>
      <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes</p>
    </div>
  )
}

