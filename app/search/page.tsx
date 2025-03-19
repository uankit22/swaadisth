"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"

// Mock product data (replace this with your actual product data or API call)
const products = [
  { id: 1, name: "Masala Mathri", category: "Snacks", image: "/placeholder.svg" },
  { id: 2, name: "Besan Ladoo", category: "Sweets", image: "/placeholder.svg" },
  { id: 3, name: "Aloo Bhujia", category: "Snacks", image: "/placeholder.svg" },
  { id: 4, name: "Dry Fruit Mixture", category: "Dry Fruits", image: "/placeholder.svg" },
  { id: 5, name: "Methi Mathri", category: "Snacks", image: "/placeholder.svg" },
  { id: 6, name: "Kaju Katli", category: "Sweets", image: "/placeholder.svg" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")

  const results = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="block">
              <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xl">No results found for "{query}". Please try a different search term.</p>
      )}
    </div>
  )
}

