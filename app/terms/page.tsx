import { SlideUp } from "@/components/animated-page"
import { FileText } from "lucide-react"

export const metadata = {
  title: "Terms & Conditions | SHOPIND.CO",
  description: "Read SHOPIND.CO's terms and conditions for using our service.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container px-4 md:px-6 max-w-4xl">
        <SlideUp>
          <div className="text-center mb-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: December 14, 2025</p>
          </div>
        </SlideUp>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <SlideUp delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using SHOPIND.CO ("Service"), you agree to be bound by these Terms and Conditions. If you
                disagree with any part of these terms, you may not access the Service.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily access the materials (information or software) on SHOPIND.CO's website
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of
                title.
              </p>
              <p className="text-muted-foreground leading-relaxed">Under this license you may not:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or public display</li>
                <li>Remove any copyright or proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.3}>
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Product Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product
                descriptions, colors, information, or other content available on the Service is accurate, complete,
                reliable, current, or error-free. Products are subject to availability, and we reserve the right to
                limit quantities or discontinue any product at any time.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.4}>
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Pricing and Payment</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prices are listed in USD and are subject to change without notice. We reserve the right to refuse or
                cancel orders for any reason, including but not limited to product availability, errors in product or
                pricing information, or suspicion of fraudulent activity. Payment must be received before order
                fulfillment.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.5}>
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shipping times are estimates and are not guaranteed. SHOPIND.CO is not responsible for delays caused by
                shipping carriers or customs processing. Risk of loss and title for purchased items pass to you upon
                delivery to the carrier. For more information, please see our Delivery Details page.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.6}>
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 30-day return policy for unworn items in original condition with tags attached. Returns must
                be initiated through our online portal. Refunds will be processed to the original payment method within
                5-7 business days of receiving the return. Shipping costs are non-refundable except in cases of
                defective or incorrect items.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.7}>
            <section>
              <h2 className="text-2xl font-bold mb-4">7. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account. You agree to notify us immediately of any unauthorized use of
                your account. We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.8}>
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall SHOPIND.CO or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on SHOPIND.CO's website, even if SHOPIND.CO or a SHOPIND.CO authorized representative has
                been notified of the possibility of such damage.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.9}>
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                SHOPIND.CO may revise these terms of service at any time without notice. By using this website, you agree
                to be bound by the current version of these Terms and Conditions.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={1.0}>
            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us at legal@SHOPIND.CO or +1 (555)
                123-4567.
              </p>
            </section>
          </SlideUp>
        </div>
      </div>
    </div>
  )
}
