import { SlideUp, FadeIn } from "@/components/animated-page"
import Image from "next/image"
import { Users, Target, Award, TrendingUp } from "lucide-react"

export const metadata = {
  title: "About Us | SHOPIND.CO",
  description: "Learn about SHOPIND.CO's mission, values, and commitment to fashion excellence.",
}

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Customers", value: "200+" },
    { icon: Target, label: "Products", value: "2,000+" },
    { icon: Award, label: "International Brands", value: "30,000+" },
    { icon: TrendingUp, label: "Years of Excellence", value: "10+" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">About SHOPIND.CO</h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                We're redefining fashion retail by combining quality, style, and affordability. Our mission is to make
                everyone feel confident and stylish in what they wear.
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <stat.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <SlideUp>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2013, SHOPIND.CO started with a simple vision: to make high-quality, stylish clothing
                    accessible to everyone. What began as a small boutique has grown into a global fashion destination.
                  </p>
                  <p>
                    Today, we partner with over 30,000 international brands and serve more than 200,000 happy customers
                    worldwide. Our curated collection spans from casual everyday wear to formal elegance, ensuring
                    there's something for every style and occasion.
                  </p>
                  <p>
                    We believe fashion is more than just clothing—it's a form of self-expression. That's why we're
                    committed to offering diverse styles that celebrate individuality and empower you to be your
                    authentic self.
                  </p>
                </div>
              </div>
            </SlideUp>
            <SlideUp delay={0.2}>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image src="/placeholder.svg?height=600&width=600" alt="Our Story" fill className="object-cover" />
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">These principles guide everything we do</p>
            </div>
          </SlideUp>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Quality First",
                description: "We never compromise on quality. Every product is carefully selected and tested.",
              },
              {
                title: "Customer Focused",
                description: "Your satisfaction is our priority. We're here to help you look and feel your best.",
              },
              {
                title: "Sustainable Fashion",
                description: "We're committed to eco-friendly practices and ethical sourcing.",
              },
            ].map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.15}>
                <div className="bg-background p-6 rounded-xl border">
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
