import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function FAQ() {
  const faqs = [
    {
      question: 'How do I use the POS system?',
      answer: 'QUICKO POS is designed to be intuitive. Once you log in, you can start creating transactions immediately. Our support team provides onboarding tutorials and comprehensive documentation to help you get started.'
    },
    {
      question: 'What payment methods does QUICKO support?',
      answer: 'QUICKO supports multiple payment methods including cash, credit/debit cards, mobile money (MTN Mobile Money, Airtel Money), and bank transfers. We continuously add new payment methods based on customer needs.'
    },
    {
      question: 'What are the subscription plans?',
      answer: 'We offer three plans: Starter (12,000/month) for small retailers, Gold (30,000/month) our most popular option with advanced features, and Platinum (50,000/month) with unlimited users and 24/7 support.'
    },
    {
      question: 'What is EBM integration?',
      answer: 'EBM (Electronic Billing Machine) integration allows your QUICKO system to communicate directly with Rwanda Revenue Authority systems, enabling compliant invoicing and tax reporting.'
    },
    {
      question: 'What support channels are available?',
      answer: 'We offer support through email (support@quicko.rw), phone (0786 749 012, 0733 601 168), and in-app chat. Gold and Platinum plans include priority support with faster response times.'
    },
    {
      question: 'How does inventory tracking work?',
      answer: 'QUICKO automatically tracks inventory as you process sales. You can set reorder points, receive alerts for low stock, import bulk inventory data, and generate detailed inventory reports in real-time.'
    },
    {
      question: 'What analytics and reports are available?',
      answer: 'QUICKO provides comprehensive analytics including sales trends, revenue reports, inventory analytics, staff performance metrics, expense tracking, and custom reports tailored to your business needs.'
    },
    {
      question: 'How secure is my business data?',
      answer: 'We use enterprise-grade encryption (SSL/TLS), secure data centers, regular security audits, and automatic backups to protect your data. All data is compliant with GDPR and Rwanda data protection regulations.'
    },
    {
      question: 'Can I use QUICKO offline?',
      answer: 'QUICKO works best with an internet connection. However, our mobile app includes limited offline mode for processing transactions. Data syncs automatically when connectivity is restored.'
    },
    {
      question: 'What receipt formats does QUICKO support?',
      answer: 'QUICKO supports multiple receipt formats including Sales Receipt, Proforma Invoice, Copy Receipt, and Refund Receipt. All formats comply with Rwanda Revenue Authority requirements.'
    },
    {
      question: 'Can I have multiple users on one account?',
      answer: 'Yes! The Starter plan includes 1 user, Gold plan includes up to 15 users, and Platinum includes unlimited users. Each user has customizable access permissions for security.'
    },
    {
      question: 'How much does customer support cost?',
      answer: 'Basic email support is included with all plans. Priority phone support is included with Gold and Platinum plans. We also offer dedicated account management with Platinum plans at no additional cost.'
    }
  ]

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Help Center</Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about QUICKO features, pricing, and support.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border rounded-lg px-6 data-[state=open]:bg-secondary/20 transition-colors">
                <AccordionTrigger className="py-4 hover:no-underline text-foreground font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help!
          </p>
          
          <div className="space-y-4 mb-8">
            <div>
              <p className="font-semibold text-foreground mb-2">Phone</p>
              <p className="text-muted-foreground">0786 749 012 or 0733 601 168</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Email</p>
              <p className="text-muted-foreground">support@quicko.rw</p>
            </div>
          </div>

          <Button size="lg" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  )
}
