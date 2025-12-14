"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

interface AddToCartButtonProps {
  product: Product
  user: { id: string } | null
}

export function AddToCartButton({ product, user }: AddToCartButtonProps) {
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || "Large")
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Black")
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      // Check if item already exists
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .eq("size", selectedSize)
        .eq("color", selectedColor)
        .single()

      if (existingItem) {
        // Update quantity
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)
      } else {
        // Insert new item
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity,
          size: selectedSize,
          color: selectedColor,
        })
      }

      router.push("/cart")
      router.refresh()
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium mb-3">Select Colors</h3>
        <div className="flex flex-wrap gap-3">
          {product.colors?.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "h-10 w-10 rounded-full transition-all border-2",
                selectedColor === color ? "ring-2 ring-primary ring-offset-2" : "ring-0",
                getColorClass(color),
              )}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-medium mb-3">Choose Size</h3>
        <div className="flex flex-wrap gap-2">
          {product.sizes?.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSize(size)}
              className="min-w-[80px]"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex gap-4">
        <div className="flex items-center rounded-full bg-secondary px-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleAddToCart} disabled={isLoading} className="flex-1" size="lg">
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}

function getColorClass(color: string): string {
  const colorMap: Record<string, string> = {
    black: "bg-black",
    white: "bg-white border-gray-300",
    gray: "bg-gray-500",
    red: "bg-red-500",
    blue: "bg-blue-600",
    green: "bg-green-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-400",
    teal: "bg-teal-500",
    burgundy: "bg-red-800",
    navy: "bg-blue-900",
  }
  return colorMap[color.toLowerCase()] || "bg-gray-400"
}
