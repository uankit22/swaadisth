"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion" // Add AnimatePresence
import {
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Check,
  Share2,
  Truck,
  Clock,
  Shield,
  Leaf,
  Gift,
  Home,
  ZoomIn,
  Play,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { useCart, type CartItem } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useRouter } from "next/navigation"
import { useCartDrawerStore } from "@/lib/store"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Types for product data
interface ProductWeight {
  value: string
  label: string
  price: number
  originalPrice: number
}

interface ProductReview {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

interface RelatedProduct {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
}

interface ProductProps {
  id: number
  name: string
  description: string
  shortDescription: string
  price: number
  originalPrice: number
  image: string
  images: string[]
  rating: number
  reviews: number
  isNew: boolean
  isBestseller: boolean
  category: string
  tags: string[]
  ingredients: string
  nutritionalInfo: {
    calories: number
    protein: number
    fat: number
    carbs: number
    sugar: number
  }
  storage: string
  shelfLife: string
  weightOptions: ProductWeight[]
  productReviews: ProductReview[]
  relatedProducts: RelatedProduct[]
  videoUrl?: string
}

export default function ProductDescription({ product }: { product: ProductProps }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0].value)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showVideo, setShowVideo] = useState(false)
  const [showEnquiryDialog, setShowEnquiryDialog] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showARView, setShowARView] = useState(false)
  const [activeTab, setActiveTab] = useState("ingredients")
  const [isScrolled, setIsScrolled] = useState(false)
  const [showImageGallery, setShowImageGallery] = useState(false)

  // Add floating action button state
  const [showFAB, setShowFAB] = useState(false)
  const [showFABMenu, setShowFABMenu] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const imageRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [enquiryFormData, setEnquiryFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const { openCart } = useCartDrawerStore()

  // Get the selected weight option
  const selectedWeightOption =
    product.weightOptions.find((option) => option.value === selectedWeight) || product.weightOptions[0]

  // Check if product is in cart
  const isInCart = cartItems.some((item) => item.id === product.id)
  const cartItem = cartItems.find((item) => item.id === product.id)

  // Update quantity state when cart changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity)
    }
  }, [cartItem])

  // Handle scroll events for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle scroll events for floating action button
  useEffect(() => {
    const handleScrollForFAB = () => {
      if (window.scrollY > 300) {
        setShowFAB(true)
      } else {
        setShowFAB(false)
        if (showFABMenu) setShowFABMenu(false)
      }
    }

    window.addEventListener("scroll", handleScrollForFAB)
    return () => window.removeEventListener("scroll", handleScrollForFAB)
  }, [showFABMenu])

  // Handle image zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  // Handle touch move for mobile zoom
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageRef.current || e.touches.length !== 1) return

    const touch = e.touches[0]
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = ((touch.clientX - left) / width) * 100
    const y = ((touch.clientY - top) / height) * 100

    setZoomPosition({ x, y })
  }

  // Handle add to cart
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: `${product.name} - ${selectedWeightOption.label}`,
      price: selectedWeightOption.price,
      originalPrice: selectedWeightOption.originalPrice,
      image: product.image,
      quantity: quantity,
      isCombo: false,
    }

    addToCart(cartItem)

    toast({
      title: "Added to cart",
      description: `${product.name} - ${selectedWeightOption.label} has been added to your cart.`,
      duration: 2000,
    })
  }

  // Handle buy now
  const handleBuyNow = () => {
    handleAddToCart()
    // Navigate to checkout
    router.push("/checkout")
  }

  // Handle quantity increase
  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1, false)
    } else {
      setQuantity(quantity + 1)
    }
  }

  // Update the handleDecreaseQuantity function
  const handleDecreaseQuantity = () => {
    if (cartItem) {
      if (cartItem.quantity <= 1) {
        // Remove the item from cart when quantity is 1 and minus is clicked
        removeFromCart(product.id, false)
        setQuantity(1) // Reset the quantity state to 1
      } else {
        // Otherwise just decrease the quantity
        updateQuantity(product.id, cartItem.quantity - 1, false)
      }
    } else if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Enquiry submitted:", enquiryFormData)
    toast({
      title: "Enquiry Submitted",
      description: "We'll get back to you soon!",
      duration: 3000,
    })
    setShowEnquiryDialog(false)
    setEnquiryFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    })
  }

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share && window.isSecureContext) {
      navigator
        .share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
        .catch((error) => {
          // If sharing fails, show share options dialog
          setShowShareOptions(true)
        })
    } else {
      // Fallback for browsers that don't support Web Share API
      setShowShareOptions(true)
    }
  }

  // Copy product link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard",
      duration: 2000,
    })
    setShowShareOptions(false)
  }

  // Handle favorite toggle
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      description: !isFavorite
        ? `${product.name} has been added to your favorites.`
        : `${product.name} has been removed from your favorites.`,
      duration: 2000,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 pb-16">
      {/* Sticky header for mobile */}
      <div
        ref={headerRef}
        className={`sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="rounded-full p-2 hover:bg-muted transition-colors">
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
              className="lucide lucide-arrow-left"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span className="sr-only">Back</span>
          </button>

          <div className={`transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-base font-medium truncate max-w-[200px]">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="rounded-full p-2 hover:bg-muted transition-colors">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </button>

            <button onClick={() => openCart()} className="rounded-full p-2 hover:bg-muted transition-colors relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Breadcrumb navigation - hidden on mobile */}
        <div className="hidden md:flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">Home</span>
          </Link>
          <span>/</span>
          <Link href="/popular-products" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <span>/</span>
          <Link
            href={`/popular-products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-primary font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Product Display Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Product Image with Zoom */}
            <div
              ref={imageRef}
              className="relative aspect-square overflow-hidden rounded-2xl border border-border/40 bg-muted/30 touch-none"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onTouchStart={() => setIsZoomed(true)}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => setIsZoomed(false)}
              onClick={() => setShowImageGallery(true)}
            >
              {/* Product badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {product.isNew && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="bg-primary text-primary-foreground">New</Badge>
                  </motion.div>
                )}
                {product.isBestseller && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Badge variant="secondary">Bestseller</Badge>
                  </motion.div>
                )}
              </div>

              {/* Video play button if video exists */}
              {product.videoUrl && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowVideo(true)
                  }}
                  className="absolute bottom-3 right-3 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors"
                >
                  <Play className="h-5 w-5" />
                </motion.button>
              )}

              {/* AR View button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowARView(true)
                }}
                className="absolute bottom-3 left-3 z-10 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-view-3d"
                >
                  <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3s.7 2.4 1.7 3c-.3 1.2 0 2.5 1 3.4.8.8 2.1 1.2 3.3 1 .6 1 1.8 1.6 3 1.6s2.4-.6 3-1.7c1.2.3 2.5 0 3.4-1 .8-.8 1.2-2 1-3.3 1-.6 1.6-1.8 1.6-3s-.6-2.4-1.7-3c.3-1.2 0-2.5-1-3.4a3.7 3.7 0 0 0-3.3-1c-.6-1-1.8-1.6-3-1.6Z" />
                  <path d="M12 9v6" />
                  <path d="m8 12 4 3 4-3" />
                </svg>
                <span className="sr-only">View in 3D</span>
              </motion.button>

              {/* Zoom indicator - only on desktop */}
              <div className="absolute top-3 right-3 z-10 hidden md:block">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-black/70 text-white p-2 rounded-full">
                        <ZoomIn className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hover to zoom</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Mobile tap to zoom indicator */}
              <div className="absolute top-3 right-3 z-10 md:hidden">
                <div className="bg-black/70 text-white p-2 rounded-full">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>

              {/* Normal image */}
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Zoomed image overlay */}
              {isZoomed && (
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat z-10"
                  style={{
                    backgroundImage: `url(${product.images[selectedImage] || "/placeholder.svg"})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: "scale(1.5)",
                  }}
                />
              )}
            </div>

            {/* Thumbnail Gallery - Horizontal Scrollable */}
            <div ref={carouselRef} className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all snap-start ${
                    selectedImage === index ? "border-primary" : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}

              {/* Video thumbnail if video exists */}
              {product.videoUrl && (
                <motion.button
                  onClick={() => setShowVideo(true)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 border-transparent hover:border-primary/50 bg-black/10 snap-start"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                </motion.button>
              )}
            </div>

            {/* Scroll indicators for thumbnails - only shown when needed */}
            <div className="flex justify-center gap-1 md:hidden">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index)
                    carouselRef.current?.scrollTo({
                      left: index * 84, // Approximate width of each thumbnail + gap
                      behavior: "smooth",
                    })
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    selectedImage === index ? "w-4 bg-primary" : "w-1.5 bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Video Dialog */}
            {product.videoUrl && (
              <Dialog open={showVideo} onOpenChange={setShowVideo}>
                <DialogContent className="sm:max-w-[800px] p-1">
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={product.videoUrl}
                      title={`${product.name} video`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {/* AR View Dialog */}
            <Dialog open={showARView} onOpenChange={setShowARView}>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>3D View</DialogTitle>
                  <DialogDescription>
                    Experience the product in 3D. Rotate and zoom to see all details.
                  </DialogDescription>
                </DialogHeader>
                <div className="relative aspect-square w-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-view-3d mx-auto mb-4 text-muted-foreground"
                    >
                      <path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3s.7 2.4 1.7 3c-.3 1.2 0 2.5 1 3.4.8.8 2.1 1.2 3.3 1 .6 1 1.8 1.6 3 1.6s2.4-.6 3-1.7c1.2.3 2.5 0 3.4-1 .8-.8 1.2-2 1-3.3 1-.6 1.6-1.8 1.6-3s-.6-2.4-1.7-3c.3-1.2 0-2.5-1-3.4a3.7 3.7 0 0 0-3.3-1c-.6-1-1.8-1.6-3-1.6Z" />
                      <path d="M12 9v6" />
                      <path d="m8 12 4 3 4-3" />
                    </svg>
                    <p className="text-muted-foreground">3D model is loading...</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      This is a preview feature. Actual 3D models will be available soon.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setShowARView(false)}>Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Image Gallery Dialog */}
            <Dialog open={showImageGallery} onOpenChange={setShowImageGallery}>
              <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] p-1 bg-black">
                <div className="relative w-full">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                      startIndex: selectedImage,
                    }}
                  >
                    <CarouselContent>
                      {product.images.map((image, index) => (
                        <CarouselItem key={index} className="flex items-center justify-center">
                          <div className="relative aspect-square w-full max-h-[80vh] flex items-center justify-center">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`${product.name} - view ${index + 1}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-white/20 hover:bg-white/40 border-none text-white" />
                    <CarouselNext className="right-2 bg-white/20 hover:bg-white/40 border-none text-white" />
                  </Carousel>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowImageGallery(false)}
                    className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
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
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </motion.button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display mb-2">{product.name}</h1>
                <button
                  onClick={handleShare}
                  className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-2">
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

                {/* Category badge */}
                <Badge variant="outline" className="ml-auto">
                  {product.category}
                </Badge>
              </div>

              {/* Short Description */}
              <p className="text-muted-foreground">{product.shortDescription}</p>
            </div>

            {/* Price and Weight Options */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-semibold">{formatCurrency(selectedWeightOption.price)}</span>
                {selectedWeightOption.originalPrice > selectedWeightOption.price && (
                  <span className="text-muted-foreground line-through text-lg">
                    {formatCurrency(selectedWeightOption.originalPrice)}
                  </span>
                )}
                {selectedWeightOption.originalPrice > selectedWeightOption.price && (
                  <Badge variant="destructive" className="ml-2">
                    {Math.round(
                      ((selectedWeightOption.originalPrice - selectedWeightOption.price) /
                        selectedWeightOption.originalPrice) *
                        100,
                    )}
                    % off
                  </Badge>
                )}
              </div>

              {/* Weight Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Weight:</label>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => setSelectedWeight(option.value)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-2xl border transition-colors ${
                        selectedWeight === option.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity Selector - Always visible */}
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex-1 flex items-center justify-between bg-background/95 rounded-2xl border p-2 max-w-[180px]">
                <motion.button
                  variant="outline"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  className={`rounded-2xl h-8 w-8 flex items-center justify-center border ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-muted"}`}
                >
                  <Minus className="h-4 w-4" />
                </motion.button>
                <span className="font-medium mx-4">{cartItem?.quantity || quantity}</span>
                <motion.button
                  variant="outline"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleIncreaseQuantity}
                  className="rounded-2xl h-8 w-8 flex items-center justify-center border hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              {!isInCart ? (
                <motion.button
                  className="w-full flex items-center justify-center gap-2 py-6 text-base bg-[#E67437] hover:bg-[#d66930] text-white font-medium rounded-2xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>
              ) : (
                <div className="space-y-4">
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 py-6 text-base bg-[#E67437] hover:bg-[#d66930] text-white font-medium rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openCart()}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Go To Cart
                  </motion.button>
                  <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      <span>Ships within 1-2 days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/india%20%281%29-pi8msQgYejUCKBm0WZzK0b8kGThrm6.png"
                        alt="India map"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                      <span>Shipping Across India</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      <span>Ships within 1-2 days</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/india%20%281%29-pi8msQgYejUCKBm0WZzK0b8kGThrm6.png"
                        alt="India map"
                        width={16}
                        height={16}
                        className="object-contain"
                      />
                      <span>Shipping Across India</span>
                    </div>
                  </div>
                </div>
              )}
              <motion.button
                className="w-full flex items-center justify-center gap-2 py-6 text-base bg-secondary hover:bg-secondary/90 text-white font-medium rounded-2xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
              >
                Buy Now
              </motion.button>
            </div>

            {/* Bulk Order */}
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Gift className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Looking for bulk orders?</h3>
                  <p className="text-sm text-muted-foreground">Contact us for special discounts!</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowEnquiryDialog(true)}>
                  Enquire Now
                </Button>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>Free delivery on orders above ₹699</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-muted/50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features & Benefits */}
        <div className="my-8 bg-card rounded-xl border shadow-sm p-6">
          <h2 className="text-xl sm:text-2xl font-display mb-6">Key Features & Benefits</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Homemade & 100% Preservative-Free</h3>
                <p className="text-sm text-muted-foreground">Made with love, just like at home.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Handcrafted by Local Artisans</h3>
                <p className="text-sm text-muted-foreground">Supporting local communities and traditions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Made with Pure Desi Ghee</h3>
                <p className="text-sm text-muted-foreground">Rich, authentic flavor in every bite.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">No Artificial Colors or Flavors</h3>
                <p className="text-sm text-muted-foreground">Only natural ingredients for pure taste.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Perfect for Festivals & Gifting</h3>
                <p className="text-sm text-muted-foreground">Share the joy of authentic flavors.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Longer Shelf Life</h3>
                <p className="text-sm text-muted-foreground">Stays fresh for weeks when stored properly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutritional Facts</TabsTrigger>
              <TabsTrigger value="storage">Storage & Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="p-6 bg-card rounded-b-xl border border-t-0 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Ingredients</h3>
              <p className="text-muted-foreground">{product.ingredients}</p>

              <div className="mt-6 bg-muted/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Allergen Information</h4>
                    <p className="text-sm text-muted-foreground">
                      May contain traces of nuts, dairy, and wheat. Please check the ingredients list if you have
                      allergies.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="p-6 bg-card rounded-b-xl border border-t-0 shadow-sm">
              <h3 className="text-lg font-medium mb-4">Nutritional Information</h3>
              <p className="text-sm text-muted-foreground mb-4">Nutritional values per 100g:</p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border px-4 py-2 text-left">Nutrient</th>
                      <th className="border px-4 py-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Calories</td>
                      <td className="border px-4 py-2 text-right">{product.nutritionalInfo.calories} kcal</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border px-4 py-2">Protein</td>
                      <td className="border px-4 py-2 text-right">{product.nutritionalInfo.protein}g</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Fat</td>
                      <td className="border px-4 py-2 text-right">{product.nutritionalInfo.fat}g</td>
                    </tr>
                    <tr className="bg-muted/30">
                      <td className="border px-4 py-2">Carbohydrates</td>
                      <td className="border px-4 py-2 text-right">{product.nutritionalInfo.carbs}g</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Sugar</td>
                      <td className="border px-4 py-2 text-right">{product.nutritionalInfo.sugar}g</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                * Values are approximate and may vary slightly from batch to batch due to the handmade nature of our
                products.
              </p>
            </TabsContent>

            <TabsContent value="storage" className="p-6 bg-card rounded-b-xl border border-t-0 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Storage Information</h3>
                  <p className="text-muted-foreground mb-4">{product.storage}</p>

                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Shelf Life</h4>
                    <p className="text-sm text-muted-foreground">{product.shelfLife}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Delivery Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Free Shipping</h4>
                        <p className="text-sm text-muted-foreground">
                          On all orders above ₹699. Standard delivery takes 3-5 business days.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Secure Packaging</h4>
                        <p className="text-sm text-muted-foreground">
                          We use special packaging to ensure your products arrive fresh and intact.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Express Delivery</h4>
                        <p className="text-sm text-muted-foreground">
                          Need it faster? Select express delivery at checkout for delivery within 24-48 hours
                          (additional charges apply).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Customer Reviews */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-display">Customer Reviews</h2>
            <Button>Write a Review</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Review Summary */}
            <div className="bg-card rounded-xl border shadow-sm p-6">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl font-bold mb-2">{product.rating.toFixed(1)}</h3>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">Based on {product.reviews} reviews</p>

                {/* Rating Distribution */}
                <div className="w-full space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Calculate percentage of reviews with this rating (mock data)
                    const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1

                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-3 w-3 fill-primary text-primary" />
                        </div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground w-8 text-right">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Review List */}
            <div className="lg:col-span-2 space-y-4">
              {product.productReviews.length > 0 ? (
                product.productReviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-xl border shadow-sm p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={review.avatar || "/placeholder.svg?height=40&width=40"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-medium">{review.name}</h4>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              Verified Purchase
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground ml-auto">{review.date}</span>
                        </div>

                        <div className="flex my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                              }`}
                            />
                          ))}
                        </div>

                        <p className="text-sm mt-2">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-muted/30 rounded-xl p-6 text-center">
                  <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this product!</p>
                  <Button>Write a Review</Button>
                </div>
              )}

              {product.productReviews.length > 3 && (
                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-display">Customers Also Bought</h2>
            <Link href="/popular-products" className="text-sm text-primary hover:underline hidden sm:block">
              View All
            </Link>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {product.relatedProducts.map((relatedProduct) => (
                <CarouselItem key={relatedProduct.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <Link href={`/product/${relatedProduct.id}`}>
                      <div className="bg-card rounded-xl border shadow-sm overflow-hidden h-full">
                        <div className="relative aspect-square overflow-hidden">
                          <Image
                            src={relatedProduct.image || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(relatedProduct.rating)
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">({relatedProduct.reviews})</span>
                          </div>
                          <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                          <p className="text-sm font-semibold mt-1">{formatCurrency(relatedProduct.price)}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4" />
            <CarouselNext className="hidden sm:flex -right-4" />
          </Carousel>

          <div className="mt-4 text-center sm:hidden">
            <Link href="/popular-products" className="text-sm text-primary hover:underline">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar for Mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t p-3 z-40 md:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium">{product.name}</div>
            <div className="font-semibold">{formatCurrency(selectedWeightOption.price)}</div>
          </div>
          {!isInCart ? (
            <motion.button
              className="flex items-center gap-2 bg-[#E67437] hover:bg-[#d66930] text-white font-medium py-2 px-4 rounded-2xl"
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </motion.button>
          ) : (
            <motion.button
              className="flex items-center gap-2 bg-[#E67437] hover:bg-[#d66930] text-white font-medium py-2 px-4 rounded-2xl"
              whileTap={{ scale: 0.95 }}
              onClick={() => openCart()}
            >
              <ShoppingCart className="h-4 w-4" />
              Go To Cart
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Enquiry Dialog */}
      <Dialog open={showEnquiryDialog} onOpenChange={setShowEnquiryDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bulk Order Enquiry</DialogTitle>
            <DialogDescription>
              Fill out the form below for special bulk order pricing and information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnquirySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={enquiryFormData.name}
                  onChange={(e) => setEnquiryFormData({ ...enquiryFormData, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={enquiryFormData.email}
                  onChange={(e) => setEnquiryFormData({ ...enquiryFormData, email: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={enquiryFormData.phone}
                  onChange={(e) => setEnquiryFormData({ ...enquiryFormData, phone: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={enquiryFormData.message}
                  onChange={(e) => setEnquiryFormData({ ...enquiryFormData, message: e.target.value })}
                  className="col-span-3"
                  placeholder="Please provide details about your bulk order requirements"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Enquiry</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Share Options Dialog */}
      <Dialog open={showShareOptions} onOpenChange={setShowShareOptions}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Share This Product</DialogTitle>
            <DialogDescription>Choose how you'd like to share this product</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={copyToClipboard}
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
                className="lucide lucide-copy"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span className="text-xs">Copy Link</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(`Check out this product: ${product.name} - ${window.location.href}`)}`,
                )
              }
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
                className="lucide lucide-message-circle"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() =>
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`)
              }
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
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="text-xs">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() =>
                window.open(
                  `mailto:?subject=Check out this product: ${product.name}&body=I thought you might like this: ${window.location.href}`,
                )
              }
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
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-xs">Email</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Floating Action Button for Mobile */}
      <AnimatePresence>
        {showFAB && (
          <motion.div
            className="fixed bottom-20 right-4 z-40 md:hidden"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              {/* FAB Menu */}
              <AnimatePresence>
                {showFABMenu && (
                  <motion.div
                    className="absolute bottom-16 right-0 space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={toggleFavorite}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-primary hover:bg-primary hover:text-white transition-colors"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main FAB Button */}
              <button
                onClick={() => setShowFABMenu(!showFABMenu)}
                className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg"
              >
                <motion.div animate={{ rotate: showFABMenu ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  <Plus className="h-6 w-6" />
                </motion.div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

