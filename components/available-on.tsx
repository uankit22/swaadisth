"use client"

import Image from "next/image"
import Link from "next/link"

export default function AvailableOn() {
  const logos = [
    {
      name: "Amazon",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-umyDCipnHNfTkg5WxyxX6PYLEvuSam.png",
      width: 160,
      height: 48,
      url: "https://www.amazon.in/",
    },
    {
      name: "Flipkart",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fmAKa5B0WRksh8IXuBj7rSOVS5FDkh.png",
      width: 160,
      height: 48,
      url: "https://www.flipkart.com/",
    },
  ]

  // Duplicate logos for seamless infinite scroll
  const allLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display mb-2">Also Available On</h2>
        <div className="w-24 h-1 bg-primary mx-auto" />
      </div>

      <div className="relative w-full">
        <div className="flex animate-marquee">
          {allLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}`} className="flex-shrink-0 mx-12">
              <Link
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Swaadishta on ${logo.name}`}
              >
                <Image
                  src={logo.image || "/placeholder.svg"}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain"
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex animate-marquee2" aria-hidden="true">
          {allLogos.map((logo, index) => (
            <div key={`${logo.name}-${index}-clone`} className="flex-shrink-0 mx-12">
              <Link
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Swaadishta on ${logo.name}`}
              >
                <Image
                  src={logo.image || "/placeholder.svg"}
                  alt={`${logo.name} logo`}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

