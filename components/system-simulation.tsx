'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Check, ShoppingCart, CreditCard, Receipt } from 'lucide-react'

export function SystemSimulation() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const timeline = [
      { delay: 0, step: 0 },
      { delay: 5000, step: 1 },
      { delay: 10000, step: 2 },
      { delay: 15000, step: 3 },
      { delay: 20000, reset: true }
    ]

    const timeouts = timeline.map((event) =>
      setTimeout(() => {
        if (event.reset) {
          setActiveStep(0)
        } else {
          setActiveStep(event.step!)
        }
      }, event.delay)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Step definitions with triangle positions
  const steps = [
    {
      id: 0,
      icon: ShoppingCart,
      title: 'Order Creation',
      position: 'bottom-left',
      gridClass: 'col-span-1 row-start-3 col-start-1',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold">Order ID: #ORD-2024-9847</p>
          <div className="text-xs space-y-1">
            <p className="text-gray-400">Beer ×2</p>
            <p className="text-gray-400">Soda ×1</p>
            <p className="text-gray-400">Burger ×1</p>
          </div>
          <p className="text-xs text-gray-400 italic">Customer is placing order...</p>
        </div>
      )
    },
    {
      id: 1,
      icon: Check,
      title: 'Order Confirmed',
      position: 'top-center',
      gridClass: 'col-span-1 row-start-1 col-start-2',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold">Order ID: #ORD-2024-9847</p>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-green-400" />
            <span className="text-xs text-green-300">Stock updated</span>
          </div>
          <p className="text-xs text-gray-400">3 items reserved</p>
        </div>
      )
    },
    {
      id: 2,
      icon: CreditCard,
      title: 'Payment Successful',
      position: 'top-right',
      gridClass: 'col-span-1 row-start-1 col-start-3',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold">RWF 19,000</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-500/30 rounded text-xs font-semibold text-green-300">PAID</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="text-gray-400">Mobile Money: 12K</p>
            <p className="text-gray-400">Bank Transfer: 7K</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Receipt,
      title: 'Receipt Ready',
      position: 'bottom-center',
      gridClass: 'col-span-1 row-start-3 col-start-2',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold font-mono">QUICKO RECEIPT</p>
          <div className="text-xs space-y-0.5 border-t border-white/20 pt-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Beer ×2</span>
              <span className="text-white">12K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Soda ×1</span>
              <span className="text-white">2K</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Burger ×1</span>
              <span className="text-white">5K</span>
            </div>
          </div>
          <div className="border-t border-white/20 pt-1 flex justify-between font-semibold text-xs">
            <span>TOTAL:</span>
            <span className="text-white">RWF 19K</span>
          </div>
        </div>
      )
    }
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/pos-dashboard.jpg)',
            opacity: 0.22,
            filter: 'blur(2px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header with LIVE DEMO MODE Badge */}
        <div className="flex justify-center items-center gap-3 mb-16">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border border-white/30 bg-white/10 shadow-lg">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" style={{ animation: 'pulse 1s ease-in-out infinite' }} />
            <div>
              <p className="text-sm font-bold text-white">LIVE DEMO MODE</p>
              <p className="text-xs text-gray-300">Real-time POS transaction flow</p>
            </div>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.2); }
          }
          @keyframes flowLine {
            0%, 100% { stroke-dashoffset: 0; }
            50% { stroke-dashoffset: 10; }
          }
        `}</style>

        {/* Triangular Layout Container */}
        <div className="relative">
          {/* SVG for connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="arrowEnd"
                markerWidth="10"
                markerHeight="10"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="rgba(59, 130, 246, 0.4)" />
              </marker>
            </defs>

            {/* Top left to top center */}
            <path
              d="M 33.33% 120 L 50% 80"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 0 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.6s ease',
                strokeDasharray: activeStep === 0 ? '5,5' : '0',
                animation: activeStep === 0 ? 'flowLine 2s linear infinite' : 'none'
              }}
            />

            {/* Top center to top right */}
            <path
              d="M 50% 80 L 66.67% 120"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 1 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.6s ease',
                strokeDasharray: activeStep === 1 ? '5,5' : '0',
                animation: activeStep === 1 ? 'flowLine 2s linear infinite' : 'none'
              }}
            />

            {/* Top right to bottom center */}
            <path
              d="M 66.67% 120 L 50% 360"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 2 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.6s ease',
                strokeDasharray: activeStep === 2 ? '5,5' : '0',
                animation: activeStep === 2 ? 'flowLine 2s linear infinite' : 'none'
              }}
            />

            {/* Bottom center to bottom left */}
            <path
              d="M 50% 360 L 33.33% 120"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 3 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.6s ease',
                strokeDasharray: activeStep === 3 ? '5,5' : '0',
                animation: activeStep === 3 ? 'flowLine 2s linear infinite' : 'none'
              }}
            />
          </svg>

          {/* Triangle Grid Layout */}
          <div className="grid grid-cols-3 gap-8" style={{ minHeight: '500px', rowGap: '60px' }}>
            {steps.map((step) => {
              const isActive = activeStep === step.id
              const isPast = step.id < activeStep

              return (
                <div
                  key={step.id}
                  className={step.gridClass}
                  style={{
                    animation: isActive ? 'slideIn 0.6s ease-out' : 'none'
                  }}
                >
                  <Card
                    className={`p-5 rounded-xl backdrop-blur-md transition-all duration-500 h-full ${
                      isActive
                        ? 'border-primary/80 bg-white/20 shadow-2xl border-2 scale-105'
                        : isPast
                          ? 'border-green-500/50 bg-green-500/10 opacity-60 scale-95'
                          : 'border-white/30 bg-white/10 scale-100'
                    }`}
                    style={{
                      animation: isActive ? 'glow 2s ease-in-out infinite' : 'none'
                    }}
                  >
                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`p-2 rounded-lg transition-all duration-500 ${
                          isActive
                            ? 'bg-primary/40 text-primary'
                            : isPast
                              ? 'bg-green-500/30 text-green-300'
                              : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {step.icon && <step.icon size={16} />}
                      </div>
                      <h4
                        className={`text-sm font-semibold transition-all duration-500 ${
                          isActive ? 'text-white' : isPast ? 'text-green-300' : 'text-gray-300'
                        }`}
                      >
                        {step.title}
                      </h4>
                    </div>

                    {/* Content */}
                    <div className={`transition-all duration-500 ${isActive ? 'text-white' : isPast ? 'text-green-200' : 'text-gray-300'}`}>
                      {step.content}
                    </div>

                    {/* Completion Badge */}
                    {isPast && (
                      <div className="mt-3 flex items-center gap-1 text-xs text-green-300">
                        <Check size={14} />
                        <span>Completed</span>
                      </div>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
