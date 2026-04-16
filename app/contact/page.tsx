'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Get In Touch</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {/* Contact Info Cards */}
            <Card className="p-8 text-center hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-b-2 hover:border-b-4 hover:border-b-primary">
              <div className="mb-6 flex justify-center">
                <div className="p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Phone size={36} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Phone</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">0786 749 012</p>
                <p className="text-muted-foreground">0733 601 168</p>
              </div>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-b-2 hover:border-b-4 hover:border-b-primary">
              <div className="mb-6 flex justify-center">
                <div className="p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Mail size={36} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Email</h3>
              <p className="text-muted-foreground">support@quicko.rw</p>
              <p className="text-sm text-muted-foreground mt-2">We&apos;ll respond within 24 hours</p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer border-b-2 hover:border-b-4 hover:border-b-primary">
              <div className="mb-6 flex justify-center">
                <div className="p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={36} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Location</h3>
              <p className="text-muted-foreground">Kigali, Kicukiro</p>
              <p className="text-muted-foreground">Sonatube, Rwanda</p>
            </Card>
          </div>

          {/* Business Hours */}
          <Card className="p-8 mb-20 hover:shadow-lg hover:border-primary/50 transition-all duration-300 border-l-4 border-l-primary">
            <div className="flex items-start gap-6">
              <div className="p-3 text-primary flex-shrink-0">
                <Clock size={32} />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-foreground mb-6">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-semibold text-foreground mb-1">Monday - Friday</p>
                    <p className="text-muted-foreground">8:00 AM - 6:00 PM EAT</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Saturday & Sunday</p>
                    <p className="text-muted-foreground">24/7 Support Available</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Form */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <Input
                  name="name"
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
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>

              {submitted && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Thank you for reaching out! We&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
