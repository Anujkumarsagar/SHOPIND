import { LoadingSkeleton } from "@/components/loading"

export default function CartLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <LoadingSkeleton className="h-12 w-48 mb-8" />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items Skeleton */}
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex gap-4">
                <LoadingSkeleton className="h-24 w-24 rounded" />
                <div className="flex-1 space-y-2">
                  <LoadingSkeleton className="h-6 w-3/4" />
                  <LoadingSkeleton className="h-4 w-1/2" />
                  <LoadingSkeleton className="h-6 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4 sticky top-4">
            <LoadingSkeleton className="h-8 w-full" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <LoadingSkeleton className="h-6 w-1/3" />
                <LoadingSkeleton className="h-6 w-1/4" />
              </div>
            ))}
            <LoadingSkeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
