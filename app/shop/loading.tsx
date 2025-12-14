import { ProductCardSkeleton } from "@/components/loading"

export default function ShopLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar Skeleton */}
        <aside className="hidden lg:block w-64 space-y-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                <div className="h-32 w-full bg-muted rounded animate-pulse" />
              </div>
            ))}
          </div>
        </aside>

        {/* Products Grid Skeleton */}
        <div className="flex-1">
          <div className="h-10 w-48 bg-muted rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
