"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart, type CartItem } from "@/components/cart-provider"

const comboOffers = [
  {
    id: 1,
    name: "Festival Celebration Pack",
    description: "A perfect assortment of sweet and savory snacks for festive occasions",
    price: 999,
    originalPrice: 1299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11.jpg-UspW2P3kaJA6J1vV6VSyoMhf1rPi0D.jpeg",
    items: ["Besan Ladoo (500g)", "Masala Mathri (250g)", "Aloo Bhujia (200g)", "Kaju Katli (250g)"],
    discount: 23,
  },
  {
    id: 2,
    name: "Family Snack Box",
    description: "Variety of snacks perfect for family gatherings and movie nights",
    price: 799,
    originalPrice: 999,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12.jpg-0Hk4VEcPxMcDrgu1q2wGTcCumYCUS7.jpeg",
    items: ["Methi Mathri (200g)", "Dry Fruit Mixture (300g)", "Moong Dal (200g)", "Bhakarwadi (150g)"],
    discount: 20,
  },
  {
    id: 3,
    name: "Diwali Special Hamper",
    description: "Celebrate the festival of lights with our curated selection of sweets and savories",
    price: 1299,
    originalPrice: 1599,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-06%20at%2022.42.33_507f73eb.jpg-fCmWFqgFpKNbJTzSk4uKId4db4sNge.jpeg",
    items: ["Soan Papdi (400g)", "Gulab Jamun (500g)", "Namkeen Mix (300g)", "Kesar Peda (250g)"],
    discount: 19,
  },
]

export default function ComboOffers() {
  const [activeCombo, setActiveCombo] = useState(0)
  const [direction, setDirection] = useState(0)
  const { toast } = useToast()
  const { cartItems, addToCart, updateQuantity } = useCart()
  const [animatingProduct, setAnimatingProduct] = useState<{ id: number; x: number; y: number } | null>(null)
  const cartIconRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      nextCombo()
    }, 5000)
    return () => clearInterval(interval)
  }, [activeCombo])

  useEffect(() => {
    const cartIcon = document.querySelector(".cart-icon") as HTMLElement
    if (cartIcon) {
      const rect = cartIcon.getBoundingClientRect()
      cartIconRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
    }
  }, [])

  const nextCombo = () => {
    setDirection(1)
    setActiveCombo((prev) => (prev + 1) % comboOffers.length)
  }

  const prevCombo = () => {
    setDirection(-1)
    setActiveCombo((prev) => (prev - 1 + comboOffers.length) % comboOffers.length)
  }

  const handleAddToCart = (combo: (typeof comboOffers)[0], event: React.MouseEvent) => {
    const cartItem: CartItem = {
      id: combo.id,
      name: combo.name,
      price: combo.price,
      image: combo.image,
      quantity: 1,
      isCombo: true,
    }
    addToCart(cartItem)

    const rect = event.currentTarget.getBoundingClientRect()
    setAnimatingProduct({
      id: combo.id,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })

    setTimeout(() => {
      setAnimatingProduct(null)
    }, 1000)

    // The toast is now handled in the CartProvider
  }

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      }
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      }
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair text-center mb-16">Exclusive Combo Offers</h2>

        <div className="relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeCombo}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={comboOffers[activeCombo].image || "/placeholder.svg"}
                  alt={comboOffers[activeCombo].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-playfair text-white mb-2">{comboOffers[activeCombo].name}</h3>
                  <p className="text-white/80 text-lg">{comboOffers[activeCombo].description}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-playfair mb-4">{comboOffers[activeCombo].name}</h3>
                  <p className="text-muted-foreground text-lg">{comboOffers[activeCombo].description}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-medium">Includes:</h4>
                  <ul className="space-y-2">
                    {comboOffers[activeCombo].items.map((item, index) => (
                      <li key={index} className="flex items-center text-lg">
                        <span className="mr-2 text-primary">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-end gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Special Price</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-semibold">₹{comboOffers[activeCombo].price}</span>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{comboOffers[activeCombo].originalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="text-lg font-medium text-destructive">{comboOffers[activeCombo].discount}% OFF</div>
                </div>

                {cartItems.find((item) => item.id === comboOffers[activeCombo].id && item.isCombo) ? (
                  <div className="flex items-center justify-between w-full">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const currentItem = cartItems.find(
                          (item) => item.id === comboOffers[activeCombo].id && item.isCombo,
                        )
                        if (currentItem) {
                          updateQuantity(comboOffers[activeCombo].id, currentItem.quantity - 1, true)
                        }
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>
                      {cartItems.find((item) => item.id === comboOffers[activeCombo].id && item.isCombo)?.quantity || 0}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const currentItem = cartItems.find(
                          (item) => item.id === comboOffers[activeCombo].id && item.isCombo,
                        )
                        if (currentItem) {
                          updateQuantity(comboOffers[activeCombo].id, currentItem.quantity + 1, true)
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="w-full text-lg"
                    onClick={(e) => handleAddToCart(comboOffers[activeCombo], e)}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevCombo}
            className="absolute top-1/2 left-4 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors flex items-center justify-center text-white z-10"
            aria-label="Previous combo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextCombo}
            className="absolute top-1/2 right-4 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors flex items-center justify-center text-white z-10"
            aria-label="Next combo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {comboOffers.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCombo(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeCombo ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
              }`}
              aria-label={`Go to combo ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {animatingProduct && (
          <motion.div
            key={animatingProduct.id}
            initial={{ scale: 0.5, x: animatingProduct.x, y: animatingProduct.y, opacity: 0.5 }}
            animate={{
              scale: 0.1,
              x: cartIconRef.current.x,
              y: cartIconRef.current.y,
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
            className="fixed z-50 pointer-events-none"
          >
            <Image
              src={comboOffers.find((p) => p.id === animatingProduct.id)?.image || "/placeholder.svg"}
              alt="Product"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

