"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { useCartDrawerStore } from "@/lib/store"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X, ShoppingBag, Info, ChevronUp, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { formatCurrency } from "@/lib/utils"

const FREE_SHIPPING_THRESHOLD = 699

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, donation, setDonation } = useCart()
  const { isOpen, closeCart } = useCartDrawerStore()
  const router = useRouter()
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const mrpTotal = cartItems.reduce((total, item) => total + item.originalPrice * item.quantity, 0)
  const discountTotal = mrpTotal - subtotal
  const deliveryCharge = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 60
  const platformFee = 0

  const total = subtotal + deliveryCharge + platformFee + donation

  const progressValue = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)

  const handleProceedToCheckout = () => {
    closeCart()
    router.push("/checkout")
  }

  const handleContinueShopping = () => {
    closeCart()
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>My Cart ({cartItems.length})</SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-auto py-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg mb-4">Your cart is empty</p>
              <Button onClick={closeCart}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Free Shipping Progress */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <p className="text-sm">You've qualified for FREE shipping, Enjoy! 🎉</p>
                  ) : (
                    <p className="text-sm">
                      Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more for FREE shipping
                    </p>
                  )}
                </div>
                <Progress value={progressValue} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹0</span>
                  <span>₹{FREE_SHIPPING_THRESHOLD}</span>
                </div>
              </div>

              {/* Cart Items */}
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.isCombo}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex gap-4 border-b pb-4"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{formatCurrency(item.price)}</span>
                            <span className="text-sm text-muted-foreground line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                            <span className="text-sm text-green-600">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% Off
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id, item.isCombo)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-end">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-md rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.isCombo)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <div className="h-8 w-12 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none rounded-r-md"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.isCombo)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-6 space-y-4">
            {/* Collapsible Order Summary */}
            <div>
              <Button
                variant="ghost"
                className="w-full justify-between"
                onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
              >
                <span className="font-medium">Order Summary</span>
                {isOrderSummaryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              <AnimatePresence>
                {isOrderSummaryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total MRP</span>
                        <span>{formatCurrency(mrpTotal)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Discount on MRP</span>
                        <span>-{formatCurrency(discountTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center">
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
                          <span className="text-green-600">FREE</span>
                        ) : (
                          <span>{formatCurrency(deliveryCharge)}</span>
                        )}
                      </div>
                      {deliveryCharge > 0 && (
                        <p className="text-sm font-medium text-blue-600">
                          Add {formatCurrency(FREE_SHIPPING_THRESHOLD - subtotal)} more to get free delivery!
                        </p>
                      )}
                      <div className="flex justify-between">
                        <span>Platform Fee</span>
                        <span>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>

            {/* Checkout and Continue Shopping Buttons */}
            <div className="space-y-2">
              <Button className="w-full" size="lg" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" size="lg" onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

