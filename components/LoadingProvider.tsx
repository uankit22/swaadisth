"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import LoadingScreen from "./LoadingScreen"

const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (loading: boolean) => {},
})

export const useLoading = () => useContext(LoadingContext)

const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleComplete = () => setIsLoading(false)

    handleStart()
    handleComplete()

    return () => {
      handleComplete()
    }
  }, [pathname, searchParams])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <LoadingScreen isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider

