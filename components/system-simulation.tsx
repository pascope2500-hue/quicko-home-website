'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ShoppingCart, CreditCard, Receipt } from 'lucide-react'

export function SystemSimulation() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              LIVE DEMO MODE
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Live System Simulation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch a real POS transaction from order creation to receipt generation
          </p>
        </div>

        {/* Animated Container */}
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
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(40px) rotateZ(-2deg); }
            to { opacity: 1; transform: translateX(0) rotateZ(0deg); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-40px) rotateZ(2deg); }
            to { opacity: 1; transform: translateX(0) rotateZ(0deg); }
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
        `}</style>

        <div className="relative w-full" style={{ minHeight: '520px' }}>
          {/* Step 1: Order Creation - Centered Items */}
          {activeStep === 0 && (
            <div className="absolute inset-0 flex items-center justify-center animate-fade-in" style={{ animation: 'fadeIn 0.6s ease-out' }}>
              <Card className="p-8 backdrop-blur-sm border-primary/20 bg-white/50 shadow-xl max-w-lg w-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg flex-shrink-0">
                    <ShoppingCart size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Order Creation</h3>
                    <p className="text-muted-foreground text-sm mt-1">Customer is placing order...</p>
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
                      className="flex justify-between items-center p-3 bg-white/50 rounded-lg"
                      style={{
                        animation: `itemSlideIn 0.5s ease-out ${idx * 0.2}s both`
                      }}
                    >
                      <span className="text-sm">{item.name} x{item.qty}</span>
                      <span className="font-semibold">RWF {item.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-t-2 border-primary/20 mt-3">
                    <span className="text-sm font-semibold">Total</span>
                    <span className="font-bold text-lg text-primary">RWF 19,000</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Step 2: Order Confirmation - Floating Card (Z-20) */}
          {activeStep === 1 && (
            <div className="absolute inset-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s ease-out' }}>
              <div
                className="absolute z-20"
                style={{
                  top: '60px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: 'slideInRight 0.8s ease-out, floatSmoothMid 4s ease-in-out infinite',
                }}
              >
                <Card className="p-6 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 bg-green-500/30 rounded-full flex items-center justify-center mb-4"
                      style={{
                        animation: 'checkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                      }}
                    >
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-lg font-bold text-white">Order Confirmed</p>
                    <p className="text-sm text-gray-300 mt-2">#ORD-2024-9847</p>
                    <div className="mt-4 p-2 bg-white/10 rounded-lg w-full">
                      <p className="text-xs text-gray-300 text-center">Stock Updated</p>
                      <p className="text-xs text-white font-semibold text-center mt-1">3 items reserved</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: Payment Processing - Floating Card (Z-30) */}
          {activeStep === 2 && (
            <div className="absolute inset-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s ease-out' }}>
              <div
                className="absolute z-30"
                style={{
                  top: '20px',
                  right: '40px',
                  animation: 'slideInRight 0.8s ease-out, floatSmooth 4s ease-in-out infinite',
                }}
              >
                <Card className="p-5 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-gray-300 font-medium">Payment Successful</p>
                      <p className="text-xl font-bold text-white mt-1">RWF 19,000</p>
                    </div>
                    <div className="px-2 py-1 bg-green-500/30 rounded-full">
                      <p className="text-xs font-semibold text-green-300">PAID</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 pb-4 border-b border-white/20">
                    <div
                      className="flex justify-between text-xs text-gray-300"
                      style={{ animation: 'itemSlideIn 0.5s ease-out 0.2s both' }}
                    >
                      <span>Mobile Money</span>
                      <span className="font-semibold text-white">RWF 12,000</span>
                    </div>
                    <div
                      className="flex justify-between text-xs text-gray-300"
                      style={{ animation: 'itemSlideIn 0.5s ease-out 0.4s both' }}
                    >
                      <span>Bank Transfer</span>
                      <span className="font-semibold text-white">RWF 7,000</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">ID: #ORD-2024-9847</p>
                </Card>
              </div>
            </div>
          )}

          {/* Step 4: Receipt Ready - Floating Card (Z-10) */}
          {activeStep === 3 && (
            <div className="absolute inset-0 animate-fade-in" style={{ animation: 'fadeIn 0.6s ease-out' }}>
              <div
                className="absolute z-10"
                style={{
                  bottom: '40px',
                  left: '40px',
                  animation: 'slideInLeft 0.8s ease-out, floatSmoothReverse 4s ease-in-out infinite',
                }}
              >
                <Card className="p-5 backdrop-blur-md border-white/30 bg-white/15 shadow-2xl rounded-2xl w-72">
                  <div
                    className="mb-4"
                    style={{
                      animation: 'receiptReveal 1s ease-out'
                    }}
                  >
                    <p className="text-xs text-gray-300 font-medium mb-3">Receipt Ready</p>
                    <div className="bg-white/10 rounded-lg p-3 space-y-2 text-xs font-mono text-gray-300">
                      <p className="border-b border-white/20 pb-2 text-center font-semibold">QUICKO RECEIPT</p>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Beer x2</span>
                          <span className="text-white">12,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Soda x1</span>
                          <span className="text-white">2,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Burger x1</span>
                          <span className="text-white">5,000</span>
                        </div>
                      </div>
                      <div className="border-t border-white/20 pt-2">
                        <div className="flex justify-between font-semibold text-white">
                          <span>TOTAL:</span>
                          <span>19,000</span>
                        </div>
                      </div>
                      <p className="text-center text-green-400 pt-2 border-t border-white/20">✓ Paid</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">RCP: #RC-2024-9847</p>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {[
            { icon: ShoppingCart, label: 'Order' },
            { icon: Check, label: 'Confirm' },
            { icon: CreditCard, label: 'Payment' },
            { icon: Receipt, label: 'Receipt' }
          ].map((step, idx) => {
            const Icon = step.icon
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeStep === idx
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-card text-foreground hover:bg-secondary/50 cursor-pointer'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{step.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
