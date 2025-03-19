"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingCart,
  Heart,
  Eye,
  Minus,
  Star,
  Home,
  ArrowUpDown,
  Check,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
  Search,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useCart, type CartItem } from "@/components/cart-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Extended product data with more details
const allProducts = [
  {
    id: 1,
    name: "Masala Mathri",
    price: 199,
    originalPrice: 249,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/masala.jpg-JaGGxWYy9Dm5xQDHxrIxrqXNYilwhP.jpeg",
    isNew: true,
    isBestseller: false,
    rating: 4.8,
    reviews: 124,
    description:
      "Crispy, flaky, and perfectly spiced traditional mathri made with authentic spices and ghee. A perfect tea-time snack that brings the taste of home.",
    ingredients: "Wheat flour, ghee, carom seeds, cumin seeds, black pepper, salt",
    weight: "250g",
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Tea-time"],
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
    category: "Sweets",
    tags: ["Sweet", "Festive", "Gift"],
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
    isBestseller: true,
    rating: 4.7,
    reviews: 56,
    description:
      "Crispy, spicy potato sev that's perfect for snacking anytime. Made with fresh potatoes and a blend of traditional spices for that authentic taste.",
    ingredients: "Potato, gram flour, vegetable oil, spices, salt",
    weight: "200g",
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Potato"],
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
    isBestseller: true,
    rating: 4.9,
    reviews: 42,
    description:
      "Premium mixture of handpicked dry fruits and nuts, lightly roasted and seasoned. A healthy and delicious snack packed with nutrients.",
    ingredients: "Almonds, cashews, pistachios, raisins, dried figs, cardamom",
    weight: "300g",
    category: "Dry Fruits",
    tags: ["Healthy", "Nutritious", "Premium"],
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
    category: "Snacks",
    tags: ["Crispy", "Healthy", "Tea-time"],
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
    category: "Sweets",
    tags: ["Sweet", "Premium", "Gift"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 7,
    name: "Moong Dal Halwa",
    price: 349,
    originalPrice: 399,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 78,
    description:
      "Rich and indulgent moong dal halwa made with pure ghee and garnished with nuts. A traditional dessert that's perfect for special occasions.",
    ingredients: "Split yellow moong dal, ghee, sugar, cardamom, nuts",
    weight: "400g",
    category: "Sweets",
    tags: ["Sweet", "Rich", "Festive"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 8,
    name: "Bhakarwadi",
    price: 199,
    originalPrice: 249,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 4.7,
    reviews: 65,
    description:
      "Spicy and sweet spiral-shaped snack with a complex flavor profile. A popular Maharashtrian snack that's perfect for any time of the day.",
    ingredients: "Wheat flour, gram flour, tamarind, jaggery, spices",
    weight: "200g",
    category: "Snacks",
    tags: ["Spicy", "Sweet", "Crispy"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 9,
    name: "Soan Papdi",
    price: 249,
    originalPrice: 299,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 4.6,
    reviews: 52,
    description:
      "Flaky and melt-in-mouth sweet made with gram flour, ghee, and sugar. A popular Indian sweet that's perfect for gifting.",
    ingredients: "Gram flour, all-purpose flour, ghee, sugar, cardamom",
    weight: "400g",
    category: "Sweets",
    tags: ["Sweet", "Flaky", "Gift"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 10,
    name: "Chakli",
    price: 179,
    originalPrice: 229,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviews: 89,
    description:
      "Spiral-shaped crispy snack made with rice flour and spices. A popular tea-time snack that's perfect for any occasion.",
    ingredients: "Rice flour, gram flour, spices, sesame seeds",
    weight: "200g",
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Tea-time"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 11,
    name: "Gulab Jamun",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: false,
    rating: 4.9,
    reviews: 104,
    description:
      "Soft and spongy milk solids dumplings soaked in rose-flavored sugar syrup. A classic Indian dessert loved by all.",
    ingredients: "Milk solids, all-purpose flour, sugar, rose water, cardamom",
    weight: "500g",
    category: "Sweets",
    tags: ["Sweet", "Soft", "Festive"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 12,
    name: "Namkeen Mix",
    price: 149,
    originalPrice: 199,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: true,
    rating: 4.7,
    reviews: 67,
    description:
      "A delicious mix of various savory snacks including sev, boondi, and peanuts. Perfect for munching anytime.",
    ingredients: "Gram flour, peanuts, rice flakes, spices, vegetable oil",
    weight: "300g",
    category: "Snacks",
    tags: ["Crispy", "Spicy", "Mix"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 13,
    name: "Kesar Peda",
    price: 399,
    originalPrice: 449,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviews: 92,
    description:
      "Rich and flavorful milk-based sweet infused with saffron. A traditional Indian sweet that's perfect for special occasions.",
    ingredients: "Milk solids, sugar, saffron, cardamom, pistachios",
    weight: "300g",
    category: "Sweets",
    tags: ["Sweet", "Rich", "Festive"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 14,
    name: "Chivda",
    price: 179,
    originalPrice: 229,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: false,
    rating: 4.6,
    reviews: 58,
    description:
      "A savory mix of flattened rice, nuts, and spices. A light and crunchy snack that's perfect for any time of the day.",
    ingredients: "Flattened rice, peanuts, curry leaves, spices, vegetable oil",
    weight: "250g",
    category: "Snacks",
    tags: ["Crispy", "Light", "Tea-time"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 15,
    name: "Rasgulla",
    price: 299,
    originalPrice: 349,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 87,
    description:
      "Soft and spongy cheese balls soaked in sugar syrup. A popular Bengali sweet that's loved across India.",
    ingredients: "Cottage cheese, sugar, rose water",
    weight: "500g",
    category: "Sweets",
    tags: ["Sweet", "Soft", "Bengali"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 16,
    name: "Peanut Chikki",
    price: 149,
    originalPrice: 199,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: false,
    rating: 4.7,
    reviews: 63,
    description:
      "Crunchy peanut brittle made with jaggery. A traditional Indian sweet that's both delicious and nutritious.",
    ingredients: "Peanuts, jaggery, ghee",
    weight: "200g",
    category: "Sweets",
    tags: ["Sweet", "Crunchy", "Nutritious"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 17,
    name: "Family Snacks Box",
    price: 799,
    originalPrice: 999,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: true,
    rating: 4.9,
    reviews: 76,
    description:
      "A perfect assortment of snacks for the whole family. Includes a variety of savory and sweet treats that everyone will love.",
    ingredients: "Assorted snacks including mathri, chakli, namkeen mix, and more",
    weight: "1kg",
    category: "Special Combo",
    tags: ["Family", "Assorted", "Gift"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 18,
    name: "Diwali Special Combo",
    price: 1299,
    originalPrice: 1599,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: true,
    rating: 5.0,
    reviews: 92,
    description:
      "Celebrate Diwali with this special combo of premium sweets and snacks. Perfect for gifting or enjoying with family and friends.",
    ingredients: "Kaju katli, besan ladoo, mathri, namkeen, and more",
    weight: "1.5kg",
    category: "Special Combo",
    tags: ["Festive", "Gift", "Premium"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 19,
    name: "Tea Time Combo",
    price: 599,
    originalPrice: 699,
    image: "/placeholder.svg?height=300&width=300",
    isNew: false,
    isBestseller: true,
    rating: 4.8,
    reviews: 65,
    description:
      "The perfect accompaniment to your evening tea. A selection of savory snacks that pair perfectly with your favorite hot beverage.",
    ingredients: "Mathri, namkeen, chakli, and bhakarwadi",
    weight: "800g",
    category: "Special Combo",
    tags: ["Tea-time", "Savory", "Assorted"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: 20,
    name: "Festive Gift Box",
    price: 1499,
    originalPrice: 1799,
    image: "/placeholder.svg?height=300&width=300",
    isNew: true,
    isBestseller: false,
    rating: 4.9,
    reviews: 48,
    description:
      "A luxurious gift box filled with premium sweets and snacks. Perfect for special occasions and festivals.",
    ingredients: "Assorted premium sweets and snacks",
    weight: "2kg",
    category: "Special Combo",
    tags: ["Gift", "Premium", "Festive"],
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
]

export default function PopularProductsPage({ initialCategory = "all" }: { initialCategory?: string }) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<number | null>(null)
  const [selectedTab, setSelectedTab] = useState("description")
  const { cartItems, addToCart, updateQuantity } = useCart()
  const cartIconRef = useRef(null)
  const [animatingProduct, setAnimatingProduct] = useState<{ id: number; x: number; y: number } | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory === "popular" ? "Popular Product" : initialCategory,
  )
  const [selectedSort, setSelectedSort] = useState<string>("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [randomizedProducts, setRandomizedProducts] = useState<typeof allProducts>([])
  // Add a new state for tracking quantity before adding to cart
  const [preAddQuantities, setPreAddQuantities] = useState<Record<number, number>>({})

  // Add these state variables
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [pullDistance, setPullDistance] = useState(0)
  const maxPullDistance = 80

  // Add this state variable
  const [showScrollTop, setShowScrollTop] = useState(false)

  // New state variables for enhanced features
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showCompare, setShowCompare] = useState(false)
  const [compareProducts, setCompareProducts] = useState<number[]>([])
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [showSortSheet, setShowSortSheet] = useState(false)
  const [showOnlyInStock, setShowOnlyInStock] = useState(false)
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)
  const [showQuickFilter, setShowQuickFilter] = useState(false)
  const [quickFilterCategory, setQuickFilterCategory] = useState<string | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [lastScrollPosition, setLastScrollPosition] = useState(0)
  const [showCategorySheet, setShowCategorySheet] = useState(false)
  const [showSearchOverlay, setShowSearchOverlay] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof allProducts>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [categoryTransition, setCategoryTransition] = useState(false)

  // New state variables for search and sort overlays
  const [showSearch, setShowSearch] = useState(false)
  const [showSort, setShowSort] = useState(false)
  const [sortOption, setSortOption] = useState("featured")

  // Add this state for rotating placeholder text
  const [searchPlaceholder, setSearchPlaceholder] = useState("Search products...")

  // Define sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "rating", label: "Highest Rated" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ]

  // Randomize products on initial load
  useEffect(() => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    setRandomizedProducts(shuffled)
  }, [])

  // Add this useEffect for rotating placeholder text in desktop search
  useEffect(() => {
    const productNames = allProducts.map((p) => p.name)
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % productNames.length
      setSearchPlaceholder(`Shop for ${productNames[currentIndex]}...`)
    }, 3000)

    return () => clearInterval(interval)
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

  // Update category when URL changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory === "popular" ? "Popular Product" : initialCategory)
    }
  }, [initialCategory])

  // Add this useEffect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)

      // Detect scroll direction
      const currentScrollPos = window.scrollY
      setIsScrolling(true)

      // Clear previous timeout
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout)
      }

      // Set a timeout to detect when scrolling stops
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      setLastScrollPosition(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout)
      }
    }
  }, [lastScrollPosition])

  // Calculate active filters count
  useEffect(() => {
    let count = 0
    if (selectedTags.length > 0) count++
    if (priceRange[0] > 0 || priceRange[1] < 2000) count++
    if (showOnlyInStock) count++
    if (showOnlyDiscount) count++
    if (selectedCategory !== "all") count++
    setActiveFilters(count)
  }, [selectedTags, priceRange, showOnlyInStock, showOnlyDiscount, selectedCategory])

  // Handle search results
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        const results = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSearchOverlay(false)
    }
  }

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id))
    } else {
      setWishlist([...wishlist, id])
    }
  }

  const toggleCompare = (id: number) => {
    if (compareProducts.includes(id)) {
      setCompareProducts(compareProducts.filter((productId) => productId !== id))
    } else {
      if (compareProducts.length < 3) {
        setCompareProducts([...compareProducts, id])
      }
    }
  }

  // Update the handleAddToCart function to use the pre-add quantity
  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    const quantity = preAddQuantities[product.id] || 1
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: quantity,
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

  // Add a function to handle pre-add quantity changes
  const handlePreAddQuantityChange = (productId: number, change: number) => {
    setPreAddQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 0) + change),
    }))
  }

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Filter products based on search, category, tags, and price
  const filteredProducts = randomizedProducts.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Category filter
    if (selectedCategory !== "all") {
      if (selectedCategory === "Popular Product") {
        if (!product.isBestseller) {
          return false
        }
      } else if (product.category !== selectedCategory) {
        return false
      }
    }

    // Quick filter category
    if (quickFilterCategory && product.category !== quickFilterCategory) {
      return false
    }

    // Tags filter
    if (selectedTags.length > 0 && !selectedTags.some((tag) => product.tags.includes(tag))) {
      return false
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Discount filter
    if (showOnlyDiscount && product.price >= product.originalPrice) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      default: // "featured"
        return b.isBestseller ? -1 : a.isBestseller ? 1 : 0
    }
  })

  // Get all unique categories
  const categories = ["all", "Popular Product", ...Array.from(new Set(allProducts.map((product) => product.category)))]

  // Get all unique tags
  const allTags = Array.from(new Set(allProducts.flatMap((product) => product.tags)))

  // Get heading and subheading based on selected category
  const getCategoryHeading = () => {
    switch (selectedCategory) {
      case "all":
        return {
          heading: "All Types of Snacks",
          subheading: "Explore our complete collection of authentic Indian snacks and sweets",
        }
      case "Popular Product":
        return {
          heading: "Popular Products",
          subheading: "Our customers' favorites - handpicked for exceptional taste and quality",
        }
      case "Snacks":
        return {
          heading: "Traditional Snacks",
          subheading: "Authentic savory treats perfect for any time of the day",
        }
      case "Sweets":
        return {
          heading: "Traditional Sweets",
          subheading: "Indulge in our handcrafted sweets made with authentic recipes",
        }
      case "Dry Fruits":
        return {
          heading: "Premium Dry Fruits",
          subheading: "Nutritious and delicious selection of premium quality dry fruits",
        }
      case "Special Combo":
        return {
          heading: "Special Combo Packs",
          subheading: "Exclusive combinations of our best products at special prices",
        }
      default:
        return {
          heading: selectedCategory,
          subheading: "Explore our collection of authentic homemade products",
        }
    }
  }

  const { heading, subheading } = getCategoryHeading()

  // Function to handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  // Add these functions
  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setTouchStart(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e) => {
    if (touchStart > 0 && window.scrollY === 0) {
      const distance = e.touches[0].clientY - touchStart
      if (distance > 0) {
        setPullDistance(Math.min(distance * 0.5, maxPullDistance))
      }
    }
  }

  const handleTouchEnd = () => {
    if (pullDistance >= maxPullDistance * 0.6) {
      setIsRefreshing(true)
      // Simulate refresh
      setTimeout(() => {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
        setRandomizedProducts(shuffled)
        setIsRefreshing(false)
        setPullDistance(0)
        setTouchStart(0)
      }, 1000)
    } else {
      setPullDistance(0)
      setTouchStart(0)
    }
  }

  // Add this function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedTags([])
    setPriceRange([0, 2000])
    setShowOnlyInStock(false)
    setShowOnlyDiscount(false)
    setQuickFilterCategory(null)
    setSearchQuery("")
  }

  // Handle category selection with animation
  const handleCategorySelect = (category: string) => {
    setCategoryTransition(true)
    setActiveCategory(category)

    setTimeout(() => {
      setSelectedCategory(category)
      setCategoryTransition(false)
      setActiveCategory(null)
      setShowCategorySheet(false)
    }, 300)
  }

  // Add this useEffect to keep sortOption and selectedSort in sync
  useEffect(() => {
    setSortOption(selectedSort)
  }, [selectedSort])

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/30 transition-colors duration-300 app-like-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to refresh indicator - mobile only */}
      {pullDistance > 0 && (
        <div
          className="fixed top-0 left-0 w-full z-50 flex justify-center items-center bg-transparent pointer-events-none md:hidden"
          style={{ height: `${pullDistance}px` }}
        >
          <div className="flex items-center justify-center">
            <svg
              className={`animate-spin h-6 w-6 text-primary ${isRefreshing ? "opacity-100" : "opacity-70"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2 text-sm font-medium text-primary">
              {isRefreshing ? "Refreshing..." : "Pull to refresh"}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumb navigation - improved for mobile */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="flex items-center hover:text-primary transition-colors">
            <Home className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden xs:inline">Home</span>
          </Link>
          <span>/</span>
          <Link href="/popular-products" className="hover:text-primary transition-colors">
            Categories
          </Link>
          {selectedCategory !== "all" && (
            <>
              <span>/</span>
              <span className="text-primary font-medium truncate max-w-[150px] sm:max-w-none">
                {selectedCategory === "Popular Product" ? "Popular Products" : selectedCategory}
              </span>
            </>
          )}
        </div>

        {/* Header with search and filter buttons */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display dark:text-white bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              {heading}
            </h1>

            <div className="flex items-center gap-2">
              {/* Mobile search button - only visible on mobile */}
              <button
                onClick={() => setShowSearch(true)}
                className="flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Desktop search input */}
              <div className="hidden md:block relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full"
                />
              </div>

              {/* Mobile filter button */}
              <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm border shadow-sm dark:bg-gray-800/80 relative md:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {activeFilters > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {activeFilters}
                      </span>
                    )}
                    <span className="sr-only">Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] rounded-t-xl pt-6">
                  <SheetHeader className="text-left mb-6">
                    <div className="flex items-center justify-between">
                      <SheetTitle>Filters</SheetTitle>
                      <Button variant="ghost" size="sm" onClick={resetFilters}>
                        Reset All
                      </Button>
                    </div>
                  </SheetHeader>

                  <div className="space-y-6 overflow-y-auto pb-20">
                    {/* Category filter */}
                    <div>
                      <h3 className="text-base font-medium mb-3">Category</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            className={`justify-start h-auto py-3 ${
                              selectedCategory === category ? "bg-primary text-white" : "bg-background dark:bg-gray-800"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {selectedCategory === category && <Check className="h-4 w-4 mr-2" />}
                            {category === "all" ? "All Categories" : category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Price range filter */}
                    <div>
                      <h3 className="text-base font-medium mb-3">Price Range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[priceRange[0], priceRange[1]]}
                          max={2000}
                          step={50}
                          onValueChange={handlePriceRangeChange}
                          className="mb-6"
                        />
                        <div className="flex items-center justify-between text-sm">
                          <span>₹{priceRange[0]}</span>
                          <span>₹{priceRange[1]}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setPriceRange([0, 2000])}
                        >
                          Reset
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs" onClick={() => setPriceRange([0, 500])}>
                          Under ₹500
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setPriceRange([500, 1000])}
                        >
                          ₹500-₹1000
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setPriceRange([1000, 2000])}
                        >
                          Above ₹1000
                        </Button>
                      </div>
                    </div>

                    {/* Additional filters */}
                    <div>
                      <h3 className="text-base font-medium mb-3">Additional Filters</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Show only discounted items</span>
                          <Switch checked={showOnlyDiscount} onCheckedChange={setShowOnlyDiscount} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-background dark:bg-gray-900 border-t">
                    <Button className="w-full bg-primary" onClick={() => setShowFilterSheet(false)}>
                      Show {filteredProducts.length} Results
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-400">{subheading}</p>
        </div>

        {/* Mobile category chips - horizontal scrollable with visual indicator */}
        <div className="md:hidden overflow-x-auto pb-3 -mx-4 px-4 mb-5">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <motion.div key={category} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-xs whitespace-nowrap ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md border-0"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === "all" ? "All Categories" : category === "Popular Product" ? "Popular" : category}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop category navigation */}
        <div className="hidden md:block mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={selectedCategory === category ? "bg-primary text-white" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Categories" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort and view options bar */}
        <div className="flex items-center justify-between mb-6 bg-muted/30 dark:bg-gray-800/30 rounded-lg p-2 border border-border/40 dark:border-gray-700/40">
          {/* Mobile sort button - only visible on mobile */}
          <button
            onClick={() => setShowSort(true)}
            className="flex md:hidden items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md"
            aria-label="Sort products"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="font-medium">Sort</span>
          </button>

          {/* Desktop sort dropdown */}
          <div className="hidden md:flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* View mode toggle - visible on all screens */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${viewMode === "grid" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 ${viewMode === "list" ? "text-primary" : "text-muted-foreground"}`}
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Desktop filter sidebar and products */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <div className="bg-card dark:bg-gray-800 rounded-lg border p-4 space-y-6">
              <div>
                <h3 className="text-base font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={2000}
                    step={50}
                    onValueChange={handlePriceRangeChange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-medium mb-3">Additional Filters</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Show only discounted items</span>
                    <Switch checked={showOnlyDiscount} onCheckedChange={setShowOnlyDiscount} />
                  </div>
                </div>
              </div>

              {activeFilters > 0 && (
                <Button variant="outline" className="w-full" onClick={resetFilters}>
                  Reset Filters
                </Button>
              )}
            </div>
          </div>

          {/* Desktop Products grid/list */}
          <div className={`flex-1 ${viewMode === "grid" ? "col-span-3" : "col-span-3"}`}>
            <ProductsDisplay
              sortedProducts={sortedProducts}
              viewMode={viewMode}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              compareProducts={compareProducts}
              toggleCompare={toggleCompare}
              setQuickViewProduct={setQuickViewProduct}
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              handleAddToCart={handleAddToCart}
              resetFilters={resetFilters}
              setShowCompare={setShowCompare}
            />
          </div>
        </div>

        {/* Mobile Products grid/list */}
        <div className="md:hidden">
          <ProductsDisplay
            sortedProducts={sortedProducts}
            viewMode={viewMode}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            compareProducts={compareProducts}
            toggleCompare={toggleCompare}
            setQuickViewProduct={setQuickViewProduct}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            handleAddToCart={handleAddToCart}
            resetFilters={resetFilters}
            setShowCompare={setShowCompare}
          />
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={quickViewProduct !== null} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
        <DialogContent className="sm:max-w-[800px] w-[95vw] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle>Quick View</DialogTitle>
            <DialogDescription className="dark:text-gray-400">Take a closer look at this product</DialogDescription>
          </DialogHeader>

          {quickViewProduct !== null && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={
                      allProducts.find((p) => p.id === quickViewProduct)?.images[0] ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={allProducts.find((p) => p.id === quickViewProduct)?.name || ""}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {allProducts
                    .find((p) => p.id === quickViewProduct)
                    ?.images.map((img, idx) => (
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
                  <h3 className="text-xl sm:text-2xl font-display dark:text-white">
                    {allProducts.find((p) => p.id === quickViewProduct)?.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(allProducts.find((p) => p.id === quickViewProduct)?.rating || 0)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted dark:text-gray-500"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground dark:text-gray-400">
                      ({allProducts.find((p) => p.id === quickViewProduct)?.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl sm:text-2xl font-semibold dark:text-white">
                    ₹{allProducts.find((p) => p.id === quickViewProduct)?.price}
                  </span>
                  {(allProducts.find((p) => p.id === quickViewProduct)?.originalPrice || 0) >
                    (allProducts.find((p) => p.id === quickViewProduct)?.price || 0) && (
                    <>
                      <span className="text-muted-foreground line-through dark:text-gray-400">
                        ₹{allProducts.find((p) => p.id === quickViewProduct)?.originalPrice}
                      </span>
                      <span className="text-destructive dark:text-red-400 font-medium">
                        {Math.round(
                          (((allProducts.find((p) => p.id === quickViewProduct)?.originalPrice || 0) -
                            (allProducts.find((p) => p.id === quickViewProduct)?.price || 0)) /
                            (allProducts.find((p) => p.id === quickViewProduct)?.originalPrice || 1)) *
                            100,
                        )}
                        % off
                      </span>
                    </>
                  )}
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 dark:bg-gray-700">
                    <TabsTrigger
                      value="description"
                      className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                    >
                      Description
                    </TabsTrigger>
                    <TabsTrigger
                      value="ingredients"
                      className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                    >
                      Ingredients
                    </TabsTrigger>
                    <TabsTrigger
                      value="details"
                      className="dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-white"
                    >
                      Details
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="py-4 dark:text-gray-300">
                    <p>{allProducts.find((p) => p.id === quickViewProduct)?.description}</p>
                  </TabsContent>
                  <TabsContent value="ingredients" className="py-4 dark:text-gray-300">
                    <p>{allProducts.find((p) => p.id === quickViewProduct)?.ingredients}</p>
                  </TabsContent>
                  <TabsContent value="details" className="py-4 dark:text-gray-300">
                    <p>Weight: {allProducts.find((p) => p.id === quickViewProduct)?.weight}</p>
                    <p className="mt-2">100% Authentic & Handmade</p>
                    <p className="mt-2">No preservatives or artificial flavors</p>
                  </TabsContent>
                </Tabs>

                {/* Add to Cart button in quick view dialog */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full mb-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        onClick={() => {
                          if (quickViewProduct) {
                            handlePreAddQuantityChange(quickViewProduct, -1)
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="dark:text-white">
                        {quickViewProduct ? preAddQuantities[quickViewProduct] || 1 : 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        onClick={() => {
                          if (quickViewProduct) {
                            handlePreAddQuantityChange(quickViewProduct, 1)
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground"
                      onClick={(e) => {
                        const product = allProducts.find((p) => p.id === quickViewProduct)
                        if (product) {
                          handleAddToCart(product, e)
                        }
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">Very few stock left!</p>
                  </div>

                  <Button
                    variant="outline"
                    className="gap-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    onClick={() => toggleWishlist(quickViewProduct)}
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlist.includes(quickViewProduct) ? "fill-destructive text-destructive" : ""}`}
                    />
                    {wishlist.includes(quickViewProduct) ? "Wishlisted" : "Add to Wishlist"}
                  </Button>
                </div>

                {/* Add View Details button that navigates to product page */}
                <Link href={`/product/${quickViewProduct}`} className="block w-full">
                  <Button
                    variant="secondary"
                    className="w-full dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  >
                    View Full Details
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare Products Dialog */}
      <Dialog open={showCompare} onOpenChange={setShowCompare}>
        <DialogContent className="sm:max-w-[900px] w-[95vw] max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle>Compare Products</DialogTitle>
            <DialogDescription className="dark:text-gray-400">Compare features and specifications</DialogDescription>
          </DialogHeader>

          {compareProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="p-3 text-left">Product</th>
                    {compareProducts.map((id) => (
                      <th key={id} className="p-3 text-left">
                        <div className="flex flex-col items-center">
                          <div className="relative w-20 h-20 mb-2">
                            <Image
                              src={allProducts.find((p) => p.id === id)?.image || "/placeholder.svg"}
                              alt={allProducts.find((p) => p.id === id)?.name || ""}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                          <span className="text-sm font-medium">{allProducts.find((p) => p.id === id)?.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-7 text-xs text-muted-foreground"
                            onClick={() => toggleCompare(id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 font-medium">Price</td>
                    {compareProducts.map((id) => (
                      <td key={id} className="p-3">
                        <div className="flex flex-col">
                          <span className="font-semibold">₹{allProducts.find((p) => p.id === id)?.price}</span>
                          {(allProducts.find((p) => p.id === id)?.originalPrice || 0) >
                            (allProducts.find((p) => p.id === id)?.price || 0) && (
                            <span className="text-xs text-muted-foreground line-through">
                              ₹{allProducts.find((p) => p.id === id)?.originalPrice}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 font-medium">Rating</td>
                    {compareProducts.map((id) => (
                      <td key={id} className="p-3">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(allProducts.find((p) => p.id === id)?.rating || 0)
                                    ? "fill-primary text-primary"
                                    : "fill-muted text-muted dark:text-gray-500"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs">({allProducts.find((p) => p.id === id)?.reviews})</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 font-medium">Category</td>
                    {compareProducts.map((id) => (
                      <td key={id} className="p-3">
                        {allProducts.find((p) => p.id === id)?.category}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 font-medium">Weight</td>
                    {compareProducts.map((id) => (
                      <td key={id} className="p-3">
                        {allProducts.find((p) => p.id === id)?.weight}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-3 font-medium">Ingredients</td>
                    {compareProducts.map((id) => (
                      <td key={id} className="p-3 text-sm">
                        {allProducts.find((p) => p.id === id)?.ingredients}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Actions</td>
                    {compareProducts.map((id) => (
                      <td key={id} className="p-3">
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            className="w-full bg-primary"
                            onClick={(e) => {
                              const product = allProducts.find((p) => p.id === id)
                              if (product) {
                                handleAddToCart(product, e)
                              }
                            }}
                          >
                            Add to Cart
                          </Button>
                          <Link href={`/product/${id}`} className="w-full">
                            <Button variant="outline" size="sm" className="w-full">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No products selected for comparison</p>
              <p className="text-sm text-muted-foreground mt-2">
                Select products to compare by clicking the compare icon on product cards
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col">
          <div className="bg-white dark:bg-gray-900 p-4 w-full animate-in slide-in-from-top duration-300">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() => setShowSearch(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold">Search Products</h2>
            </div>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>

            {!searchQuery && (
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {allProducts
                      .filter((product) => product.isBestseller)
                      .slice(0, 5)
                      .map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSearchQuery(product.name)}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                        >
                          {product.name}
                        </button>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Popular Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(allProducts.map((p) => p.category)))
                      .slice(0, 4)
                      .map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSearchQuery("")
                            setShowSearch(false)
                            setSelectedCategory(category)
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm"
                        >
                          {category}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            )}

            {searchQuery && (
              <div className="flex-1 overflow-y-auto">
                {isSearching ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {filteredProducts.slice(0, 10).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        onClick={() => {
                          setSearchQuery("")
                          setShowSearch(false)
                          setQuickViewProduct(product.id)
                        }}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{product.category}</p>
                          <p className="text-orange-600 font-medium">₹{product.price}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddToCart(product, e)
                            setShowSearch(false)
                          }}
                          className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 dark:bg-gray-800 dark:text-orange-500 dark:hover:bg-gray-700"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-1">No results found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xs">
                      We couldn't find any products matching "{searchQuery}". Try a different search term.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {showSort && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end">
          <div className="bg-white dark:bg-gray-900 p-4 w-full rounded-t-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sort Products</h2>
              <button
                onClick={() => setShowSort(false)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close sort options"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortOption(option.value)
                    setSelectedSort(option.value)
                    setShowSort(false)
                  }}
                  className={`flex items-center justify-between w-full p-3 rounded-xl ${
                    sortOption === option.value
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {sortOption === option.value && <Check className="h-5 w-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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
              src={allProducts.find((p) => p.id === animatingProduct.id)?.image || "/placeholder.svg"}
              alt="Product"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button - mobile only */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-20 right-4 z-50 bg-primary text-white rounded-full p-3 shadow-lg md:hidden"
            onClick={scrollToTop}
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
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper component to avoid code duplication
function ProductsDisplay({
  sortedProducts,
  viewMode,
  wishlist,
  toggleWishlist,
  compareProducts,
  toggleCompare,
  setQuickViewProduct,
  cartItems,
  updateQuantity,
  handleAddToCart,
  resetFilters,
  setShowCompare,
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Showing{" "}
          <span className="font-bold text-primary px-1.5 py-0.5 bg-primary/10 rounded-md">{sortedProducts.length}</span>{" "}
          products
        </p>

        {compareProducts.length > 0 && (
          <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={() => setShowCompare(true)}>
            Compare ({compareProducts.length})
          </Button>
        )}
      </div>

      {sortedProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6"
              : "flex flex-col gap-3 sm:gap-4"
          }
        >
          {sortedProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              {viewMode === "grid" ? (
                <Card className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-border/40 dark:border-gray-700 h-full transition-shadow duration-300 shadow-sm hover:shadow-md dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50 md:rounded-lg">
                  <div className="relative aspect-square group">
                    <Link href={`/product/${product.id}`} className="block absolute inset-0 z-10">
                      <span className="sr-only">View {product.name} details</span>
                    </Link>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.isBestseller && (
                      <Badge className="absolute top-2 left-2 bg-black text-white dark:bg-white dark:text-black">
                        Bestseller
                      </Badge>
                    )}
                    {product.isNew && <Badge className="absolute top-2 left-2 bg-green-600 text-white">New</Badge>}

                    {/* Quick actions overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="scale-90 hover:scale-100 transition-transform"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setQuickViewProduct(product.id)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Quick View
                      </Button>
                    </div>

                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-300 shadow-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                      >
                        <Heart
                          className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-destructive text-destructive" : "dark:text-white"}`}
                        />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 rounded-full backdrop-blur-sm transition-colors duration-300 shadow-sm ${
                          compareProducts.includes(product.id)
                            ? "bg-primary/80 text-white"
                            : "bg-white/80 dark:bg-gray-800/80"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          toggleCompare(product.id)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 3h5v5"></path>
                          <path d="M8 3H3v5"></path>
                          <path d="M21 3l-7 7"></path>
                          <path d="M3 3l7 7"></path>
                          <path d="M16 21h5v-5"></path>
                          <path d="M8 21H3v-5"></path>
                          <path d="M3 21l7-7"></path>
                          <path d="M21 21l-7-7"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted dark:text-gray-500"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground dark:text-gray-400">({product.reviews})</span>
                    </div>

                    <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2 dark:text-white">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base font-semibold dark:text-white">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <>
                          <span className="text-xs text-muted-foreground line-through dark:text-gray-400">
                            ₹{product.originalPrice}
                          </span>
                          <span className="text-xs text-red-500 dark:text-red-400">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </span>
                        </>
                      )}
                    </div>

                    {cartItems.find((item) => item.id === product.id && !item.isCombo) ? (
                      <div className="flex items-center justify-between gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            updateQuantity(
                              product.id,
                              cartItems.find((item) => item.id === product.id)!.quantity - 1,
                              false,
                            )
                          }}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium text-sm dark:text-white">
                          {cartItems.find((item) => item.id === product.id)?.quantity || 0}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            updateQuantity(
                              product.id,
                              cartItems.find((item) => item.id === product.id)!.quantity + 1,
                              false,
                            )
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white transition-colors duration-300 text-xs sm:text-sm h-8 sm:h-10 add-to-cart-btn rounded-full font-medium"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleAddToCart(product, e)
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </Card>
              ) : (
                // List view
                <Card className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-border/40 dark:border-gray-700 transition-shadow duration-300 shadow-sm hover:shadow-md dark:shadow-gray-900/30 dark:hover:shadow-gray-900/50">
                  <div className="flex">
                    <div className="relative w-24 sm:w-32 h-24 sm:h-32">
                      <Link href={`/product/${product.id}`} className="block absolute inset-0 z-10">
                        <span className="sr-only">View {product.name} details</span>
                      </Link>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.isBestseller && (
                        <Badge className="absolute top-1 left-1 scale-75 bg-black text-white dark:bg-white dark:text-black">
                          Bestseller
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1 p-3 flex flex-col">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-sm line-clamp-1 dark:text-white">{product.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleWishlist(product.id)
                          }}
                        >
                          <Heart
                            className={`h-3 w-3 ${wishlist.includes(product.id) ? "fill-destructive text-destructive" : "dark:text-white"}`}
                          />
                        </Button>
                      </div>

                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted dark:text-gray-500"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground dark:text-gray-400">({product.reviews})</span>
                      </div>

                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1 dark:text-gray-400">
                        {product.description.substring(0, 60)}...
                      </p>

                      <div className="flex items-center gap-2 mt-auto">
                        <span className="text-base font-semibold dark:text-white">₹{product.price}</span>
                        {product.originalPrice > product.price && (
                          <>
                            <span className="text-xs text-muted-foreground line-through dark:text-gray-400">
                              ₹{product.originalPrice}
                            </span>
                            <span className="text-xs text-red-500 dark:text-red-400">
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-3 border-l dark:border-gray-700">
                      {cartItems.find((item) => item.id === product.id && !item.isCombo) ? (
                        <div className="flex flex-col items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              updateQuantity(
                                product.id,
                                cartItems.find((item) => item.id === product.id)!.quantity + 1,
                                false,
                              )
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium text-sm dark:text-white">
                            {cartItems.find((item) => item.id === product.id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              updateQuantity(
                                product.id,
                                cartItems.find((item) => item.id === product.id)!.quantity - 1,
                                false,
                              )
                            }}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white dark:bg-[#FF4D00] dark:hover:bg-[#FF4D00]/90 dark:text-white transition-colors duration-300 text-xs h-8 px-2 add-to-cart-btn"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleAddToCart(product, e)
                          }}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs px-2 h-8"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setQuickViewProduct(product.id)
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="bg-muted/30 dark:bg-gray-800/50 rounded-lg p-6 sm:p-8 text-center">
          <h3 className="text-lg sm:text-xl font-medium mb-2 dark:text-white">No products found</h3>
          <p className="text-muted-foreground dark:text-gray-400 mb-4">Try adjusting your filters or search query</p>
          <Button onClick={resetFilters} className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Reset Filters
          </Button>
        </div>
      )}
    </>
  )
}

