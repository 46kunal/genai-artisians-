import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Heart, Share2, Eye, Wand2 } from "lucide-react";

const ProductShowcase = () => {
  const sampleProducts = [
    {
      id: 1,
      title: "Sunset Weave Rebozo",
      description: "Like captured sunlight dancing through mountain mist, this rebozo carries the warmth of generations. Each thread whispers stories of ancestral wisdom, dyed with cochineal's crimson kiss and indigo's midnight embrace.",
      price: "$180",
      image: "/lovable-uploads/placeholder-product1.jpg",
      tags: ["Traditional", "Hand-woven", "Natural Dyes"]
    },
    {
      id: 2,
      title: "Sacred Geometry Tapestry", 
      description: "Sacred patterns flow like ancient prayers across this tapestry, where geometry meets the divine. Born from dreams and dyed with earth's own palette, it transforms any space into a sanctuary of beauty.",
      price: "$320",
      image: "/lovable-uploads/placeholder-product2.jpg",
      tags: ["Sacred Art", "Ceremonial", "Museum Quality"]
    },
    {
      id: 3,
      title: "Hummingbird's Dance Scarf",
      description: "Delicate as a hummingbird's flight, this scarf captures the joy of movement in silk. Each shimmer reflects the artist's heart, creating wearable poetry that graces the soul as much as the body.",
      price: "$95",
      image: "/lovable-uploads/placeholder-product3.jpg",
      tags: ["Silk", "Contemporary", "Everyday Luxury"]
    }
  ];

  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transform Photos into Poetry
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch simple phone photos become stunning showcases with AI-crafted descriptions that honor the soul of each creation
          </p>
        </div>

        {/* Upload Section */}
        <Card className="p-8 mb-12 shadow-gentle bg-gradient-to-br from-accent-soft to-secondary-soft">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto">
              <Camera className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Share Your Creation</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Simply take a photo with your phone, and let our AI companion transform it into a beautiful showcase
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Camera className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </Card>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-gentle hover:shadow-craft transition-all duration-300 group">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-primary-soft to-secondary-soft relative overflow-hidden">
                <div className="absolute inset-0 bg-warm-gradient opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-white/50" />
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-2xl font-bold text-primary">{product.price}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-1 bg-secondary-soft text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="pt-2 border-t border-border">
                  <Button variant="ghost" size="sm" className="w-full text-muted-foreground hover:text-primary">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Enhance with AI
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Create Your Showcase
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;