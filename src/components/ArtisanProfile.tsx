import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, MapPin, Palette, Wand2 } from "lucide-react";
import { useState } from "react";

const ArtisanProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    location: "",
    craft: "",
    heritage: "",
    inspiration: ""
  });

  const handleGenerateStory = () => {
    // This would integrate with AI in a real implementation
    console.log("Generating story for:", profile);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Share Your Artisan Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us a few simple facts about your craft and heritage, and watch as we weave them into a beautiful story
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Form */}
          <Card className="p-6 shadow-gentle">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-soft rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">Your Artisan Identity</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Maria Elena Rosario"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location & Heritage
                  </Label>
                  <Input
                    id="location"
                    placeholder="Oaxaca, Mexico - Traditional Zapotec weaving"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="craft" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Your Craft
                  </Label>
                  <Input
                    id="craft"
                    placeholder="Hand-woven textiles using natural dyes"
                    value={profile.craft}
                    onChange={(e) => setProfile({...profile, craft: e.target.value})}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="heritage" className="text-sm font-medium text-foreground">
                    Heritage & Tradition
                  </Label>
                  <Textarea
                    id="heritage"
                    placeholder="Techniques passed down through five generations, using cochineal beetles for reds and indigo for blues..."
                    value={profile.heritage}
                    onChange={(e) => setProfile({...profile, heritage: e.target.value})}
                    className="mt-1 min-h-[100px]"
                  />
                </div>

                <div>
                  <Label htmlFor="inspiration" className="text-sm font-medium text-foreground">
                    What Inspires You?
                  </Label>
                  <Textarea
                    id="inspiration"
                    placeholder="The morning mist over the mountains, the stories my grandmother told..."
                    value={profile.inspiration}
                    onChange={(e) => setProfile({...profile, inspiration: e.target.value})}
                    className="mt-1 min-h-[80px]"
                  />
                </div>

                <Button 
                  onClick={handleGenerateStory}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!profile.name || !profile.craft}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Weave My Story
                </Button>
              </div>
            </div>
          </Card>

          {/* Story Preview */}
          <Card className="p-6 shadow-gentle bg-warm-gradient">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Your Story Preview</h3>
              
              {profile.name ? (
                <div className="bg-white/10 rounded-lg p-4 text-white space-y-3">
                  <p className="text-sm opacity-90">
                    <span className="font-medium">{profile.name}</span> carries within her hands the whispered secrets of ancient traditions...
                  </p>
                  {profile.location && (
                    <p className="text-sm opacity-90">
                      From the heartland of <span className="font-medium">{profile.location}</span>, where time moves to the rhythm of ancestral wisdom...
                    </p>
                  )}
                  {profile.craft && (
                    <p className="text-sm opacity-90">
                      Each thread in her <span className="font-medium">{profile.craft}</span> tells a story that began long before her birth...
                    </p>
                  )}
                  <div className="pt-2 text-xs opacity-75">
                    ✨ AI-generated based on your inputs
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 rounded-lg p-8 text-center text-white/70">
                  <Wand2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">
                    Start filling in your details to see your story come alive
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArtisanProfile;