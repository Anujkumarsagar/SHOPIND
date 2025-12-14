import { SlideUp } from "@/components/animated-page"
import { Shield } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | SHOPIND.CO",
  description: "Learn how SHOPIND.CO collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container px-4 md:px-6 max-w-4xl">
        <SlideUp>
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 14, 2025</p>
          </div>
        </SlideUp>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
          <SlideUp delay={0.1}>
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us when you:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Create an account or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer support</li>
                <li>Participate in surveys or promotions</li>
                <li>Leave product reviews</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This may include your name, email address, shipping address, phone number, payment information, and
                preferences.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.2}>
            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your account or transactions</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and customer experience</li>
                <li>Detect and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.3}>
            <section>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
                <li>
                  <strong>Service Providers:</strong> Companies that help us operate our business (e.g., payment
                  processors, shipping carriers)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition
                </li>
              </ul>
            </section>
          </SlideUp>

          <SlideUp delay={0.4}>
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to collect information about your browsing activities.
                This helps us understand how you use our site and improve your experience. You can control cookie
                settings through your browser preferences.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.5}>
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.6}>
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us at privacy@SHOPIND.CO
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.7}>
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not directed to children under 13. We do not knowingly collect personal information from
                children under 13. If you become aware that a child has provided us with personal information, please
                contact us immediately.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.8}>
            <section>
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence.
                We ensure appropriate safeguards are in place to protect your information in accordance with this
                Privacy Policy.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={0.9}>
            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
          </SlideUp>

          <SlideUp delay={1.0}>
            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-muted-foreground">
                <p>Email: privacy@SHOPIND.CO</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Fashion Ave, New York, NY 10001</p>
              </div>
            </section>
          </SlideUp>
        </div>
      </div>
    </div>
  )
}
