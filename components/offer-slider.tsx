"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

const offers = [
  "Free shipping on orders above ₹999",
  "Get 10% off on your first order",
  "Buy 2 Get 1 Free on all sweets",
  "Festive season sale: Up to 20% off",
  "New customers: Use code NEW15 for 15% discount",
  "Refer a friend and both get ₹200 off",
]

export default function OfferSlider() {
  const [isPlaying, setIsPlaying] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.style.animationPlayState = isPlaying ? "running" : "paused"
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="bg-[rgb(110,86,146)] text-white py-2 relative overflow-hidden">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex-1 overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div
              ref={scrollRef}
              className="whitespace-nowrap inline-block animate-marquee"
              style={{
                animationDuration: "15s", // Increased speed (was likely 25s before)
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {offers.map((offer, index) => (
                <span key={index} className="mx-8 text-sm font-medium inline-block">
                  {offer}
                </span>
              ))}
              {offers.map((offer, index) => (
                <span key={`repeat-${index}`} className="mx-8 text-sm font-medium inline-block">
                  {offer}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="ml-4 text-white hover:bg-[rgb(90,66,126)] hover:text-white"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>
    </div>
  )
}

