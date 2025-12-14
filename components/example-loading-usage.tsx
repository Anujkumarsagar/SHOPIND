"use client"

import { Button } from "@/components/ui/button"
import { useLoading } from "@/components/loading-provider"
import { Loading } from "@/components/loading"

// Example: Using the global loading hook
export function ExampleLoadingUsage() {
  const { startLoading, stopLoading } = useLoading()

  const handleAsyncAction = async () => {
    startLoading("Processing your request...")

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Your actual async logic here
    } finally {
      stopLoading()
    }
  }

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold">Loading Component Examples</h2>

      {/* Global Loading Example */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Global Loading Overlay</h3>
        <Button onClick={handleAsyncAction}>Trigger Global Loading</Button>
      </div>

      {/* Different Loading Variants */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <p className="text-sm font-medium">Spinner</p>
          <Loading variant="spinner" size="lg" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Dots</p>
          <Loading variant="dots" size="lg" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Pulse</p>
          <Loading variant="pulse" size="lg" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Bars</p>
          <Loading variant="bars" size="lg" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Circle</p>
          <Loading variant="circle" size="lg" />
        </div>
      </div>
    </div>
  )
}
