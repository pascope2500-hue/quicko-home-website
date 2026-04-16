'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ShoppingCart, CreditCard, Receipt } from 'lucide-react'

export function SystemSimulation() {
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

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
          setCompletedSteps([])
        } else {
          setActiveStep(event.step!)
          setCompletedSteps((prev) => [...new Set([...prev, activeStep])])
        }
      }, event.delay)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [activeStep])

  const renderStep = (stepIndex: number) => {
    const isActive = activeStep === stepIndex
    const isCompleted = completedSteps.includes(stepIndex)
    const shouldRender = isActive || isCompleted

    if (!shouldRender) return null

    if (stepIndex === 0) {
      return (
        <div
          key={stepIndex}
          className="absolute"
          style={{
            top: '80px',
            left: '60px',
            zIndex: 10,
            opacity: isActive ? 1 : 0.6,
            pointerEvents: isActive ? 'auto' : 'none',
            transition: 'opacity 0.6s ease-out',
            animation: isActive ? 'fadeIn 0.6s ease-out' : 'none'
          }}
        >
          <Card className="p-6 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/30 text-primary rounded-lg flex-shrink-0">
                <ShoppingCart size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Order Creation</h3>
                <p className="text-xs text-gray-300">Customer placing order...</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Beer', qty: 2, price: 12000 },
                { name: 'Soda', qty: 1, price: 2000 },
                { name: 'Burger', qty: 1, price: 5000 }
              ].map((item, idx) => (
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
                <span className="font-bold text-white">RWF 19,000</span>
              </div>
            </div>
            {isCompleted && (
              <div className="mt-3 p-2 bg-green-500/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-green-300">✓ Completed</p>
              </div>
            )}
          </Card>
        </div>
      )
    }

    if (stepIndex === 1) {
      return (
        <div
          key={stepIndex}
          className="absolute"
          style={{
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            opacity: isActive ? 1 : 0.6,
            pointerEvents: isActive ? 'auto' : 'none',
            transition: 'opacity 0.6s ease-out',
            animation: isActive ? 'fadeIn 0.6s ease-out, floatSmoothMid 4s ease-in-out infinite' : 'none'
          }}
        >
          <Card className="p-6 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
            <div className="flex flex-col items-center">
              <div
                className="w-14 h-14 bg-green-500/30 rounded-full flex items-center justify-center mb-4"
                style={{
                  animation: isActive ? 'checkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
                }}
              >
                <Check className="w-7 h-7 text-green-400" />
              </div>
              <p className="text-lg font-bold text-white">Order Confirmed</p>
              <p className="text-xs text-gray-300 mt-1">#ORD-2024-9847</p>
              <div className="mt-3 p-2 bg-white/10 rounded-lg w-full text-center">
                <p className="text-xs text-gray-300">Stock Updated</p>
                <p className="text-xs text-white font-semibold">3 items reserved</p>
              </div>
            </div>
            {isCompleted && (
              <div className="mt-3 p-2 bg-green-500/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-green-300">✓ Completed</p>
              </div>
            )}
          </Card>
        </div>
      )
    }

    if (stepIndex === 2) {
      return (
        <div
          key={stepIndex}
          className="absolute"
          style={{
            top: '40px',
            right: '60px',
            zIndex: 30,
            opacity: isActive ? 1 : 0.6,
            pointerEvents: isActive ? 'auto' : 'none',
            transition: 'opacity 0.6s ease-out',
            animation: isActive ? 'fadeIn 0.6s ease-out, floatSmooth 4s ease-in-out infinite, successGlow 2s ease-in-out infinite' : 'none'
          }}
        >
          <Card className="p-5 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-300 font-medium">Payment Successful</p>
                <p className="text-xl font-bold text-white mt-1">RWF 19,000</p>
              </div>
              <div className="px-2 py-1 bg-green-500/40 rounded-full">
                <p className="text-xs font-semibold text-green-300">PAID</p>
              </div>
            </div>
            <div className="space-y-2 mb-4 pb-4 border-b border-white/20">
              <div
                className="flex justify-between text-xs text-gray-300"
                style={{
                  animation: isActive ? 'itemSlideIn 0.5s ease-out 0.2s both' : 'none'
                }}
              >
                <span>Mobile Money</span>
                <span className="font-semibold text-white">RWF 12,000</span>
              </div>
              <div
                className="flex justify-between text-xs text-gray-300"
                style={{
                  animation: isActive ? 'itemSlideIn 0.5s ease-out 0.4s both' : 'none'
                }}
              >
                <span>Bank Transfer</span>
                <span className="font-semibold text-white">RWF 7,000</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">ID: #ORD-2024-9847</p>
            {isCompleted && (
              <div className="mt-3 p-2 bg-green-500/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-green-300">✓ Completed</p>
              </div>
            )}
          </Card>
        </div>
      )
    }

    if (stepIndex === 3) {
      return (
        <div
          key={stepIndex}
          className="absolute"
          style={{
            bottom: '60px',
            left: '60px',
            zIndex: 10,
            opacity: isActive ? 1 : 0.6,
            pointerEvents: isActive ? 'auto' : 'none',
            transition: 'opacity 0.6s ease-out',
            animation: isActive ? 'fadeIn 0.6s ease-out, floatSmoothReverse 4s ease-in-out infinite' : 'none'
          }}
        >
          <Card className="p-5 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
            <div
              style={{
                animation: isActive ? 'receiptReveal 1.2s ease-out' : 'none'
              }}
            >
              <p className="text-xs text-gray-300 font-medium mb-3">Receipt Ready</p>
              <div className="bg-white/10 rounded-lg p-3 space-y-2 text-xs font-mono text-gray-300">
                <p className="border-b border-white/20 pb-2 text-center font-semibold text-white">QUICKO RECEIPT</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Beer x2</span>
                    <span className="text-white font-semibold">12,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Soda x1</span>
                    <span className="text-white font-semibold">2,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Burger x1</span>
                    <span className="text-white font-semibold">5,000</span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-white">
                    <span>TOTAL:</span>
                    <span>19,000</span>
                  </div>
                </div>
                <p className="text-center text-green-400 pt-2 border-t border-white/20">✓ Paid</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">RCP-2024-9847</p>
            {isCompleted && (
              <div className="mt-3 p-2 bg-green-500/30 rounded-lg text-center">
                <p className="text-xs font-semibold text-green-300">✓ Completed</p>
              </div>
            )}
          </Card>
        </div>
      )
    }
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with POS Dashboard Image */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/pos-dashboard.jpg)',
            opacity: 0.28,
            filter: 'blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
              LIVE DEMO MODE
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Live System Simulation</h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Watch a real POS transaction from order creation to receipt generation
          </p>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes itemSlideIn {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes floatSmooth {
            0%, 100% { transform: translateY(0px) rotateZ(0deg); }
            50% { transform: translateY(-6px) rotateZ(0.5deg); }
          }
          @keyframes floatSmoothMid {
            0%, 100% { transform: translateY(0px) rotateZ(0deg); }
            50% { transform: translateY(-4px) rotateZ(0.3deg); }
          }
          @keyframes floatSmoothReverse {
            0%, 100% { transform: translateY(0px) rotateZ(0deg); }
            50% { transform: translateY(-5px) rotateZ(-0.5deg); }
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
          @keyframes successGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.3); }
            50% { box-shadow: 0 0 40px rgba(74, 222, 128, 0.6); }
          }
        `}</style>

        {/* Floating Cards Container */}
        <div className="relative w-full" style={{ minHeight: '600px' }}>
          {[0, 1, 2, 3].map((stepIndex) => renderStep(stepIndex))}
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-3 mt-20">
          {[
            { icon: ShoppingCart, label: 'Order' },
            { icon: Check, label: 'Confirm' },
            { icon: CreditCard, label: 'Payment' },
            { icon: Receipt, label: 'Receipt' }
          ].map((step, idx) => {
            const Icon = step.icon
            const isActive = activeStep === idx
            const isCompleted = completedSteps.includes(idx)
            return (
              <button
                key={idx}
                onClick={() => {
                  setActiveStep(idx)
                  setCompletedSteps(Array.from({ length: idx }, (_, i) => i))
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : isCompleted
                      ? 'bg-green-500/30 text-green-300 border border-green-500/50 cursor-pointer hover:bg-green-500/40'
                      : 'bg-white/10 text-gray-400 cursor-pointer hover:bg-white/20'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{step.label}</span>
                {isCompleted && !isActive && <Check size={16} />}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
