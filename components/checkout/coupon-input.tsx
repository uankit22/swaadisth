"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Scissors, Tag, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CouponInputProps {
  onApplyCoupon: (discount: number, discountType: "percentage" | "fixed", code: string) => void
  subtotal: number
}

const availableCoupons = [
  {
    code: "SAVE100",
    title: "Flat ₹100 off",
    description: "Flat ₹100 off on orders above ₹1500",
    minOrder: 1500,
    discount: 100,
    type: "fixed" as const,
  },
  {
    code: "DISCOUNT10",
    title: "10% off on all orders",
    description: "10% off on all orders",
    minOrder: 0,
    discount: 10,
    type: "percentage" as const,
  },
  {
    code: "FESTIVE20",
    title: "20% off on orders above ₹2000",
    description: "20% off on orders above ₹2000",
    minOrder: 2000,
    discount: 20,
    type: "percentage" as const,
  },
]

export default function CouponInput({ onApplyCoupon, subtotal }: CouponInputProps) {
  const [coupon, setCoupon] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [expandedDetails, setExpandedDetails] = useState<string[]>([])
  const { toast } = useToast()

  const handleApplyCoupon = async (couponCode: string) => {
    setIsApplying(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const appliedCoupon = availableCoupons.find((c) => c.code === couponCode)

    if (appliedCoupon) {
      if (subtotal >= appliedCoupon.minOrder) {
        onApplyCoupon(appliedCoupon.discount, appliedCoupon.type, appliedCoupon.code)
        showNotification("success", `Coupon ${appliedCoupon.code} applied successfully!`)
        setIsDialogOpen(false)
        setCoupon("")
      } else {
        showNotification("error", `Minimum order amount of ₹${appliedCoupon.minOrder} not met.`)
      }
    } else {
      showNotification("error", "Invalid coupon code.")
    }

    setIsApplying(false)
  }

  const toggleDetails = (code: string) => {
    setExpandedDetails((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]))
  }

  const showNotification = (type: "success" | "error", message: string) => {
    toast({
      title: type === "success" ? "Coupon Applied" : "Coupon Error",
      description: message,
      duration: 2000,
      className: type === "success" ? "bg-green-500" : "bg-red-500",
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border-2 border-[rgb(174,171,171)] focus:ring-2 focus:ring-primary"
        />
        <Button
          onClick={() => handleApplyCoupon(coupon)}
          disabled={!coupon || isApplying}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {isApplying ? "Applying..." : "Apply"}
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="w-full mt-2 bg-[rgb(148,163,184)] hover:bg-[rgb(148,163,184)]/90 transition-colors rounded-lg p-4 text-white relative group">
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-3" />
              <div className="flex-1 text-left">
                <div className="font-medium">Coupons & Offers</div>
                <div className="text-sm text-white/90">Apply now and save extra!</div>
              </div>
              <div className="bg-white rounded-full p-1">
                <ChevronRight className="h-4 w-4 text-[rgb(148,163,184)]" />
              </div>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Available Coupons</DialogTitle>
            <DialogDescription>Apply these coupons to get discounts on your order.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {availableCoupons.map((coupon) => (
              <motion.div
                key={coupon.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative border-2 border-[rgb(174,171,171)] border-dashed rounded-lg p-4 hover:shadow-md transition-all duration-300 bg-white"
              >
                {/* Coupon notches */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-l-2 border-t-2 border-b-2 border-[rgb(174,171,171)] border-dashed rounded-l-full" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background border-r-2 border-t-2 border-b-2 border-[rgb(174,171,171)] border-dashed rounded-r-full" />

                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold text-lg">{coupon.title}</h3>
                    <p className="text-orange-500 text-sm font-medium">{coupon.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <motion.button
                      className="px-4 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                      onClick={() => handleApplyCoupon(coupon.code)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                    <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                      {coupon.code}
                    </span>
                  </div>
                </div>
                <Scissors className="absolute -top-3 -right-3 h-6 w-6 text-[rgb(174,171,171)] transform rotate-90" />
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

