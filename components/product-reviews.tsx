"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import type { Review } from "@/lib/types"

interface ProductReviewsProps {
  productId: string
  reviews: (Review & { profiles: { full_name: string | null } | null })[]
  user: { id: string; email?: string } | null
}

export function ProductReviews({ productId, reviews, user }: ProductReviewsProps) {
  const router = useRouter()
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleSubmitReview = async () => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    if (!comment.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      await supabase.from("reviews").insert({
        product_id: productId,
        user_id: user.id,
        rating,
        comment: comment.trim(),
      })

      setComment("")
      setRating(5)
      setShowReviewForm(false)
      router.refresh()
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">All Reviews ({reviews.length})</h3>
        </div>
        <Button onClick={() => setShowReviewForm(!showReviewForm)} disabled={!user}>
          Write a Review
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} onClick={() => setRating(value)}>
                      <Star
                        className={`h-6 w-6 cursor-pointer ${value <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="comment" className="text-sm font-medium mb-2 block">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts about this product..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSubmitReview} disabled={isSubmitting || !comment.trim()}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="grid gap-4">
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.profiles?.full_name || "Anonymous"}</span>
                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Posted on {new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {reviews.length > 6 && (
        <div className="flex justify-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      )}
    </div>
  )
}
