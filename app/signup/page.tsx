"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import OtpInput from "@/components/OtpInput"
import { motion, AnimatePresence } from "framer-motion"
import { sendOTP } from "@/lib/auth-utils"

const signupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(10, "Mobile number must not exceed 10 digits")
    .regex(/^\d+$/, "Mobile number must contain only digits"),
  email: z.string().email("Please enter a valid email address"),
})

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [step, setStep] = useState<"form" | "otp">("form")
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    email: "",
  })

  const { login, verifyOtp, authError, clearAuthError } = useAuth() // Destructure authError and clearAuthError
  const auth = useAuth()

  useEffect(() => {
    return () => {
      // Clear any auth errors when component unmounts
      clearAuthError?.()
    }
  }, [clearAuthError])

  useEffect(() => {
    // Clean up function to clear reCAPTCHA when component unmounts
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

  const router = useRouter()
  const { toast } = useToast()

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
    },
  })

  const onSignupSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    setIsLoading(true)
    try {
      await login(values.mobile) // Reusing login function to send OTP
      setUserData({
        name: values.name,
        mobile: values.mobile,
        email: values.email,
      })
      setStep("otp")
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
    } finally {
      setIsLoading(false)
    }
  }

  const onOtpComplete = async (otp: string) => {
    setIsLoading(true)
    try {
      const success = await verifyOtp(otp)
      if (success) {
        // Here you would typically call a signup API with the user data
        toast({
          title: "Success",
          description: "Your account has been created successfully!",
        })
        router.push("/profile")
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
    setIsResending(true)
    try {
      await sendOTP(userData.mobile)
      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your mobile number.",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-rose-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/loog1-zpoo8dBNn6SbELHiBFxMyAtWk0qwK0.png"
            alt="Swaadishta Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === "form" ? "Fill in your details to sign up" : `Enter the OTP sent to ${userData.mobile}`}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Link href="/login">
            <Button variant="outline" className="rounded-full px-6 bg-white text-gray-700">
              Login
            </Button>
          </Link>
          <Button variant="default" className="rounded-full px-6 bg-primary text-white">
            Sign Up
          </Button>
        </div>

        <AnimatePresence mode="wait">
          {step === "form" ? (
            <motion.div
              key="signup-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="mt-8 space-y-6">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your full name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                              +91
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

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Enter your email address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div id="recaptcha-container" className="recaptcha-container"></div>
                  {authError && <div className="text-red-500 text-sm mt-2">{authError}</div>}

                  <Button type="submit" className="w-full" disabled={isLoading}>
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
            </motion.div>
          ) : (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-6"
            >
              <OtpInput length={6} onComplete={onOtpComplete} error={!!auth.authError} />
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setStep("form")}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  onClick={handleResendOtp}
                  disabled={isResending}
                  className="flex items-center"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend OTP"
                  )}
                </Button>
              </div>
              <Button type="button" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">Enter the 6-digit OTP sent to your mobile number</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="font-medium text-primary hover:text-primary-dark">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary hover:text-primary-dark">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

