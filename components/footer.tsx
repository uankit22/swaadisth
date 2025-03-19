"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronDown,
  ChevronUp,
  Globe,
  Heart,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
// import ChatBot from "./ChatBot"

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
    color: "hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500",
  },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com", color: "hover:bg-blue-600" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:bg-blue-400" },
  { name: "Youtube", icon: Youtube, href: "https://youtube.com", color: "hover:bg-red-600" },
]

const footerLinks = [
  {
    title: "Our Range",
    links: [
      { name: "Sweets", href: "/sweets" },
      { name: "Dry Fruits", href: "/dry-fruits" },
      { name: "Gifting", href: "/gifting" },
      { name: "Indian Bakery", href: "/indian-bakery" },
      { name: "Indian Biscottis", href: "/indian-biscottis" },
      { name: "Savouries", href: "/savouries" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Company", href: "/company" },
      { name: "Our Brands", href: "/our-brands" },
      { name: "Global Footprint", href: "/global-footprint" },
      { name: "Contact Us", href: "/contact" },
      { name: "Login", href: "/login" },
      { name: "Track Your Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Return And Exchange Policy", href: "/returns" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  },
]

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
]

const paymentMethods = [
  { name: "Visa", image: "/payment-methods.svg#visa" },
  { name: "Mastercard", image: "/payment-methods.svg#mastercard" },
  { name: "American Express", image: "/payment-methods.svg#amex" },
  { name: "PayPal", image: "/payment-methods.svg#paypal" },
  { name: "Google Pay", image: "/payment-methods.svg#gpay" },
]

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "We typically process orders within 24 hours. Shipping times vary by location, but most orders are delivered within 3-5 business days. Express shipping options are available at checkout.",
  },
  {
    question: "Are your products preservative-free?",
    answer:
      "Yes, all our products are made without any artificial preservatives. We use traditional methods to ensure freshness and authentic taste.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to select countries internationally. Shipping costs and delivery times vary by location. Please check our shipping policy for more details.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account or visiting our 'Track Order' page.",
  },
]

