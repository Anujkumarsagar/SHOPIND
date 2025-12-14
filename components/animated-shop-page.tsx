"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Star, SlidersHorizontal } from "lucide-react"
import type { Product } from "@/lib/types"
import { ProductFilters } from "@/components/product-filters"
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/animated-page"
import { useState } from "react"

interface AnimatedShopPageProps {
  products: Product[]
  pageTitle: string
  searchParams?: any
}

export function AnimatedShopPage({ products, pageTitle, searchParams }: AnimatedShopPageProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <SlideUp>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{pageTitle}</span>
          </div>
        </SlideUp>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block">
            <SlideUp delay={0.1}>
              <ProductFilters />
            </SlideUp>
          </aside>

          {/* Main Content */}
          <div>
            {/* Header */}
            <SlideUp delay={0.2}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{pageTitle}</h1>
                  <p className="text-sm text-muted-foreground">
                    Showing 1-{products?.length || 0} of {products?.length || 0} Products
                  </p>
                </div>

                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Filter products by category, price, size, and more.</SheetDescription>
                    <div className="mt-6">
                      <ProductFilters onFilterApply={() => setIsFilterOpen(false)} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </SlideUp>

            {/* Products Grid */}
            <StaggerContainer>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products?.map((product) => (
                  <StaggerItem key={product.id}>
                    <ProductCard product={product} />
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* Pagination */}
            {products && products.length > 9 && (
              <SlideUp delay={0.3}>
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  {[1, 2, 3].map((page) => (
                    <Button key={page} variant={page === 1 ? "default" : "outline"}>
                      {page}
                    </Button>
                  ))}
                  <span className="px-2">...</span>
                  <Button variant="outline">9</Button>
                  <Button variant="outline">10</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </SlideUp>
            )}
          </div>
        </div>
      </div>
    </div>
  )
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
