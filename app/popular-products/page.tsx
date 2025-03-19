import { Suspense } from "react"
import PopularProductsPage from "@/components/pages/popular-products-page"

export default function Page({ searchParams }: { searchParams: { category?: string } }) {
  const selectedCategory = searchParams.category || "all"

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <PopularProductsPage initialCategory={selectedCategory} />
      </Suspense>
    </main>
  )
}

