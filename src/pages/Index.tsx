import Hero from "@/components/Hero";
import ArtisanProfile from "@/components/ArtisanProfile";
import ProductShowcase from "@/components/ProductShowcase";
import SocialPreview from "@/components/SocialPreview";
import ContactForm from "@/components/ContactForm";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ArtisanProfile />
      <ProductShowcase />
      <SocialPreview />
      <TestimonialsSection />
      <ContactForm />
    </div>
  );
};

export default Index;