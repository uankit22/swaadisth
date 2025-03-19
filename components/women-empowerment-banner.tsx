"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function WomenEmpowermentBanner() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-primary/10 px-3 py-1.5 rounded-full inline-flex items-center gap-2 mb-3 md:mb-4"
            >
              <span className="text-xs sm:text-sm font-medium text-primary">Women-Led Enterprise</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-display mb-3 md:mb-4"
            >
              Empowering Women Through Tradition
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-muted-foreground mb-4 md:mb-6"
            >
              At Swaadishta, we're proud to be a women-owned and operated business. Our team of skilled artisans
              preserves traditional recipes while creating economic opportunities for women in our community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-2 sm:gap-4"
            >
              <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <span className="text-xs sm:text-sm font-medium">100% Women-Led</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <span className="text-xs sm:text-sm font-medium">Supporting Communities</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <span className="text-xs sm:text-sm font-medium">Preserving Traditions</span>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2 mt-6 md:mt-0 grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative h-40 sm:h-48 md:h-64 overflow-hidden rounded-lg shadow-lg"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1NIQqNkxREdojjOMlIovKFBh6nQVqy.png"
                alt="Traditional Indian woman artisan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-40 sm:h-48 md:h-64 overflow-hidden rounded-lg shadow-lg mt-4 sm:mt-6 md:mt-8"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IiudH8sptOj5wEfMcj2CG9TjRzawy4.png"
                alt="Indian woman entrepreneur"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

