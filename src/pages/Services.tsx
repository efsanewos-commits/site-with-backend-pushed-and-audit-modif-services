import { CheckCircle, Clock, Zap, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SEOHead } from "@/components/seo-head"

const services = [
  {
    title: "Logo Design",
    subtitle: "Professional Brand Identity",
    description: "Create a memorable logo that builds trust and recognition for your brand.",
    icon: "🎨",
    packages: [
      {
        name: "Basic Logo",
        price: "Starting at $149",
        timeline: "2-3 days",
        features: [
          "1 Logo concept",
          "2 Revisions included",
          "PNG & JPG files",
          "Basic style guide"
        ]
      },
      {
        name: "Standard Logo",
        price: "Starting at $249",
        timeline: "3-5 days",
        features: [
          "3 Logo concepts",
          "5 Revisions included",
          "All file formats (PNG, JPG, SVG, AI)",
          "Detailed style guide",
          "Social media kit"
        ],
        popular: true
      },
      {
        name: "Premium Brand",
        price: "Starting at $449",
        timeline: "5-7 days",
        features: [
          "5 Logo concepts",
          "Unlimited revisions",
          "Complete file package",
          "Brand guidelines",
          "Business card design",
          "Letterhead design"
        ]
      }
    ]
  },
  {
    title: "YouTube Thumbnails",
    subtitle: "High-Converting Click Magnets",
    description: "Eye-catching thumbnails that boost your CTR and grow your channel.",
    icon: "📺",
    packages: [
      {
        name: "Single Thumbnail",
        price: "Starting at $49",
        timeline: "24 hours",
        features: [
          "1 Custom thumbnail",
          "2 Revisions included",
          "High-resolution files",
          "Mobile optimized"
        ]
      },
      {
        name: "Thumbnail Pack",
        price: "Starting at $199",
        timeline: "2-3 days",
        features: [
          "5 Custom thumbnails",
          "3 Revisions per thumbnail",
          "Multiple format options",
          "A/B testing versions",
          "Template variations"
        ],
        popular: true
      },
      {
        name: "Monthly Package",
        price: "Starting at $799",
        timeline: "Ongoing",
        features: [
          "20 Custom thumbnails",
          "Unlimited revisions",
          "Priority support",
          "Performance analytics",
          "Custom thumbnail strategy"
        ]
      }
    ]
  },
  {
    title: "Video Editing",
    subtitle: "Professional Video Production",
    description: "Transform raw footage into engaging videos that keep viewers watching.",
    icon: "🎬",
    packages: [
      {
        name: "Basic Edit",
        price: "Starting at $299",
        timeline: "3-5 days",
        features: [
          "Up to 10 minutes",
          "Basic color correction",
          "Simple transitions",
          "Background music"
        ]
      },
      {
        name: "Professional Edit",
        price: "Starting at $599",
        timeline: "5-7 days",
        features: [
          "Up to 20 minutes",
          "Advanced color grading",
          "Motion graphics",
          "Custom animations",
          "Sound design",
          "Multiple revisions"
        ],
        popular: true
      },
      {
        name: "Premium Production",
        price: "Starting at $1,299",
        timeline: "7-10 days",
        features: [
          "Up to 60 minutes",
          "Cinematic color grading",
          "Advanced motion graphics",
          "Custom animations & effects",
          "Professional sound design",
          "Multiple format delivery"
        ]
      }
    ]
  },
  {
    title: "YouTube Channel Setup & Branding",
    subtitle: "Complete Channel Transformation",
    description: "Full channel setup, SEO optimization, and branding package to grow your YouTube presence.",
    icon: "🚀",
    packages: [
      {
        name: "Channel Starter",
        price: "Starting at $399",
        timeline: "5-7 days",
        features: [
          "Channel art & logo design",
          "Channel description SEO",
          "Video end screens setup",
          "Basic branding kit",
          "Channel optimization guide"
        ]
      },
      {
        name: "Growth Package",
        price: "Starting at $799",
        timeline: "7-10 days",
        features: [
          "Complete channel branding",
          "Thumbnail template pack",
          "SEO keyword research",
          "Video intro/outro creation",
          "Social media kit",
          "Growth strategy consultation"
        ],
        popular: true
      },
      {
        name: "Enterprise Channel",
        price: "Starting at $1,499",
        timeline: "10-14 days",
        features: [
          "Premium channel design",
          "Custom motion graphics package",
          "Advanced SEO setup",
          "Content strategy planning",
          "Analytics setup & training",
          "6-month growth support"
        ]
      }
    ]
  },
  {
    title: "Social Media Graphics",
    subtitle: "Engaging Visual Content",
    description: "Create scroll-stopping graphics for all your social media platforms.",
    icon: "📱",
    packages: [
      {
        name: "Basic Pack",
        price: "Starting at $99",
        timeline: "2-3 days",
        features: [
          "5 Social media posts",
          "Instagram story templates",
          "Basic animations",
          "2 Revisions included"
        ]
      },
      {
        name: "Growth Pack",
        price: "Starting at $199",
        timeline: "3-5 days",
        features: [
          "15 Social media posts",
          "Story & highlight covers",
          "Animated versions",
          "Platform optimization",
          "Content calendar template"
        ],
        popular: true
      },
      {
        name: "Enterprise Pack",
        price: "Starting at $399",
        timeline: "5-7 days",
        features: [
          "30 Social media posts",
          "Complete template library",
          "Video content creation",
          "Brand guidelines",
          "Monthly content strategy"
        ]
      }
    ]
  },
  {
    title: "Website Design",
    subtitle: "Modern Web Experiences",
    description: "Responsive websites that look amazing and convert visitors into customers.",
    icon: "💻",
    packages: [
      {
        name: "Landing Page",
        price: "Starting at $799",
        timeline: "7-10 days",
        features: [
          "Single page design",
          "Mobile responsive",
          "Contact form integration",
          "SEO optimization"
        ]
      },
      {
        name: "Business Website",
        price: "Starting at $1,499",
        timeline: "10-14 days",
        features: [
          "Up to 5 pages",
          "Custom design system",
          "CMS integration",
          "Advanced SEO",
          "Analytics setup",
          "Performance optimization"
        ],
        popular: true
      },
      {
        name: "E-commerce Site",
        price: "Starting at $2,999",
        timeline: "14-21 days",
        features: [
          "Full e-commerce platform",
          "Product catalog design",
          "Payment integration",
          "Inventory management",
          "Marketing automation",
          "Ongoing support"
        ]
      }
    ]
  },
  {
    title: "Motion Graphics & Animation",
    subtitle: "Bring Your Brand to Life",
    description: "Professional animations and motion graphics that captivate your audience.",
    icon: "🎭",
    packages: [
      {
        name: "Basic Animation",
        price: "Starting at $199",
        timeline: "3-5 days",
        features: [
          "Logo animation",
          "Simple transitions",
          "Basic motion graphics",
          "HD export"
        ]
      },
      {
        name: "Professional Package",
        price: "Starting at $499",
        timeline: "5-7 days",
        features: [
          "Custom intro/outro",
          "Advanced animations",
          "Sound design",
          "Multiple format exports",
          "Revision rounds"
        ],
        popular: true
      },
      {
        name: "Premium Production",
        price: "Starting at $999",
        timeline: "7-14 days",
        features: [
          "Complex motion graphics",
          "3D elements",
          "Professional sound design",
          "Multiple video lengths",
          "Source files included"
        ]
      }
    ]
  }
]

