import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult, type UserCredential } from "firebase/auth"
import { auth } from "./firebase"

// Type definitions for global window object
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | undefined
    confirmationResult: ConfirmationResult | undefined
  }
}

/**
 * Sets up the reCAPTCHA verifier with an invisible challenge
 * @param buttonId - The ID of the button element to bind reCAPTCHA to
 */
export const setupRecaptcha = (buttonId = "send-otp-button") => {
  try {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      throw new Error("reCAPTCHA can only be initialized in browser environment")
    }

    // Check if the button exists
    const button = document.getElementById(buttonId)
    if (!button) {
      console.error(`reCAPTCHA button #${buttonId} not found`)
      return null
    }

    // Clear any existing reCAPTCHA to avoid duplicates
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear()
      } catch (e) {
        console.warn("Failed to clear existing reCAPTCHA:", e)
      }
      window.recaptchaVerifier = undefined
    }

    // Create a new reCAPTCHA verifier with invisible size
    window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA verified successfully")
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired")

        // Reset the reCAPTCHA
        if (window.recaptchaVerifier) {
          try {
            window.recaptchaVerifier.clear()
            setupRecaptcha(buttonId) // Re-setup the reCAPTCHA
          } catch (e) {
            console.warn("Failed to clear expired reCAPTCHA:", e)
          }
        }
      },
    })

    return window.recaptchaVerifier
  } catch (error) {
    console.error("Error setting up reCAPTCHA:", error)
    throw error
  }
}

/**
 * Formats a phone number to ensure it has the +91 prefix
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number with +91 prefix
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove any non-digit characters
  const digits = phoneNumber.replace(/\D/g, "")

  // If it's a 10-digit number, add +91 prefix
  if (digits.length === 10) {
    return `+91${digits}`
  }

  // If it already has country code (e.g., 91XXXXXXXXXX)
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+${digits}`
  }

  // Return as is if it's already in the correct format or invalid
  return phoneNumber
}

/**
 * Sends OTP to the provided phone number
 * @param phoneNumber - The phone number to send OTP to
 * @returns Promise with confirmation result
 */
export const sendOTP = async (phoneNumber: string): Promise<ConfirmationResult | null> => {
  try {
    const formattedNumber = formatPhoneNumber(phoneNumber)

    // Validate the phone number format
    if (!formattedNumber.match(/^\+91\d{10}$/)) {
      throw new Error("Invalid Indian phone number. Must be 10 digits.")
    }

    // Get the existing reCAPTCHA verifier
    const recaptchaVerifier = window.recaptchaVerifier

    if (!recaptchaVerifier) {
      throw new Error("reCAPTCHA not initialized. Please refresh the page and try again.")
    }

    // Send OTP
    const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber, recaptchaVerifier)

    // Store confirmation result for later verification
    window.confirmationResult = confirmationResult

    return confirmationResult
  } catch (error: any) {
    console.error("Error sending OTP:", error)

    // Reset reCAPTCHA on error
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear()
      } catch (e) {
        console.warn("Failed to clear reCAPTCHA after error:", e)
      }
      window.recaptchaVerifier = undefined
    }

    // Provide more specific error messages
    if (error.code === "auth/invalid-phone-number") {
      throw new Error("The phone number format is incorrect. Please enter a valid 10-digit number.")
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Too many requests from this device. Please try again later.")
    } else if (error.code === "auth/captcha-check-failed") {
      throw new Error("Security verification failed. Please refresh the page and try again.")
    } else {
      throw new Error(error.message || "Failed to send OTP. Please try again.")
    }
  }
}

/**
 * Verifies the OTP entered by the user
 * @param otp - The OTP entered by the user
 * @returns Promise with user credential
 */
export const verifyOTP = async (otp: string): Promise<UserCredential> => {
  try {
    if (!window.confirmationResult) {
      throw new Error("No OTP request found. Please request a new OTP.")
    }

    // Verify the OTP
    const result = await window.confirmationResult.confirm(otp)
    return result
  } catch (error: any) {
    console.error("Error verifying OTP:", error)

    if (error.code === "auth/invalid-verification-code") {
      throw new Error("The OTP you entered is invalid. Please check and try again.")
    } else if (error.code === "auth/code-expired") {
      throw new Error("The OTP has expired. Please request a new one.")
    } else {
      throw new Error(error.message || "Failed to verify OTP. Please try again.")
    }
  }
}

/**
 * Gets error message based on Firebase error code
 * @param errorCode - Firebase error code
 * @returns User-friendly error message
 */
export const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/invalid-phone-number":
      return "Invalid phone number format. Please enter a valid Indian mobile number."
    case "auth/missing-phone-number":
      return "Please enter your phone number."
    case "auth/quota-exceeded":
      return "SMS quota exceeded. Please try again later."
    case "auth/user-disabled":
      return "This user account has been disabled."
    case "auth/invalid-verification-code":
      return "Invalid OTP. Please check and try again."
    case "auth/code-expired":
      return "OTP has expired. Please request a new one."
    case "auth/too-many-requests":
      return "Too many requests. Please try again later."
    case "auth/captcha-check-failed":
      return "Security verification failed. Please refresh and try again."
    case "auth/missing-verification-code":
      return "Please enter the verification code."
    case "auth/invalid-verification-id":
      return "Invalid verification session. Please request a new OTP."
    case "auth/app-not-authorized":
      return "This app is not authorized to use Firebase Authentication. Please contact support."
    case "auth/argument-error":
      return "Invalid argument provided. Please try again."
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection and try again."
    default:
      return "An error occurred. Please try again."
  }
}

