"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, Sparkles } from "lucide-react"

export default function WomenEmpowermentInitiatives() {
  return (
    <section className="py-10 sm:py-16 bg-gradient-to-br from-background via-background to-rose-50/30 dark:to-rose-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mb-3 sm:mb-4"
          >
            <span className="text-xs sm:text-sm font-medium text-primary">Our Impact</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-display mb-3 sm:mb-4"
          >
            Empowering Women Through Culinary Traditions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto"
          >
            We're committed to creating opportunities for women while preserving India's rich culinary heritage.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative order-2 md:order-1"
          >
            <div className="absolute -top-4 -left-4 w-16 sm:w-24 h-16 sm:h-24 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-20 sm:w-32 h-20 sm:h-32 bg-accent/20 rounded-full -z-10"></div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfKkhwVTz4JJerUnzpCuExX60QDAs4.png"
                alt="Women empowerment initiative"
                width={600}
                height={400}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <h3 className="text-xl sm:text-2xl font-display mb-4 sm:mb-6 text-center md:text-left">Our Initiatives</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Skills Development</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Training women in traditional cooking techniques and modern business practices.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Economic Independence</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Creating sustainable income opportunities for women from diverse backgrounds.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Heritage Preservation</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Documenting and preserving traditional recipes passed down through generations of women.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 text-center md:text-left">
              <Button className="group">
                Learn More About Our Impact
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

