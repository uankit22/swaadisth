"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Clock, Copy, CheckCircle, Tag, Percent, Gift, Award, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import GridPattern from "@/components/grid-pattern"
import ConfettiExplosion from "react-confetti-explosion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Types
interface Coupon {
  id: string
  code: string
  discount: string
  description: string
  expiryDate: Date
  category: "food" | "grocery" | "special" | "seasonal" | "new-user"
  featured: boolean
  minOrder?: number
  maxDiscount?: number
  terms?: string[]
}

export default function OffersPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isExploding, setIsExploding] = useState(false)

  // Load coupons
  useEffect(() => {
    // In a real app, this would be an API call
    const mockCoupons: Coupon[] = [
      {
        id: "1",
        code: "WELCOME50",
        discount: "50% OFF",
        description: "Get 50% off on your first order",
        expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        category: "new-user",
        featured: true,
        minOrder: 499,
        maxDiscount: 150,
        terms: ["Valid for new users only", "Minimum order value ₹499", "Maximum discount ₹150"],
      },
      {
        id: "2",
        code: "SPICY25",
        discount: "25% OFF",
        description: "Get 25% off on all spicy food items",
        expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        category: "food",
        featured: true,
        minOrder: 299,
        maxDiscount: 100,
        terms: ["Valid on selected spicy items only", "Minimum order value ₹299", "Maximum discount ₹100"],
      },
      {
        id: "3",
        code: "FESTIVAL20",
        discount: "20% OFF",
        description: "Special festival season discount on all orders",
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        category: "seasonal",
        featured: false,
        minOrder: 599,
        maxDiscount: 200,
        terms: ["Valid on all orders", "Minimum order value ₹599", "Maximum discount ₹200"],
      },
      {
        id: "4",
        code: "GROCERY15",
        discount: "15% OFF",
        description: "Save on all grocery items this week",
        expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        category: "grocery",
        featured: false,
        minOrder: 399,
        maxDiscount: 120,
        terms: ["Valid on grocery category only", "Minimum order value ₹399", "Maximum discount ₹120"],
      },
      {
        id: "5",
        code: "SPECIAL30",
        discount: "30% OFF",
        description: "Special discount on premium dishes",
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        category: "special",
        featured: true,
        minOrder: 799,
        maxDiscount: 300,
        terms: ["Valid on premium menu items only", "Minimum order value ₹799", "Maximum discount ₹300"],
      },
      {
        id: "6",
        code: "WEEKEND10",
        discount: "10% OFF",
        description: "Weekend special discount on all orders",
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        category: "seasonal",
        featured: false,
        minOrder: 299,
        maxDiscount: 100,
        terms: ["Valid on weekends only", "Minimum order value ₹299", "Maximum discount ₹100"],
      },
      {
        id: "7",
        code: "COMBO40",
        discount: "40% OFF",
        description: "Huge discount on combo meals",
        expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        category: "food",
        featured: true,
        minOrder: 699,
        maxDiscount: 250,
        terms: ["Valid on combo meals only", "Minimum order value ₹699", "Maximum discount ₹250"],
      },
      {
        id: "8",
        code: "FREESHIP",
        discount: "FREE DELIVERY",
        description: "Free delivery on all orders above ₹499",
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        category: "special",
        featured: false,
        minOrder: 499,
        terms: ["Valid on all orders", "Minimum order value ₹499"],
      },
    ]

    setCoupons(mockCoupons)
  }, [])

  // Filter coupons based on search and category
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || coupon.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Featured coupons
  const featuredCoupons = coupons.filter((coupon) => coupon.featured)

  // Copy coupon code to clipboard
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setIsExploding(true)

    setTimeout(() => {
      setCopiedCode(null)
      setIsExploding(false)
    }, 2000)
  }

  // Calculate time remaining for expiry
  const getTimeRemaining = (expiryDate: Date) => {
    const total = expiryDate.getTime() - Date.now()
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} left`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} left`
    } else {
      return "Expiring soon!"
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Tag className="h-4 w-4" />
      case "grocery":
        return <Tag className="h-4 w-4" />
      case "special":
        return <Award className="h-4 w-4" />
      case "seasonal":
        return <Gift className="h-4 w-4" />
      case "new-user":
        return <TrendingUp className="h-4 w-4" />
      default:
        return <Percent className="h-4 w-4" />
    }
  }

  return (
    <div className="relative min-h-screen bg-background pb-20">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <GridPattern width={40} height={40} x={-1} y={-1} stroke="black" strokeOpacity={0.1} strokeWidth={1} />
      </div>

      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-primary py-16 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Offers & Coupons</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              Discover amazing deals and save big on your favorite dishes with our special coupon codes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="container px-4 py-12">
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for coupons..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="whitespace-nowrap"
            >
              All Offers
            </Button>
            <Button
              variant={activeCategory === "food" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("food")}
              className="whitespace-nowrap"
            >
              Food
            </Button>
            <Button
              variant={activeCategory === "grocery" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("grocery")}
              className="whitespace-nowrap"
            >
              Grocery
            </Button>
            <Button
              variant={activeCategory === "special" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("special")}
              className="whitespace-nowrap"
            >
              Special
            </Button>
            <Button
              variant={activeCategory === "seasonal" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("seasonal")}
              className="whitespace-nowrap"
            >
              Seasonal
            </Button>
            <Button
              variant={activeCategory === "new-user" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("new-user")}
              className="whitespace-nowrap"
            >
              New User
            </Button>
          </div>
        </div>

        {/* Featured offers */}
        {featuredCoupons.length > 0 && activeCategory === "all" && searchQuery === "" && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Award className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-2xl font-bold">Featured Offers</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCoupons.map((coupon) => (
                <FeaturedCouponCard
                  key={coupon.id}
                  coupon={coupon}
                  isCopied={copiedCode === coupon.code}
                  onCopy={() => handleCopyCode(coupon.code)}
                  timeRemaining={getTimeRemaining(coupon.expiryDate)}
                  categoryIcon={getCategoryIcon(coupon.category)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All offers */}
        <div>
          <div className="flex items-center mb-6">
            <Tag className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-2xl font-bold">
              {activeCategory === "all"
                ? "All Offers"
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Offers`}
            </h2>
          </div>

          {filteredCoupons.length === 0 ? (
            <div className="text-center py-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No coupons found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter to find what you're looking for
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoupons.map((coupon, index) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CouponCard
                    coupon={coupon}
                    isCopied={copiedCode === coupon.code}
                    onCopy={() => handleCopyCode(coupon.code)}
                    timeRemaining={getTimeRemaining(coupon.expiryDate)}
                    categoryIcon={getCategoryIcon(coupon.category)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confetti explosion when copying code */}
      {isExploding && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <ConfettiExplosion force={0.6} duration={2000} particleCount={100} width={1600} />
        </div>
      )}
    </div>
  )
}

// Updated Featured Coupon Card Component
function FeaturedCouponCard({
  coupon,
  isCopied,
  onCopy,
  timeRemaining,
  categoryIcon,
}: {
  coupon: Coupon
  isCopied: boolean
  onCopy: () => void
  timeRemaining: string
  categoryIcon: React.ReactNode
}) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg">
      {/* Notched corners */}
      <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 bg-background rounded-full"></div>
      <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 bg-background rounded-full"></div>

      {/* Featured badge */}
      <div className="absolute top-4 right-4">
        <Badge variant="default" className="bg-primary text-white font-semibold">
          FEATURED
        </Badge>
      </div>

      <div className="p-6">
        {/* Brand logo and category */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-2">
            {categoryIcon}
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {coupon.category.replace("-", " ")}
            </span>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{timeRemaining}</span>
          </Badge>
        </div>

        {/* Main offer */}
        <div className="mb-4">
          <h3 className="text-3xl font-black tracking-tight mb-2">{coupon.discount}</h3>
          <p className="text-muted-foreground">{coupon.description}</p>
        </div>

        {/* Minimum order */}
        {coupon.minOrder && <p className="text-sm text-muted-foreground mb-4">on orders above ₹{coupon.minOrder}</p>}

        {/* Coupon code section */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="border-2 border-dashed border-primary/30 bg-primary/5 p-3 rounded-lg">
                <div className="text-center">
                  <code className="text-lg font-bold tracking-wider text-primary">{coupon.code}</code>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={onCopy}
            variant={isCopied ? "default" : "outline"}
            size="sm"
            className={cn(
              "transition-all duration-300 font-semibold",
              isCopied ? "bg-green-600 hover:bg-green-700 text-white" : "",
            )}
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" /> Copy Code
              </>
            )}
          </Button>
        </div>

        {/* Terms and conditions */}
        {coupon.terms && (
          <div className="mt-4 pt-4 border-t border-border">
            <Collapsible>
              <CollapsibleTrigger className="text-xs text-muted-foreground hover:text-primary transition-colors">
                View Terms & Conditions
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1 mt-2">
                  {coupon.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>

      {/* Decorative food illustration */}
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 translate-y-8">
        <div className="w-full h-full bg-primary rounded-full"></div>
      </div>
    </motion.div>
  )
}

// Updated Regular Coupon Card Component
function CouponCard({
  coupon,
  isCopied,
  onCopy,
  timeRemaining,
  categoryIcon,
}: {
  coupon: Coupon
  isCopied: boolean
  onCopy: () => void
  timeRemaining: string
  categoryIcon: React.ReactNode
}) {
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Notched corners */}
      <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 bg-background rounded-full"></div>
      <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 bg-background rounded-full"></div>

      <div className="p-6">
        {/* Brand logo and category */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {categoryIcon}
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {coupon.category.replace("-", " ")}
            </span>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="text-xs">{timeRemaining}</span>
          </Badge>
        </div>

        {/* Main offer */}
        <div className="mb-4">
          <h3 className="text-2xl font-black tracking-tight mb-2">{coupon.discount}</h3>
          <p className="text-sm text-muted-foreground">{coupon.description}</p>
        </div>

        {/* Minimum order */}
        {coupon.minOrder && <p className="text-sm text-muted-foreground mb-4">on orders above ₹{coupon.minOrder}</p>}

        {/* Coupon code section */}
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="border-2 border-dashed border-primary/30 bg-primary/5 p-3 rounded-lg">
                <div className="text-center">
                  <code className="text-lg font-bold tracking-wider text-primary">{coupon.code}</code>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={onCopy}
            variant={isCopied ? "default" : "outline"}
            size="sm"
            className={cn(
              "transition-all duration-300 font-semibold",
              isCopied ? "bg-green-600 hover:bg-green-700 text-white" : "",
            )}
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" /> Copy Code
              </>
            )}
          </Button>
        </div>

        {/* Terms and conditions */}
        {coupon.terms && (
          <div className="mt-4 pt-4 border-t border-border">
            <Collapsible>
              <CollapsibleTrigger className="text-xs text-muted-foreground hover:text-primary transition-colors">
                View Terms & Conditions
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1 mt-2">
                  {coupon.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>

      {/* Decorative food illustration */}
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10 transform translate-x-6 translate-y-6">
        <div className="w-full h-full bg-primary rounded-full"></div>
      </div>
    </div>
  )
}

