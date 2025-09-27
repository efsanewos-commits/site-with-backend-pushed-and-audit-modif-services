import { HeroSection } from "@/components/hero-section"
import { PortfolioHighlights } from "@/components/portfolio-highlights"
import { DynamicServicesSlider } from "@/components/dynamic-services-slider"
import { WhyChooseSection } from "@/components/why-choose-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { LeadMagnet } from "@/components/lead-magnet"
import { PricingEstimator } from "@/components/pricing-estimator"
import { CalendlyBooking } from "@/components/calendly-booking"
import { SEOHead } from "@/components/seo-head"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <>
      <SEOHead 
        title="Adil GFX - Professional Logo Design, YouTube Thumbnails & Video Editing"
        description="Transform your brand with premium logo design, high-converting YouTube thumbnails, and professional video editing. Trusted by 500+ clients worldwide. Get results in 24-48 hours."
        keywords="logo design, youtube thumbnails, video editing, brand identity, graphic design, youtube optimization, channel setup, adil gfx"
        url="https://adilgfx.com"
      />
      <main className="pt-16">
      <HeroSection />
      
      {/* Lead Magnet Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <LeadMagnet 
            variant="banner"
            title="🎁 5 Free YouTube Thumbnail Templates"
            description="Professional templates that have generated millions of views. Get instant access!"
          />
        </div>
      </section>
      
      <PortfolioHighlights />
      
      {/* Dynamic Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Services That <span className="text-gradient-youtube">Drive Results</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional design services tailored to grow your business and increase conversions.
            </p>
          </div>
          
          <DynamicServicesSlider />
          
          {/* Bottom CTA */}
          <div className="text-center mt-16 p-8 bg-gradient-subtle rounded-2xl">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss your project and create a tailored solution that fits your needs and budget.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4"
            >
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
      
      {/* Pricing Estimator Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Calculate Your <span className="text-gradient-youtube">Project Cost</span>
          </h2>
          <PricingEstimator />
        </div>
      </section>
      
      <WhyChooseSection />
      <TestimonialsSection />
      
      {/* Calendly Booking Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto">
          <CalendlyBooking variant="inline" />
        </div>
      </section>
    </main>
    </>
  )
}