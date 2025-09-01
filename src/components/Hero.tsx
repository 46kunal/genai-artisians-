import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Camera, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen bg-earth-gradient flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 bg-accent-soft text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Your Digital Craft Companion
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Celebrate Your
            <span className="bg-warm-gradient bg-clip-text text-transparent"> Craft</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-muted-foreground font-light">
            Transform heritage into stories,
            <br />
            photos into showcases
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your trusted digital companion that makes sharing your artisanal journey feel joyful and empowering. 
          From heritage stories to stunning product showcases, we celebrate the soul of your craft.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-craft"
            onClick={() => navigate('/auth')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Start Your Journey
          </Button>
          <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary-soft">
            <Camera className="w-5 h-5 mr-2" />
            See How It Works
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="bg-card rounded-lg p-6 shadow-gentle">
            <div className="w-12 h-12 bg-primary-soft rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Heritage Stories</h3>
            <p className="text-sm text-muted-foreground">
              Transform simple facts into beautiful narratives that honor your craft's heritage
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-gentle">
            <div className="w-12 h-12 bg-secondary-soft rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Camera className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Stunning Showcases</h3>
            <p className="text-sm text-muted-foreground">
              Turn phone photos into professional product displays with poetic descriptions
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-gentle">
            <div className="w-12 h-12 bg-accent-soft rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Share2 className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-2">Effortless Sharing</h3>
            <p className="text-sm text-muted-foreground">
              Generate engaging social content with one tap, making marketing a moment of joy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;