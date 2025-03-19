"use client"

import LoadingScreen from "@/components/LoadingScreen"
import { useEffect } from "react"

export default function Loading() {
  useEffect(() => {
    console.log("Loading component mounted")
  }, [])

  return <LoadingScreen />
}