const birdVariants = {
  rest: { rotate: 0 },
  hover: { rotate: -15, transition: { duration: 0.3, ease: "easeInOut" } },
}

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Footer() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([])
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [isHoveringBird, setIsHoveringBird] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const { toast } = useToast()
  const languageSelectorRef = useRef<HTMLDivElement>(null)

  // Toggle mobile accordion sections
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Handle clicks outside language selector
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageSelectorRef.current && !languageSelectorRef.current.contains(event.target as Node)) {
        setShowLanguageSelector(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if cookie consent has been given
  useEffect(() => {
    const consentGiven = localStorage.getItem("cookieConsent")
    const isMobile = window.innerWidth < 768 // md breakpoint
    if (consentGiven === "true" || isMobile) {
      setShowCookieConsent(false)
    }
  }, [])

  // Handle cookie consent
  const acceptCookies = () => {
    const isMobile = window.innerWidth < 768 // md breakpoint
    if (!isMobile) {
      localStorage.setItem("cookieConsent", "true")
      setShowCookieConsent(false)
      toast({
        title: "Cookies accepted",
        description: "Thank you for accepting cookies.",
      })
    }
  }

  return (
    <footer
      className="relative mt-24"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/header-pattern%20%281%29-WIs7BveXXYHba9Nab4t7sAb0kNFN8e.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "400px",
      }}
    >
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40" />
      <div className="relative z-10">
        {/* Top Border Line */}
        <div className="border-t border-[#C4A661]/20">
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial="rest"
              animate={isHoveringBird ? "hover" : "rest"}
              variants={birdVariants}
              onMouseEnter={() => setIsHoveringBird(true)}
              onMouseLeave={() => setIsHoveringBird(false)}
              className="absolute right-4 -top-10 cursor-pointer"
            >
              <Image
                src="/bird-logo.svg"
                alt="Decorative bird logo"
                width={120}
                height={80}
                className="transition-transform"
              />
              <span className="sr-only">Decorative bird logo</span>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 py-16"
        >
          {/* Top Border Line */}
          {/* <div className="border-t border-[#C4A661]/20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="rest"
            animate={isHoveringBird ? "hover" : "rest"}
            variants={birdVariants}
            onMouseEnter={() => setIsHoveringBird(true)}
            onMouseLeave={() => setIsHoveringBird(false)}
            className="absolute right-4 -top-10 cursor-pointer"
          >
            <Image
              src="/bird-logo.svg"
              alt="Decorative bird logo"
              width={120}
              height={80}
              className="transition-transform"
            />
            <span className="sr-only">Decorative bird logo</span>
          </motion.div>
        </div>
      </div> */}

          {/* Main Footer Content */}
          {/* <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-16 relative z-10"
      > */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
            {/* Logo and Description Column */}
            <motion.div variants={itemVariants} className="md:col-span-3">
              <Link href="/" className="inline-block mb-6 transition-transform hover:scale-105">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loog1-zpoo8dBNn6SbELHiBFxMyAtWk0qwK0.png"
                  alt="Swaadisth - Ghar Ka Swaad"
                  width={180}
                  height={72}
                  className="h-auto w-auto"
                />
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Authentic homemade snacks with zero preservatives. Taste the tradition in every bite. Made with love and
                care using traditional family recipes.
              </p>

              {/* Social Media Links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => (
                  <TooltipProvider key={social.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "flex items-center justify-center h-10 w-10 rounded-full bg-background border border-border transition-colors",
                            social.color,
                          )}
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="h-5 w-5" />
                          <span className="sr-only">{social.name}</span>
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Follow us on {social.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {/* Language Selector */}
              <div className="relative mb-6" ref={languageSelectorRef}>
                <button
                  onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md border border-border"
                >
                  <Globe className="h-4 w-4" />
                  <span>{languages.find((l) => l.code === selectedLanguage)?.name || "English"}</span>
                  {showLanguageSelector ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                <AnimatePresence>
                  {showLanguageSelector && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-10"
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setSelectedLanguage(language.code)
                            setShowLanguageSelector(false)
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors",
                            selectedLanguage === language.code && "bg-muted font-medium",
                          )}
                        >
                          {language.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Footer Links - Desktop */}
            <div className="hidden md:grid md:col-span-6 md:grid-cols-3 gap-8">
              {footerLinks.map((section) => (
                <motion.div key={section.title} variants={itemVariants}>
                  <h3 className="text-xl mb-4 font-playfair text-[#C4A661]">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-[#C4A661] transition-colors"
                        >
                          <span className="inline-block w-0 group-hover:w-2 h-0.5 bg-[#C4A661] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Footer Links - Mobile Accordion */}
            <div className="md:hidden space-y-4">
              {footerLinks.map((section) => (
                <div key={section.title} className="border-b border-border pb-2">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full py-2 text-left"
                  >
                    <h3 className="text-lg font-playfair text-[#C4A661]">{section.title}</h3>
                    {expandedSections.includes(section.title) ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedSections.includes(section.title) && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden space-y-2 py-2"
                      >
                        {section.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className="text-gray-600 dark:text-gray-400 hover:text-[#C4A661] transition-colors"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="md:col-span-3">
              <h3 className="text-xl mb-4 font-playfair text-[#C4A661]">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Business Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Monday to Saturday
                        <br />
                        10:00 AM to 05:30 PM IST
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a
                        href="tel:+919876543210"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href="mailto:care@swaadishta.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        care@swaadishta.com
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-[#C4A661]/10">
            <h3 className="text-xl mb-6 font-playfair text-[#C4A661]">Frequently Asked Questions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-center justify-between w-full p-4 text-left bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium pr-8">{faq.question}</h4>
                    {expandedFaqs.includes(index) ? (
                      <ChevronUp className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedFaqs.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 text-sm text-muted-foreground border-t border-border">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-[#C4A661]/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-4">
                <h4 className="text-sm font-medium">Secure Payment Options</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  <Image
                    src="/payment-methods.svg"
                    alt="Payment methods"
                    width={200}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-8Cti8v708yTZhyYcz6VP8yQ9JbDv7u.png"
                    alt="FSSAI Certified"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                  <span className="text-sm">FSSAI License: 12345678901234</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-primary">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1NIQqNkxREdojjOMlIovKFBh6nQVqy.png"
                      alt="Women Owned Business"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-medium">Proudly Women-Owned Business</span>
                    <p className="text-xs text-muted-foreground">Empowering women through culinary traditions</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div variants={itemVariants} className="mt-8 pt-8 border-t border-[#C4A661]/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                © {new Date().getFullYear()} Swaadishta. All rights reserved. Made with
                <Heart className="h-3 w-3 mx-1 text-red-500 inline" /> in India
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/fssai"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#C4A661] transition-colors"
                >
                  FSSAI License
                </Link>
                <Link
                  href="/sitemap"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#C4A661] transition-colors"
                >
                  Sitemap
                </Link>
                <Link
                  href="/accessibility"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#C4A661] transition-colors"
                >
                  Accessibility
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Cookie Consent Banner */}
      {/* <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 left-4 right-4 bg-background border border-border rounded-lg p-4 shadow-lg z-50 hidden md:block"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Cookie className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-lg">We value your privacy</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze
                    our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={() => setShowCookieConsent(false)}>
                  Decline
                </Button>
                <Button size="sm" onClick={acceptCookies} className="bg-primary hover:bg-primary/90">
                  Accept All
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </footer>
  )
}

