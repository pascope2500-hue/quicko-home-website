'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'backdrop-blur-xl bg-background/80 border-b border-border shadow-sm' 
        : 'bg-background'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold">Q</div>
            QUICKO
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">HOME</Link>
            <Link href="/pricing" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">PRICING</Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">ABOUT US</Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">CONTACT US</Link>
            <Link href="/faq" className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">FAQ</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <Link href="/" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">HOME</Link>
            <Link href="/pricing" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">PRICING</Link>
            <Link href="/about" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">ABOUT US</Link>
            <Link href="/contact" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">CONTACT US</Link>
            <Link href="/faq" className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">FAQ</Link>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" asChild className="flex-1">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
