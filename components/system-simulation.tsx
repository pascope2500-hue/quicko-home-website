'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Check, ShoppingCart, CreditCard, Receipt } from 'lucide-react'

export function SystemSimulation() {
  const [activeStep, setActiveStep] = useState(0)
  const [flowProgress, setFlowProgress] = useState(0)

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
          setFlowProgress(0)
        } else {
          setActiveStep(event.step!)
        }
      }, event.delay)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [])

  // Calculate flow progress along the path (0-4)
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowProgress((prev) => {
        const newProgress = (prev + 0.02) % 4
        return newProgress
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    {
      icon: ShoppingCart,
      title: 'Order Creation',
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
      icon: Check,
      title: 'Order Confirmed',
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
      icon: CreditCard,
      title: 'Payment Successful',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold">RWF 19,000</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-500/30 rounded text-xs font-semibold text-green-300">PAID</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="text-gray-400">Mobile Money: 12,000</p>
            <p className="text-gray-400">Bank Transfer: 7,000</p>
          </div>
        </div>
      )
    },
    {
      icon: Receipt,
      title: 'Receipt Ready',
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
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* LIVE DEMO MODE Badge */}
        <div className="flex justify-center mb-12">
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
          @keyframes flowGlow {
            0%, 100% { filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4)); }
            50% { filter: drop-shadow(0 0 16px rgba(59, 130, 246, 0.8)); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Horizontal Pipeline */}
        <div className="relative">
          {/* Arrow connectors SVG */}
          <svg
            className="absolute inset-0 w-full h-24"
            style={{ top: '50px', zIndex: 1, overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
              </linearGradient>
              <marker
                id="arrowEnd"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="rgba(59, 130, 246, 0.6)" />
              </marker>
            </defs>
            {/* Main arrow path */}
            <path
              d="M 40 20 L calc(100% - 40px) 20"
              stroke="url(#flowGradient)"
              strokeWidth="3"
              fill="none"
              markerEnd="url(#arrowEnd)"
              style={{ animation: 'flowGlow 2s ease-in-out infinite' }}
            />
            {/* Animated flow indicator */}
            <circle
              cx={`${(flowProgress / 4) * 100}%`}
              cy="20"
              r="8"
              fill="rgba(59, 130, 246, 0.8)"
              style={{
                boxShadow: '0 0 16px rgba(59, 130, 246, 0.8)',
                filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))',
                transition: 'cx 0.05s linear'
              }}
            />
          </svg>

          {/* Step Cards - Horizontal Layout */}
          <div className="grid grid-cols-4 gap-4 mt-20">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isActive = activeStep === idx
              const isPast = idx < activeStep

              return (
                <div
                  key={idx}
                  className={`transition-all duration-500 ${isActive ? 'scale-105' : isPast ? 'scale-95 opacity-70' : 'scale-100'}`}
                  style={{ animation: isActive ? 'slideIn 0.6s ease-out' : 'none' }}
                >
                  <Card
                    className={`p-4 rounded-xl backdrop-blur-md transition-all duration-500 ${
                      isActive
                        ? 'border-primary/80 bg-white/20 shadow-2xl border-2'
                        : isPast
                          ? 'border-green-500/50 bg-green-500/10 opacity-60'
                          : 'border-white/30 bg-white/10'
                    }`}
                  >
                    {/* Header with Icon */}
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isActive
                            ? 'bg-primary/40 text-primary'
                            : isPast
                              ? 'bg-green-500/30 text-green-300'
                              : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <h4 className={`text-xs font-semibold ${isActive ? 'text-white' : isPast ? 'text-green-300' : 'text-gray-300'}`}>
                        {step.title}
                      </h4>
                    </div>

                    {/* Content */}
                    <div className={isActive ? 'text-white' : isPast ? 'text-green-200' : 'text-gray-300'}>
                      {step.content}
                    </div>

                    {/* Completion Badge */}
                    {isPast && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-green-300">
                        <Check size={12} />
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