const addOns = [
  { name: "Rush Delivery (24h)", price: "+50%" },
  { name: "Extra Revisions (per revision)", price: "$25" },
  { name: "Source Files", price: "$49" },
  { name: "Social Media Kit", price: "$99" },
  { name: "Animation/GIF Version", price: "$149" }
]

export default function Services() {
  return (
    <>
      <SEOHead 
        title="Services & Pricing - Logo Design, YouTube Thumbnails, Video Editing"
        description="Professional design services including logo design starting at $149, YouTube thumbnails at $25, and video editing packages. 24-48 hour delivery guaranteed."
        keywords="logo design services, youtube thumbnail design, video editing services, graphic design pricing, professional design packages"
        url="https://adilgfx.com/services"
      />
      <main className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Services & <span className="text-gradient-youtube">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Professional design services with transparent pricing. Choose the package that fits your needs, 
            or contact me for a custom solution.
          </p>
          <p className="text-lg text-youtube-red font-medium">
            💬 Pricing depends on your specific project requirements. Chat with me for a free personalized quote!
          </p>
        </div>

        {/* Services */}
        {services.map((service, serviceIndex) => (
          <div key={service.title} className={`mb-20 ${serviceIndex !== services.length - 1 ? 'border-b border-border pb-20' : ''}`}>
            {/* Service header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{service.icon}</div>
              <h2 className="text-3xl font-bold text-foreground mb-2">{service.title}</h2>
              <p className="text-lg text-youtube-red font-medium mb-4">{service.subtitle}</p>
              <p className="text-muted-foreground max-w-2xl mx-auto">{service.description}</p>
            </div>

            {/* Pricing packages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.packages.map((pkg) => (
                <div 
                  key={pkg.name}
                  className={`card-premium relative ${pkg.popular ? 'ring-2 ring-youtube-red' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-youtube text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-foreground mb-2">{pkg.price}</div>
                    <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-6">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{pkg.timeline}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-youtube-red flex-shrink-0" />
                          <span className="text-sm text-muted-foreground text-left">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full font-medium ${
                        pkg.popular 
                          ? 'bg-gradient-youtube hover:shadow-glow' 
                          : 'variant-outline border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white'
                      } transition-all duration-300`}
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Add-ons section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Add-ons & Extras</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon) => (
              <div key={addon.name} className="card-premium">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{addon.name}</h3>
                  <span className="text-youtube-red font-semibold">{addon.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-youtube rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Consultation</h3>
              <p className="text-sm text-muted-foreground">We discuss your project, goals, and requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-youtube rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Design</h3>
              <p className="text-sm text-muted-foreground">I create initial concepts based on your brief</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-youtube rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Refine</h3>
              <p className="text-sm text-muted-foreground">We collaborate to perfect the design together</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-youtube rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white font-bold">4</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Deliver</h3>
              <p className="text-sm text-muted-foreground">Final files delivered in all required formats</p>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <div className="bg-gradient-subtle rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Not Sure Which Package to Choose?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Pricing depends on your specific project requirements. Chat with me for a free personalized quote that fits your budget and timeline perfectly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-youtube hover:shadow-glow transition-all duration-300 font-semibold px-8 py-4"
              >
                Get Custom Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-youtube-red text-youtube-red hover:bg-youtube-red hover:text-white font-semibold px-8 py-4 transition-smooth"
              >
                Schedule Free Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}