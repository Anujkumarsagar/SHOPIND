export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  discount_percentage: number | null
  image_url: string
  category: string
  rating: number
  reviews_count: number
  sizes: string[]
  colors: string[]
  is_new_arrival: boolean
  is_top_selling: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  size: string
  color: string
  created_at: string
  updated_at: string
  product?: Product
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
  profiles?: {
    full_name: string | null
  }
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}
