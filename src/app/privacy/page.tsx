import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, ArrowLeft, Shield, Lock, Eye } from "lucide-react"

export default function PrivacyPage() {
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
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Privacy Policy
              </CardTitle>
              <p className="text-muted-foreground">
                Last updated: February 2, 2025
              </p>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3">1. Introduction</h3>
                <p className="text-muted-foreground leading-relaxed">
                  At Dental Analytics, we are committed to protecting your privacy and ensuring the security of your personal and practice data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our dental analytics platform.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">2. Information We Collect</h3>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Personal Information:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Name, email address, and phone number</li>
                      <li>Practice name and address</li>
                      <li>Professional credentials and licensing information</li>
                      <li>Billing and payment information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Practice Data:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Appointment scheduling and patient flow data</li>
                      <li>Marketing campaign performance metrics</li>
                      <li>Financial performance indicators</li>
                      <li>Competitor analysis data</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Technical Information:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>IP address and device information</li>
                      <li>Browser type and version</li>
                      <li>Usage patterns and platform interactions</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">3. How We Use Your Information</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>We use your information to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Provide and maintain our dental analytics services</li>
                    <li>Process payments and manage your account</li>
                    <li>Generate insights and reports for your practice</li>
                    <li>Provide customer support and technical assistance</li>
                    <li>Improve our platform and develop new features</li>
                    <li>Send important updates and service notifications</li>
                    <li>Comply with legal obligations and industry regulations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  4. HIPAA Compliance and Data Security
                </h3>
                <div className="text-muted-foreground leading-relaxed space-y-3">
                  <p>
                    <strong>We are fully HIPAA compliant</strong> and implement comprehensive safeguards to protect your data:
                  </p>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Technical Safeguards:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>End-to-end encryption for all data transmission</li>
                      <li>AES-256 encryption for data at rest</li>
                      <li>Multi-factor authentication for all accounts</li>
                      <li>Regular security audits and penetration testing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Administrative Safeguards:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Strict access controls and role-based permissions</li>
                      <li>Regular employee training on privacy and security</li>
                      <li>Business Associate Agreements (BAAs) with all vendors</li>
                      <li>Incident response and breach notification procedures</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Physical Safeguards:</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Secure data centers with 24/7 monitoring</li>
                      <li>Biometric access controls and surveillance</li>
                      <li>Environmental controls and backup power systems</li>
                      <li>Secure disposal of hardware and media</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">5. Data Sharing and Disclosure</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>We do not sell, trade, or rent your personal information. We may share your data only in these limited circumstances:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>With your consent:</strong> When you explicitly authorize data sharing</li>
                    <li><strong>Service providers:</strong> Trusted partners who help us operate our platform (under strict confidentiality agreements)</li>
                    <li><strong>Legal requirements:</strong> When required by law, court order, or regulatory authority</li>
                    <li><strong>Business transfers:</strong> In the event of a merger, acquisition, or sale of assets (with continued privacy protection)</li>
                    <li><strong>Safety and security:</strong> To protect the rights, property, or safety of our users or the public</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">6. Your Privacy Rights</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Rectification:</strong> Correct inaccurate or incomplete information</li>
                    <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                    <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
                    <li><strong>Restriction:</strong> Limit how we process your data</li>
                    <li><strong>Objection:</strong> Object to certain types of data processing</li>
                    <li><strong>Withdraw consent:</strong> Revoke previously given consent</li>
                  </ul>
                  <p>To exercise these rights, contact us at privacy@dentalanalytics.com.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">7. Data Retention</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We retain your data only as long as necessary to provide our services and comply with legal obligations. Practice data is typically retained for 7 years after account closure, in accordance with healthcare industry standards. Personal information is deleted within 30 days of account closure, unless longer retention is required by law.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">8. Cookies and Tracking</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Remember your preferences and settings</li>
                    <li>Analyze platform usage and performance</li>
                    <li>Provide personalized content and recommendations</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                  <p>You can control cookie settings through your browser preferences.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">9. International Data Transfers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is primarily stored and processed in the United States. If we transfer data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses and adequacy decisions where applicable.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">10. Children's Privacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are designed for dental professionals and are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">11. Changes to This Policy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email and through our platform. The "Last updated" date at the top indicates when the policy was last revised.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3">12. Contact Us</h3>
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  <p>For questions about this Privacy Policy or our data practices, contact us:</p>
                  <ul className="list-none space-y-1">
                    <li><strong>Privacy Officer:</strong> privacy@dentalanalytics.com</li>
                    <li><strong>Phone:</strong> 1-800-DENTAL-1</li>
                    <li><strong>Mail:</strong> 123 Healthcare Drive, Suite 400, Denver, CO 80202</li>
                    <li><strong>Support:</strong> <Link href="/support" className="text-primary hover:underline">Visit our support center</Link></li>
                  </ul>
                </div>
              </section>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                  <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-green-900">HIPAA Compliant</div>
                  <div className="text-sm text-green-700">Full healthcare compliance</div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <Lock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-blue-900">Encrypted</div>
                  <div className="text-sm text-blue-700">End-to-end security</div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                  <Eye className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-purple-900">Transparent</div>
                  <div className="text-sm text-purple-700">Clear data practices</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
