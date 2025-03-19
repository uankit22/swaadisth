"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

const taglines = [
  "100% Authentic",
  "100% Homemade Mumma's Taste",
  "No Preservatives Added",
  "Made with Pure Love",
  "Traditional Family Recipes",
  "Fresh Ingredients Only",
]

export default function ScrollingText() {
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
    <div className="w-full bg-[#C4A661]/10 overflow-hidden py-6 relative">
      <div className="flex">
        <div ref={scrollRef} className="flex animate-fast-scroll">
          {[...Array(2)].map((_, containerIndex) => (
            <div key={containerIndex} className="flex whitespace-nowrap">
              {taglines.map((tagline, index) => (
                <span key={index} className="text-xl font-medium text-scrolling mx-12">
                  {tagline} <span className="text-[#C4A661]/40 mx-6">•</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={togglePlay}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#C4A661] text-white p-2 rounded-full hover:bg-[#C4A661]/80 transition-colors"
        aria-label={isPlaying ? "Pause scrolling" : "Play scrolling"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  )
}

