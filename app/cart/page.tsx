import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/server"
import { CartItemActions } from "@/components/cart-item-actions"

export default async function CartPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch cart items with product details
  const { data: cartItems } = await supabase
    .from("cart_items")
    .select("*, product:products(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Calculate totals
  const subtotal =
    cartItems?.reduce((sum, item) => {
      const price = item.product.discount_percentage
        ? item.product.price * (1 - item.product.discount_percentage / 100)
        : item.product.price
      return sum + price * item.quantity
    }, 0) || 0

  const totalDiscount =
    cartItems?.reduce((sum, item) => {
      if (item.product.discount_percentage) {
        const discount = item.product.price * (item.product.discount_percentage / 100) * item.quantity
        return sum + discount
      }
      return sum
    }, 0) || 0

  const deliveryFee = subtotal > 0 ? 15 : 0
  const total = subtotal + deliveryFee

  return (
    <div className="min-h-screen">
      <div className="container px-4 md:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Cart</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">YOUR CART</h1>

        {!cartItems || cartItems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => {
                const discountedPrice = item.product.discount_percentage
                  ? item.product.price * (1 - item.product.discount_percentage / 100)
                  : item.product.price

                return (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                          <Image
                            src={item.product.image_url_1 || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <Link href={`/product/${item.product.id}`}>
                                <h3 className="font-semibold hover:underline line-clamp-1">{item.product.name}</h3>
                              </Link>
                              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                                <span>Size: {item.size}</span>
                                <span>•</span>
                                <span>Color: {item.color}</span>
                              </div>
                            </div>
                            <CartItemActions itemId={item.id} />
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold">${discountedPrice.toFixed(0)}</span>
                              {item.product.discount_percentage && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.product.price.toFixed(0)}
                                </span>
                              )}
                            </div>

                            <CartItemActions itemId={item.id} quantity={item.quantity} showQuantity />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex items-center justify-between text-destructive">
                        <span>Discount (-20%)</span>
                        <span className="font-semibold">-${totalDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between text-lg">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="flex gap-2">
                    <Input placeholder="Add promo code" />
                    <Button variant="outline">Apply</Button>
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Go to Checkout →</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
