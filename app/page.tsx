import Hero from "@/components/hero"
import PopularProducts from "@/components/popular-products"
import Categories from "@/components/categories"
import ComboOffers from "@/components/combo-offers"
import AvailableOn from "@/components/available-on"
import Testimonials from "@/components/testimonials"
import TrustBadges from "@/components/trust-badges"
import ScrollingText from "@/components/scrolling-text"
import Features from "@/components/features"
import WomenEmpowermentBanner from "@/components/women-empowerment-banner"
import WomenEntrepreneurTestimonials from "@/components/women-entrepreneur-testimonials"
import WomenEmpowermentInitiatives from "@/components/women-empowerment-initiatives"
import Newsletter from "@/components/newsletter"

async function getData() {
  console.log("Fetching data...")
  // Simulate a longer delay
  await new Promise((resolve) => setTimeout(resolve, 5000))
  console.log("Data fetched")
  return {}
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <WomenEmpowermentBanner />
      <div className="container mx-auto px-4 space-y-24 py-16">
        <PopularProducts />
        <Categories />
        <ComboOffers />
      </div>
      <ScrollingText />
      <Features />
      <WomenEmpowermentInitiatives />
      <WomenEntrepreneurTestimonials />
      <AvailableOn />
      <Testimonials />
      <div className="container mx-auto px-4 space-y-24 py-16 mb-8">
        <TrustBadges />
      </div>
      <Newsletter />
    </main>
  )
}

