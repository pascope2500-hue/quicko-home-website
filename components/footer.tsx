import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About QUICKO</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Security</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">Contact</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>0786 749 012</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>0733 601 168</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>support@quicko.rw</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span>Kigali, Kicukiro - Sonatube</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">Powered by Corebase Ltd</p>
            <p className="text-sm text-muted-foreground">© 2026 QUICKO – All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
