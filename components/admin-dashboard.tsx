"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, DollarSign, Clock, Truck, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { ProductManager } from "@/components/admin-product-manager"
import { OrdersManager } from "@/components/admin-orders-manager"

interface DashboardStats {
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalRevenue: number
}

interface AdminDashboardProps {
  stats: DashboardStats
  recentOrders: any[]
  products: any[]
}

export function AdminDashboard({ stats, recentOrders, products }: AdminDashboardProps) {
  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toString(),
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Shipped Orders",
      value: stats.shippedOrders.toString(),
      icon: Truck,
      color: "text-cyan-600",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
    },
    {
      title: "Delivered Orders",
      value: stats.deliveredOrders.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
  ]

  return (
    <div className="min-h-screen bg-secondary/20 py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store, products, and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Status Breakdown</CardTitle>
                <CardDescription>Current status of all orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="text-3xl font-bold text-orange-600">{stats.pendingOrders}</div>
                    <div className="text-sm text-muted-foreground mt-1">Pending</div>
                  </div>
                  <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/10 rounded-lg border border-cyan-200 dark:border-cyan-800">
                    <div className="text-3xl font-bold text-cyan-600">{stats.shippedOrders}</div>
                    <div className="text-sm text-muted-foreground mt-1">Shipped</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-3xl font-bold text-green-600">{stats.deliveredOrders}</div>
                    <div className="text-sm text-muted-foreground mt-1">Delivered</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="text-3xl font-bold text-red-600">{stats.cancelledOrders}</div>
                    <div className="text-sm text-muted-foreground mt-1">Cancelled</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 10 orders from your store</CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersManager orders={recentOrders} isOverview />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products">
            <ProductManager products={products} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManager orders={recentOrders} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
