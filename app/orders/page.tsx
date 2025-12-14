"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      setUser(user)
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Mock orders data - in real app, fetch from database
  const orders = [
    {
      id: "ORD-001",
      date: "Dec 10, 2024",
      status: "Delivered",
      total: 467,
      items: 3,
    },
    {
      id: "ORD-002",
      date: "Dec 5, 2024",
      status: "In Transit",
      total: 320,
      items: 2,
    },
    {
      id: "ORD-003",
      date: "Nov 28, 2024",
      status: "Delivered",
      total: 180,
      items: 1,
    },
  ]

  return (
    <div className="min-h-[calc(100vh-64px)] py-8">
      <div className="container max-w-4xl px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Orders</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on {order.date} • {order.items} items
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-2xl font-bold">${order.total}</p>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-sm text-primary hover:underline inline-block mt-1"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-lg text-muted-foreground mb-4">You haven't placed any orders yet</p>
              <Link href="/shop" className="text-primary hover:underline">
                Start shopping
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
