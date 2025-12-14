"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
  onFilterApply?: () => void
}

export function ProductFilters({ onFilterApply }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([
    Number.parseInt(searchParams.get("minPrice") || "50"),
    Number.parseInt(searchParams.get("maxPrice") || "200"),
  ])
  const [selectedColors, setSelectedColors] = useState<string[]>(searchParams.get("colors")?.split(",") || [])
  const [selectedSizes, setSelectedSizes] = useState<string[]>(searchParams.get("sizes")?.split(",") || [])
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    colors: true,
    size: true,
    style: true,
  })

  const categories = [
    { label: "T-shirts", value: "t-shirts" },
    { label: "Shorts", value: "shorts" },
    { label: "Shirts", value: "shirts" },
    { label: "Hoodie", value: "hoodie" },
    { label: "Jeans", value: "jeans" },
  ]

  const colors = [
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Red", value: "red", class: "bg-red-500" },
    { name: "Yellow", value: "yellow", class: "bg-yellow-400" },
    { name: "Orange", value: "orange", class: "bg-orange-500" },
    { name: "Cyan", value: "cyan", class: "bg-cyan-400" },
    { name: "Blue", value: "blue", class: "bg-blue-600" },
    { name: "Purple", value: "purple", class: "bg-purple-600" },
    { name: "Pink", value: "pink", class: "bg-pink-500" },
    { name: "White", value: "white", class: "bg-white border" },
    { name: "Black", value: "black", class: "bg-black" },
  ]

  const sizes = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"]

  const dressStyles = ["Casual", "Formal", "Party", "Gym"]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    if (selectedColors.length > 0) {
      params.set("colors", selectedColors.join(","))
    } else {
      params.delete("colors")
    }

    if (selectedSizes.length > 0) {
      params.set("sizes", selectedSizes.join(","))
    } else {
      params.delete("sizes")
    }

    router.push(`/shop?${params.toString()}`)
    onFilterApply?.()
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  return (
    <div className="space-y-6 border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <div className="border-t" />

      {/* Categories */}
      <div>
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          <span>Category</span>
          {expandedSections.category ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {expandedSections.category && (
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => router.push(`/shop?category=${category.value}`)}
                className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground"
              >
                <span>{category.label}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t" />

      {/* Price */}
      <div>
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          <span>Price</span>
          {expandedSections.price ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider value={priceRange} onValueChange={setPriceRange} min={50} max={200} step={10} className="py-4" />
            <div className="flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t" />

      {/* Colors */}
      <div>
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          <span>Colors</span>
          {expandedSections.colors ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {expandedSections.colors && (
          <div className="grid grid-cols-5 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => toggleColor(color.value)}
                className={cn(
                  "h-9 w-9 rounded-full transition-all",
                  color.class,
                  selectedColors.includes(color.value) && "ring-2 ring-primary ring-offset-2",
                )}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t" />

      {/* Size */}
      <div>
        <button
          onClick={() => toggleSection("size")}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          <span>Size</span>
          {expandedSections.size ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {expandedSections.size && (
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSizes.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleSize(size)}
                className="text-xs"
              >
                {size}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t" />

      {/* Dress Style */}
      <div>
        <button
          onClick={() => toggleSection("style")}
          className="flex items-center justify-between w-full text-left font-semibold mb-3"
        >
          <span>Dress Style</span>
          {expandedSections.style ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {expandedSections.style && (
          <div className="space-y-3">
            {dressStyles.map((style) => (
              <button
                key={style}
                onClick={() => router.push(`/shop?category=${style.toLowerCase()}`)}
                className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground"
              >
                <span>{style}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ))}
          </div>
        )}
      </div>

      <Button onClick={applyFilters} className="w-full">
        Apply Filter
      </Button>
    </div>
  )
}
