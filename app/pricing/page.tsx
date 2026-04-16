'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Check, X } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true)

  const plans = [
    {
      name: 'Starter',
      price: isYearly ? 144000 : 12000,
      period: isYearly ? '/year' : '/month',
      description: 'Perfect for small retailers',
      highlighted: false,
      badge: null,
      features: [
        'Basic POS usage',
        'Inventory tracking',
        'Sales reports',
        '1 user',
        'Email support',
        'Dashboard'
      ],
      notIncluded: [
        'EBM Integration',
        'Multi-Payment Support',
        'Advanced Inventory',
        'Accounting Reports',
        'Stock-out prevention',
        'Digital catalog & cart',
        'Staff Performance Tracking',
        'Real-Time Analytics',
        'Unlimited users',
        'Priority support'
      ]
    },
    {
      name: 'Gold',
      price: isYearly ? 360000 : 30000,
      period: isYearly ? '/year' : '/month',
      description: 'Most popular choice',
      highlighted: true,
      badge: 'Recommended',
      features: [
        'EBM Integration',
        'Multi-Payment Support',
        'Advanced Inventory',
        'Accounting Reports',
        'Stock-out prevention',
        'Digital catalog & cart',
        'Staff Performance Tracking',
        'Real-Time Analytics',
        'Up to 15 users',
        'Priority support'
      ],
      notIncluded: [
        'Importing goods & purchase management',
        'Receipt generation (all formats)',
        'Unlimited users',
        '24/7 support'
      ]
    },
    {
      name: 'Platinum',
      price: isYearly ? 600000 : 50000,
      period: isYearly ? '/year' : '/month',
      description: 'Complete business solution',
      highlighted: false,
      badge: null,
      features: [
        'All Gold features',
        'Importing goods & purchase management',
        'Receipt generation:',
        '  • Proforma Invoice',
        '  • Sales Receipt',
        '  • Copy Receipt',
        '  • Refund Receipt',
        'Unlimited users',
        '24/7 support',
        'Advanced custom reports',
        'Dedicated account manager',
        'API access'
      ],
      notIncluded: []
    }
  ]

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Simple, Transparent Pricing</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted transition-colors"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly
              {isYearly && <Badge variant="secondary" className="ml-2">Save 2 months</Badge>}
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, idx) => (
              <Card
                key={idx}
                className={`relative flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary shadow-xl md:scale-105 z-10'
                    : 'hover:shadow-lg'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white">{plan.badge}</Badge>
                  </div>
                )}

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-primary">{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>

                  <Button size="lg" className="w-full mb-8" asChild variant={plan.highlighted ? 'default' : 'outline'}>
                    <Link href="/signup">Get Started</Link>
                  </Button>

                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-foreground">Includes:</p>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex gap-3">
                        <Check size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}

                    {plan.notIncluded.length > 0 && (
                      <>
                        <div className="border-t border-border my-4" />
                        {plan.notIncluded.map((feature, i) => (
                          <div key={i} className="flex gap-3">
                            <X size={20} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {[
              { q: 'Can I change plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.' },
              { q: 'Is there a setup fee?', a: 'No, there are no setup fees. You only pay the monthly or yearly subscription amount.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, bank transfers, and mobile money through our payment partners.' },
              { q: 'What happens if I cancel?', a: 'Your account will be deactivated at the end of your current billing period. You can reactivate anytime.' }
            ].map((faq, idx) => (
              <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
