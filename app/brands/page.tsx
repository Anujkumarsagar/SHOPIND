import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function BrandsPage() {
  const brands = [
    { name: "VERSACE", slug: "versace", products: 120 },
    { name: "ZARA", slug: "zara", products: 250 },
    { name: "GUCCI", slug: "gucci", products: 180 },
    { name: "PRADA", slug: "prada", products: 95 },
    { name: "Calvin Klein", slug: "calvin-klein", products: 210 },
    { name: "H&M", slug: "hm", products: 340 },
    { name: "Nike", slug: "nike", products: 280 },
    { name: "Adidas", slug: "adidas", products: 260 },
    { name: "Tommy Hilfiger", slug: "tommy-hilfiger", products: 150 },
    { name: "Ralph Lauren", slug: "ralph-lauren", products: 130 },
    { name: "Levi's", slug: "levis", products: 190 },
    { name: "Gap", slug: "gap", products: 170 },
  ]

  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Brands</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Brands</h1>
          <p className="text-muted-foreground">Explore products from your favorite brands</p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link key={brand.slug} href={`/shop?brand=${brand.slug}`}>
              <Card className="group hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="aspect-square flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold group-hover:text-primary transition-colors">{brand.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{brand.products} Products</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
