"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface CartItemActionsProps {
  itemId: string
  quantity?: number
  showQuantity?: boolean
}

export function CartItemActions({ itemId, quantity = 1, showQuantity = false }: CartItemActionsProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return

    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", itemId)

      router.refresh()
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveItem = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      await supabase.from("cart_items").delete().eq("id", itemId)

      router.refresh()
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (showQuantity) {
    return (
      <div className="flex items-center rounded-full bg-secondary px-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => handleUpdateQuantity(quantity - 1)}
          disabled={isLoading || quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={isLoading}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    )
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleRemoveItem} disabled={isLoading}>
      <Trash2 className="h-4 w-4 text-destructive" />
      <span className="sr-only">Remove item</span>
    </Button>
  )
}
