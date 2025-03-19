"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11.jpg-UspW2P3kaJA6J1vV6VSyoMhf1rPi0D.jpeg",
    title: "Delightful Desserts & Pastries",
    subtitle: "Indulge in our handcrafted selection of sweet treats made with love and tradition.",
    cta: "Shop Desserts",
  },
  {
    id: 2,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12.jpg-0Hk4VEcPxMcDrgu1q2wGTcCumYCUS7.jpeg",
    title: "Fresh & Authentic",
    subtitle: "Experience the perfect blend of traditional recipes and modern cuisine.",
    cta: "View Menu",
  },
  {
    id: 3,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-03-06%20at%2022.42.33_507f73eb.jpg-fCmWFqgFpKNbJTzSk4uKId4db4sNge.jpeg",
    title: "Premium Quality Ingredients",
    subtitle: "Every dish crafted with carefully selected, fresh ingredients for the perfect taste.",
    cta: "Learn More",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[21/9] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 max-w-[90%] sm:max-w-[80%] md:max-w-3xl">
              {slide.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mb-4 sm:mb-6 md:mb-8 max-w-[90%] sm:max-w-[80%] md:max-w-2xl">
              {slide.subtitle}
            </p>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white group">
              {slide.cta}
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

