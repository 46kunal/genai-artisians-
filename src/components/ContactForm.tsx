import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    inquiryType: 'general'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For demo purposes, we'll show a success message
      // In a real app, this would submit to the inquiries table
      toast({
        title: "Message sent! ✨",
        description: "Thank you for reaching out. We'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        message: '',
        inquiryType: 'general'
      });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Connect with Our Artisans
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about a piece? Want to commission something special? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="shadow-gentle">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Send a Message
              </CardTitle>
              <CardDescription>
                Reach out to our artisan community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiry-type">What's this about?</Label>
                  <Select value={formData.inquiryType} onValueChange={(value) => handleChange('inquiryType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Question</SelectItem>
                      <SelectItem value="commission">Custom Commission</SelectItem>
                      <SelectItem value="purchase">Purchase Inquiry</SelectItem>
                      <SelectItem value="collaboration">Collaboration</SelectItem>
                      <SelectItem value="workshop">Workshop Interest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us about your interest, questions, or ideas..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    "Sending your message..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Testimonials */}
          <div className="space-y-6">
            <Card className="shadow-gentle">
              <CardHeader>
                <CardTitle className="text-xl">Why Connect with Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Authentic Craftsmanship</h4>
                    <p className="text-sm text-muted-foreground">Every piece tells a story of generations-old traditions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Personal Connection</h4>
                    <p className="text-sm text-muted-foreground">Work directly with the artisan behind each creation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-card-foreground">Custom Commissions</h4>
                    <p className="text-sm text-muted-foreground">Bring your vision to life with bespoke pieces</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-gentle bg-gradient-to-br from-primary-soft/20 to-secondary-soft/20">
              <CardContent className="p-6">
                <blockquote className="text-center">
                  <p className="text-card-foreground italic mb-4">
                    "Working with this artisan was like stepping into a world where time slows down and beauty takes precedence. The attention to detail and the story behind each piece made our collaboration truly special."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — Sarah Chen, Interior Designer
                  </footer>
                </blockquote>
              </CardContent>
            </Card>

            <Card className="shadow-gentle bg-gradient-to-br from-accent-soft/20 to-earth-soft/20">
              <CardContent className="p-6">
                <blockquote className="text-center">
                  <p className="text-card-foreground italic mb-4">
                    "The commission process was seamless and personal. I felt connected to the centuries-old traditions while watching my modern vision come to life."
                  </p>
                  <footer className="text-sm text-muted-foreground">
                    — Marcus Rodriguez, Art Collector
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;