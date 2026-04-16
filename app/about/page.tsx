import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Zap, Shield, Users, TrendingUp } from 'lucide-react'

export default function About() {
  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Our Story</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">About QUICKO</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering African businesses with powerful, affordable POS and inventory management solutions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                At QUICKO, we believe every business, regardless of size, deserves access to world-class business management tools. We&apos;re committed to democratizing technology for African entrepreneurs and business owners.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to provide affordable, reliable, and easy-to-use solutions that help businesses streamline operations, increase profitability, and scale confidently.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg p-8 h-80 flex items-center justify-center">
              <Zap className="w-32 h-32 text-primary opacity-30" />
            </div>
          </div>

          {/* Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { icon: Shield, title: 'Reliability', desc: '99.9% uptime SLA with enterprise-grade infrastructure' },
              { icon: Users, title: 'Support', desc: 'Dedicated support team available 24/7 for assistance' },
              { icon: TrendingUp, title: 'Growth', desc: 'Help your business grow with data-driven insights' }
            ].map((goal, idx) => (
              <Card key={idx} className="p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    <goal.icon size={32} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{goal.title}</h3>
                <p className="text-muted-foreground text-sm">{goal.desc}</p>
              </Card>
            ))}
          </div>

          {/* Experience */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">3+</div>
                <p className="text-muted-foreground">Years in Business</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <p className="text-muted-foreground">Active Businesses</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50k+</div>
                <p className="text-muted-foreground">Transactions Daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Built for Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We&apos;re deeply committed to supporting local businesses, entrepreneurs, and the African startup ecosystem. QUICKO is more than software—it&apos;s a partner in your business journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Card className="p-6 text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">Local Support</h3>
              <p className="text-muted-foreground">Our team is based in Kigali, understanding local business needs and providing support in Kinyarwanda and English.</p>
            </Card>
            <Card className="p-6 text-left">
              <h3 className="text-xl font-bold text-foreground mb-2">Affordable Pricing</h3>
              <p className="text-muted-foreground">Designed with African business budgets in mind, making enterprise features accessible to small and medium businesses.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
