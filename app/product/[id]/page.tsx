import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductReviews } from "@/components/product-reviews"
import type { Product } from "@/lib/types"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch product
  const { data: product, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error || !product) {
    notFound()
  }

  // Fetch reviews
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*, profiles(full_name)")
    .eq("product_id", id)
    .order("created_at", { ascending: false })

  // Fetch related products
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", id)
    .limit(4)

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const discountedPrice = product.discount_percentage
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price

      const image =
    product.image_url_1 ||
    product.image_url ||
    "/placeholder.svg"

  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/30">
              <Image src={image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden bg-secondary/30 cursor-pointer"
                >
                  <Image
                    src={i===1 && image || "/placeholder.svg"}
                    alt={`${product.name} view ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}/5</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">${discountedPrice.toFixed(0)}</span>
                {product.discount_percentage && (
                  <>
                    <span className="text-2xl text-muted-foreground line-through">${product.price.toFixed(0)}</span>
                    <Badge variant="destructive" className="text-sm">
                      -{product.discount_percentage}%
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t pt-6">
              <AddToCartButton product={product} user={user} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details" className="flex-1 sm:flex-none">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 sm:flex-none">
                Rating & Reviews
              </TabsTrigger>
              <TabsTrigger value="faqs" className="flex-1 sm:flex-none">
                FAQs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Category</h3>
                      <p className="text-muted-foreground">{product.category}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Available Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes?.map((size) => (
                          <Badge key={size} variant="outline">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Available Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.colors?.map((color) => (
                          <Badge key={color} variant="outline">
                            {color}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <ProductReviews productId={id} reviews={reviews || []} user={user} />
            </TabsContent>
            <TabsContent value="faqs" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">FAQs content coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">YOU MIGHT ALSO LIKE</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const discountedPrice = product.discount_percentage
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price

      const image =
    product.image_url_1 ||
    product.image_url ||
    "/placeholder.svg"

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative aspect-square bg-secondary/30">
            <Image
              src={image || "/placeholder.svg"}
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
