import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Service {
  id: number
  title: string
  description: string
  icon?: string
  icon_image_path?: string
  icon_image_alt?: string
  service_link?: string
  sort_order: number
  is_active: boolean
}

interface DynamicServicesSliderProps {
  className?: string
  servicesPerSlide?: number
}

export function DynamicServicesSlider({ 
  className = "",
  servicesPerSlide = 3 
}: DynamicServicesSliderProps) {
  const [services, setServices] = useState<Service[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const totalSlides = Math.ceil(services.length / servicesPerSlide)
  
  useEffect(() => {
    fetchServices()
  }, [])
  
  const fetchServices = async () => {
    try {
      // Using default services since backend is not available in this environment
      setServices([
        {
          id: 1,
          title: "Logo Design",
          description: "Professional logos that make your brand unforgettable",
          icon: "🎨",
          service_link: "/services#logo",
          sort_order: 1,
          is_active: true
        },
        {
          id: 2,
          title: "YouTube Thumbnails",
          description: "Eye-catching thumbnails that boost your click-through rates",
          icon: "📺",
          service_link: "/services#thumbnails",
          sort_order: 2,
          is_active: true
        },
        {
          id: 3,
          title: "Video Editing",
          description: "Professional video editing that keeps viewers engaged",
          icon: "🎬",
          service_link: "/services#video",
          sort_order: 3,
          is_active: true
        }
      ])
    } catch (error) {
      console.error('Error setting up services:', error)
      setServices([])
    } finally {
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
  
  const handleServiceClick = (service: Service) => {
    if (service.service_link) {
      if (service.service_link.startsWith('http')) {
        window.open(service.service_link, '_blank')
      } else {
        window.location.href = service.service_link
      }
    }
  }
  
  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: servicesPerSlide }).map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="w-16 h-16 bg-muted rounded-xl mx-auto mb-6"></div>
              <div className="h-6 bg-muted rounded w-32 mx-auto mb-3"></div>
              <div className="h-4 bg-muted rounded w-full mb-6"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  
  if (services.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No services available at the moment.</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Navigation arrows */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-youtube-red hover:text-white hover:border-youtube-red transition-all duration-300 shadow-medium"
            aria-label="Previous services"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-youtube-red hover:text-white hover:border-youtube-red transition-all duration-300 shadow-medium"
            aria-label="Next services"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      
      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
        {getCurrentServices().map((service) => (
          <Card 
            key={service.id}
            className="p-6 group hover:scale-105 transition-all duration-300 cursor-pointer hover:border-youtube-red/30"
            onClick={() => handleServiceClick(service)}
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
                  <span className="text-2xl">{service.icon || "📋"}</span>
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
              >
                Learn More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}