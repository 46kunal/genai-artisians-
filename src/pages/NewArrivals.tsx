// src/pages/NewArrivals.tsx
import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Info, MapPin, Eye, Heart, ShoppingBag, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// --- Mock API Call ---
const fetchNewArrivals = async () => {
  return [
    { name: 'Kalamkari Hand-Painted Pillow Cover', category: 'Textiles & Handloom', price: 950, tags: ['Hand-painted', 'Home Decor', 'Cotton'], location: 'Srikalahasti', imageUrl: 'https://placehold.co/600x400/a38b8b/ffffff?text=Kalamkari+Pillow+Cover', rating: 4.8, artisan: 'Shweta Deshmukh', artisanId: 'artisan_1', isNew: true, description: 'A beautifully hand-painted pillow cover featuring traditional Kalamkari motifs.' },
    { name: 'Wooden Puzzle Box', category: 'Handicrafts & Home Décor', price: 800, tags: ['Wood', 'Toy', 'Handmade'], location: 'Channapatna', imageUrl: 'https://placehold.co/600x400/9b9b9b/ffffff?text=Wooden+Puzzle+Box', rating: 4.6, artisan: 'Anand Kumar', artisanId: 'artisan_2', isNew: true, description: 'A handcrafted wooden puzzle box, perfect for gifts and decor.' },
    { name: 'Dokra Fish Wall Art', category: 'Metalware', price: 3500, tags: ['Metalwork', 'Casting', 'Wall Art'], location: 'Nagpur', imageUrl: 'https://placehold.co/600x400/e6e6fa/000000?text=Dokra+Fish+Art', rating: 4.7, artisan: 'Jitendra Singh', artisanId: 'artisan_3', isNew: true, description: 'A unique Dokra fish wall art piece, crafted using the ancient lost-wax technique.' },
    { name: 'Miniature Elephant Painting', category: 'Handicrafts & Home Décor', price: 4200, tags: ['Painting', 'Miniature', 'Silk'], location: 'Udaipur', imageUrl: 'https://placehold.co/600x400/d1c4e9/000000?text=Miniature+Elephant', rating: 4.9, artisan: 'Kavita Singh', artisanId: 'artisan_4', isNew: false, description: 'An intricate miniature painting of a royal elephant on silk.' },
    { name: 'Bhuj Pottery Jug', category: 'Pottery & Terracotta', price: 1500, tags: ['Pottery', 'Clay', 'Kitchen'], location: 'Bhuj', imageUrl: 'https://placehold.co/600x400/b0bec5/000000?text=Bhuj+Pottery+Jug', rating: 4.8, artisan: 'Rahul Desai', artisanId: 'artisan_5', isNew: false, description: 'A traditional pottery jug from Bhuj, handcrafted with a distinct style.' },
    { name: 'Blue Pottery Jar with Lid', category: 'Pottery & Terracotta', price: 1100, tags: ['Pottery', 'Ceramic', 'Home Decor'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/add8e6/000000?text=Blue+Pottery+Jar', rating: 4.5, artisan: 'Priya Sharma', artisanId: 'artisan_6', isNew: false, description: 'A beautiful Blue Pottery jar with a lid, hand-painted with traditional designs.' },
    { name: 'Sanjhi Paper Mandala', category: 'Handicrafts & Home Décor', price: 2300, tags: ['Paper Art', 'Decor', 'Handmade'], location: 'Mathura', imageUrl: 'https://placehold.co/600x400/e0d9b4/000000?text=Sanjhi+Paper+Mandala', rating: 4.6, artisan: 'Laxmi Devi', artisanId: 'artisan_7', isNew: false, description: 'A delicate and intricate Sanjhi paper-cut mandala, ideal for wall decoration.' },
    { name: 'Chanderi Handloom Scarf', category: 'Textiles & Handloom', price: 2100, tags: ['Silk', 'Handloom', 'Scarf'], location: 'Chanderi', imageUrl: 'https://placehold.co/600x400/e0d8c2/000000?text=Chanderi+Scarf', rating: 4.7, artisan: 'Sanjay Kulkarni', artisanId: 'artisan_8', isNew: false, description: 'A soft Chanderi handloom scarf with a lightweight, elegant drape.' },
  ];
};

const ComingSoonProducts = [
  { name: 'Hand-Embroidered Velvet Clutch', category: 'Jewellery & Accessories', tags: ['Embroidery', 'Velvet', 'Luxury'], location: 'Lucknow', imageUrl: 'https://placehold.co/600x400/d4b483/000000?text=Velvet+Clutch', artisan: 'Ayesha Khan' },
  { name: 'Copper Etched Water Bottle', category: 'Metalware', tags: ['Metalwork', 'Copper', 'Utility'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/b97d52/ffffff?text=Copper+Bottle', artisan: 'Jitendra Singh' },
  { name: 'Traditional Warli Mug Set', category: 'Pottery & Terracotta', tags: ['Ceramics', 'Folk Art', 'Handmade'], location: 'Palghar', imageUrl: 'https://placehold.co/600x400/ffe4e1/000000?text=Warli+Mug+Set', artisan: 'Sanjay Kulkarni' },
];

const ProductCard = ({ product, onQuickView, onAddToCart, onAddToWishlist }) => {
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    onAddToWishlist(product);
    toast({
      title: "Wishlisted! ❤️",
      description: `${product.name} has been saved to your wishlist.`,
    });
  };

  return (
    <Card onClick={() => onQuickView(product)} className="relative overflow-hidden shadow-gentle hover:shadow-craft transition-shadow duration-300 cursor-pointer group">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      {product.isNew && (
        <Badge className="absolute top-2 left-2 bg-accent/90 text-primary-foreground font-bold">New</Badge>
      )}
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm">{product.category}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary-soft/30">{tag}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {product.rating ? (
            <>
              {Array(Math.floor(product.rating)).fill(0).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">{product.rating.toFixed(1)}</span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground">Rating coming soon</span>
          )}
        </div>
        {product.price && (
          <div className="text-accent font-bold mt-2">₹{product.price.toLocaleString("en-IN")}</div>
        )}
        <p className="text-muted-foreground text-xs mt-1">
          Artisan: <Link to={`/artisans/${product.artisanId}`} className="text-primary-foreground hover:underline">{product.artisan}</Link>
        </p>
      </CardContent>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-4">
          <Button variant="outline" size="icon" onClick={handleAddToWishlist}>
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onQuickView(product)}>
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ComingSoonCard = ({ product }) => (
  <Card className="overflow-hidden shadow-gentle w-full h-80 flex-none bg-cover bg-center relative group" style={{ backgroundImage: `url(${product.imageUrl})` }}>
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-end">
      <CardContent className="p-6 w-full text-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Coming Soon
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-white/80 mt-2 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {product.location}
        </p>
      </CardContent>
    </div>
  </Card>
);

const NewArrivals = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    categories: [],
    price: [],
    location: [],
  });
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    fetchNewArrivals().then(data => {
      setAllProducts(data);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalScrollHeight = 200; // Adjust this value to change fade distance
      const newOpacity = 1 - Math.min(1, scrollPosition / totalScrollHeight);
      setScrollOpacity(newOpacity);
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyFilters = useCallback(() => {
    let updatedProducts = [...allProducts];

    if (filters.categories.length > 0) {
      updatedProducts = updatedProducts.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.price.length > 0) {
      updatedProducts = updatedProducts.filter(product => {
        return filters.price.some(range => {
          const [min, max] = range.split("-").map(Number);
          const maxVal = max || Infinity;
          return product.price >= min && product.price <= maxVal;
        });
      });
    }

    if (filters.location.length > 0) {
      updatedProducts = updatedProducts.filter(product =>
        filters.location.includes(product.location)
      );
    }

    switch (sortBy) {
      case "price-asc":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        updatedProducts.sort((a, b) => (b.isNew - a.isNew) || (a.name.localeCompare(b.name)));
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [allProducts, filters, sortBy]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleFilterChange = (type, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      const index = newFilters[type].indexOf(value);
      if (index > -1) {
        newFilters[type].splice(index, 1);
      } else {
        newFilters[type].push(value);
      }
      return newFilters;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      categories: [],
      price: [],
      location: [],
    });
    setSortBy("relevance");
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const handleAddToCart = (product) => {
    console.log(`Adding ${product.name} to cart.`);
  };

  const handleAddToWishlist = (product) => {
    console.log(`Adding ${product.name} to wishlist.`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Horizontal Filter & Sort Bar */}
      <motion.div
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm transition-shadow duration-300"
        style={{ opacity: scrollOpacity }}
      >
        <Card className="shadow-none border-0 rounded-none w-full py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              Filter & Sort
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <Label htmlFor="sort-by" className="text-sm font-medium">Sort By:</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Filter Popovers */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Categories
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 space-y-2">
                {[ 'Handicrafts & Home Décor', 'Textiles & Handloom', 'Pottery & Terracotta', 'Metalware', 'Jewellery & Accessories', 'Handwoven & Natural Products' ].map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category.replace(/[^a-zA-Z0-9]/g, '')}`}
                      value={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleFilterChange('categories', category)}
                    />
                    <Label htmlFor={`cat-${category.replace(/[^a-zA-Z0-9]/g, '')}`}>{category}</Label>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Price
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 space-y-2">
                {[{ label: '₹0 - ₹1,000', value: '0-1000' }, { label: '₹1,001 - ₹3,000', value: '1001-3000' }, { label: '₹3,001 - ₹5,000', value: '3001-5000' }, { label: '₹5,001+', value: '5001-999999' }].map(price => (
                  <div key={price.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`price-${price.value}`}
                      value={price.value}
                      checked={filters.price.includes(price.value)}
                      onCheckedChange={() => handleFilterChange('price', price.value)}
                    />
                    <Label htmlFor={`price-${price.value}`}>{price.label}</Label>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Location
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-2 space-y-2">
                {['Srikalahasti', 'Channapatna', 'Nagpur', 'Udaipur', 'Bhuj', 'Jaipur', 'Mathura', 'Chanderi'].map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`loc-${location}`}
                      value={location}
                      checked={filters.location.includes(location)}
                      onCheckedChange={() => handleFilterChange('location', location)}
                    />
                    <Label htmlFor={`loc-${location}`}>{location}</Label>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
            <Button onClick={handleResetFilters} variant="ghost" className="text-sm">Reset</Button>
          </div>
        </Card>
      </motion.div>
      <div className="flex flex-col gap-8">
        <main className="w-full space-y-12">
          <section>
            <Card className="shadow-gentle bg-gradient-to-br from-primary-soft/50 to-accent-soft/50 animate-in fade-in-0 slide-in-from-top-10 duration-1000">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-foreground">New Arrivals</CardTitle>
              </CardHeader>
              <CardContent className="py-4">
                <p className="text-center text-muted-foreground">
                  Discover the latest handcrafted treasures added to our collection.
                </p>
              </CardContent>
            </Card>
          </section>
          <section className="py-8 bg-card rounded-lg shadow-gentle">
            <h3 className="text-xl font-bold text-center text-primary mb-6">Coming Soon!</h3>
            <Carousel
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                }),
              ]}
            >
              <CarouselContent className="-ml-4">
                {ComingSoonProducts.map((product, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <ComingSoonCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>
          <section>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <motion.div key={product.name} variants={itemVariants}>
                    <ProductCard
                      product={product}
                      onQuickView={handleQuickView}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-muted-foreground col-span-full">No new arrivals found matching your filters.</p>
              )}
            </motion.div>
          </section>
        </main>
      </div>
      <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
        {selectedProduct && (
          <DialogContent className="sm:max-w-xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="flex flex-col md:flex-row items-start gap-4">
              <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full md:w-1/2 rounded-md object-cover" />
              <div className="flex-1 space-y-4 pt-4 md:pt-0">
                <DialogTitle className="text-3xl font-bold">{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-1">
                    {Array(Math.floor(selectedProduct.rating)).fill(0).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">{selectedProduct.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-2xl font-bold text-accent mt-2">₹{selectedProduct.price.toLocaleString("en-IN")}</p>
                </DialogDescription>
                <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary-soft/30">{tag}</Badge>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <Button onClick={() => { handleAddToCart(selectedProduct); setIsProductDialogOpen(false); }} className="w-full">Add to Cart</Button>
                  <Button variant="outline" className="w-full mt-2">Contact Artisan</Button>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default NewArrivals;