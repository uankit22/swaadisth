"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Delhi",
    rating: 5,
    comment: "The Besan Ladoo reminds me of my grandmother's recipe. Absolutely authentic and delicious!",
    image: "/placeholder.svg?height=100&width=100",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Mumbai",
    rating: 5,
    comment: "I've tried many brands, but Swaadishta's Namkeen has that perfect homemade taste that's hard to find.",
    image: "/placeholder.svg?height=100&width=100",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Ahmedabad",
    rating: 4,
    comment: "The Festival Pack was perfect for our family gathering. Everyone loved the variety and quality.",
    image: "/placeholder.svg?height=100&width=100",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    comment: "As someone who's particular about ingredients, I appreciate that these snacks have no preservatives.",
    image: "/placeholder.svg?height=100&width=100",
    date: "2 months ago",
  },
  {
    id: 5,
    name: "Meera Reddy",
    location: "Bangalore",
    rating: 5,
    comment: "The packaging is beautiful and the snacks taste just like homemade. Perfect for gifting!",
    image: "/placeholder.svg?height=100&width=100",
    date: "1 week ago",
  },
]

const FloatingShape = ({ className }: { className?: string }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    transition={{
      duration: 12,
      ease: "easeInOut",
      times: [0, 0.2, 0.5, 0.8, 1],
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    }}
  />
)

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const nextTestimonial = () => {
    setAutoplay(false)
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setAutoplay(false)
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Premium background effect */}
      <div className="absolute inset-0 z-0">
        <FloatingShape className="bg-primary/20 h-72 w-72 -top-24 -left-16" />
        <FloatingShape className="bg-accent/20 h-96 w-96 top-1/2 -right-24" />
        <FloatingShape className="bg-secondary/20 h-64 w-64 bottom-0 left-1/3" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Don't just take our word for it - hear from our satisfied customers about their Swaadishta experience.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured testimonial */}
          <div className="lg:col-span-2 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-card/80 backdrop-blur-md rounded-xl p-8 relative shadow-lg"
                style={{
                  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Quote className="h-12 w-12 text-primary/20 absolute top-6 right-6" />

                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[activeTestimonial].rating
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-lg mb-6 relative z-10">"{testimonials[activeTestimonial].comment}"</p>

                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary">
                    <Image
                      src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[activeTestimonial].location}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{testimonials[activeTestimonial].date}</p>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={prevTestimonial}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={nextTestimonial}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Indicators */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAutoplay(false)
                        setActiveTestimonial(idx)
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeTestimonial ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel testimonials */}
          <div className="lg:col-span-3">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
                    <motion.div
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="testimonial-card h-full bg-card/80 backdrop-blur-md shadow-lg">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm mb-4">"{testimonial.comment}"</p>
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{testimonial.name}</p>
                              <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-4">{testimonial.date}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}

