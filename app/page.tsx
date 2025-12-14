import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/types"
import { AnimatedHomePage } from "@/components/animated-homepage"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch new arrivals
  const { data: newArrivals } = await supabase
    .from("products")
    .select("*")
    .eq("is_new_arrival", true)
    .order("created_at", { ascending: false })
    .limit(4)

  // Fetch top selling
  const { data: topSelling } = await supabase
    .from("products")
    .select("*")
    .eq("is_top_selling", true)
    .order("reviews_count", { ascending: false })
    .limit(4)

  return <AnimatedHomePage newArrivals={newArrivals || []} topSelling={topSelling || []} />
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
              src={product.image_url_1 || "/placeholder.svg"}
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
