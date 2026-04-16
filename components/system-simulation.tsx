'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ShoppingCart, CreditCard, Receipt, Zap } from 'lucide-react'

export function SystemSimulation() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      number: 1,
      title: 'Order Creation',
      icon: ShoppingCart,
      description: 'Customer places order',
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
            <span className="text-sm">Beer x 2</span>
            <span className="font-semibold">12,000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
            <span className="text-sm">Soda x 1</span>
            <span className="font-semibold">2,000</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border-t-2">
            <span className="text-sm font-semibold">Total</span>
            <span className="font-bold text-lg">14,000</span>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: 'Order Confirmation',
      icon: Check,
      description: 'Order confirmed & stock updated',
      content: (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-lg font-semibold text-green-700">Order Confirmed ✓</p>
          <p className="text-sm text-muted-foreground mt-2">Stock automatically updated</p>
        </div>
      )
    },
    {
      number: 3,
      title: 'Payment Processing',
      icon: CreditCard,
      description: 'Multiple payment methods supported',
      content: (
        <div className="space-y-3">
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Mobile Money</p>
            <p className="font-semibold">9,000</p>
          </div>
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Bank Transfer</p>
            <p className="font-semibold">5,000</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap size={16} className="text-primary" />
            <span className="text-primary font-medium">Real-time sync</span>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: 'Receipt Generation',
      icon: Receipt,
      description: 'Instant receipt generated',
      content: (
        <div className="space-y-2 text-sm font-mono">
          <p className="border-b pb-2">QUICKO RECEIPT</p>
          <div className="space-y-1">
            <p>Beer x2 ....... 12,000</p>
            <p>Soda x1 ....... 2,000</p>
          </div>
          <p className="border-t border-b py-2 font-semibold">TOTAL: 14,000</p>
          <p className="text-xs text-center text-muted-foreground">Payment: Mobile Money</p>
          <p className="text-xs text-center text-green-600">✓ Transaction ID: #12345</p>
        </div>
      )
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 inline-block bg-primary/20 text-primary border-primary/30">Live Demo</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">See QUICKO in Action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how QUICKO streamlines your entire business workflow in seconds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            return (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative p-4 rounded-lg transition-all duration-300 transform ${
                  isActive
                    ? 'bg-primary text-white scale-105 shadow-lg'
                    : 'bg-card text-foreground hover:bg-secondary/50 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs opacity-75">Step {step.number}</p>
                    <p className="font-semibold text-sm">{step.title}</p>
                  </div>
                </div>
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <Card className="p-8 md:p-12 backdrop-blur-sm border-primary/20 bg-white/50 shadow-xl">
          <div className="flex items-start gap-4 mb-6">
            {steps[activeStep].icon && (
              <div className="p-3 bg-primary/10 text-primary rounded-lg flex-shrink-0">
                {<steps[activeStep].icon size={28} />}
              </div>
            )}
            <div>
              <h3 className="text-2xl font-bold text-foreground">{steps[activeStep].title}</h3>
              <p className="text-muted-foreground mt-1">{steps[activeStep].description}</p>
            </div>
          </div>
          <div className="mt-8">
            <div className="animate-in fade-in-50 duration-500">
              {steps[activeStep].content}
            </div>
          </div>
        </Card>

        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeStep ? 'bg-primary w-8' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
