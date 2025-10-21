import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </div>
            <span className="font-semibold text-lg">Dental Analytics</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/signup" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Signup
            </Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Terms of Service</CardTitle>
              <p className="text-muted-foreground">
                Last updated: February 2, 2025
              </p>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Dental Analytics ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">2. Service Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dental Analytics provides data analytics and marketing insights specifically designed for dental practices. Our platform helps dental professionals track appointments, analyze competitors, manage marketing campaigns, and optimize their return on investment.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">3. Usage-Based Pricing</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>Our pricing model is transparent and usage-based:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Setup Fee: $300 (first month only, includes 10 free appointments)</li>
                    <li>Monthly Base Fee: $97 (ongoing months)</li>
                    <li>Per-Appointment Fee: $50 (for appointments beyond the first 10 each month)</li>
                    <li>Free Appointments: 10 appointments included each month</li>
                  </ul>
                  <p>Billing occurs monthly, and you will be charged only for the appointments generated through our platform.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">4. User Responsibilities</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>As a user of our service, you agree to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide accurate and complete information about your dental practice</li>
                    <li>Maintain the confidentiality of your account credentials</li>
                    <li>Use the service in compliance with all applicable laws and regulations</li>
                    <li>Not share your account access with unauthorized parties</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">5. Data Privacy and HIPAA Compliance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are committed to protecting your data and maintaining HIPAA compliance. All patient and practice data is encrypted, stored securely, and accessed only by authorized personnel. We do not share your data with third parties without your explicit consent, except as required by law.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">6. Service Availability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to maintain 99.9% uptime, we cannot guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue the service with reasonable notice to users.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">7. Cancellation and Refunds</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>You may cancel your subscription at any time:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>No long-term contracts required</li>
                    <li>Cancellation takes effect at the end of your current billing period</li>
                    <li>Setup fees are non-refundable</li>
                    <li>Monthly fees are prorated for partial months</li>
                    <li>Per-appointment fees are charged only for appointments generated</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">8. Limitation of Liability</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Dental Analytics shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">9. Support and Service Level Agreement</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>We provide comprehensive support:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Email support with 2-hour response guarantee during business hours</li>
                    <li>Phone support: Monday-Friday 8AM-8PM EST, Saturday 9AM-5PM EST</li>
                    <li>24/7 emergency support for critical issues</li>
                    <li>Live chat support available on all pages</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">10. Modifications to Terms</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes via email and through the platform. Continued use of the service after modifications constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">11. Contact Information</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>For questions about these Terms of Service, please contact us:</p>
                  <ul className="list-none space-y-1">
                    <li>Email: legal@dentalanalytics.com</li>
                    <li>Phone: 1-800-DENTAL-1</li>
                    <li>Address: 123 Healthcare Drive, Suite 400, Denver, CO 80202</li>
                  </ul>
                </div>
              </section>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Questions?</strong> Our legal team is available to clarify any terms or conditions. 
                  Contact us at legal@dentalanalytics.com or through our{" "}
                  <Link href="/support" className="text-blue-600 hover:underline">
                    support center
                  </Link>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
