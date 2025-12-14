"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { format } from "date-fns"

interface Order {
  id: string
  order_number: string
  status: string
  total: string
  created_at: string
  profiles?: {
    email: string
    full_name: string
  }
}

export function OrdersManager({
  orders: initialOrders,
  isOverview = false,
}: { orders: Order[]; isOverview?: boolean }) {
  const [orders, setOrders] = useState(initialOrders)
  const router = useRouter()

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId)

    if (error) {
      toast.error("Failed to update order status")
    } else {
      toast.success("Order status updated successfully")
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
      router.refresh()
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      processing: "default",
      shipped: "default",
      delivered: "default",
      cancelled: "destructive",
    }
    return variants[status] || "default"
  }

  if (orders.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No orders found</div>
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold">{order.order_number}</span>
                  <Badge variant={getStatusBadge(order.status)} className="capitalize">
                    {order.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{order.profiles?.email || "Guest"}</div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-lg">${Number.parseFloat(order.total).toFixed(2)}</span>
                  <span className="text-muted-foreground">
                    {format(new Date(order.created_at), "MMM dd, yyyy 'at' h:mm a")}
                  </span>
                </div>
              </div>

              {!isOverview && (
                <div className="flex items-center gap-2">
                  <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
