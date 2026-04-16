'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
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
          setCompletedSteps((prev) => [...new Set([...prev, activeStep])])
          setActiveStep(event.step!)
        }
      }, event.delay)
    )

    return () => timeouts.forEach(clearTimeout)
  }, [])

  const steps = [
    { icon: ShoppingCart, title: 'Order Creation', angle: 0 },
    { icon: Check, title: 'Order Confirmed', angle: 90 },
    { icon: CreditCard, title: 'Payment Successful', angle: 180 },
    { icon: Receipt, title: 'Receipt Ready', angle: 270 }
  ]

  const getStepPosition = (angle: number, radius: number = 200) => {
    const rad = (angle * Math.PI) / 180
    const x = Math.cos(rad) * radius
    const y = Math.sin(rad) * radius
    return { x, y }
  }

  const renderCircularNode = (stepIndex: number) => {
    const step = steps[stepIndex]
    const Icon = step.icon
    const isActive = activeStep === stepIndex
    const isCompleted = completedSteps.includes(stepIndex)
    const pos = getStepPosition(step.angle)

    return (
      <div
        key={stepIndex}
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
          zIndex: isActive ? 40 : isCompleted ? 20 : 10,
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <div
          className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-600 ${
            isActive
              ? 'bg-gradient-to-br from-primary/60 to-primary/30 border-2 border-primary/80 shadow-2xl scale-110'
              : isCompleted
                ? 'bg-green-500/30 border-2 border-green-500/60 opacity-60 scale-90'
                : 'bg-white/10 border-2 border-white/30 opacity-40 scale-80'
          }`}
          style={{
            boxShadow: isActive ? '0 0 30px rgba(59, 130, 246, 0.6)' : 'none'
          }}
        >
          <div className="flex flex-col items-center gap-1">
            <Icon size={28} className={isActive ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-400'} />
            {isActive && <Check size={12} className="text-green-300" />}
          </div>
        </div>
        <div className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-600 ${
          isActive ? 'text-white font-bold scale-100' : 'text-gray-400 scale-75'
        }`}>
          <p className="text-xs">{step.title}</p>
        </div>
      </div>
    )
  }

  const renderArrow = (fromAngle: number, toAngle: number, stepIndex: number) => {
    const isActive = activeStep === stepIndex
    const fromPos = getStepPosition(fromAngle, 180)
    const toPos = getStepPosition(toAngle, 180)

    const midX = (fromPos.x + toPos.x) / 2 * 1.3
    const midY = (fromPos.y + toPos.y) / 2 * 1.3

    return (
      <svg
        key={`arrow-${stepIndex}`}
        className="absolute"
        style={{
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          zIndex: 5
        }}
      >
        <defs>
          <marker
            id={`arrowhead-${stepIndex}`}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3, 0 6"
              fill={isActive ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.2)'}
            />
          </marker>
        </defs>
        <path
          d={`M ${fromPos.x + 480} ${fromPos.y + 280} Q ${midX + 480} ${midY + 280}, ${toPos.x + 480} ${toPos.y + 280}`}
          stroke={isActive ? 'rgba(59, 130, 246, 0.6)' : 'rgba(255, 255, 255, 0.15)'}
          strokeWidth="2"
          fill="none"
          markerEnd={`url(#arrowhead-${stepIndex})`}
          style={{
            transition: 'all 0.6s ease-in-out',
            filter: isActive ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))' : 'none'
          }}
        />
      </svg>
    )
  }

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
        <div className="absolute inset-0 bg-gradient-to-r from-primary/6 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* LIVE DEMO MODE Badge - Top Center */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border border-white/30 bg-white/10 shadow-lg z-50">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" style={{ animation: 'pulse 1s ease-in-out infinite' }} />
            <div>
              <p className="text-sm font-bold text-white">LIVE DEMO MODE</p>
              <p className="text-xs text-gray-300">Real-time POS transaction cycle</p>
            </div>
          </div>
        </div>

        {/* Circular Process Diagram */}
        <style>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
          }
          @keyframes enginePulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
            50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
          }
        `}</style>

        <div className="relative w-full flex justify-center items-center" style={{ minHeight: '700px' }}>
          {/* Arrows SVG Background */}
          <svg
            className="absolute inset-0 w-full h-full"
            style={{
              maxWidth: '900px',
              maxHeight: '900px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1
            }}
          >
            {/* Render arrows for each transition */}
            {[0, 1, 2, 3].map((idx) => renderArrow(steps[idx].angle, steps[(idx + 1) % 4].angle, idx))}
          </svg>

          {/* Central QUICKO ENGINE Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 border-2 border-primary/60 flex flex-col items-center justify-center"
              style={{
                animation: 'enginePulse 3s ease-in-out infinite',
                zIndex: 15
              }}
            >
              <p className="text-xs font-bold text-primary text-center">QUICKO</p>
              <p className="text-xs text-primary/80 text-center">ENGINE</p>
            </div>
          </div>

          {/* Circular Nodes - Always Visible */}
          <div className="relative w-full" style={{ height: '600px' }}>
            {[0, 1, 2, 3].map((idx) => renderCircularNode(idx))}
          </div>
        </div>

        {/* Step Details Panel - Below Circle */}
        <div className="mt-16 max-w-md mx-auto">
          <Card className="p-6 backdrop-blur-md border-white/30 bg-white/10 shadow-2xl rounded-2xl">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">CURRENT STEP</p>
              <h3 className="text-lg font-bold text-white mb-2">{steps[activeStep].title}</h3>
              <p className="text-sm text-gray-300">
                {activeStep === 0 && 'Customer is placing order...'}
                {activeStep === 1 && 'Order confirmed and stock updated'}
                {activeStep === 2 && 'Payment processed successfully'}
                {activeStep === 3 && 'Receipt generated and ready'}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
