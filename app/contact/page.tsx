"use client"

import type React from "react"

import { SlideUp, FadeIn } from "@/components/animated-page"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Message sent successfully! We'll get back to you soon.")
    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container px-4 md:px-6">
        <SlideUp>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as
              possible.
            </p>
          </div>
        </SlideUp>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <SlideUp delay={0.1}>
            <div className="bg-secondary/30 p-8 rounded-2xl border">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required className="mt-2" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required className="mt-2 min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </SlideUp>

          {/* Contact Information */}
          <div className="space-y-8">
            <SlideUp delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "support@shop.co" },
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Address", value: "123 Fashion Ave, New York, NY 10001" },
                  ].map((item, index) => (
                    <FadeIn key={item.label} delay={0.3 + index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium mb-1">{item.label}</div>
                          <div className="text-muted-foreground">{item.value}</div>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </SlideUp>

            <SlideUp delay={0.5}>
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-2xl border">
                <h3 className="text-xl font-bold mb-3">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </div>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </div>
    </div>
  )
}
