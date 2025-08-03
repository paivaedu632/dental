"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      question: "How quickly can we get started and see appointments?",
      answer: "Most practices are up and running in 15-20 minutes. Our setup wizard guides you through the process, and we'll migrate your existing data for free. We immediately launch your TikTok ad campaign to start generating your guaranteed 10 appointments. Unlike traditional software that takes months to implement, DentalFlow delivers patients on day one."
    },
    {
      question: "What happens to our existing patient data?",
      answer: "We handle all data migration for free as part of your setup. Our team will securely transfer your patient records, appointment history, and billing information from your current system. All data transfers are HIPAA compliant and encrypted."
    },
    {
      question: "How does the guaranteed appointment model work?",
      answer: "We invest $300 in TikTok ads to guarantee your first 10 appointments - this isn't a setup fee, it's 100% ad spend for your practice. You pay $97/month for the platform plus $50 for each appointment beyond the guaranteed 10. For example, if you get 20 appointments total, you'd pay $97 + (10 × $50) = $597/month. We take $0 of the $300 ad investment."
    },
    {
      question: "Why do you invest in TikTok ads for us instead of charging setup fees?",
      answer: "Traditional software companies charge setup fees that go into their pockets. We do the opposite - we invest that money directly into getting you patients through TikTok ads. This aligns our success with yours: we only make money when you get appointments. The $300 goes 100% to ad spend, and we guarantee it will generate at least 10 appointments for your practice."
    },
    {
      question: "Can we cancel anytime?",
      answer: "Yes, absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time, and you'll retain access until the end of your current billing period. We'll also help you export your data if needed."
    },
    {
      question: "Is DentalFlow HIPAA compliant?",
      answer: "Yes, DentalFlow is fully HIPAA compliant. We use bank-level encryption, secure data centers, and regular security audits. We also provide Business Associate Agreements (BAA) and maintain SOC 2 Type II certification."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We offer 24/7 support via chat, email, and phone. Our support team consists of real humans (not bots) who understand dental practices. We also provide free training, onboarding assistance, and ongoing help whenever you need it."
    },
    {
      question: "Does it work on mobile devices?",
      answer: "Yes, DentalFlow works perfectly on any device - desktop, tablet, or smartphone. Our mobile app lets you manage appointments, communicate with patients, and access practice data from anywhere."
    },
    {
      question: "How does billing and payment processing work?",
      answer: "DentalFlow includes integrated payment processing with competitive rates. We handle credit cards, ACH transfers, and payment plans automatically. Insurance claims can be submitted electronically, and we track payments to reduce your administrative workload."
    },
    {
      question: "What if we need custom features?",
      answer: "We regularly add new features based on customer feedback. If you need something specific, our development team can often accommodate custom requests. We also integrate with many third-party tools you might already use."
    },
    {
      question: "How secure is our data?",
      answer: "Your data is stored in secure, encrypted data centers with 99.9% uptime. We use 256-bit SSL encryption, regular backups, and multi-factor authentication. Our security measures exceed industry standards and are regularly audited."
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers. Here are the most common questions 
            dental practices ask about DentalFlow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ List */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <div className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Still Have Questions?
              </h3>
              <p className="text-gray-600">
                Our team is here to help. Get in touch and we'll answer any questions 
                about DentalFlow and how it can help your practice.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Chat Support */}
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Chat with our team in real-time. Available 24/7.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // In production, this would open a chat widget
                    alert('Chat widget would open here')
                  }}
                >
                  Start Chat
                </Button>
              </div>

              {/* Phone Support */}
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Speak directly with our support team.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('tel:+15551234567')}
                >
                  Call Now
                </Button>
              </div>

              {/* Email Support */}
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Send us a detailed message and we'll respond quickly.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('mailto:support@dentalflow.com')}
                >
                  Send Email
                </Button>
              </div>
            </div>

            {/* Quick Start CTA */}
            <div className="mt-8 pt-6 border-t border-blue-200 text-center">
              <p className="text-gray-600 mb-4">
                Ready to get started? Most questions are answered once you see DentalFlow in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open('/signup', '_blank')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('/demo', '_blank')}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
