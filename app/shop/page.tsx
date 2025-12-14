import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/types"
import { AnimatedShopPage } from "@/components/animated-shop-page"

interface ShopPageProps {
  searchParams: Promise<{
    category?: string
    new?: string
    "on-sale"?: string
    minPrice?: string
    maxPrice?: string
    colors?: string
    sizes?: string
    sort?: string
  }>
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams
  const supabase = await createClient()

  // Build query
  let query = supabase.from("products").select("*")

  // Apply filters
  if (params.category) {
    query = query.eq("category", params.category)
  }

  if (params.new === "true") {
    query = query.eq("is_new_arrival", true)
  }

  if (params["on-sale"] === "true") {
    query = query.not("discount_percentage", "is", null)
  }

  if (params.minPrice) {
    query = query.gte("price", Number.parseFloat(params.minPrice))
  }

  if (params.maxPrice) {
    query = query.lte("price", Number.parseFloat(params.maxPrice))
  }

  // Apply sorting
  if (params.sort === "price-asc") {
    query = query.order("price", { ascending: true })
  } else if (params.sort === "price-desc") {
    query = query.order("price", { ascending: false })
  } else if (params.sort === "rating") {
    query = query.order("rating", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data: products } = await query

  // Get title based on filters
  let pageTitle = "Casual"
  if (params.category) {
    pageTitle = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  } else if (params.new === "true") {
    pageTitle = "New Arrivals"
  } else if (params["on-sale"] === "true") {
    pageTitle = "On Sale"
  }

  return <AnimatedShopPage products={products || []} pageTitle={pageTitle} searchParams={params} />
}

function ProductCard({ product }: { product: Product }) {
  const discountedPrice = product.discount_percentage
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-secondary/30">
            <Image
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">{product.rating}/5</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">${discountedPrice.toFixed(0)}</span>
              {product.discount_percentage && (
                <>
                  <span className="text-muted-foreground line-through text-sm">${product.price.toFixed(0)}</span>
                  <Badge variant="destructive" className="text-xs">
                    -{product.discount_percentage}%
                  </Badge>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
