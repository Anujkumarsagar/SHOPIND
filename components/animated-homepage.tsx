"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Sparkles } from "lucide-react"
import type { Product } from "@/lib/types"
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "@/components/animated-page"

interface AnimatedHomePageProps {
  newArrivals: Product[]
  topSelling: Product[]
}

export function AnimatedHomePage({ newArrivals, topSelling }: AnimatedHomePageProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-secondary/30 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[600px] py-12 lg:py-0">
            {/* Left Content */}
            <SlideUp>
              <div className="flex flex-col justify-center space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                    FIND CLOTHES THAT MATCHES YOUR STYLE
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg text-pretty">
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your
                    individuality and cater to your sense of style.
                  </p>
                </div>
                <div>
                  <Button asChild size="lg" className="w-full sm:w-auto px-12">
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                </div>
                {/* Stats */}
                <div className="flex flex-wrap gap-6 lg:gap-8 pt-4">
                  <FadeIn delay={0.2}>
                    <div className="flex flex-col">
                      <span className="text-3xl md:text-4xl font-bold">200+</span>
                      <span className="text-sm text-muted-foreground">International Brands</span>
                    </div>
                  </FadeIn>
                  <div className="h-12 w-px bg-border hidden sm:block" />
                  <FadeIn delay={0.3}>
                    <div className="flex flex-col">
                      <span className="text-3xl md:text-4xl font-bold">2,000+</span>
                      <span className="text-sm text-muted-foreground">High-Quality Products</span>
                    </div>
                  </FadeIn>
                  <div className="h-12 w-px bg-border hidden sm:block" />
                  <FadeIn delay={0.4}>
                    <div className="flex flex-col">
                      <span className="text-3xl md:text-4xl font-bold">30,000+</span>
                      <span className="text-sm text-muted-foreground">Happy Customers</span>
                    </div>
                  </FadeIn>
                </div>
              </div>
            </SlideUp>

            {/* Right Image */}
            <FadeIn delay={0.2}>
              <div className="relative h-[400px] lg:h-[600px]">
                <div className="absolute top-10 right-10 lg:top-20 lg:right-20">
                  <Sparkles className="h-12 w-12 fill-current" />
                </div>
                <div className="absolute bottom-10 left-10">
                  <Sparkles className="h-8 w-8 fill-current" />
                </div>
                <Image
                  src="/images/homepage.jpg"
                  alt="Fashion models showcasing stylish clothing"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <FadeIn delay={0.1}>
        <section className="bg-primary text-primary-foreground py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <span className="text-2xl md:text-3xl font-bold">VERSACE</span>
              <span className="text-2xl md:text-3xl font-bold">ZARA</span>
              <span className="text-2xl md:text-3xl font-bold">GUCCI</span>
              <span className="text-2xl md:text-3xl font-bold">PRADA</span>
              <span className="text-2xl md:text-3xl font-bold">Calvin Klein</span>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">NEW ARRIVALS</h2>
          </SlideUp>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals?.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeIn delay={0.5}>
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/shop?new=true">View All</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="container px-4 md:px-6">
        <div className="border-t" />
      </div>

      {/* Top Selling Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">TOP SELLING</h2>
          </SlideUp>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topSelling?.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          <FadeIn delay={0.5}>
            <div className="flex justify-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link href="/shop">View All</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Browse by Style Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">BROWSE BY DRESS STYLE</h2>
          </SlideUp>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StaggerItem>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href="/shop?category=casual">
                    <CardContent className="p-0 relative h-[200px] md:h-[280px]">
                      <Image src="/images/homepage.jpg" alt="Casual style" fill className="object-cover" />
                      <div className="absolute top-6 left-6">
                        <h3 className="text-2xl font-bold">Casual</h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer md:col-span-2">
                  <Link href="/shop?category=formal">
                    <CardContent className="p-0 relative h-[200px] md:h-[280px]">
                      <Image src="/images/homepage.jpg" alt="Formal style" fill className="object-cover" />
                      <div className="absolute top-6 left-6">
                        <h3 className="text-2xl font-bold">Formal</h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer md:col-span-2">
                  <Link href="/shop?category=party">
                    <CardContent className="p-0 relative h-[200px] md:h-[280px]">
                      <Image src="/images/homepage.jpg" alt="Party style" fill className="object-cover" />
                      <div className="absolute top-6 left-6">
                        <h3 className="text-2xl font-bold">Party</h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href="/shop?category=gym">
                    <CardContent className="p-0 relative h-[200px] md:h-[280px]">
                      <Image src="/images/homepage.jpg" alt="Gym style" fill className="object-cover" />
                      <div className="absolute top-6 left-6">
                        <h3 className="text-2xl font-bold">Gym</h3>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">OUR HAPPY CUSTOMERS</h2>
          </SlideUp>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Sarah M.",
                  comment:
                    "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
                },
                {
                  name: "Alex K.",
                  comment:
                    "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
                },
                {
                  name: "James L.",
                  comment:
                    "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
                },
              ].map((testimonial, i) => (
                <StaggerItem key={i}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <div className="flex items-start gap-2 mb-3">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <svg className="h-5 w-5 text-green-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.comment}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>
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
