"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Minus, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart, type CartItem } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Sample product data
const products = [
  {
    id: 1,
    name: "Masala Mathri",
    price: 199,
    originalPrice: 249,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
    isNew: true,
    isBestseller: true,
    rating: 4.8,
    reviews: 124,
    description:
      "Crispy, flaky, and perfectly spiced traditional mathri made with authentic spices and ghee. A perfect tea-time snack that brings the taste of home.",
    ingredients: "Wheat flour, ghee, carom seeds, cumin seeds, black pepper, salt",
    weight: "250g",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
    ],
  },
  {
    id: 2,
    name: "Besan Ladoo",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 4.9,
    reviews: 87,
    description:
      "Melt-in-your-mouth besan ladoos made with roasted gram flour, ghee, and just the right amount of sweetness. A traditional sweet that's perfect for any occasion.",
    ingredients: "Gram flour, ghee, sugar, cardamom powder, almonds",
    weight: "500g",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 3,
    name: "Aloo Bhujia",
    price: 149,
    originalPrice: 199,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: false,
    rating: 4.7,
    reviews: 56,
    description:
      "Crispy, spicy potato sev that's perfect for snacking anytime. Made with fresh potatoes and a blend of traditional spices for that authentic taste.",
    ingredients: "Potato, gram flour, vegetable oil, spices, salt",
    weight: "200g",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 4,
    name: "Dry Fruit Mixture",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: false,
    rating: 4.9,
    reviews: 42,
    description:
      "Premium mixture of handpicked dry fruits and nuts, lightly roasted and seasoned. A healthy and delicious snack packed with nutrients.",
    ingredients: "Almonds, cashews, pistachios, raisins, dried figs, cardamom",
    weight: "300g",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 5,
    name: "Methi Mathri",
    price: 179,
    originalPrice: 229,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: false,
    rating: 4.6,
    reviews: 38,
    description:
      "Crispy mathri infused with the goodness of fenugreek leaves. A perfect balance of flavors that makes for an irresistible snack.",
    ingredients: "Wheat flour, ghee, fenugreek leaves, spices, salt",
    weight: "250g",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 6,
    name: "Kaju Katli",
    price: 499,
    originalPrice: 599,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 5.0,
    reviews: 112,
    description:
      "Delicate, melt-in-your-mouth cashew fudge made with premium cashews and just the right amount of sweetness. A classic Indian sweet loved by all.",
    ingredients: "Cashews, sugar, ghee, cardamom powder, silver varq",
    weight: "250g",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
]

export default function PopularProducts() {
  const [selectedTab, setSelectedTab] = useState("description")
  const { cartItems, addToCart, updateQuantity } = useCart()
  const { toast } = useToast()
  const cartIconRef = useRef(null)
  const [animatingProduct, setAnimatingProduct] = useState<{ id: number; x: number; y: number } | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
      isCombo: false,
    }
    addToCart(cartItem)

    const rect = event.currentTarget.getBoundingClientRect()
    setAnimatingProduct({
      id: product.id,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    })

    setTimeout(() => {
      setAnimatingProduct(null)
    }, 1000)
  }

  const renderProductCard = (product: any) => (
    <Card className="product-card overflow-hidden border-border/40 h-full">
      <div className="relative aspect-square overflow-hidden bg-muted/30 group">
        <Link href={`/product/${product.id}`} className="block absolute inset-0 z-10">
          <span className="sr-only">View {product.name} details</span>
        </Link>
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {product.isBestseller && <Badge variant="secondary">Bestseller</Badge>}
        </div>

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                Quick View
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Quick View</DialogTitle>
                <DialogDescription>Take a closer look at this product</DialogDescription>
              </DialogHeader>

              {/* Product quick view content */}
              {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {product.images.map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Product image ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-display">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-muted-foreground line-through">₹{product.originalPrice}</span>
                          <span className="text-destructive font-medium">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>
                      <TabsContent value="description" className="py-4">
                        <p>{product.description}</p>
                      </TabsContent>
                      <TabsContent value="ingredients" className="py-4">
                        <p>{product.ingredients}</p>
                      </TabsContent>
                      <TabsContent value="details" className="py-4">
                        <p>Weight: {product.weight}</p>
                        <p className="mt-2">100% Authentic & Handmade</p>
                        <p className="mt-2">No preservatives or artificial flavors</p>
                      </TabsContent>
                    </Tabs>

                    <div className="flex gap-4 pt-4">
                      <Button className="flex-1 gap-2" onClick={(e) => handleAddToCart(product, e)}>
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>

                    <Link href={`/product/${product.id}`} className="block w-full">
                      <Button variant="secondary" className="w-full">
                        View Full Details
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium text-lg hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-semibold">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="text-muted-foreground line-through text-sm">₹{product.originalPrice}</span>
          )}
          {product.originalPrice > product.price && (
            <span className="text-destructive text-sm font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {cartItems.find((item) => item.id === product.id && !item.isCombo) ? (
          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center justify-between w-full">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const currentItem = cartItems.find((item) => item.id === product.id && !item.isCombo)
                  if (currentItem) {
                    updateQuantity(product.id, currentItem.quantity - 1, false)
                  }
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span>{cartItems.find((item) => item.id === product.id && !item.isCombo)?.quantity || 0}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const currentItem = cartItems.find((item) => item.id === product.id && !item.isCombo)
                  if (currentItem) {
                    updateQuantity(product.id, currentItem.quantity + 1, false)
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-amber-600 font-medium">Very few stock left!</p>
          </div>
        ) : (
          <Button
            className="w-full gap-2 group bg-primary hover:bg-primary/90"
            onClick={(e) => handleAddToCart(product, e)}
          >
            <ShoppingCart className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <section className="relative px-2 sm:px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-display mb-2">Popular Products</h2>
          <p className="text-muted-foreground">Our most loved authentic snacks</p>
        </div>
        <Button variant="link" className="mt-2 md:mt-0 p-0 group" asChild>
          <Link href="/popular-products">
            View All Popular Products
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </Button>
      </div>

      <div className="relative overflow-hidden">
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <motion.div key={product.id} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                {renderProductCard(product)}
              </motion.div>
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                    {renderProductCard(product)}
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation arrows for desktop */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md flex items-center justify-center"
              onClick={() => document.querySelector("[data-carousel-prev]")?.click()}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-md flex items-center justify-center"
              onClick={() => document.querySelector("[data-carousel-next]")?.click()}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>

            {/* Hidden but functional carousel controls */}
            <div className="hidden">
              <CarouselPrevious data-carousel-prev />
              <CarouselNext data-carousel-next />
            </div>
          </Carousel>
        )}
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
              src={products.find((p) => p.id === animatingProduct.id)?.image || "/placeholder.svg"}
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

