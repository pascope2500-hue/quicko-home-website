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

  const steps = [
    {
      id: 0,
      icon: ShoppingCart,
      title: 'Order Creation',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold">Order ID: #ORD-2024-9847</p>
          <div className="text-xs space-y-1">
            <p className="text-gray-400">Beer ×2 - RWF 12,000</p>
            <p className="text-gray-400">Soda ×1 - RWF 2,000</p>
            <p className="text-gray-400">Burger ×1 - RWF 5,000</p>
          </div>
          <p className="text-xs text-gray-400 italic">Customer is placing order...</p>
        </div>
      )
    },
    {
      id: 1,
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
          <p className="text-xs text-gray-400">Waiting for payment...</p>
        </div>
      )
    },
    {
      id: 2,
      icon: CreditCard,
      title: 'Payment Successful',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold">Amount: RWF 19,000</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-green-500/30 rounded text-xs font-semibold text-green-300">PAID</span>
          </div>
          <div className="text-xs space-y-1">
            <p className="text-gray-400">Mobile Money: RWF 12,000</p>
            <p className="text-gray-400">Bank Transfer: RWF 7,000</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Receipt,
      title: 'Receipt Ready',
      content: (
        <div className="space-y-2">
          <p className="text-xs text-gray-300 font-semibold font-mono">QUICKO RECEIPT</p>
          <div className="text-xs space-y-0.5 border-t border-white/20 pt-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Beer ×2</span>
              <span className="text-white">RWF 12,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Soda ×1</span>
              <span className="text-white">RWF 2,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Burger ×1</span>
              <span className="text-white">RWF 5,000</span>
            </div>
          </div>
          <div className="border-t border-white/20 pt-2 flex justify-between font-semibold text-xs">
            <span>TOTAL:</span>
            <span className="text-white">RWF 19,000</span>
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

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with LIVE DEMO MODE Badge */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-md border border-white/30 bg-white/10 shadow-lg">
            <span 
              className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" 
              style={{ animation: 'blink 1.5s ease-in-out infinite' }} 
            />
            <p className="text-sm font-bold text-white">🔴 LIVE DEMO MODE</p>
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 30px rgba(59, 130, 246, 0.2); }
          }
          @keyframes fadeTransition {
            from { opacity: 0.6; }
            to { opacity: 1; }
          }
        `}</style>

        {/* Cross/Plus Layout */}
        <div className="relative flex justify-center items-center" style={{ minHeight: '500px' }}>
          {/* SVG for connecting lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
            preserveAspectRatio="xMidYMid meet"
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

            {/* Order Creation to Order Confirmed */}
            <path
              d="M 25% 50% L 50% 20%"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 0 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.5s ease'
              }}
            />

            {/* Order Confirmed to Payment Successful */}
            <path
              d="M 50% 20% L 75% 50%"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 1 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.5s ease'
              }}
            />

            {/* Payment Successful to Receipt Ready */}
            <path
              d="M 75% 50% L 50% 80%"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 2 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.5s ease'
              }}
            />

            {/* Receipt Ready back to Order Creation */}
            <path
              d="M 50% 80% L 25% 50%"
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowEnd)"
              opacity={activeStep === 3 ? 0.6 : 0.2}
              style={{
                transition: 'opacity 0.5s ease'
              }}
            />
          </svg>

          {/* Cards in Cross Layout */}
          <div className="absolute w-full h-full flex items-center justify-center" style={{ zIndex: 5 }}>
            {/* Order Creation - Left */}
            <div className="absolute" style={{ left: '5%', top: '50%', transform: 'translateY(-50%)' }}>
              <Card
                className={`w-64 p-5 rounded-xl backdrop-blur-md transition-all duration-500 ${
                  activeStep === 0
                    ? 'border-primary/80 bg-white/20 shadow-2xl border-2 scale-105'
                    : 'border-white/30 bg-white/10 opacity-65'
                }`}
                style={{
                  animation: activeStep === 0 ? 'glow 2s ease-in-out infinite' : 'none'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`p-2 rounded-lg transition-all duration-500 ${
                      activeStep === 0 ? 'bg-primary/40 text-primary' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <ShoppingCart size={16} />
                  </div>
                  <h4 className={`text-sm font-semibold transition-all duration-500 ${activeStep === 0 ? 'text-white' : 'text-gray-300'}`}>
                    Order Creation
                  </h4>
                </div>
                <div className={`transition-all duration-500 ${activeStep === 0 ? 'text-white' : 'text-gray-300'}`}>
                  {steps[0].content}
                </div>
              </Card>
            </div>

            {/* Order Confirmed - Top */}
            <div className="absolute" style={{ left: '50%', top: '5%', transform: 'translateX(-50%)' }}>
              <Card
                className={`w-64 p-5 rounded-xl backdrop-blur-md transition-all duration-500 ${
                  activeStep === 1
                    ? 'border-primary/80 bg-white/20 shadow-2xl border-2 scale-105'
                    : 'border-white/30 bg-white/10 opacity-65'
                }`}
                style={{
                  animation: activeStep === 1 ? 'glow 2s ease-in-out infinite' : 'none'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`p-2 rounded-lg transition-all duration-500 ${
                      activeStep === 1 ? 'bg-primary/40 text-primary' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <Check size={16} />
                  </div>
                  <h4 className={`text-sm font-semibold transition-all duration-500 ${activeStep === 1 ? 'text-white' : 'text-gray-300'}`}>
                    Order Confirmed
                  </h4>
                </div>
                <div className={`transition-all duration-500 ${activeStep === 1 ? 'text-white' : 'text-gray-300'}`}>
                  {steps[1].content}
                </div>
              </Card>
            </div>

            {/* Payment Successful - Right */}
            <div className="absolute" style={{ right: '5%', top: '50%', transform: 'translateY(-50%)' }}>
              <Card
                className={`w-64 p-5 rounded-xl backdrop-blur-md transition-all duration-500 ${
                  activeStep === 2
                    ? 'border-primary/80 bg-white/20 shadow-2xl border-2 scale-105'
                    : 'border-white/30 bg-white/10 opacity-65'
                }`}
                style={{
                  animation: activeStep === 2 ? 'glow 2s ease-in-out infinite' : 'none'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`p-2 rounded-lg transition-all duration-500 ${
                      activeStep === 2 ? 'bg-primary/40 text-primary' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <CreditCard size={16} />
                  </div>
                  <h4 className={`text-sm font-semibold transition-all duration-500 ${activeStep === 2 ? 'text-white' : 'text-gray-300'}`}>
                    Payment Successful
                  </h4>
                </div>
                <div className={`transition-all duration-500 ${activeStep === 2 ? 'text-white' : 'text-gray-300'}`}>
                  {steps[2].content}
                </div>
              </Card>
            </div>

            {/* Receipt Ready - Bottom */}
            <div className="absolute" style={{ left: '50%', bottom: '5%', transform: 'translateX(-50%)' }}>
              <Card
                className={`w-64 p-5 rounded-xl backdrop-blur-md transition-all duration-500 ${
                  activeStep === 3
                    ? 'border-primary/80 bg-white/20 shadow-2xl border-2 scale-105'
                    : 'border-white/30 bg-white/10 opacity-65'
                }`}
                style={{
                  animation: activeStep === 3 ? 'glow 2s ease-in-out infinite' : 'none'
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`p-2 rounded-lg transition-all duration-500 ${
                      activeStep === 3 ? 'bg-primary/40 text-primary' : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <Receipt size={16} />
                  </div>
                  <h4 className={`text-sm font-semibold transition-all duration-500 ${activeStep === 3 ? 'text-white' : 'text-gray-300'}`}>
                    Receipt Ready
                  </h4>
                </div>
                <div className={`transition-all duration-500 ${activeStep === 3 ? 'text-white' : 'text-gray-300'}`}>
                  {steps[3].content}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
