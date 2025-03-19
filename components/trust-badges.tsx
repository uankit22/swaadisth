"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Shield,
  Award,
  Clock,
  Leaf,
  Check,
  Wheat,
  Droplet,
  Star,
  Users,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Info,
  ExternalLink,
  ThumbsUp,
  Medal,
  ArrowRight,
  ArrowLeft,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TrustBadges() {
  const containerRef = useRef(null)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const [customerCount, setCustomerCount] = useState(0)
  const [yearsCount, setYearsCount] = useState(0)
  const [recipeCount, setRecipeCount] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState("ingredients")
  const [showCertificateDialog, setShowCertificateDialog] = useState(false)
  const [satisfactionProgress, setSatisfactionProgress] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [testimonialFilter, setTestimonialFilter] = useState("all")
  const [testimonialSort, setTestimonialSort] = useState("recent")
  const [isTestimonialExpanded, setIsTestimonialExpanded] = useState<number | null>(null)
  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const [testimonialFormData, setTestimonialFormData] = useState({
    name: "",
    location: "",
    rating: 5,
    message: "",
  })

  const ingredientImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-julia-kuzenkov-442028-1974627.jpg-lR2xwJNvwJ5sXNsJggSMQnClqHyEQ8.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-galiiya-20689447.jpg-63usRNmqz8PBdIjNwXJljenQqwIO5C.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-shantanu-pal-938952-2802527.jpg-jOah25l5S7dwIQIB3yYB5RJse6EK27.jpeg",
  ]

  // Enhanced testimonials data with more details
  const testimonials = [
    {
      id: 1,
      text: "The quality and freshness of their products is unmatched. You can truly taste the difference! I've been ordering from them for over a year now and have never been disappointed.",
      author: "Priya Sharma",
      location: "Delhi",
      rating: 5,
      date: "2 weeks ago",
      category: "product",
      verified: true,
      avatar: "PS",
      avatarColor: "bg-purple-500",
      longText:
        "The quality and freshness of their products is unmatched. You can truly taste the difference! I've been ordering from them for over a year now and have never been disappointed. Their commitment to quality is evident in every bite. The packaging is also eco-friendly which I appreciate. My family loves their products and we've recommended them to all our friends and relatives.",
    },
    {
      id: 2,
      text: "Knowing the ingredients come from their own farm gives me peace of mind about what I'm feeding my family. The transparency in their sourcing is commendable.",
      author: "Rahul Verma",
      location: "Mumbai",
      rating: 5,
      date: "1 month ago",
      category: "ingredients",
      verified: true,
      avatar: "RV",
      avatarColor: "bg-blue-500",
      longText:
        "Knowing the ingredients come from their own farm gives me peace of mind about what I'm feeding my family. The transparency in their sourcing is commendable. In today's world where food adulteration is common, finding a brand that is so honest about their ingredients is refreshing. I've visited their farm once and was impressed by their sustainable farming practices. Will continue to support this brand for years to come.",
    },
    {
      id: 3,
      text: "Their commitment to quality and tradition is evident in every bite. Simply authentic! The flavors remind me of my grandmother's cooking.",
      author: "Ananya Patel",
      location: "Ahmedabad",
      rating: 4,
      date: "3 weeks ago",
      category: "taste",
      verified: false,
      avatar: "AP",
      avatarColor: "bg-green-500",
      longText:
        "Their commitment to quality and tradition is evident in every bite. Simply authentic! The flavors remind me of my grandmother's cooking. It's hard to find traditional flavors in today's market, but they've managed to preserve the authentic taste while ensuring modern quality standards. The only reason I'm giving 4 stars instead of 5 is because I wish they had more variety in their product range.",
    },
    {
      id: 4,
      text: "The freshness is incredible! You can tell they make everything after you order. The delivery was prompt and the packaging was excellent.",
      author: "Vikram Singh",
      location: "Jaipur",
      rating: 5,
      date: "1 week ago",
      category: "delivery",
      verified: true,
      avatar: "VS",
      avatarColor: "bg-amber-500",
      longText:
        "The freshness is incredible! You can tell they make everything after you order. The delivery was prompt and the packaging was excellent. I ordered for a family gathering and everyone was impressed with the quality. The delivery person was also very courteous and followed all safety protocols. Will definitely order again for special occasions and recommend to others looking for premium quality food products.",
    },
    {
      id: 5,
      text: "Customer service is top-notch! I had an issue with my order and they resolved it immediately. Very professional and courteous.",
      author: "Meera Kapoor",
      location: "Bangalore",
      rating: 5,
      date: "2 days ago",
      category: "service",
      verified: true,
      avatar: "MK",
      avatarColor: "bg-pink-500",
      longText:
        "Customer service is top-notch! I had an issue with my order and they resolved it immediately. Very professional and courteous. The representative I spoke with was knowledgeable about their products and helped me choose alternatives that suited my dietary requirements. It's rare to find such personalized service these days. Their attention to customer satisfaction really sets them apart from other food brands.",
    },
    {
      id: 6,
      text: "The packaging is eco-friendly and the products are worth every penny. Great value for money considering the quality.",
      author: "Arjun Mehta",
      location: "Chennai",
      rating: 4,
      date: "2 weeks ago",
      category: "product",
      verified: false,
      avatar: "AM",
      avatarColor: "bg-indigo-500",
      longText:
        "The packaging is eco-friendly and the products are worth every penny. Great value for money considering the quality. I appreciate their commitment to sustainability - from farm practices to packaging. While the products are slightly more expensive than mass-produced alternatives, the quality justifies the price. I've been using their products for my restaurant and my customers have noticed the difference in taste and quality.",
    },
  ]

  // Filter testimonials based on selected filter
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (testimonialFilter === "all") return true
    if (testimonialFilter === "verified" && testimonial.verified) return true
    return testimonial.category === testimonialFilter
  })

  // Sort testimonials based on selected sort option
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (testimonialSort === "recent") {
      // Simple sort by date (assuming more recent = smaller index)
      return testimonials.indexOf(a) - testimonials.indexOf(b)
    } else if (testimonialSort === "highest") {
      return b.rating - a.rating
    } else if (testimonialSort === "lowest") {
      return a.rating - b.rating
    }
    return 0
  })

  // Update useInView configuration for faster animation trigger
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.1, // Reduced threshold for faster trigger
    margin: "100px 0px", // Pre-load margin
  })

  // Update the animation variants for smoother transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  // Image slideshow effect with smoother transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideDirection(1) // Moving forward
      setCurrentSlide((prev) => (prev + 1) % ingredientImages.length)
    }, 4000) // Change image every 4 seconds for better viewing

    return () => clearInterval(timer)
  }, [ingredientImages.length])

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  // Counter animation effect
  useEffect(() => {
    if (isInView) {
      const customerInterval = setInterval(() => {
        setCustomerCount((prev) => {
          const next = prev + 50
          if (next >= 10000) {
            clearInterval(customerInterval)
            return 10000
          }
          return next
        })
      }, 30)

      const yearsInterval = setInterval(() => {
        setYearsCount((prev) => {
          const next = prev + 1
          if (next >= 25) {
            clearInterval(yearsInterval)
            return 25
          }
          return next
        })
      }, 100)

      const recipeInterval = setInterval(() => {
        setRecipeCount((prev) => {
          const next = prev + 1
          if (next >= 50) {
            clearInterval(recipeInterval)
            return 50
          }
          return next
        })
      }, 60)

      // Satisfaction progress animation
      const satisfactionInterval = setInterval(() => {
        setSatisfactionProgress((prev) => {
          const next = prev + 1
          if (next >= 98) {
            clearInterval(satisfactionInterval)
            return 98
          }
          return next
        })
      }, 20)

      return () => {
        clearInterval(customerInterval)
        clearInterval(yearsInterval)
        clearInterval(recipeInterval)
        clearInterval(satisfactionInterval)
      }
    }
  }, [isInView])

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    // This helps with better touch interactions on mobile
    e.currentTarget.classList.add("touch-active")
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.currentTarget.classList.remove("touch-active")
  }

  const handleTestimonialNavigation = (direction: "prev" | "next") => {
    if (testimonialRef.current) {
      const scrollAmount = direction === "prev" ? -300 : 300
      testimonialRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handleTestimonialFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    console.log("Testimonial submitted:", testimonialFormData)
    // Show success message and reset form
    alert("Thank you for your feedback! Your testimonial has been submitted for review.")
    setTestimonialFormData({
      name: "",
      location: "",
      rating: 5,
      message: "",
    })
    setShowTestimonialForm(false)
  }

  // Faster animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced y distance
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4, // Faster duration
        staggerChildren: 0.05, // Faster stagger
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Reduced y distance
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }, // Faster duration
    },
  }

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  const testimonialCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      id="why-choose-us" // Added ID for scroll targeting
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="rounded-xl bg-gradient-to-br from-accent/10 via-background to-primary/10 p-4 sm:p-6 md:p-8 lg:p-10 border border-accent/20 shadow-lg relative overflow-hidden"
    >
      {/* Enhanced background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Enhanced header section */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 md:mb-4"
          >
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            <span className="text-xs sm:text-sm font-medium">Trust & Quality</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">
            Why Choose Us
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Experience the perfect blend of tradition and quality, backed by certifications and farm-fresh ingredients.
          </p>
        </motion.div>

        {/* Customer Satisfaction Meter */}
        <motion.div
          variants={itemVariants}
          className="mb-8 md:mb-12 p-4 sm:p-6 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />

                  {/* Define the gradient */}
                  <defs>
                    <linearGradient id="progressGradient" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90)">
                      <stop offset="0%" stopColor="#ef4444" /> {/* Red */}
                      <stop offset="30%" stopColor="#ef4444" /> {/* Red */}
                      <stop offset="30%" stopColor="#f97316" /> {/* Orange */}
                      <stop offset="60%" stopColor="#f97316" /> {/* Orange */}
                      <stop offset="60%" stopColor="#22c55e" /> {/* Green */}
                      <stop offset="100%" stopColor="#22c55e" /> {/* Green */}
                    </linearGradient>
                  </defs>

                  {/* Progress circle with gradient */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="10"
                    strokeDasharray={`${(2 * Math.PI * 45 * satisfactionProgress) / 100} ${
                      2 * Math.PI * 45 * (1 - satisfactionProgress / 100)
                    }`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />

                  {/* Percentage text */}
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl sm:text-3xl md:text-4xl font-bold"
                    fill="currentColor"
                  >
                    {satisfactionProgress}%
                  </text>
                </svg>
              </div>
              <p className="text-base md:text-lg font-medium mt-2">Customer Satisfaction</p>
            </div>

            <div className="w-full md:w-2/3">
              <h3 className="text-xl md:text-2xl font-medium mb-3 md:mb-4 text-slate-900 dark:text-slate-100 text-center md:text-left">
                Our Commitment to Excellence
              </h3>

              {/* Find the customer satisfaction stats section with the progress bars */}

              {/* Replace the existing progress bars with color-coded ones */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Product Quality</span>
                    <span className="text-sm font-medium">98%</span>
                  </div>
                  <Progress value={98} className="h-2" colorMode="gradient" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">On-time Delivery</span>
                    <span className="text-sm font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" colorMode="gradient" />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Customer Support</span>
                    <span className="text-sm font-medium">97%</span>
                  </div>
                  <Progress value={97} className="h-2" colorMode="gradient" />
                </div>
              </div>

              <div className="mt-4 md:mt-6 flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                <div className="flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                  <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-xs sm:text-sm text-orange-700 dark:text-orange-300">4.9/5 Average Rating</span>
                </div>
                <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                  <Medal className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs sm:text-sm text-green-700 dark:text-green-300">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FSSAI Certification - Enhanced prominence */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="mb-8 md:mb-12 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl border border-blue-200 dark:border-blue-800 shadow-lg overflow-hidden relative"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-blue-500"
            />
            <motion.div
              animate={{
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -left-20 -bottom-20 w-60 h-60 rounded-full bg-indigo-500"
            />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-full max-w-[200px] md:max-w-xs h-24 sm:h-28 md:h-32 bg-white dark:bg-blue-950 rounded-xl shadow-md"
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8Cti8v708yTZhyYcz6VP8yQ9JbDv7u.png"
                    alt="FSSAI Certified"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    Verified
                  </motion.div>
                </motion.div>
              </div>

              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-medium text-blue-900 dark:text-blue-100 mb-2 md:mb-3">
                  FSSAI Certified & Quality Assured
                </h3>
                <p className="text-sm sm:text-base text-blue-700 dark:text-blue-300 mb-3 md:mb-4">
                  Our commitment to food safety and quality is validated by FSSAI certification. Every product meets the
                  highest standards of food safety and hygiene.
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start mb-3 md:mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 sm:px-4 sm:py-2 rounded-full">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">Quality Tested</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 sm:px-4 sm:py-2 rounded-full">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">Safety Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 sm:px-4 sm:py-2 rounded-full">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">Regularly Audited</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs sm:text-sm bg-white/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800"
                      >
                        <Info className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                        View Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>FSSAI Certification</DialogTitle>
                        <DialogDescription>Our FSSAI License Number: 12345678901234</DialogDescription>
                      </DialogHeader>
                      <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                        <div className="flex justify-center mb-4">
                          <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-N1sKgqNlHN03btbEKfAewSJjlzfqwt.png"
                            alt="FSSAI Certified"
                            width={200}
                            height={100}
                            className="object-contain"
                          />
                        </div>
                        <p className="text-sm mb-2">
                          This certifies that our establishment complies with the standards laid down in the Food Safety
                          and Standards Act, 2006 and the regulations made thereunder.
                        </p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="font-medium">Issue Date:</p>
                            <p>01-Jan-2023</p>
                          </div>
                          <div>
                            <p className="font-medium">Valid Until:</p>
                            <p>31-Dec-2025</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Verify on FSSAI Website
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm bg-white/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800"
                  >
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    Learn About FSSAI
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Counter Section - Enhanced with better visuals */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-12"
        >
          {[
            { icon: Users, count: customerCount, label: "Happy Customers", suffix: "+" },
            { icon: Clock, count: yearsCount, label: "Years of Tradition", suffix: "+" },
            { icon: Award, count: recipeCount, label: "Traditional Recipes", suffix: "+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden bg-gradient-to-br from-background to-accent/5 rounded-xl p-4 sm:p-6 text-center shadow-sm border border-border/50 group"
            >
              {/* Decorative background */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <pattern id={`stat-pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="2" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#stat-pattern-${index})`} />
                </svg>
              </div>

              <div className="relative z-10">
                <motion.div
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                  className="bg-primary/10 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  {stat.icon && <stat.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />}
                </motion.div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {stat.count.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-muted-foreground font-medium text-sm sm:text-base md:text-lg">{stat.label}</div>

                {/* Animated highlight on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Tabs Section */}
        <motion.div
          variants={itemVariants}
          className="mb-8 md:mb-12 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden"
        >
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
              <TabsList className="w-full justify-start rounded-none h-auto p-0 flex-nowrap">
                <TabsTrigger
                  value="ingredients"
                  className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none ${
                    activeTab === "ingredients" ? "border-b-2 border-primary" : ""
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  Farm-Sourced Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="freshness"
                  className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none ${
                    activeTab === "freshness" ? "border-b-2 border-primary" : ""
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  Made Fresh To Order
                </TabsTrigger>
                <TabsTrigger
                  value="testimonials"
                  className={`px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none ${
                    activeTab === "testimonials" ? "border-b-2 border-primary" : ""
                  }`}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  Customer Testimonials
                </TabsTrigger>
              </TabsList>
            </div>

            {/* For the TabsContent sections, adjust the padding and spacing */}
            <TabsContent value="ingredients" className="p-0 m-0">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Adjust the header spacing */}
                <div className="flex flex-col items-center mb-6 md:mb-8">
                  <div className="bg-amber-100 dark:bg-amber-800/50 p-1.5 sm:p-2 rounded-full mb-3 md:mb-4">
                    <Wheat className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-amber-800 dark:text-amber-300 text-center mb-2 md:mb-3">
                    Farm-Sourced Ingredients
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-amber-700 dark:text-amber-400 text-center max-w-2xl">
                    Experience the pure taste of nature with our farm-sourced ingredients. From our fields to your
                    table, we ensure complete transparency and quality in every step.
                  </p>
                </div>

                {/* Adjust the image gallery grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 md:mb-8">
                  {/* Keep the image cards the same but adjust their height */}
                  {[
                    {
                      image: ingredientImages[0],
                      title: "Organic Wheat & Grains",
                      description: "Grown in our own fields using traditional farming methods without pesticides",
                      icon: <Wheat className="h-5 w-5 text-amber-600" />,
                    },
                    {
                      image: ingredientImages[1],
                      title: "Pure A2 Cow Ghee",
                      description: "From our indigenous cow breeds, processed using traditional methods",
                      icon: <Droplet className="h-5 w-5 text-amber-600" />,
                    },
                    {
                      image: ingredientImages[2],
                      title: "Hand-Picked Spices",
                      description: "Cultivated and processed in-house for maximum flavor and aroma",
                      icon: <Leaf className="h-5 w-5 text-amber-600" />,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-amber-900/20 rounded-xl overflow-hidden border border-amber-200 dark:border-amber-700 shadow-md"
                    >
                      <div className="relative h-40 sm:h-48 overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 text-white">
                            <div className="bg-amber-500/80 backdrop-blur-sm p-1.5 rounded-full">{item.icon}</div>
                            <h4 className="font-medium text-lg">{item.title}</h4>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 sm:p-4">
                        <p className="text-sm text-amber-700 dark:text-amber-300">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Adjust the features grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8">
                  {[
                    {
                      title: "No Preservatives",
                      description: "100% natural with no artificial additives",
                      icon: <Check className="h-5 w-5 text-green-600" />,
                    },
                    {
                      title: "Cold-Pressed Oils",
                      description: "Extracted naturally without chemicals",
                      icon: <Check className="h-5 w-5 text-green-600" />,
                    },
                    {
                      title: "Sustainable Farming",
                      description: "Eco-friendly practices that respect nature",
                      icon: <Check className="h-5 w-5 text-green-600" />,
                    },
                    {
                      title: "Traceable Source",
                      description: "Know exactly where your food comes from",
                      icon: <Check className="h-5 w-5 text-green-600" />,
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-xl p-3 sm:p-4 border border-amber-200/50 dark:border-amber-700/30 shadow-sm"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-white dark:bg-amber-800 p-1 rounded-full">{feature.icon}</div>
                        <div>
                          <h5 className="font-medium text-amber-900 dark:text-amber-100 mb-1">{feature.title}</h5>
                          <p className="text-sm text-amber-700 dark:text-amber-300">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Adjust the quality commitment banner */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 p-4 sm:p-6 text-white">
                  {/* Keep the background effects the same */}

                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-lg sm:text-xl font-semibold mb-2">Our Quality Commitment</h4>
                      <p className="text-sm sm:text-base text-amber-100">
                        We believe that the quality of ingredients directly impacts the taste and nutritional value of
                        our products. That's why we grow our own ingredients and maintain strict quality standards.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 md:mt-0 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white whitespace-nowrap"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      Visit Our Farm
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="freshness" className="p-0 m-0">
              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                  <div className="w-full md:w-2/3">
                    {/* Adjust the header spacing */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                      <div className="bg-orange-100 dark:bg-orange-900/40 p-1.5 sm:p-2 rounded-full">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-medium text-slate-800 dark:text-slate-200">
                        Made Fresh To Order
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-300 mb-4 md:mb-6">
                      We prepare food{" "}
                      <span className="font-bold text-orange-600 dark:text-orange-400">
                        only after receiving your order
                      </span>{" "}
                      - no pre-made or old inventory. Every item is freshly made, ensuring maximum flavor and quality.
                      This approach might take a little more time, but the difference in taste and quality is worth the
                      wait.
                    </p>

                    {/* Adjust the feature cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-6">
                      {[
                        {
                          title: "No Pre-Made Inventory",
                          description: "Everything made fresh after your order",
                          color: "bg-amber-100 dark:bg-amber-900/30",
                          iconColor: "text-amber-600 dark:text-amber-400",
                          textColor: "text-amber-900 dark:text-amber-100",
                          descColor: "text-amber-700 dark:text-amber-300",
                          borderColor: "border-amber-200/50 dark:border-amber-700/50",
                        },
                        {
                          title: "Traditional Cooking Methods",
                          description: "Authentic techniques for authentic taste",
                          color: "bg-blue-100 dark:bg-blue-900/30",
                          iconColor: "text-blue-600 dark:text-blue-400",
                          textColor: "text-blue-900 dark:text-blue-100",
                          descColor: "text-blue-700 dark:text-blue-300",
                          borderColor: "border-blue-200/50 dark:border-blue-700/50",
                        },
                        {
                          title: "Prepared with Care & Love",
                          description: "Attention to detail in every dish",
                          color: "bg-rose-100 dark:bg-rose-900/30",
                          iconColor: "text-rose-600 dark:text-rose-400",
                          textColor: "text-rose-900 dark:text-rose-100",
                          descColor: "text-rose-700 dark:text-rose-300",
                          borderColor: "border-rose-200/50 dark:border-rose-700/50",
                        },
                        {
                          title: "Maximum Freshness Guaranteed",
                          description: "Taste the difference in every bite",
                          color: "bg-green-100 dark:bg-green-900/30",
                          iconColor: "text-green-600 dark:text-green-400",
                          textColor: "text-green-900 dark:text-green-100",
                          descColor: "text-green-700 dark:text-green-300",
                          borderColor: "border-green-200/50 dark:border-green-700/50",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -2 }}
                          className={`bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border ${item.borderColor}`}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`mt-1 ${item.color} p-1.5 rounded-full`}>
                              <Check className={`h-4 w-4 ${item.iconColor}`} />
                            </div>
                            <div>
                              <h5 className={`font-medium ${item.textColor} mb-1`}>{item.title}</h5>
                              <p className={`text-sm ${item.descColor}`}>{item.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Adjust the process timeline */}
                    <div className="mb-4 md:mb-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-xl p-3 sm:p-5 border border-slate-200 dark:border-slate-700">
                      <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 flex items-center">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 p-1.5 rounded-full mr-2">
                          <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        Our Fresh Food Process
                      </h4>
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-800"></div>

                        {/* Timeline items */}
                        {[
                          {
                            title: "Order Received",
                            description: "Your order is confirmed and sent to our kitchen",
                            color: "bg-blue-500",
                          },
                          {
                            title: "Ingredients Prepared",
                            description: "Fresh ingredients are gathered from our farm",
                            color: "bg-amber-500",
                          },
                          {
                            title: "Cooked with Care",
                            description: "Traditional recipes followed with precision",
                            color: "bg-orange-500",
                          },
                          {
                            title: "Quality Check",
                            description: "Each item is inspected for quality and taste",
                            color: "bg-purple-500",
                          },
                          {
                            title: "Carefully Packed",
                            description: "Packed to maintain freshness during delivery",
                            color: "bg-green-500",
                          },
                        ].map((item, index) => (
                          <div key={index} className="ml-8 mb-4 relative">
                            <div
                              className={`absolute -left-10 top-1 w-6 h-6 ${item.color} rounded-full flex items-center justify-center`}
                            >
                              <span className="text-white text-xs font-bold">{index + 1}</span>
                            </div>
                            <h5 className="font-medium text-slate-800 dark:text-slate-200">{item.title}</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Adjust the bottom info box */}
                    <div className="flex items-center gap-2 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                      <Leaf className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm sm:text-base text-orange-800 dark:text-orange-200 font-medium">
                        Experience the taste of homemade goodness in every bite
                      </span>
                    </div>
                  </div>

                  <div className="w-full md:w-1/3 mt-4 md:mt-0">
                    {/* YouTube Video Embed */}
                    <div className="relative h-56 sm:h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src="https://www.youtube.com/embed/PDV3CGvLdQo"
                        title="Wheat farm nature copyright free video"
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Adjust the info cards */}
                    <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-3 sm:p-4 rounded-xl border border-purple-200 dark:border-purple-800 shadow-sm">
                        <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                          Did You Know?
                        </h5>
                        <p className="text-sm text-purple-700 dark:text-purple-400">
                          Fresh food retains more nutrients and has better flavor compared to pre-made items that have
                          been stored.
                        </p>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3 sm:p-4 rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm cursor-help">
                              <div className="flex justify-between items-center">
                                <h5 className="font-medium text-amber-800 dark:text-amber-300">
                                  Average Preparation Time
                                </h5>
                                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                              </div>
                              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">45-60 min</p>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-sm">
                              This is the average time we take to prepare your order fresh. Quality takes time!
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <div className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 p-3 sm:p-4 rounded-xl border border-blue-200 dark:border-blue-800 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-blue-800 dark:text-blue-300">Customer Feedback</h5>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-400 italic">
                          "The freshness is incredible! You can tell they make everything after you order."
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-500 mt-1 text-right">— Vikram S.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="p-0 m-0">
              <div className="p-4 sm:p-6 md:p-8">
                {/* Enhanced testimonials header with interactive elements */}
                <div className="flex flex-col space-y-4 mb-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="bg-purple-100 dark:bg-purple-800/50 p-1.5 sm:p-2 rounded-full">
                        <Star className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-medium text-purple-800 dark:text-purple-300">
                        What Our Customers Say
                      </h3>
                    </div>

                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => setShowTestimonialForm(true)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Share Your Experience
                    </Button>
                  </div>

                  {/* Filter and sort controls */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-between bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant={testimonialFilter === "all" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800/30"
                        onClick={() => setTestimonialFilter("all")}
                      >
                        All
                      </Badge>
                      <Badge
                        variant={testimonialFilter === "verified" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800/30"
                        onClick={() => setTestimonialFilter("verified")}
                      >
                        Verified Buyers
                      </Badge>
                      <Badge
                        variant={testimonialFilter === "product" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800/30"
                        onClick={() => setTestimonialFilter("product")}
                      >
                        Product Quality
                      </Badge>
                      <Badge
                        variant={testimonialFilter === "taste" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800/30"
                        onClick={() => setTestimonialFilter("taste")}
                      >
                        Taste
                      </Badge>
                      <Badge
                        variant={testimonialFilter === "delivery" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800/30"
                        onClick={() => setTestimonialFilter("delivery")}
                      >
                        Delivery
                      </Badge>
                      <Badge
                        variant={testimonialFilter === "service" ? "default" : "outline"}
                        className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-800/30"
                        onClick={() => setTestimonialFilter("service")}
                      >
                        Customer Service
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Sort by:</span>
                      <Select value={testimonialSort} onValueChange={setTestimonialSort}>
                        <SelectTrigger className="h-8 w-[130px] text-xs">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="highest">Highest Rated</SelectItem>
                          <SelectItem value="lowest">Lowest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Testimonial cards with horizontal scrolling on mobile */}
                <div className="relative mb-6">
                  <div
                    ref={testimonialRef}
                    className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible"
                  >
                    {sortedTestimonials.length > 0 ? (
                      sortedTestimonials.map((testimonial) => (
                        <motion.div
                          key={testimonial.id}
                          variants={testimonialCardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          className={`flex-shrink-0 w-[85vw] max-w-[300px] sm:w-full snap-center ${
                            isTestimonialExpanded === testimonial.id ? "h-auto" : "h-auto"
                          } bg-white dark:bg-purple-900/20 rounded-xl p-5 shadow-md border border-purple-100 dark:border-purple-800`}
                          onTouchStart={handleTouchStart}
                          onTouchEnd={handleTouchEnd}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className={`h-10 w-10 ${testimonial.avatarColor} text-white`}>
                              <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-slate-900 dark:text-slate-100">{testimonial.author}</h4>
                                {testimonial.verified && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] px-1 py-0 h-4 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                  >
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {testimonial.location} • {testimonial.date}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>

                          <div className="relative">
                            <div className="text-slate-700 dark:text-slate-300 text-sm mb-2">
                              {isTestimonialExpanded === testimonial.id ? (
                                testimonial.longText
                              ) : (
                                <>
                                  {testimonial.text.length > 120
                                    ? `${testimonial.text.substring(0, 120)}...`
                                    : testimonial.text}
                                </>
                              )}
                            </div>

                            {testimonial.text.length > 120 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-purple-600 dark:text-purple-400 p-0 h-auto hover:bg-transparent hover:text-purple-700 dark:hover:text-purple-300"
                                onClick={() =>
                                  setIsTestimonialExpanded(
                                    isTestimonialExpanded === testimonial.id ? null : testimonial.id,
                                  )
                                }
                              >
                                {isTestimonialExpanded === testimonial.id ? "Read less" : "Read more"}
                              </Button>
                            )}
                          </div>

                          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <Badge
                              variant="outline"
                              className="text-xs bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800"
                            >
                              {testimonial.category === "product"
                                ? "Product Quality"
                                : testimonial.category === "taste"
                                  ? "Taste"
                                  : testimonial.category === "delivery"
                                    ? "Delivery"
                                    : testimonial.category === "service"
                                      ? "Customer Service"
                                      : testimonial.category === "ingredients"
                                        ? "Ingredients"
                                        : "General"}
                            </Badge>

                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                              <ThumbsUp className="h-4 w-4 text-slate-400 hover:text-purple-600" />
                              <span className="sr-only">Helpful</span>
                            </Button>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-full flex items-center justify-center p-8 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800">
                        <p className="text-purple-700 dark:text-purple-300 text-center">
                          No testimonials match your current filters. Try adjusting your selection.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Navigation arrows for mobile scrolling */}
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 hidden sm:hidden">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border-slate-200 shadow-md"
                      onClick={() => handleTestimonialNavigation("prev")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Previous</span>
                    </Button>
                  </div>

                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden sm:hidden">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm border-slate-200 shadow-md"
                      onClick={() => handleTestimonialNavigation("next")}
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Next</span>
                    </Button>
                  </div>
                </div>

                {/* Customer satisfaction stats */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4 sm:p-6 border border-purple-100 dark:border-purple-800">
                  <h4 className="text-lg font-medium text-purple-800 dark:text-purple-300 mb-4">
                    Customer Satisfaction
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-purple-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</p>
                      <p className="text-sm text-purple-800 dark:text-purple-300">Would Order Again</p>
                    </div>
                    <div className="bg-white dark:bg-purple-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.9/5</p>
                      <p className="text-sm text-purple-800 dark:text-purple-300">Average Rating</p>
                    </div>
                    <div className="bg-white dark:bg-purple-900/20 rounded-lg p-4 text-center">
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">95%</p>
                      <p className="text-sm text-purple-800 dark:text-purple-300">Recommend to Friends</p>
                    </div>
                  </div>
                </div>

                {/* Testimonial submission form dialog */}
                <Dialog open={showTestimonialForm} onOpenChange={setShowTestimonialForm}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share Your Experience</DialogTitle>
                      <DialogDescription>
                        We value your feedback! Tell us about your experience with our products and services.
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleTestimonialFormSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Your Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full p-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md dark:bg-slate-800"
                            value={testimonialFormData.name}
                            onChange={(e) => setTestimonialFormData({ ...testimonialFormData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium">
                            Your Location
                          </label>
                          <input
                            id="location"
                            type="text"
                            className="w-full p-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md dark:bg-slate-800"
                            value={testimonialFormData.location}
                            onChange={(e) =>
                              setTestimonialFormData({ ...testimonialFormData, location: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Rating</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setTestimonialFormData({ ...testimonialFormData, rating })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  rating <= testimonialFormData.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full p-2 text-sm border border-slate-300 dark:border-slate-700 rounded-md dark:bg-slate-800"
                          value={testimonialFormData.message}
                          onChange={(e) => setTestimonialFormData({ ...testimonialFormData, message: e.target.value })}
                          required
                        ></textarea>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setShowTestimonialForm(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
                          Submit
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Expandable FAQ Section */}
        <motion.div
          variants={itemVariants}
          className="mb-8 md:mb-12 bg-white dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden"
        >
          <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {[
              {
                id: "faq-1",
                question: "How do you ensure food safety and quality?",
                answer:
                  "We maintain strict quality control measures throughout our production process. Our facility is FSSAI certified, and we follow all food safety guidelines. Regular quality checks are performed at every stage of production, and our staff is trained in food safety protocols.",
              },
              {
                id: "faq-2",
                question: "Are your products suitable for people with dietary restrictions?",
                answer:
                  "We offer a range of products suitable for different dietary needs. All our products are clearly labeled with ingredients and allergen information. We have options for vegetarians, and some products are suitable for those with specific dietary requirements. However, we recommend checking the ingredient list for each product.",
              },
              {
                id: "faq-3",
                question: "How long do your products stay fresh?",
                answer:
                  "Since we don't use preservatives, our products have a shorter shelf life compared to commercial alternatives. Most of our snacks stay fresh for 15-30 days when stored properly in an airtight container in a cool, dry place. The exact shelf life is mentioned on each product package.",
              },
              {
                id: "faq-4",
                question: "Do you ship nationwide?",
                answer:
                  "Yes, we ship across India. Delivery times vary depending on your location, but we use express shipping to ensure our products reach you in the freshest condition possible. International shipping is available for select countries.",
              },
            ].map((faq) => (
              <div key={faq.id} className="py-3 sm:py-4 px-4 sm:px-6">
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggleSection(faq.id)}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <h4 className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 pr-2">
                    {faq.question}
                  </h4>
                  {expandedSections.includes(faq.id) ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-slate-500" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-slate-600 dark:text-slate-400 text-xs sm:text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 right-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </motion.div>
  )
}

