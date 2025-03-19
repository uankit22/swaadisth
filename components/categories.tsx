"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  {
    id: 1,
    name: "Namkeen",
    image: "/placeholder.svg?height=400&width=400",
    description: "Savory snacks for every occasion",
    href: "/category/namkeen",
    count: 24,
  },
  {
    id: 2,
    name: "Mithai",
    image: "/placeholder.svg?height=400&width=400",
    description: "Traditional Indian sweets",
    href: "/category/mithai",
    count: 18,
  },
  {
    id: 3,
    name: "Healthy Snacks",
    image: "/placeholder.svg?height=400&width=400",
    description: "Nutritious and delicious options",
    href: "/category/healthy",
    count: 12,
  },
  {
    id: 4,
    name: "Festive Specials",
    image: "/placeholder.svg?height=400&width=400",
    description: "Celebrate with authentic flavors",
    href: "/category/festive",
    count: 15,
  },
]

export default function Categories() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-display mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Explore our wide range of authentic snacks</p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link href={category.href}>
              <motion.div whileHover={{ y: -5 }} className="category-card group relative overflow-hidden rounded-xl">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="overflow-hidden">
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="font-display text-2xl mb-1"
                    >
                      {category.name}
                    </motion.h3>
                  </div>

                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="text-white/80 text-sm"
                    >
                      {category.description}
                    </motion.p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center text-sm font-medium">
                      <span>Explore</span>
                      <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </div>
                    <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {category.count} items
                    </span>
                  </div>
                </div>

                {/* Animated overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium"
                  >
                    View Category
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

