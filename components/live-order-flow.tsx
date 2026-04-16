'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Check, Phone, DollarSign, Receipt } from 'lucide-react'

export function LiveOrderFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [orderItems, setOrderItems] = useState<Array<{ name: string; price: number }>>([])
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [showReceipt, setShowReceipt] = useState(false)

  const steps = [
    { label: 'Customer places order', duration: 3000 },
    { label: 'Order confirmed & stock updated', duration: 2000 },
    { label: 'Multiple payment methods supported', duration: 3000 },
    { label: 'Instant receipt generation', duration: 2000 }
  ]

  const orderItemsList = [
    { name: 'Beer', price: 2000 },
    { name: 'Soda', price: 1500 },
    { name: 'Beer', price: 2000 }
  ]

  // Auto-progress through steps
  useEffect(() => {
    const timings = [
      { step: 0, delay: 500, action: 'addItem0' },
      { step: 0, delay: 1200, action: 'addItem1' },
      { step: 0, delay: 1900, action: 'addItem2' },
      { step: 1, delay: 4500, action: 'confirmOrder' },
      { step: 2, delay: 7000, action: 'startPayment' },
      { step: 3, delay: 10500, action: 'generateReceipt' },
      { step: 0, delay: 13000, action: 'reset' }
    ]

    const timeouts = timings.map(timing => 
      setTimeout(() => {
        if (timing.action === 'addItem0') {
          setOrderItems([orderItemsList[0]])
          setActiveStep(0)
        } else if (timing.action === 'addItem1') {
          setOrderItems([orderItemsList[0], orderItemsList[1]])
        } else if (timing.action === 'addItem2') {
          setOrderItems(orderItemsList)
          setPaymentAmount(5500)
        } else if (timing.action === 'confirmOrder') {
          setActiveStep(1)
        } else if (timing.action === 'startPayment') {
          setActiveStep(2)
          setPaymentAmount(0)
          // Animate counting up
          let count = 0
          const counter = setInterval(() => {
            count += 500
            if (count <= 5500) {
              setPaymentAmount(count)
            } else {
              clearInterval(counter)
            }
          }, 50)
        } else if (timing.action === 'generateReceipt') {
          setActiveStep(3)
          setShowReceipt(true)
        } else if (timing.action === 'reset') {
          setActiveStep(0)
          setOrderItems([])
          setPaymentAmount(0)
          setShowReceipt(false)
        }
      }, timing.delay)
    )

    return () => timeouts.forEach(timeout => clearTimeout(timeout))
  }, [])

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0)
  const tax = Math.round(totalPrice * 0.16)
  const finalTotal = totalPrice + tax

  // Get card state classes
  const getCardState = (step: number) => {
    if (activeStep > step) return 'opacity-60 border-green-500/40 bg-green-500/5'
    if (activeStep === step) return 'opacity-100 border-white/50 bg-white/20 shadow-2xl'
    return 'opacity-40 border-white/20 bg-white/10'
  }

  return (
    <div className="w-full">
      <style>{`
        @keyframes checkPop {
          0% { transform: scale(0) rotate(-180deg); }
          50% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes receiptReveal {
          from { clip-path: inset(0 0 100% 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes countUp {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="relative w-full" style={{ minHeight: '500px' }}>
        {/* Connection Lines */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: activeStep >= 1 ? 0.5 : 0.2 }}
        >
          {/* Line from Order to Payment */}
          <line 
            x1="40%" 
            y1="80px" 
            x2="70%" 
            y2="80px" 
            stroke="rgb(255, 255, 255)" 
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: activeStep >= 1 ? 'slideDown 0.6s ease-out forwards' : 'none'
            }}
          />
          {/* Line from Order to Receipt */}
          <line 
            x1="40%" 
            y1="120px" 
            x2="10%" 
            y2="350px" 
            stroke="rgb(255, 255, 255)" 
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            style={{
              animation: activeStep >= 3 ? 'slideDown 0.6s ease-out forwards' : 'none'
            }}
          />
        </svg>

        {/* Order Card - Main/Center */}
        <div 
          className="absolute z-30 left-1/2 -translate-x-1/2 top-0"
          style={{
            animation: 'slideDown 0.8s ease-out 0.2s both'
          }}
        >
          <Card className={`p-6 backdrop-blur-md border border-white/30 bg-white/15 rounded-2xl shadow-xl transition-all duration-500 w-80 ${getCardState(0)}`}>
            <div className="flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-blue-300" />
              <h3 className="text-sm font-semibold text-white">Order</h3>
              {activeStep > 0 && (
                <div 
                  className="ml-auto w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                  style={{
                    animation: 'checkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                  }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Items Animation */}
            <div className="space-y-2 mb-4 pb-4 border-b border-white/20">
              {orderItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex justify-between text-xs text-gray-300"
                  style={{
                    animation: `slideDown 0.4s ease-out ${idx * 0.3}s both`
                  }}
                >
                  <span>{item.name}</span>
                  <span className="text-white font-semibold">RWF {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {orderItems.length > 0 && (
              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-semibold">RWF {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="text-white font-semibold">RWF {tax.toLocaleString()}</span>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-3">{steps[0].label}</p>
          </Card>
        </div>

        {/* Payment Card - Top Right */}
        <div 
          className="absolute z-20 right-0 top-0"
          style={{
            animation: 'slideDown 0.8s ease-out 0.4s both'
          }}
        >
          <Card className={`p-6 backdrop-blur-md border border-white/30 bg-white/15 rounded-2xl shadow-xl transition-all duration-500 w-80 ${getCardState(2)}`}>
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-green-300" />
              <h3 className="text-sm font-semibold text-white">Payment</h3>
              {activeStep > 2 && (
                <div 
                  className="ml-auto px-2 py-1 bg-green-500/30 rounded-full"
                  style={{
                    animation: 'checkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                  }}
                >
                  <p className="text-xs font-semibold text-green-300">Paid</p>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b border-white/20">
              <div className="flex justify-between text-xs text-gray-300">
                <span>Mobile Money</span>
                <span className="text-white font-semibold" style={{
                  animation: activeStep >= 2 ? 'countUp 0.5s ease-out 0.3s both' : 'none'
                }}>
                  RWF {(paymentAmount * 0.56).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>Bank Transfer</span>
                <span className="text-white font-semibold" style={{
                  animation: activeStep >= 2 ? 'countUp 0.5s ease-out 0.5s both' : 'none'
                }}>
                  RWF {(paymentAmount * 0.44).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-300">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold text-white" style={{
                animation: activeStep >= 2 ? 'countUp 0.5s ease-out 0.7s both' : 'none'
              }}>
                RWF {paymentAmount.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3">{steps[2].label}</p>
          </Card>
        </div>

        {/* Receipt Card - Bottom Left */}
        <div 
          className="absolute z-10 left-0 bottom-0"
          style={{
            animation: 'slideDown 0.8s ease-out 0.6s both'
          }}
        >
          <Card className={`p-6 backdrop-blur-md border border-white/30 bg-white/15 rounded-2xl shadow-xl transition-all duration-500 w-80 ${getCardState(3)}`}>
            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-purple-300" />
              <h3 className="text-sm font-semibold text-white">Receipt</h3>
              {activeStep > 3 && (
                <div 
                  className="ml-auto w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                  style={{
                    animation: 'checkPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                  }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {showReceipt && (
              <div 
                className="bg-white/10 rounded-lg p-3 space-y-1.5 text-xs text-gray-300 mb-4 pb-4 border-b border-white/20"
                style={{
                  animation: 'receiptReveal 0.8s ease-out'
                }}
              >
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="text-white">RWF {item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-white/20 pt-1 mt-1">
                  <span className="font-semibold">Total:</span>
                  <span className="text-white font-bold">RWF {finalTotal.toLocaleString()}</span>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400">{steps[3].label}</p>
          </Card>
        </div>

        {/* Step Indicator */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-8 flex gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep >= idx ? 'w-8 bg-primary' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
