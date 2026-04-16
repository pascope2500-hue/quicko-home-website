'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Check, ShoppingCart, CreditCard, Receipt } from 'lucide-react'

export function SystemSimulation() {
  const [activeStep, setActiveStep] = useState(0)
  const [isLooping, setIsLooping] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  useEffect(() => {
    const timeline = [
      { delay: 0, step: 0 },
      { delay: 5000, step: 1 },
      { delay: 10000, step: 2 },
      { delay: 15000, step: 3 },
      { delay: 18000, loop: true },
      { delay: 20000, reset: true }
    ]

    const timeouts = timeline.map((event) =>
      setTimeout(() => {
        if (event.reset) {
          setActiveStep(0)
          setCompletedSteps([])
          setIsLooping(false)
        } else if (event.loop) {
          setIsLooping(true)
        } else {
          setActiveStep(event.step!)
          setCompletedSteps((prev) => [...new Set([...prev, activeStep])])
        }
      }, event.delay)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [activeStep])

  const getCardStyle = (stepIndex: number) => {
    const isActive = activeStep === stepIndex
    const isCompleted = completedSteps.includes(stepIndex)
    const isFuture = stepIndex > activeStep

    let zIndex = 0
    let opacity = 0
    let scale = 0.95
    let yOffset = 0

    if (isActive) {
      zIndex = 40
      opacity = 1
      scale = 1
      yOffset = 0
    } else if (isCompleted) {
      zIndex = 20 - stepIndex
      opacity = 0.4
      scale = 0.92
      yOffset = stepIndex * 12
    } else if (isFuture) {
      zIndex = 0
      opacity = 0
      scale = 0.9
      yOffset = stepIndex * 12
    }

    return {
      zIndex,
      opacity,
      scale,
      yOffset,
      transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  }

  const renderCard = (stepIndex: number) => {
    const isActive = activeStep === stepIndex
    const style = getCardStyle(stepIndex)

    if (style.opacity === 0 && !isActive) return null

    const cardProps = [
      {
        icon: ShoppingCart,
        title: 'Order Creation',
        status: 'Customer is placing order...',
        items: [
          { name: 'Beer', qty: 2, price: 12000 },
          { name: 'Soda', qty: 1, price: 2000 },
          { name: 'Burger', qty: 1, price: 5000 }
        ],
        total: 19000
      },
      {
        icon: Check,
        title: 'Order Confirmed',
        status: 'Stock Updated',
        orderId: '#ORD-2024-9847',
        details: '3 items reserved'
      },
      {
        icon: CreditCard,
        title: 'Payment Successful',
        status: 'PAID',
        amount: 'RWF 19,000',
        payments: [
          { method: 'Mobile Money', amount: 12000 },
          { method: 'Bank Transfer', amount: 7000 }
        ]
      },
      {
        icon: Receipt,
        title: 'Receipt Ready',
        receiptId: 'RCP-2024-9847',
        items: [
          { name: 'Beer x2', price: 12000 },
          { name: 'Soda x1', price: 2000 },
          { name: 'Burger x1', price: 5000 }
        ],
        total: 19000
      }
    ]

    const card = cardProps[stepIndex]
    const Icon = card.icon

    return (
      <div
        key={stepIndex}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translateX(-50%) translateY(calc(-50% + ${style.yOffset}px)) scale(${style.scale})`,
          zIndex: style.zIndex,
          opacity: style.opacity,
          transition: style.transition,
          pointerEvents: isActive ? 'auto' : 'none'
        }}
      >
        <Card className="p-6 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-80">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg flex-shrink-0 ${isActive ? 'bg-primary/40 text-primary' : 'bg-white/10 text-gray-400'}`}>
              <Icon size={24} />
            </div>
            <div>
              <h3 className={`font-bold ${isActive ? 'text-white text-lg' : 'text-gray-400 text-sm'}`}>
                {card.title}
              </h3>
              <p className={`text-xs mt-1 ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                {card.status}
              </p>
            </div>
          </div>

          {/* Step 0: Order Creation */}
          {stepIndex === 0 && (
            <div className="space-y-2">
              {card.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-2 bg-white/10 rounded-lg text-sm"
                  style={{
                    animation: isActive ? `itemSlideIn 0.5s ease-out ${idx * 0.2}s both` : 'none'
                  }}
                >
                  <span className="text-gray-300">{item.name} x{item.qty}</span>
                  <span className="font-semibold text-white">RWF {item.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between items-center p-2 bg-primary/20 rounded-lg text-sm border-t border-white/20 mt-2">
                <span className="text-gray-300 font-semibold">Total</span>
                <span className="font-bold text-white">RWF {card.total?.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Step 1: Order Confirmed */}
          {stepIndex === 1 && (
            <div className="flex flex-col items-center py-2">
              <div
                className="w-14 h-14 bg-green-500/30 rounded-full flex items-center justify-center mb-4"
                style={{
                  animation: isActive ? 'checkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
                }}
              >
                <Check className="w-7 h-7 text-green-400" />
              </div>
              <p className="text-sm text-gray-300 text-center">{card.orderId}</p>
              <div className="mt-3 p-2 bg-white/10 rounded-lg w-full text-center">
                <p className="text-xs text-gray-300">{card.status}</p>
                <p className="text-xs text-white font-semibold mt-1">{card.details}</p>
              </div>
            </div>
          )}

          {/* Step 2: Payment Successful */}
          {stepIndex === 2 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-bold text-white">{card.amount}</p>
                <div className="px-2 py-1 bg-green-500/40 rounded-full">
                  <p className="text-xs font-semibold text-green-300">{card.status}</p>
                </div>
              </div>
              <div className="space-y-2 border-t border-white/20 pt-3">
                {card.payments?.map((payment, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-xs text-gray-300"
                    style={{
                      animation: isActive ? `itemSlideIn 0.5s ease-out ${idx * 0.2 + 0.2}s both` : 'none'
                    }}
                  >
                    <span>{payment.method}</span>
                    <span className="font-semibold text-white">RWF {payment.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Receipt */}
          {stepIndex === 3 && (
            <div
              style={{
                animation: isActive ? 'receiptReveal 1.2s ease-out' : 'none'
              }}
            >
              <div className="bg-white/10 rounded-lg p-3 space-y-2 text-xs font-mono text-gray-300">
                <p className="border-b border-white/20 pb-2 text-center font-semibold text-white">QUICKO RECEIPT</p>
                <div className="space-y-1">
                  {card.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.name}</span>
                      <span className="text-white font-semibold">RWF {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-white">
                    <span>TOTAL:</span>
                    <span>RWF {card.total?.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-center text-green-400 pt-2 border-t border-white/20">✓ Paid</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">{card.receiptId}</p>
            </div>
          )}
        </Card>
      </div>
    )
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with POS Dashboard Image */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/pos-dashboard.jpg)',
            opacity: 0.27,
            filter: 'blur(2px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/55 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Live System Simulation</h2>
          <p className="text-lg text-gray-300">
            Watch a real POS transaction from order creation to receipt generation
          </p>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes itemSlideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes checkPop {
            0% { transform: scale(0) rotateZ(-45deg); }
            50% { transform: scale(1.1) rotateZ(10deg); }
            100% { transform: scale(1) rotateZ(0deg); }
          }
          @keyframes receiptReveal {
            from { clip-path: inset(100% 0 0 0); }
            to { clip-path: inset(0 0 0 0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
          }
        `}</style>

        {/* LIVE Indicator - Top Left */}
        <div
          className="fixed top-24 left-6 z-50"
          style={{
            animation: isLooping ? 'glow 2s ease-in-out infinite' : 'none'
          }}
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md border border-white/30 bg-white/10 shadow-lg">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" style={{ animation: 'pulse 1s ease-in-out infinite' }} />
            <span className="text-xs font-semibold text-white whitespace-nowrap">LIVE DEMO MODE</span>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative w-full" style={{ minHeight: '650px', perspective: '1000px' }}>
          {[0, 1, 2, 3].map((idx) => renderCard(idx))}

          {/* Loop Message */}
          {isLooping && (
            <div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
              style={{
                animation: 'fadeIn 0.8s ease-out'
              }}
            >
              <p className="text-sm text-gray-400">New transaction starting...</p>
            </div>
          )}
        </div>

        {/* Progress Dots - Bottom Center */}
        <div className="flex justify-center gap-3 mt-16">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeStep === idx
                  ? 'bg-primary w-8 scale-110'
                  : completedSteps.includes(idx)
                    ? 'bg-green-500'
                    : 'bg-white/20'
              }`}
              style={{
                animation: activeStep === idx ? 'pulse 1.5s ease-in-out infinite' : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
