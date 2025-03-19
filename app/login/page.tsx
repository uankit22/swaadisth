"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, ArrowLeft, RefreshCw, Phone, Lock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import OtpInput from "@/components/OtpInput"
import { motion, AnimatePresence } from "framer-motion"
import { setupRecaptcha } from "@/lib/auth-utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const mobileFormSchema = z.object({
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [step, setStep] = useState<"mobile" | "otp">("mobile")
  const [mobileNumber, setMobileNumber] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const { login, verifyOtp, authError, clearAuthError } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/profile"
  const { toast } = useToast()
  const auth = useAuth() // Calling useAuth here to prevent conditional hook call
  const [countdown, setCountdown] = useState(0)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    return () => {
      // Clear any auth errors when component unmounts
      clearAuthError?.()
    }
  }, [clearAuthError])

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [countdown])

  useEffect(() => {
    // Initialize invisible reCAPTCHA when component mounts
    if (step === "mobile") {
      // Small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        try {
          setupRecaptcha("send-otp-button")
        } catch (error) {
          console.error("Failed to setup reCAPTCHA:", error)
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [step])

  // Clean up reCAPTCHA when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear()
          window.recaptchaVerifier = undefined
        } catch (e) {
          console.warn("Failed to clear reCAPTCHA on unmount:", e)
        }
      }
    }
  }, [])

  const mobileForm = useForm<z.infer<typeof mobileFormSchema>>({
    resolver: zodResolver(mobileFormSchema),
    defaultValues: {
      mobile: "",
    },
  })

  const onMobileSubmit = async (values: z.infer<typeof mobileFormSchema>) => {
    setIsLoading(true)
    try {
      await login(values.mobile)
      setMobileNumber(values.mobile)
      setStep("otp")
      setCountdown(90) // Start 90-second countdown
      toast({
        title: "OTP Sent",
        description: `We've sent an OTP to your mobile number ${values.mobile}`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      })

      // Reset reCAPTCHA on error
      try {
        setupRecaptcha("send-otp-button")
      } catch (e) {
        console.warn("Failed to reset reCAPTCHA:", e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onOtpComplete = async (otp: string) => {
    setIsLoading(true)
    try {
      const success = await verifyOtp(otp)
      if (success) {
        toast({
          title: "Success",
          description: "You have been successfully logged in.",
        })
        router.push(redirectTo)
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is invalid. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to verify OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    // Don't allow resend if countdown is still active
    if (countdown > 0) return

    setIsResending(true)
    try {
      // Setup reCAPTCHA for resend button
      setupRecaptcha("resend-otp-button")

      // Send OTP again
      await login(mobileNumber)
      setCountdown(90) // Reset the countdown

      toast({
        title: "OTP Resent",
        description: `We've sent a new OTP to your mobile number ${mobileNumber}`,
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to resend OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    setStep("mobile")

    // Reset reCAPTCHA when toggling auth mode
    setTimeout(() => {
      try {
        setupRecaptcha("send-otp-button")
      } catch (e) {
        console.warn("Failed to reset reCAPTCHA:", e)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loog1-zpoo8dBNn6SbELHiBFxMyAtWk0qwK0.png"
              alt="Swaadishta Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Swaadishta</CardTitle>
          <CardDescription>
            {step === "mobile"
              ? isLogin
                ? "Enter your mobile number to continue"
                : "Create a new account"
              : `Enter the OTP sent to ${mobileNumber}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={isLogin ? "default" : "outline"}
              className={`rounded-full px-6 ${isLogin ? "bg-primary text-white" : "bg-white text-gray-700"}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "outline"}
              className={`rounded-full px-6 ${!isLogin ? "bg-primary text-white" : "bg-white text-gray-700"}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {step === "mobile" ? (
              <motion.div
                key="mobile-form"
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? (
                  <Form {...mobileForm}>
                    <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-4">
                      <FormField
                        control={mobileForm.control}
                        name="mobile"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                              <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                  <Phone className="h-4 w-4 mr-1" /> +91
                                </span>
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="Enter your 10-digit mobile number"
                                  className="rounded-none rounded-r-md"
                                  maxLength={10}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {authError && (
                        <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 rounded border border-red-200">
                          {authError}
                        </div>
                      )}

                      <Button
                        id="send-otp-button"
                        ref={buttonRef}
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending OTP...
                          </>
                        ) : (
                          "Get OTP"
                        )}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Link href="/signup" className="block w-full">
                    <Button className="w-full">Continue to Sign Up</Button>
                  </Link>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="otp-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="text-center mb-4">
                  <Lock className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-gray-600">We've sent a 6-digit OTP to your mobile number</p>
                  <p className="font-medium">+91 {mobileNumber}</p>
                </div>

                <OtpInput length={6} onComplete={onOtpComplete} error={!!auth.authError} />

                <div className="flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setStep("mobile")}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    id="resend-otp-button"
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={handleResendOtp}
                    disabled={isResending || countdown > 0}
                    className="flex items-center"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                        Resending...
                      </>
                    ) : countdown > 0 ? (
                      <>
                        Resend OTP in {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, "0")}
                      </>
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                </div>

                {auth.authError && (
                  <div className="text-red-500 text-sm p-2 bg-red-50 rounded border border-red-200">
                    {auth.authError}
                  </div>
                )}

                <Button
                  type="button"
                  onClick={() => {}} // Empty function, will be handled by OtpInput onComplete
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 pt-0">
          <p className="text-center text-xs text-gray-600">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="font-medium text-primary hover:text-primary-dark">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary hover:text-primary-dark">
              Privacy Policy
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

