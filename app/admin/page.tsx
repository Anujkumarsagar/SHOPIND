import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | SHOPIND.CO",
  description: "Manage products, orders, and view store analytics.",
}

export default async function AdminPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  // Fetch dashboard data
  const [{ data: products, count: productsCount }, { data: orders }, { data: recentOrders }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact" }),
    supabase.from("orders").select("*"),
    supabase.from("orders").select("*, profiles(full_name, email)").order("created_at", { ascending: false }).limit(10),
  ])

  // Calculate statistics
  const stats = {
    totalProducts: productsCount || 0,
    totalOrders: orders?.length || 0,
    pendingOrders: orders?.filter((o) => o.status === "pending").length || 0,
    shippedOrders: orders?.filter((o) => o.status === "shipped").length || 0,
    deliveredOrders: orders?.filter((o) => o.status === "delivered").length || 0,
    cancelledOrders: orders?.filter((o) => o.status === "cancelled").length || 0,
    totalRevenue: orders?.reduce((sum, order) => sum + Number.parseFloat(order.total || 0), 0) || 0,
  }

  return <AdminDashboard stats={stats} recentOrders={recentOrders || []} products={products || []} />
}
