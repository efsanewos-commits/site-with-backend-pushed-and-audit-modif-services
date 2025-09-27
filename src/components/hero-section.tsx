import { ArrowRight, Play, Star, Video } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [overlayOpacity, setOverlayOpacity] = useState(50)
  
  useEffect(() => {
    // In production, this would fetch from your backend API
    fetchLandingPageSettings()
  }, [])
  
  const fetchLandingPageSettings = async () => {
    try {
      // Simulate API call - in production this would be:
      // const response = await fetch('/backend/api/settings?category=landing')
      // const data = await response.json()
      // setBackgroundImage(data.settings?.landing_background_image?.value)
      // setOverlayOpacity(parseInt(data.settings?.landing_overlay_opacity?.value) || 50)
    } catch (error) {
      console.error('Error fetching landing page settings:', error)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic background image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-subtle"
        style={{ 
          backgroundColor: backgroundImage 
            ? `rgba(255, 255, 255, ${overlayOpacity / 100})` 
            : undefined 
        }}
      ></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-youtube rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-creative rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2 shadow-small">
            <Star className="h-4 w-4 text-youtube-red fill-current" />
            <span className="text-sm font-medium text-muted-foreground">
              Trusted by 500+ YouTubers & Brands
            </span>
          </div>

          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Transform Your Brand with
              <span className="text-gradient-youtube block">
                Premium Designs
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Professional logo design, YouTube thumbnails, and video editing that converts viewers into loyal customers. 
              <span className="text-foreground font-medium"> Ready in 24-48 hours.</span>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 transform hover:scale-105 font-semibold text-lg px-8 py-4"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white font-semibold text-lg px-8 py-4 transition-smooth"
              onClick={() => {
                // This would open a video modal or redirect to intro video
                console.log('Watch intro video clicked')
              }}
            >
              <Video className="mr-2 h-5 w-5" />
              Watch My Intro
            </Button>
            <Link to="/portfolio">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white font-semibold text-lg px-8 py-4 transition-smooth"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Portfolio
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">24-48h</div>
              <div className="text-sm text-muted-foreground">Delivery Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">99%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">5.0★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}