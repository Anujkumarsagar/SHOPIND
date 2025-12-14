"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string
  price: number
  discount_percentage: number | null
  image_url: string
  category: string
  rating: number
  sizes: string[]
  colors: string[]
}

export function ProductManager({ products: initialProducts }: { products: Product[] }) {
  const [products, setProducts] = useState(initialProducts)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const supabase = createClient()
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number.parseFloat(formData.get("price") as string),
        discount_percentage: formData.get("discount") ? Number.parseInt(formData.get("discount") as string) : null,
        image_url: formData.get("image_url") || "/placeholder.svg?height=400&width=400",
        category: formData.get("category"),
        rating: 4.0,
        sizes: (formData.get("sizes") as string).split(",").map((s) => s.trim()),
        colors: (formData.get("colors") as string).split(",").map((c) => c.trim()),
      })
      .select()

      if(data){
        setIsAddingProduct(false)
      }

    if (error) {
      toast.error("Failed to add product")
    } else {
      toast.success("Product added successfully")
      setProducts([...products, data[0]])
      setIsAddingProduct(false)
      router.refresh()
    }
  }

  const handleDeleteProduct = async (id: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      toast.error("Failed to delete product")
    } else {
      toast.success("Product deleted successfully")
      setProducts(products.filter((p) => p.id !== id))
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Product Management</CardTitle>
        </div>
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the product details below</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" name="price" type="number" step="0.01" required />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input id="discount" name="discount" type="number" min="0" max="100" />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required placeholder="e.g., t-shirts, jeans" />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input id="image_url" name="image_url" type="url" placeholder="https://..." />
              </div>
              <div>
                <Label htmlFor="sizes">Available Sizes (comma-separated)</Label>
                <Input id="sizes" name="sizes" required placeholder="Small, Medium, Large, X-Large" />
              </div>
              <div>
                <Label htmlFor="colors">Available Colors (comma-separated)</Label>
                <Input id="colors" name="colors" required placeholder="Black, White, Blue, Red" />
              </div>
              <div className="flex gap-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAddingProduct(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Save Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-secondary">
                <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="font-bold">${product.price}</span>
                  {product.discount_percentage && (
                    <span className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded">
                      -{product.discount_percentage}%
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">Category: {product.category}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
