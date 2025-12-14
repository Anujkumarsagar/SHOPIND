import { SlideUp, FadeIn } from "@/components/animated-page"
import Link from "next/link"
import { MessageCircle, Phone, Mail, HelpCircle, Package, CreditCard, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata = {
  title: "Customer Support | SHOP.CO",
  description: "Get help with your SHOP.CO order, returns, payments, and more.",
}

export default function SupportPage() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: "Available 9AM - 6PM EST",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "+1 (555) 123-4567",
      action: "Call Us",
      available: "Mon-Fri, 9AM - 6PM EST",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@shop.co",
      action: "Send Email",
      available: "24/7 Response within 24hrs",
    },
  ]

  const faqs = [
    {
      category: "Orders",
      icon: Package,
      questions: [
        {
          q: "How do I track my order?",
          a: "You can track your order by logging into your account and visiting the Orders page. You'll find tracking information for all your shipments.",
        },
        {
          q: "Can I modify or cancel my order?",
          a: "Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team for assistance.",
        },
        {
          q: "What are the delivery times?",
          a: "Standard delivery takes 5-7 business days. Express shipping (2-3 days) and next-day delivery options are available at checkout.",
        },
      ],
    },
    {
      category: "Payments",
      icon: CreditCard,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.",
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, all payments are processed through secure, encrypted channels. We never store your full card details.",
        },
        {
          q: "Do you offer installment payments?",
          a: "Yes, we partner with Afterpay and Klarna for buy now, pay later options on orders over $50.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      icon: RefreshCw,
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy for unworn items with original tags. Returns are free and easy through our online portal.",
        },
        {
          q: "How long does it take to process a refund?",
          a: "Refunds are processed within 5-7 business days after we receive your return. It may take an additional 3-5 days for the funds to appear in your account.",
        },
        {
          q: "Can I exchange an item?",
          a: "Yes, exchanges are available for different sizes or colors. Simply initiate a return and place a new order, or contact support for direct exchange.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <div className="text-center max-w-3xl mx-auto">
              <HelpCircle className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">How Can We Help?</h1>
              <p className="text-lg text-muted-foreground">
                Our customer support team is here to assist you with any questions or concerns
              </p>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 container px-4 md:px-6">
        <SlideUp delay={0.1}>
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
        </SlideUp>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <FadeIn key={method.title} delay={0.2 + index * 0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <method.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-1">{method.description}</p>
                  <p className="text-xs text-muted-foreground mb-4">{method.available}</p>
                  <Button className="w-full">{method.action}</Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <SlideUp>
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          </SlideUp>
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, catIndex) => (
              <FadeIn key={category.category} delay={0.1 + catIndex * 0.1}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">{category.category}</h3>
                  </div>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${catIndex}-${index}`}
                        className="bg-background rounded-lg border px-6"
                      >
                        <AccordionTrigger className="text-left hover:no-underline">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 container px-4 md:px-6">
        <SlideUp>
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-primary/20 to-primary/5 p-12 rounded-2xl border">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Contact us directly and we'll be happy to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/delivery">View Delivery Info</Link>
              </Button>
            </div>
          </div>
        </SlideUp>
      </section>
    </div>
  )
}
