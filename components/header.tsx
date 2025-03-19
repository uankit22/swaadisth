"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Search, Menu, X, ChevronDown, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import CartDrawer from "@/components/cart-drawer"
import { useCartDrawerStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

// Mock product data (replace this with your actual product data)
const products = [
  { id: 1, name: "Masala Mathri", category: "Snacks" },
  { id: 2, name: "Besan Ladoo", category: "Sweets" },
  { id: 3, name: "Aloo Bhujia", category: "Snacks" },
  { id: 4, name: "Dry Fruit Mixture", category: "Dry Fruits" },
  { id: 5, name: "Methi Mathri", category: "Snacks" },
  { id: 6, name: "Kaju Katli", category: "Sweets" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const { cartItems } = useCart()
  const { isAuthenticated } = useAuth()
  const cartIconRef = useRef(null)
  const router = useRouter()

  const { openCart } = useCartDrawerStore()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim() === "") {
      setSearchResults([])
      return
    }
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )
    setSearchResults(results)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery("")
      setSearchResults([])
    }
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push("/profile")
    } else {
      router.push("/login")
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loog1-zpoo8dBNn6SbELHiBFxMyAtWk0qwK0.png"
                alt="Swaadisth - Ghar Ka Swaad"
                width={200}
                height={80}
                className="h-16 w-auto"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <div className="relative group">
                <button className="text-[1.1rem] hover:text-[#C4A661] transition-colors flex items-center gap-1 font-normal">
                  Categories <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg bg-background border border-border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1 rounded-md bg-background">
                    <Link
                      href="/popular-products?category=all"
                      className="block px-4 py-2 text-sm hover:bg-muted font-normal"
                    >
                      All Categories
                    </Link>
                    <Link
                      href="/popular-products?category=popular"
                      className="block px-4 py-2 text-sm hover:bg-muted font-normal"
                    >
                      Popular Products
                    </Link>
                    <Link
                      href="/popular-products?category=Snacks"
                      className="block px-4 py-2 text-sm hover:bg-muted font-normal"
                    >
                      Snacks
                    </Link>
                    <Link
                      href="/popular-products?category=Sweets"
                      className="block px-4 py-2 text-sm hover:bg-muted font-normal"
                    >
                      Sweets
                    </Link>
                    <Link
                      href="/popular-products?category=Dry%20Fruits"
                      className="block px-4 py-2 text-sm hover:bg-muted font-normal"
                    >
                      Dry Fruits
                    </Link>
                    <Link
                      href="/popular-products?category=Special%20Combo"
                      className="block px-4 py-2 text-sm hover:bg-muted font-normal"
                    >
                      Special Combo
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href="#why-choose-us"
                className="text-[1.1rem] hover:text-[#C4A661] transition-colors font-normal"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("why-choose-us")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
              >
                Why Choose Us
              </Link>
              <Link href="/bestsellers" className="text-[1.1rem] hover:text-[#C4A661] transition-colors font-normal">
                Best Sellers
              </Link>
              <Link href="/new-arrivals" className="text-[1.1rem] hover:text-[#C4A661] transition-colors font-normal">
                New Arrivals
              </Link>
              <Link href="/offers" className="text-[1.1rem] hover:text-[#C4A661] transition-colors font-normal">
                Special Offers
              </Link>
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "300px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative hidden md:block"
                >
                  <form onSubmit={handleSearchSubmit}>
                    <Input
                      type="search"
                      placeholder="Search for snacks..."
                      className="pr-8"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery("")
                        setSearchResults([])
                      }}
                    >
                      <X className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </form>
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-background border border-input rounded-md shadow-lg mt-1 z-50">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/product/${result.id}`}
                          className="block px-4 py-2 hover:bg-muted"
                          onClick={() => {
                            setIsSearchOpen(false)
                            setSearchQuery("")
                            setSearchResults([])
                          }}
                        >
                          {result.name} - {result.category}
                        </Link>
                      ))}
                    </div>
                  )}
                  {searchQuery && searchResults.length === 0 && (
                    <div className="absolute top-full left-0 right-0 bg-background border border-input rounded-md shadow-lg mt-1 z-50 p-4">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent"
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={handleProfileClick}
              className="hidden md:flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent"
            >
              <User className="h-5 w-5" />
            </button>

            <button
              onClick={openCart}
              className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent cart-icon"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartCount}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="mb-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loog1-zpoo8dBNn6SbELHiBFxMyAtWk0qwK0.png"
                    alt="Swaadisth - Ghar Ka Swaad"
                    width={160}
                    height={64}
                    className="h-12 w-auto"
                  />
                </div>
                <nav className="grid gap-6 py-6">
                  <div className="space-y-2">
                    <div className="text-lg font-medium text-[#C4A661]">Categories</div>
                    <div className="pl-4 space-y-2">
                      <Link
                        href="/popular-products?category=all"
                        className="block text-base hover:text-[#C4A661] font-normal"
                      >
                        All Categories
                      </Link>
                      <Link
                        href="/popular-products?category=popular"
                        className="block text-base hover:text-[#C4A661] font-normal"
                      >
                        Popular Products
                      </Link>
                      <Link
                        href="/popular-products?category=Snacks"
                        className="block text-base hover:text-[#C4A661] font-normal"
                      >
                        Snacks
                      </Link>
                      <Link
                        href="/popular-products?category=Sweets"
                        className="block text-base hover:text-[#C4A661] font-normal"
                      >
                        Sweets
                      </Link>
                      <Link
                        href="/popular-products?category=Dry%20Fruits"
                        className="block text-base hover:text-[#C4A661] font-normal"
                      >
                        Dry Fruits
                      </Link>
                      <Link
                        href="/popular-products?category=Special%20Combo"
                        className="block text-base hover:text-[#C4A661] font-normal"
                      >
                        Special Combo
                      </Link>
                    </div>
                  </div>
                  <Link
                    href="#why-choose-us"
                    className="text-lg hover:text-[#C4A661] font-normal"
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById("why-choose-us")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                      // Close the sheet after clicking
                      if (typeof document.querySelector("[data-radix-dialog-close]")?.click === "function") {
                        document.querySelector("[data-radix-dialog-close]")?.click()
                      }
                    }}
                  >
                    Why Choose Us
                  </Link>
                  <Link href="/bestsellers" className="text-lg hover:text-[#C4A661] font-normal">
                    Best Sellers
                  </Link>
                  <Link href="/new-arrivals" className="text-lg hover:text-[#C4A661] font-normal">
                    New Arrivals
                  </Link>
                  <Link href="/offers" className="text-lg hover:text-[#C4A661] font-normal">
                    Special Offers
                  </Link>
                  <Link
                    href="/profile"
                    className="text-lg hover:text-[#C4A661] font-normal"
                    onClick={handleProfileClick}
                  >
                    My Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <CartDrawer />
      </header>
      {/* Spacer to prevent content from being hidden behind the fixed header */}
      <div className="h-20"></div>
    </>
  )
}

