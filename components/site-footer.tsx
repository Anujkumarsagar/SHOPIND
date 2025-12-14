import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Instagram, Github, Linkedin } from "lucide-react"

export function SiteFooter() {

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 rounded-2xl bg-primary text-primary-foreground p-8 md:p-12">
          <div className=" mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              STAY UP TO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <div className="flex   gap-4 max-w-md">
              <Input type="email" placeholder="Enter your email address" className="bg-background text-foreground" />
              <Button variant="secondary" className="whitespace-nowrap w-fit">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold">SHOPIND.CO</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              <a href="http://linkedin.com/in/anujkumarsagar">
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">Linkedin</span>
                </Button>

              </a>
              <a href="https://www.facebook.com/anuja.kumara.525729">
                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </a>
              <a href="https://www.instagram.com/2_._anuj_._2/">

                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </a>

              <a href="https://github.com/anujkumarsagar">

                <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/works" className="text-muted-foreground hover:text-foreground transition-colors">
                  Works
                </Link>
              </li>
              <li>
                <Link href="/career" className="text-muted-foreground hover:text-foreground transition-colors">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">HELP</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Delivery Details
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/ebooks" className="text-muted-foreground hover:text-foreground transition-colors">
                  Free eBooks
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Development Tutorial
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  How to - Blog
                </Link>
              </li>
              <li>
                <Link href="/youtube" className="text-muted-foreground hover:text-foreground transition-colors">
                  Youtube Playlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">SHOPIND.CO © 2025, All Rights Reserved</p>
          <div className="flex gap-3">
            <div className="h-8 px-3 bg-background border rounded flex items-center justify-center">
              <span className="text-xs font-semibold">VISA</span>
            </div>
            <div className="h-8 px-3 bg-background border rounded flex items-center justify-center">
              <span className="text-xs font-semibold">Mastercard</span>
            </div>
            <div className="h-8 px-3 bg-background border rounded flex items-center justify-center">
              <span className="text-xs font-semibold">PayPal</span>
            </div>
            <div className="h-8 px-3 bg-background border rounded flex items-center justify-center">
              <span className="text-xs font-semibold">Apple Pay</span>
            </div>
            <div className="h-8 px-3 bg-background border rounded flex items-center justify-center">
              <span className="text-xs font-semibold">Google Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
