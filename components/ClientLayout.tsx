"use client"

import type React from "react"
import { useState, useEffect } from "react"
import LoadingScreen from "@/components/LoadingScreen"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { LoadingProvider } from "@/contexts/LoadingContext"
import { CustomToast } from "@/components/ui/custom-toast"
import CartDrawer from "@/components/cart-drawer"
import Footer from "@/components/footer"
import ChatBot from "@/components/ChatBot"

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 500)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => window.removeEventListener("load", handleLoad)
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <CartProvider>
          <LoadingProvider>
            {isLoading && <LoadingScreen />}
            <CustomToast />
            <CartDrawer />
            {!isLoading && children}
            <Footer />
            <ChatBot />
          </LoadingProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default ClientLayout

