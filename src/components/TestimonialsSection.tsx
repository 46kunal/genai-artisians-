import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Elena Martinez",
      location: "Barcelona, Spain",
      rating: 5,
      message: "The rebozo I commissioned carries the weight of history in every thread. When I wear it, I feel connected to generations of artisan wisdom. The storytelling process was as beautiful as the final piece.",
      product: "Traditional Rebozo"
    },
    {
      id: 2,
      name: "James Thompson",
      location: "London, UK",
      rating: 5,
      message: "I've never owned anything quite like this tapestry. The sacred geometry speaks to something deep within, and knowing the heritage behind each pattern makes it feel like a window into another world.",
      product: "Sacred Geometry Tapestry"
    },
    {
      id: 3,
      name: "Aisha Patel",
      location: "Mumbai, India",
      rating: 5,
      message: "The delicate silk scarf arrived like poetry wrapped in tissue. Every morning when I choose it, I'm reminded that beauty exists in the world through the hands of dedicated artisans.",
      product: "Silk Ceremonial Scarf"
    },
    {
      id: 4,
      name: "David Kim",
      location: "San Francisco, USA",
      rating: 5,
      message: "Commissioning a piece felt like being part of an ancient tradition. The artisan took time to understand not just what I wanted, but why it mattered to me. The result exceeded every expectation.",
      product: "Custom Wall Hanging"
    },
    {
      id: 5,
      name: "Sofia Rossi",
      location: "Florence, Italy",
      rating: 5,
      message: "In a world of mass production, finding authenticity is rare. This table runner brings warmth and soul to our home. Guests always ask about its story, and I love sharing the artisan's journey.",
      product: "Handwoven Table Runner"
    },
    {
      id: 6,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      message: "The quality is extraordinary, but it's the connection to tradition that makes this special. Knowing that the techniques used are centuries old gives each use deeper meaning.",
      product: "Traditional Textile Art"
    }
  ];

  const renderStars = (rating: number) => {
    return Array(rating).fill(0).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ));
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-background via-primary-soft/10 to-secondary-soft/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories from Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every piece finds its home with someone who appreciates the artistry, heritage, and soul woven into each creation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-gentle hover:shadow-craft transition-all duration-300 bg-card/80 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                {/* Quote icon */}
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Testimonial text */}
                <blockquote className="text-card-foreground leading-relaxed">
                  "{testimonial.message}"
                </blockquote>

                {/* Customer info */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-primary font-medium">{testimonial.product}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 p-8 bg-warm-gradient rounded-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Join our community of art lovers who celebrate authentic craftsmanship and meaningful connections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary hover:bg-white/90 px-6 py-3 rounded-lg font-semibold transition-colors">
              Browse Collections
            </button>
            <button className="bg-white/20 text-white hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors border border-white/20">
              Commission a Piece
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;