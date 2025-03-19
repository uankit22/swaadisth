"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const minDisplayTime = 2000 // 2 seconds in milliseconds

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime)

      setTimeout(() => setIsLoading(false), remainingTime)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
    }

    return () => window.removeEventListener("load", handleLoad)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-900 to-orange-700 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background patterns */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hexagons"
                width="50"
                height="43.4"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(2) rotate(0)"
              >
                <path
                  d="M25,17.3 L25,0 L0,8.7 L0,34.7 L25,43.4 L50,34.7 L50,8.7 Z"
                  fill="none"
                  stroke="rgba(255,165,0,0.2)"
                  strokeWidth="1"
                >
                  <animate attributeName="stroke-width" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                </path>
              </pattern>
              <pattern id="circles" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="10" fill="none" stroke="rgba(255,165,0,0.1)" strokeWidth="0.5">
                  <animate attributeName="r" values="5;10;5" dur="4s" repeatCount="indefinite" />
                </circle>
              </pattern>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,165,0,0.3)" />
                <stop offset="100%" stopColor="rgba(255,69,0,0.3)" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
            <rect width="100%" height="100%" fill="url(#circles)" />
            <rect width="100%" height="100%" fill="url(#gradient)" />
          </svg>

          <div className="relative w-80 h-80">
            {/* Animated circular loader */}
            <motion.div
              className="absolute inset-0 border-4 border-orange-300 rounded-full"
              style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Secondary loader */}
            <motion.div
              className="absolute inset-4 border-4 border-green-300 rounded-full"
              style={{ borderTopColor: "transparent", borderLeftColor: "transparent" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Pulsating core */}
            <motion.div
              className="absolute inset-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full opacity-50 blur-md"
              animate={{
                scale: [0.8, 1, 0.8],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Orbiting particles */}
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  margin: "-1px 0 0 -1px",
                }}
                animate={{
                  x: Math.cos((index * 60 * Math.PI) / 180) * 120,
                  y: Math.sin((index * 60 * Math.PI) / 180) * 120,
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: index * 0.2,
                }}
              />
            ))}

            {/* Updated Swaadishta text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="200" height="60" viewBox="0 0 200 60">
                <defs>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFA500" />
                    <stop offset="50%" stopColor="#FF4500" />
                    <stop offset="100%" stopColor="#FFA500" />
                  </linearGradient>
                </defs>
                <motion.text
                  x="100"
                  y="45"
                  textAnchor="middle"
                  className="font-cursive fill-current text-[32px]"
                  fill="url(#textGradient)"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    filter: "drop-shadow(0 0 2px rgba(255,165,0,0.5))",
                  }}
                >
                  Swaadisth
                </motion.text>
              </svg>
            </motion.div>
          </div>

          {/* Loading progress bar */}
          <motion.div
            className="absolute bottom-10 w-64 h-2 bg-orange-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-16 text-lg text-orange-200 font-medium"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Initializing flavor matrix...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen

