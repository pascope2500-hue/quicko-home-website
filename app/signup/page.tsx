'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, Eye, EyeOff, ChevronDown } from 'lucide-react'

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    products: [] as string[],
    source: ''
  })
  const [loading, setLoading] = useState(false)

  const products = ['Quicko SmartPhone', 'Quicko POS', 'Quicko Web', 'Quicko Terminal', 'Quicko Barcode Generator']
  const sources = ['Social Media', 'Friends & Family', 'Radio & TV', 'Street Billboards', 'Events', 'Marketing Agent', 'Other']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background flex items-center justify-center px-4 py-8">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <Card className="w-full max-w-md relative z-10 shadow-lg">
        <div className="p-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-6 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">Q</div>
            QUICKO
          </Link>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
            <div className={`flex-1 h-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">
            {step === 1 ? 'Create Account' : 'Tell Us More'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {step === 1 ? 'Start your 14-day free trial' : 'Help us understand your needs'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                    I agree to the{' '}
                    <Link href="#" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-4">Which QUICKO products are you interested in?</label>
                  <div className="space-y-3">
                    {products.map(product => (
                      <div key={product} className="flex items-center gap-3">
                        <Checkbox
                          id={product}
                          checked={formData.products.includes(product)}
                          onCheckedChange={() => handleProductToggle(product)}
                        />
                        <label htmlFor={product} className="text-sm text-foreground cursor-pointer">{product}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">How did you learn about us?</label>
                  <div className="relative">
                    <select
                      name="source"
                      value={formData.source}
                      onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select an option</option>
                      {sources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {step === 1 ? (
                <>Continue<ArrowRight size={18} /></>
              ) : (
                <>
                  {loading ? 'Creating account...' : 'Start Free Trial'}
                  {!loading && <ArrowRight size={18} />}
                </>
              )}
            </Button>
          </form>

          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              className="w-full mt-3"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          )}

          <p className="mt-6 text-center text-muted-foreground text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
