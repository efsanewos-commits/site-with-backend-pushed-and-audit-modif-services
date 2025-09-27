import { useState, useEffect } from "react"
import { Palette, Play, Zap, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Default services as fallback
const defaultServices = [
  {
    id: 1,
    title: "Logo Design",
    description: "Professional logos that make your brand unforgettable",
    icon: "🎨",
    icon_image_path: null,
    service_link: "/services#logo",
    sort_order: 1,
    is_active: true
  },
  {
    id: 2,
    title: "YouTube Thumbnails",
    description: "Eye-catching thumbnails that boost your click-through rates",
    icon: "📺",
    icon_image_path: null,
    service_link: "/services#thumbnails",
    sort_order: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Video Editing",
    description: "Professional video editing that keeps viewers engaged",
    icon: "🎬",
    icon_image_path: null,
    service_link: "/services#video",
    sort_order: 3,
    is_active: true
  }
]

export function ServicesOverview() {
  const [services, setServices] = useState(defaultServices)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  // Determine how many services to show per slide based on screen size
  const servicesPerSlide = 3
  const totalSlides = Math.ceil(services.length / servicesPerSlide)
  
  useEffect(() => {
    fetchServices()
  }, [])
  
  const fetchServices = async () => {
    try {
      // In production, this would fetch from your backend API
      // For now, we'll use the default services
      setServices(defaultServices)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching services:', error)
      setServices(defaultServices)
      setIsLoading(false)
    }
  }
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }
  
  const getCurrentServices = () => {
    const startIndex = currentSlide * servicesPerSlide
    return services.slice(startIndex, startIndex + servicesPerSlide)
  }
  
  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-premium animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-xl mx-auto mb-6"></div>
                <div className="h-6 bg-muted rounded w-32 mx-auto mb-3"></div>
                <div className="h-4 bg-muted rounded w-full mb-6"></div>
                <div className="space-y-2 mb-8">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-3 bg-muted rounded w-full"></div>
                  ))}
                </div>
                <div className="h-6 bg-muted rounded w-24 mx-auto mb-6"></div>
                <div className="h-10 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Services That <span className="text-gradient-youtube">Drive Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional design services tailored to grow your business and increase conversions.
          </p>
        </div>

        {/* Services slider */}
        <div className="relative">
          {/* Navigation arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-youtube-red hover:text-white hover:border-youtube-red transition-all duration-300 shadow-medium"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-youtube-red hover:text-white hover:border-youtube-red transition-all duration-300 shadow-medium"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          
          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
            {getCurrentServices().map((service) => (
              <div 
                key={service.id}
                className="card-premium group hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-youtube rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {service.icon_image_path ? (
                      <img 
                        src={service.icon_image_path} 
                        alt={service.icon_image_alt || service.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                    ) : (
                      <span className="text-2xl">{service.icon}</span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-youtube-red transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Button 
                    className="w-full font-medium bg-gradient-youtube hover:shadow-glow transition-all duration-300"
                    onClick={() => {
                      if (service.service_link) {
                        if (service.service_link.startsWith('http')) {
                          window.open(service.service_link, '_blank')
                        } else {
                          window.location.href = service.service_link
                        }
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slide indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-youtube-red scale-125' 
                      : 'bg-muted hover:bg-youtube-red/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

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
  )
}