import { SlideUp, FadeIn } from "@/components/animated-page"
import { Truck, Package, MapPin, Clock, DollarSign, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Delivery Details | SHOPIND.CO",
  description: "Learn about SHOPIND.CO's shipping methods, delivery times, and international shipping.",
}

export default function DeliveryPage() {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      icon: Package,
      time: "5-7 Business Days",
      cost: "$5.99",
      description: "Reliable delivery for everyday orders",
    },
    {
      name: "Express Shipping",
      icon: Truck,
      time: "2-3 Business Days",
      cost: "$12.99",
      description: "Faster delivery when you need it soon",
    },
    {
      name: "Next Day Delivery",
      icon: Clock,
      time: "1 Business Day",
      cost: "$24.99",
      description: "Get your order tomorrow (order by 2 PM)",
    },
  ]

  const internationalRegions = [
    { region: "North America", time: "5-10 days", cost: "$15+" },
    { region: "Europe", time: "7-14 days", cost: "$20+" },
    { region: "Asia Pacific", time: "10-21 days", cost: "$25+" },
    { region: "Rest of World", time: "14-30 days", cost: "$30+" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <div className="text-center max-w-3xl mx-auto">
              <Truck className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Delivery Details</h1>
              <p className="text-lg text-muted-foreground">
                Fast, reliable shipping to your door. Learn about our delivery options and policies.
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Domestic Shipping */}
      <section className="py-16 container px-4 md:px-6">
        <SlideUp>
          <h2 className="text-3xl font-bold text-center mb-4">Domestic Shipping Options</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the shipping speed that works best for you. All orders include tracking.
          </p>
        </SlideUp>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {shippingMethods.map((method, index) => (
            <FadeIn key={method.name} delay={0.1 + index * 0.1}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <method.icon className="h-12 w-12 mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{method.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{method.cost}</p>
                  <p className="text-muted-foreground text-sm mb-4">{method.time}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 max-w-3xl mx-auto bg-primary/10 p-6 rounded-xl border text-center">
            <DollarSign className="h-8 w-8 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-bold mb-2">Free Shipping on Orders Over $100</h3>
            <p className="text-muted-foreground">
              Enjoy complimentary standard shipping when your order total exceeds $100. Applied automatically at
              checkout.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* International Shipping */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <div className="text-center mb-12">
              <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">International Shipping</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We ship to over 200 countries worldwide. Delivery times and costs vary by destination.
              </p>
            </div>
          </SlideUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {internationalRegions.map((region, index) => (
              <FadeIn key={region.region} delay={0.1 + index * 0.1}>
                <Card>
                  <CardContent className="p-6">
                    <MapPin className="h-8 w-8 mb-3 text-primary" />
                    <h3 className="font-bold mb-2">{region.region}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Delivery: {region.time}</p>
                      <p>Starting at: {region.cost}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-12 max-w-3xl mx-auto bg-background p-6 rounded-xl border">
              <h3 className="font-bold mb-3">International Shipping Notes:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Customs duties and taxes may apply and are the responsibility of the customer</li>
                <li>• Delivery times are estimates and may vary due to customs clearance</li>
                <li>• International orders cannot be expedited</li>
                <li>• All prices shown in USD</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tracking & Support */}
      <section className="py-16 container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <SlideUp>
            <div>
              <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
              <p className="text-muted-foreground mb-4">Track your order every step of the way:</p>
              <ul className="space-y-3">
                {["Order confirmed", "Processing", "Shipped", "Out for delivery", "Delivered"].map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Delivery Support</h2>
              <p className="text-muted-foreground mb-6">Have questions about your delivery? We're here to help.</p>
              <div className="space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Missing or Delayed Orders</h3>
                  <p className="text-sm text-muted-foreground">
                    If your order hasn't arrived within the estimated timeframe, contact our support team.
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Damaged Items</h3>
                  <p className="text-sm text-muted-foreground">
                    Report damaged items within 48 hours of delivery for a free replacement or refund.
                  </p>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Change Delivery Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact us within 1 hour of ordering to update your delivery address.
                  </p>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </section>
    </div>
  )
}
