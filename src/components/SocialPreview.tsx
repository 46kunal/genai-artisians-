import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Copy, Sparkles } from "lucide-react";

const SocialPreview = () => {
  const socialPosts = [
    {
      platform: "Instagram",
      icon: Instagram,
      content: "✨ Each thread tells a story that began before my birth. My grandmother's hands taught mine the sacred dance of weaving, where cochineal beetles become crimson dreams and indigo transforms into midnight poetry. 🧵 #HandWoven #Heritage #ArtisanCraft #ZapotecTradition",
      hashtags: "#HandWoven #Heritage #ArtisanCraft #ZapotecTradition",
      engagement: "Perfect for Instagram Stories & Posts"
    },
    {
      platform: "Facebook", 
      icon: Facebook,
      content: "Behind every piece I create lies five generations of wisdom. When I weave, I'm not just working with threads – I'm continuing conversations my ancestors started, carrying forward traditions that refuse to be forgotten. Each rebozo, each tapestry, carries the soul of our people forward into tomorrow.",
      hashtags: "#TraditionalCrafts #ArtisanStory #CulturalHeritage",
      engagement: "Great for storytelling posts"
    },
    {
      platform: "Twitter",
      icon: Twitter, 
      content: "When cochineal beetles become crimson and indigo flows like midnight, magic happens. Each weave carries whispers of ancestral wisdom. This is more than craft – it's cultural memory made tangible. 🧵✨ #ArtisanLife #TraditionalCrafts",
      hashtags: "#ArtisanLife #TraditionalCrafts #Heritage",
      engagement: "Perfect tweet length"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Share Your Passion Effortlessly
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform the daunting task of marketing into moments of joy with AI-generated social content that celebrates your craft
          </p>
        </div>

        {/* Magic Generator */}
        <Card className="p-8 mb-12 shadow-craft bg-warm-gradient text-white">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">One Tap, Endless Possibilities</h3>
              <p className="text-white/90 max-w-md mx-auto">
                From your story and photos, we craft engaging posts that honor your heritage and attract your ideal audience
              </p>
            </div>
            <Button className="bg-white text-primary hover:bg-white/90">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Social Posts
            </Button>
          </div>
        </Card>

        {/* Social Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {socialPosts.map((post, index) => (
            <Card key={index} className="p-6 shadow-gentle hover:shadow-craft transition-all duration-300">
              <div className="space-y-4">
                {/* Platform Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                    <post.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{post.platform}</h3>
                    <p className="text-xs text-muted-foreground">{post.engagement}</p>
                  </div>
                </div>

                {/* Post Content */}
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Hashtags */}
                <div className="text-xs text-primary font-medium">
                  {post.hashtags}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                    Share
                  </Button>
                </div>

                {/* AI Badge */}
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span className="text-xs text-muted-foreground">AI-crafted with love</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-earth-gradient rounded-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Ready to Share Your Story with the World?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join artisans who've discovered the joy of effortless marketing that honors their craft
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Start Creating Content
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialPreview;