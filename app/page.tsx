import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SystemSimulation } from '@/components/system-simulation'
import { LiveOrderFlow } from '@/components/live-order-flow'
import Link from 'next/link'
import { BarChart3, LineChart, Smartphone, CreditCard, Lock, Users, Star, ArrowRight, PlayCircle } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with sharp POS Dashboard Image */}
        <div className="absolute inset-0">
          {/* Sharp dashboard background image - no blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/pos-dashboard.jpg)',
            }}
          />
          
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-out' }}>
            <Badge variant="secondary" className="inline-block">Trusted by 1000+ businesses</Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance leading-tight animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-out 0.2s both' }}>
            Smart Business Starts with <span className="text-primary">QUICKO</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-8 text-balance max-w-2xl mx-auto animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-out 0.4s both' }}>
            Manage inventory, sales, staff, and reports in real-time from any device. Transform your business with our powerful, easy-to-use POS system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animation: 'fadeIn 0.8s ease-out 0.6s both' }}>
            <Button size="lg" asChild className="gap-2">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="#features">
                <PlayCircle size={18} />
                See Demo
              </Link>
            </Button>
          </div>

          {/* Live Order Flow Simulation */}
          <div className="mt-16 px-4">
            <LiveOrderFlow />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Everything you need to run your business efficiently</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, title: 'Advanced Inventory Management', desc: 'Track stock levels, monitor sales trends, and optimize inventory in real-time' },
              { icon: LineChart, title: 'Real-Time Reports & Analytics', desc: 'Get instant insights into your business performance with detailed analytics' },
              { icon: Smartphone, title: 'Works on POS, Smartphone & Laptop', desc: 'Access QUICKO from any device, anywhere, anytime' },
              { icon: CreditCard, title: 'Expense Tracking', desc: 'Monitor all your expenses and manage your cash flow effectively' },
              { icon: Lock, title: 'Secure & Reliable System', desc: 'Enterprise-grade security to protect your business data' },
              { icon: Users, title: 'Multi-Payment Method Support', desc: 'Accept cash, card, mobile money, and more' }
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={32} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Simulation Section */}
      <SystemSimulation />

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Trusted by Businesses Everywhere</h2>
            <p className="text-lg text-muted-foreground">See what our customers have to say about QUICKO</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', business: 'Fashion Retail', stars: 5, review: 'QUICKO transformed how we manage our inventory. Our stock levels are always accurate and we save hours every week.' },
              { name: 'James Okafor', business: 'Restaurant Owner', stars: 5, review: 'The POS system is incredibly intuitive. Our staff learned it in minutes and we\'ve never looked back. Highly recommended!' },
              { name: 'Mary Uwimana', business: 'Supermarket Manager', stars: 5, review: 'Real-time analytics give us the insights we need to make better business decisions. QUICKO is essential to our operations.' }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic leading-relaxed">&quot;{testimonial.review}&quot;</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of businesses using QUICKO to streamline operations and increase profitability.
          </p>
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <Link href="/signup">
              Start Your Free Trial
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}
