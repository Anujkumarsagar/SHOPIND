import { LoadingSkeleton } from "@/components/loading"

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery Skeleton */}
        <div className="space-y-4">
          <LoadingSkeleton className="h-[500px] w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingSkeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="space-y-6">
          <LoadingSkeleton className="h-10 w-3/4" />
          <LoadingSkeleton className="h-6 w-1/4" />
          <LoadingSkeleton className="h-8 w-1/3" />
          <LoadingSkeleton className="h-24 w-full" />

          <div className="space-y-4">
            <LoadingSkeleton className="h-6 w-32" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <LoadingSkeleton key={i} className="h-12 w-12 rounded-full" />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <LoadingSkeleton className="h-6 w-32" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <LoadingSkeleton key={i} className="h-10 w-20" />
              ))}
            </div>
          </div>

          <LoadingSkeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
