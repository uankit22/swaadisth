"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Send, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { toast } = useToast()
  const emailInputRef = useRef<HTMLInputElement>(null)

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Handle subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      emailInputRef.current?.focus()
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubscribed(true)
    toast({
      title: "Subscription successful!",
      description: "Thank you for subscribing to our newsletter.",
      variant: "default",
    })

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4 mt-16 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-xl p-6 md:p-8 shadow-xl border border-primary/10 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-4"
            >
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Stay Connected</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-display mb-4">Join Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Subscribe to receive updates, access to exclusive deals, and more. Be the first to know about our seasonal
              offerings and special promotions.
            </p>

            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs">
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>Exclusive Offers</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs">
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>Recipe Updates</span>
              </div>
              <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs">
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>No Spam</span>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3"
                >
                  <div className="bg-green-100 dark:bg-green-800 rounded-full p-1 mt-0.5">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-300">Successfully subscribed!</h4>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      Thank you for subscribing to our newsletter. We've sent a confirmation email to your inbox.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubscribe}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      ref={emailInputRef}
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-12 h-12 bg-background/80 backdrop-blur-sm border-primary/20 focus:border-primary"
                    />
                    <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Subscribe
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By subscribing, you agree to our{" "}
                    <Link href="/privacy" className="underline hover:text-primary">
                      Privacy Policy
                    </Link>
                    . You can unsubscribe at any time.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

