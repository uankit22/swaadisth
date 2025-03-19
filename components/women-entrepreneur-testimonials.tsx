"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    quote:
      "Starting this business was challenging, but seeing how our traditional recipes bring joy to customers makes it all worthwhile.",
    name: "Priya Sharma",
    role: "Founder & Head Chef",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tqnSmrkFIvUTCIGPAiX6ytkZyViDsb.png",
  },
  {
    id: 2,
    quote:
      "We're not just preserving recipes, we're preserving our heritage while creating opportunities for women in our community.",
    name: "Ananya Patel",
    role: "Operations Director",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2xGs9uIBmI2W5I4fj7Cp0QF0g4du3J.png",
  },
  {
    id: 3,
    quote:
      "Every woman on our team brings unique skills and perspectives. Together, we're showing that traditional values and modern business can thrive together.",
    name: "Meera Reddy",
    role: "Community Outreach Manager",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfKkhwVTz4JJerUnzpCuExX60QDAs4.png",
  },
]

export default function WomenEntrepreneurTestimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-10 sm:py-16 bg-gradient-to-br from-emerald-50 via-background to-amber-50 dark:from-emerald-950/30 dark:via-background dark:to-amber-950/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-sm font-medium text-primary">Our Team</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display mb-3 sm:mb-4"
          >
            Women Entrepreneurs Behind Swaadishta
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Meet the passionate women who bring traditional flavors to your table while creating a positive impact in
            their communities.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-slate-800/90 rounded-xl p-4 sm:p-6 md:p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <div className="w-full md:w-1/3">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 160px, 256px"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3 mt-4 md:mt-0 text-center md:text-left">
                  <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary/20 mb-3 md:mb-4 mx-auto md:mx-0" />
                  <p className="text-base sm:text-lg mb-4 sm:mb-6 italic">{testimonials[activeTestimonial].quote}</p>
                  <div>
                    <h4 className="font-bold text-lg sm:text-xl">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-6 sm:mt-8 gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${index === activeTestimonial ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => setActiveTestimonial(index)}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

