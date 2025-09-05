// src/pages/products.tsx
import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Info, MapPin, Filter, ChevronDown, ShoppingCart, Heart, ArrowUp, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from "@/components/ui/use-toast";

const allProducts = [
  { name: 'Warli Art Painting', category: 'Handicrafts & Home Décor', price: 1500, tags: ['Folk Art', 'Painting', 'Handmade'], location: 'Palghar', imageUrl: 'https://placehold.co/600x400/ffe4e1/000000?text=Warli+Art', rating: 4.5, artisan: 'Sanjay Kulkarni', description: 'A beautiful Warli painting depicting a traditional village scene, hand-painted on canvas.', isNew: false },
  { name: 'Kolhapuri Chappals', category: 'Textiles & Handloom', price: 850, tags: ['Leather', 'Footwear', 'Traditional'], location: 'Kolhapur', imageUrl: 'https://placehold.co/600x400/f0f9ff/000000?text=Kolhapuri+Chappal', rating: 4.8, artisan: 'Shweta Deshmukh', description: 'Handcrafted Kolhapuri chappals made from authentic leather, perfect for ethnic wear.', isNew: false },
  { name: 'Paithani Saree', category: 'Textiles & Handloom', price: 12000, tags: ['Silk', 'Handloom', 'Saree'], location: 'Paithan', imageUrl: 'https://placehold.co/600x400/fffbe0/000000?text=Paithani+Saree', rating: 5.0, artisan: 'Rekha Patil', description: 'An exquisite silk Paithani saree with traditional peacock motifs, woven with love and care.', isNew: false },
  { name: 'Bidriware Pot', category: 'Handicrafts & Home Décor', price: 4500, tags: ['Metalwork', 'Inlay', 'Decor'], location: 'Aurangabad', imageUrl: 'https://placehold.co/600x400/f0fdf4/000000?text=Bidriware', rating: 4.2, artisan: 'Jitendra Singh', description: 'A handcrafted Bidriware pot, made from zinc and copper with intricate silver inlay work.', isNew: false },
  { name: 'Thanjavur Painting', category: 'Handicrafts & Home Décor', price: 7000, tags: ['Painting', 'Gold Leaf', 'Religious'], location: 'Thanjavur', imageUrl: 'https://placehold.co/600x400/d1c4e9/000000?text=Thanjavur', rating: 4.7, artisan: 'Laxmi Devi', description: 'A divine Thanjavur painting adorned with gold leaf and semi-precious stones.', isNew: false },
  { name: 'Pichwai Painting', category: 'Handicrafts & Home Décor', price: 6500, tags: ['Painting', 'Krishna', 'Decor'], location: 'Nathdwara', imageUrl: 'https://placehold.co/600x400/e3f2fd/000000?text=Pichwai', rating: 4.6, artisan: 'Laxmi Devi', description: 'A beautiful Pichwai painting depicting stories of Lord Krishna, hand-painted on cloth.', isNew: false },
  { name: 'Jaipuri Quilt', category: 'Textiles & Handloom', price: 3000, tags: ['Textile', 'Quilt', 'Block Print'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/fbe9e7/000000?text=Jaipuri+Quilt', rating: 4.9, artisan: 'Shweta Deshmukh', description: 'A soft and cozy Jaipuri quilt with a traditional block print design, perfect for a comfortable night’s sleep.', isNew: false },
  { name: 'Kalamkari Fabric', category: 'Textiles & Handloom', price: 900, tags: ['Textile', 'Hand-painted', 'Fabric'], location: 'Srikalahasti', imageUrl: 'https://placehold.co/600x400/f0f4c3/000000?text=Kalamkari', rating: 4.1, artisan: 'Shweta Deshmukh', description: 'A hand-painted Kalamkari fabric piece, ideal for creating custom clothing or decor.', isNew: false },
  { name: 'Dokra Art', category: 'Handicrafts & Home Décor', price: 2500, tags: ['Metalwork', 'Casting', 'Figurine'], location: 'Bastar', imageUrl: 'https://placehold.co/600x400/e8f5e9/000000?text=Dokra+Art', rating: 4.3, artisan: 'Jitendra Singh', description: 'A traditional Dokra metal art figurine, crafted using the ancient lost-wax technique.', isNew: false },
  { name: 'Blue Pottery', category: 'Handicrafts & Home Décor', price: 500, tags: ['Pottery', 'Ceramic', 'Handmade'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/e1f5fe/000000?text=Blue+Pottery', rating: 4.4, artisan: 'Priya Sharma', description: 'A beautifully hand-painted Blue Pottery bowl with intricate floral patterns.', isNew: false },
  { name: 'Lac Bangles', category: 'Jewellery & Accessories', price: 350, tags: ['Jewellery', 'Bangles', 'Traditional'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/f3e5f5/000000?text=Lac+Bangles', rating: 4.0, artisan: 'Priya Sharma', description: 'Vibrant and traditional lac bangles, adorned with delicate stone work.', isNew: false },
  { name: 'Meenakari Earrings', category: 'Jewellery & Accessories', price: 1200, tags: ['Jewellery', 'Enamel', 'Earrings'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/f9fbe7/000000?text=Meenakari', rating: 4.7, artisan: 'Priya Sharma', description: 'Elegant Meenakari earrings, showcasing detailed enamel work and a classic design.', isNew: false },
  { name: 'Gond Painting', category: 'Handicrafts & Home Décor', price: 2000, tags: ['Folk Art', 'Painting', 'Aboriginal'], location: 'Bhopal', imageUrl: 'https://placehold.co/600x400/fce4ec/000000?text=Gond+Art', rating: 4.5, artisan: 'Anand Kumar', description: 'A colorful Gond painting on canvas, depicting tribal life and nature in an abstract style.', isNew: false },
  { name: 'Phulkari Dupatta', category: 'Textiles & Handloom', price: 1800, tags: ['Embroidery', 'Dupatta', 'Traditional'], location: 'Patiala', imageUrl: 'https://placehold.co/600x400/d4e157/000000?text=Phulkari', rating: 4.8, artisan: 'Rekha Patil', description: 'A vibrant Phulkari dupatta with rich embroidery, a symbol of joy and celebration.', isNew: false },
  { name: 'Chanderi Saree', category: 'Textiles & Handloom', price: 5000, tags: ['Silk', 'Cotton', 'Handloom'], location: 'Chanderi', imageUrl: 'https://placehold.co/600x400/b2dfdb/000000?text=Chanderi', rating: 4.6, artisan: 'Sanjay Kulkarni', description: 'A lightweight and elegant Chanderi saree, known for its sheer texture and fine weaves.', isNew: false },
  { name: 'Dhokra Figurines', category: 'Handicrafts & Home Décor', price: 3000, tags: ['Metalwork', 'Casting', 'Figurine'], location: 'Nagpur', imageUrl: 'https://placehold.co/600x400/c5cae9/000000?text=Dhokra+Figurines', rating: 4.5, artisan: 'Jitendra Singh', description: 'Intricately crafted Dokra figurines, each one a unique piece of folk metal art.', isNew: false },
  { name: 'Rogan Painting', category: 'Handicrafts & Home Décor', price: 2500, tags: ['Painting', 'Castor Oil', 'Fabric'], location: 'Kutch', imageUrl: 'https://placehold.co/600x400/f8bbd0/000000?text=Rogan+Art', rating: 4.9, artisan: 'Anand Kumar', description: 'A beautiful Rogan painting on fabric, created using a thick, slow-drying paste made from castor oil.', isNew: false },
  { name: 'Sanjhi Paper Cutting', category: 'Handicrafts & Home Décor', price: 1800, tags: ['Paper Art', 'Cutting', 'Decor'], location: 'Mathura', imageUrl: 'https://placehold.co/600x400/ffecb3/000000?text=Sanjhi+Art', rating: 4.2, artisan: 'Laxmi Devi', description: 'A delicate Sanjhi paper cutting art piece, depicting scenes from Hindu mythology with precision and detail.', isNew: false },
  { name: 'Kansa Dinner Set', category: 'Handicrafts & Home Décor', price: 9000, tags: ['Metalwork', 'Bronze', 'Dinnerware'], location: 'Moradabad', imageUrl: 'https://placehold.co/600x400/b0bec5/000000?text=Kansa+Set', rating: 4.7, artisan: 'Jitendra Singh', description: 'A traditional Kansa dinner set, believed to have health benefits and a beautiful rustic charm.', isNew: false },
  { name: 'Patachitra Painting', category: 'Handicrafts & Home Décor', price: 4500, tags: ['Painting', 'Cloth-based', 'Narrative'], location: 'Puri', imageUrl: 'https://placehold.co/600x400/e6ee9c/000000?text=Patachitra', rating: 4.4, artisan: 'Manish Kumar', description: 'A traditional Patachitra painting on cloth, telling stories from the Hindu epics.', isNew: false },
  { name: 'Metal Musical Instruments', category: 'Musical Instruments', price: 3500, tags: ['Metal', 'Instrument', 'Wind'], location: 'Moradabad', imageUrl: 'https://placehold.co/600x400/cfd8dc/000000?text=Musical+Instrument', rating: 4.8, artisan: 'Jitendra Singh', description: 'A set of handcrafted metal musical instruments, perfect for traditional music.', isNew: false },
  { name: 'Mango Pickle', category: 'Traditional Food & Beverages', price: 150, tags: ['Food', 'Preserve', 'Spicy'], location: 'Mumbai', imageUrl: 'https://placehold.co/600x400/ffcc80/000000?text=Mango+Pickle', rating: 4.1, artisan: 'Shweta Deshmukh', description: 'A spicy and tangy mango pickle, homemade with traditional Konkan spices.', isNew: false },
  { name: 'Wooden Toy Car', category: 'Handwoven & Natural Products', price: 600, tags: ['Wood', 'Toy', 'Handmade'], location: 'Channapatna', imageUrl: 'https://placehold.co/600x400/d8c199/000000?text=Wooden+Toy', rating: 4.6, artisan: 'Anand Kumar', description: 'A vibrant and colorful wooden toy car, made from safe, non-toxic lacquer.', isNew: false },
  { name: 'Kalamkari Pen Stand', category: 'Handicrafts & Home Décor', price: 400, tags: ['Hand-painted', 'Decor', 'Stationery'], location: 'Srikalahasti', imageUrl: 'https://placehold.co/600x400/8d8d8d/000000?text=Pen+Stand', rating: 4.3, artisan: 'Shweta Deshmukh', description: 'A unique Kalamkari pen stand, hand-painted with intricate details.', isNew: false },
  { name: 'Brass Ganesh Idol', category: 'Metalware', price: 2500, tags: ['Metalwork', 'Idol', 'Religious'], location: 'Moradabad', imageUrl: 'https://placehold.co/600x400/e6a555/000000?text=Brass+Ganesh+Idol', rating: 4.9, artisan: 'Jitendra Singh', description: 'A beautifully sculpted Brass Ganesh Idol, perfect for your home altar or as a gift.', isNew: false },
  { name: 'Terracotta Vase', category: 'Pottery & Terracotta', price: 750, tags: ['Pottery', 'Clay', 'Decor'], location: 'Bastar', imageUrl: 'https://placehold.co/600x400/ac7b57/000000?text=Terracotta+Vase', rating: 4.7, artisan: 'Rekha Patil', description: 'A rustic terracotta vase with a traditional design, handcrafted by a skilled artisan.', isNew: false },
  { name: 'Pattachitra Wall Hanging', category: 'Handicrafts & Home Décor', price: 3500, tags: ['Painting', 'Cloth', 'Narrative'], location: 'Puri', imageUrl: 'https://placehold.co/600x400/9b9b9b/ffffff?text=Pattachitra+Wall+Hanging', rating: 4.6, artisan: 'Manish Kumar', description: 'A vibrant Pattachitra wall hanging depicting a mythological scene.', isNew: false },
  { name: 'Blue Enamel Bowl', category: 'Handicrafts & Home Décor', price: 800, tags: ['Pottery', 'Enamel', 'Bowl'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/4c7c9c/ffffff?text=Blue+Enamel+Bowl', rating: 4.4, artisan: 'Priya Sharma', description: 'A deep blue enamel bowl with intricate floral patterns, a classic piece of Jaipur Blue Pottery.', isNew: false },
  { name: 'Bamboo Flute', category: 'Musical Instruments', price: 450, tags: ['Bamboo', 'Flute', 'Music'], location: 'Guwahati', imageUrl: 'https://placehold.co/600x400/d1c9ac/000000?text=Bamboo+Flute', rating: 4.9, artisan: 'Ananya Roy', description: 'A lightweight bamboo flute, expertly crafted for a rich, melodious sound.', isNew: false },
  { name: 'Kalamkari Silk Scarf', category: 'Textiles & Handloom', price: 2200, tags: ['Silk', 'Scarf', 'Hand-painted'], location: 'Srikalahasti', imageUrl: 'https://placehold.co/600x400/e8e6d2/000000?text=Kalamkari+Silk+Scarf', rating: 4.7, artisan: 'Shweta Deshmukh', description: 'A delicate Kalamkari silk scarf, hand-painted with natural dyes.', isNew: false },
  { name: 'Brass Oil Lamp', category: 'Metalware', price: 1800, tags: ['Metalwork', 'Brass', 'Lamp'], location: 'Moradabad', imageUrl: 'https://placehold.co/600x400/a8a29e/ffffff?text=Brass+Oil+Lamp', rating: 4.8, artisan: 'Jitendra Singh', description: 'A traditional brass oil lamp, perfect for your puja room or as a decor piece.', isNew: false },
  { name: 'Gond Tree of Life', category: 'Handicrafts & Home Décor', price: 2800, tags: ['Folk Art', 'Painting', 'Nature'], location: 'Bhopal', imageUrl: 'https://placehold.co/600x400/9d7e7e/ffffff?text=Gond+Tree+of+Life', rating: 4.5, artisan: 'Anand Kumar', description: 'An intricate Gond painting of the Tree of Life, representing the interconnectedness of all things.', isNew: false },
  { name: 'Sanjhi Radha Krishna', category: 'Handicrafts & Home Décor', price: 2500, tags: ['Paper Art', 'Cutting', 'Religious'], location: 'Mathura', imageUrl: 'https://placehold.co/600x400/b8b8b8/000000?text=Sanjhi+Radha+Krishna', rating: 4.3, artisan: 'Laxmi Devi', description: 'A detailed Sanjhi paper cutting depicting Radha and Krishna, perfect for a spiritual atmosphere.', isNew: false },
  { name: 'Channapatna Wooden Dolls', category: 'Handwoven & Natural Products', price: 950, tags: ['Wood', 'Toy', 'Dolls'], location: 'Channapatna', imageUrl: 'https://placehold.co/600x400/d9b48c/000000?text=Wooden+Dolls', rating: 4.6, artisan: 'Anand Kumar', description: 'A set of colorful Channapatna wooden dolls, made with eco-friendly lacquer.', isNew: false },
  { name: 'Bidriware Coasters', category: 'Handicrafts & Home Décor', price: 1500, tags: ['Metalwork', 'Inlay', 'Home Decor'], location: 'Aurangabad', imageUrl: 'https://placehold.co/600x400/8d8d8d/ffffff?text=Bidriware+Coasters', rating: 4.4, artisan: 'Jitendra Singh', description: 'A set of Bidriware coasters with elegant silver inlay, a perfect blend of tradition and modern utility.', isNew: false },
  { name: 'Pattachitra Folk Stories', category: 'Handicrafts & Home Décor', price: 4200, tags: ['Painting', 'Cloth', 'Folk'], location: 'Puri', imageUrl: 'https://placehold.co/600x400/d6a361/000000?text=Pattachitra+Folk+Stories', rating: 4.8, artisan: 'Manish Kumar', description: 'A vibrant Pattachitra painting narrating a classic folk story on a palm leaf.', isNew: false },
  { name: 'Bamboo Basket Set', category: 'Handicrafts & Home Décor', price: 700, tags: ['Bamboo', 'Basketry', 'Handmade'], location: 'Tripura', imageUrl: 'https://placehold.co/600x400/c7a77e/000000?text=Bamboo+Basket+Set', rating: 4.1, artisan: 'Ananya Roy', description: 'A set of handwoven bamboo baskets, perfect for storage or as decorative items.', isNew: false },
  { name: 'Terracotta Ganesha Idol', category: 'Pottery & Terracotta', price: 1100, tags: ['Pottery', 'Clay', 'Religious'], location: 'Paithan', imageUrl: 'https://placehold.co/600x400/d9b3a3/000000?text=Terracotta+Ganesha+Idol', rating: 4.9, artisan: 'Rekha Patil', description: 'A beautifully sculpted Ganesha idol, hand-molded from natural terracotta clay.', isNew: false },
  { name: 'Meenakari Wall Plate', category: 'Handicrafts & Home Décor', price: 3200, tags: ['Enamel', 'Decor', 'Wall Art'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/805d76/ffffff?text=Meenakari+Wall+Plate', rating: 4.6, artisan: 'Priya Sharma', description: 'An intricately designed Meenakari wall plate with colorful enamel work, a perfect wall decor.', isNew: false },
  { name: 'Dokra Elephant Figurine', category: 'Handicrafts & Home Décor', price: 2900, tags: ['Metalwork', 'Casting', 'Figurine'], location: 'Nagpur', imageUrl: 'https://placehold.co/600x400/b09289/ffffff?text=Dokra+Elephant+Figurine', rating: 4.5, artisan: 'Jitendra Singh', description: 'A majestic Dokra elephant figurine, crafted with great attention to detail.', isNew: false },
  { name: 'Jaipuri Printed Bedspread', category: 'Textiles & Handloom', price: 4500, tags: ['Textile', 'Bedspread', 'Block Print'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/ffcdb2/000000?text=Jaipuri+Bedspread', rating: 4.8, artisan: 'Shweta Deshmukh', description: 'A vibrant Jaipuri bedspread with hand-printed motifs, bringing a touch of Rajasthan to your bedroom.', isNew: false },
  { name: 'Gond Peacock Painting', category: 'Handicrafts & Home Décor', price: 2700, tags: ['Folk Art', 'Painting', 'Nature'], location: 'Bhopal', imageUrl: 'https://placehold.co/600x400/a3ccab/000000?text=Gond+Peacock+Painting', rating: 4.7, artisan: 'Anand Kumar', description: 'A stunning Gond painting of a peacock, symbolizing beauty and spirituality.', isNew: false },
  { name: 'Kalamkari Block Print Saree', category: 'Textiles & Handloom', price: 8500, tags: ['Silk', 'Handloom', 'Saree'], location: 'Srikalahasti', imageUrl: 'https://placehold.co/600x400/f5efc9/000000?text=Kalamkari+Saree', rating: 4.9, artisan: 'Shweta Deshmukh', description: 'An elegant Kalamkari saree with a block-printed design, a perfect blend of tradition and style.', isNew: false },
  { name: 'Brass Nandi Idol', category: 'Metalware', price: 4000, tags: ['Metalwork', 'Brass', 'Religious'], location: 'Moradabad', imageUrl: 'https://placehold.co/600x400/b59489/ffffff?text=Brass+Nandi+Idol', rating: 4.9, artisan: 'Jitendra Singh', description: 'A detailed brass Nandi idol, a traditional representation of divine devotion.', isNew: false },
  { name: 'Rogan Tree of Life', category: 'Handicrafts & Home Décor', price: 3800, tags: ['Painting', 'Castor Oil', 'Fabric'], location: 'Kutch', imageUrl: 'https://placehold.co/600x400/8f7762/ffffff?text=Rogan+Tree+of+Life', rating: 4.8, artisan: 'Anand Kumar', description: 'A mesmerizing Rogan painting of the Tree of Life, a unique folk art from Kutch.', isNew: false },
  { name: 'Sanjhi Lotus Lamp', category: 'Handicrafts & Home Décor', price: 2100, tags: ['Paper Art', 'Cutting', 'Lighting'], location: 'Mathura', imageUrl: 'https://placehold.co/600x400/e0d9b4/000000?text=Sanjhi+Lotus+Lamp', rating: 4.4, artisan: 'Laxmi Devi', description: 'A delicate Sanjhi paper lantern, hand-cut from paper and lit from within to create a beautiful ambiance.', isNew: false },
  { name: 'Thanjavur Ganesha Painting', category: 'Handicrafts & Home Décor', price: 9500, tags: ['Painting', 'Gold Leaf', 'Religious'], location: 'Thanjavur', imageUrl: 'https://placehold.co/600x400/f5f5dc/000000?text=Thanjavur+Ganesha', rating: 4.9, artisan: 'Laxmi Devi', description: 'A stunning Thanjavur painting of Lord Ganesha, featuring intricate gold leaf and vibrant colors.', isNew: false },
  { name: 'Kolhapuri Silver Necklace', category: 'Jewellery & Accessories', price: 2800, tags: ['Jewellery', 'Silver', 'Necklace'], location: 'Kolhapur', imageUrl: 'https://placehold.co/600x400/d7d7d7/000000?text=Kolhapuri+Silver+Necklace', rating: 4.7, artisan: 'Priya Sharma', description: 'A classic Kolhapuri silver necklace, with intricate designs inspired by local culture.', isNew: false },
  { name: 'Warli Village Scene', category: 'Handicrafts & Home Décor', price: 1800, tags: ['Folk Art', 'Painting', 'Handmade'], location: 'Palghar', imageUrl: 'https://placehold.co/600x400/e9e3c9/000000?text=Warli+Village+Scene', rating: 4.6, artisan: 'Sanjay Kulkarni', description: 'A detailed Warli painting depicting the daily life of a village in Maharashtra.', isNew: false },
  { name: 'Channapatna Wooden Train Set', category: 'Handwoven & Natural Products', price: 1200, tags: ['Wood', 'Toy', 'Handmade'], location: 'Channapatna', imageUrl: 'https://placehold.co/600x400/b88b4a/000000?text=Wooden+Train+Set', rating: 4.7, artisan: 'Anand Kumar', description: 'A beautifully crafted wooden train set from Channapatna, perfect for kids.', isNew: false },
  { name: 'Patachitra Mahabharata Scene', category: 'Handicrafts & Home Décor', price: 5500, tags: ['Painting', 'Cloth-based', 'Narrative'], location: 'Puri', imageUrl: 'https://placehold.co/600x400/a39595/ffffff?text=Patachitra+Mahabharata+Scene', rating: 4.8, artisan: 'Manish Kumar', description: 'An epic Patachitra painting depicting a scene from the Mahabharata.', isNew: false },
  { name: 'Clay Serving Bowl', category: 'Pottery & Terracotta', price: 650, tags: ['Pottery', 'Ceramics', 'Handmade'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/c2c2c2/000000?text=Clay+Serving+Bowl', rating: 4.5, artisan: 'Sunita Verma', description: 'A simple yet elegant clay serving bowl, hand-shaped and fired to perfection.', isNew: false },
  { name: 'Hand-Painted Ceramic Mug', category: 'Pottery & Terracotta', price: 450, tags: ['Pottery', 'Ceramics', 'Handmade'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/f3f3f3/000000?text=Hand-Painted+Ceramic+Mug', rating: 4.6, artisan: 'Sunita Verma', description: 'A vibrant hand-painted ceramic mug, perfect for your morning coffee.', isNew: false },
  { name: 'Terracotta Bell Wind Chime', category: 'Pottery & Terracotta', price: 800, tags: ['Pottery', 'Clay', 'Decor'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/e9d0b6/000000?text=Terracotta+Wind+Chime', rating: 4.7, artisan: 'Sunita Verma', description: 'A soothing terracotta wind chime, hand-molded for a gentle, melodic sound.', isNew: false },
  { name: 'Metal Embossed Tray', category: 'Metalware', price: 3200, tags: ['Metalwork', 'Embossed', 'Decor'], location: 'Moradabad', imageUrl: 'https://placehold.co/600x400/c0c0c0/000000?text=Metal+Embossed+Tray', rating: 4.5, artisan: 'Jitendra Singh', description: 'An ornate metal embossed tray, perfect for serving guests or as a decorative piece.', isNew: false },
  { name: 'Meenakari Jhumkas', category: 'Jewellery & Accessories', price: 1500, tags: ['Jewellery', 'Enamel', 'Earrings'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/f8c8dc/000000?text=Meenakari+Jhumkas', rating: 4.8, artisan: 'Priya Sharma', description: 'Traditional Meenakari jhumkas with colorful enamel work, a timeless accessory.', isNew: false },
  { name: 'Bamboo Serving Platter', category: 'Handwoven & Natural Products', price: 900, tags: ['Bamboo', 'Kitchen', 'Handmade'], location: 'Guwahati', imageUrl: 'https://placehold.co/600x400/d7e3a9/000000?text=Bamboo+Platter', rating: 4.4, artisan: 'Ananya Roy', description: 'A handwoven bamboo serving platter, perfect for a rustic dining experience.', isNew: false },
  { name: 'Chanderi Silk Stole', category: 'Textiles & Handloom', price: 2500, tags: ['Silk', 'Stole', 'Handloom'], location: 'Chanderi', imageUrl: 'https://placehold.co/600x400/e0d8c2/000000?text=Chanderi+Silk+Stole', rating: 4.6, artisan: 'Sanjay Kulkarni', description: 'A delicate Chanderi silk stole with a soft, sheer texture and a simple, elegant design.', isNew: false },
  { name: 'Warli Themed Coasters', category: 'Handicrafts & Home Décor', price: 500, tags: ['Folk Art', 'Handmade', 'Home Decor'], location: 'Palghar', imageUrl: 'https://placehold.co/600x400/ffefd5/000000?text=Warli+Coasters', rating: 4.3, artisan: 'Sanjay Kulkarni', description: 'A set of Warli themed coasters, hand-painted to bring a touch of folk art to your home.', isNew: false },
  { name: 'Patachitra Saree', category: 'Textiles & Handloom', price: 10000, tags: ['Painting', 'Cloth', 'Saree'], location: 'Puri', imageUrl: 'https://placehold.co/600x400/c7b299/000000?text=Patachitra+Saree', rating: 4.9, artisan: 'Manish Kumar', description: 'An exquisite Patachitra saree, hand-painted with mythological scenes.', isNew: false },
  { name: 'Pichwai Cow Painting', category: 'Handicrafts & Home Décor', price: 7500, tags: ['Painting', 'Krishna', 'Decor'], location: 'Nathdwara', imageUrl: 'https://placehold.co/600x400/e6e6fa/000000?text=Pichwai+Cow+Painting', rating: 4.8, artisan: 'Laxmi Devi', description: 'A beautiful Pichwai painting depicting a cow, a sacred symbol of Krishna.', isNew: false },
  { name: 'Sanjhi Paper Lantern', category: 'Handicrafts & Home Décor', price: 1900, tags: ['Paper Art', 'Cutting', 'Lighting'], location: 'Mathura', imageUrl: 'https://placehold.co/600x400/d0d0d0/000000?text=Sanjhi+Lantern', rating: 4.5, artisan: 'Laxmi Devi', description: 'A delicate Sanjhi paper lantern, intricately cut to create beautiful patterns when lit.', isNew: false },
  { name: 'Bamboo Pen Stand', category: 'Handicrafts & Home Décor', price: 300, tags: ['Bamboo', 'Stationery', 'Handmade'], location: 'Tripura', imageUrl: 'https://placehold.co/600x400/b8b8b8/000000?text=Bamboo+Pen+Stand', rating: 4.2, artisan: 'Ananya Roy', description: 'A handwoven bamboo pen stand, perfect for a natural touch to your workspace.', isNew: false },
  { name: 'Gond Deer Painting', category: 'Handicrafts & Home Décor', price: 2300, tags: ['Folk Art', 'Painting', 'Nature'], location: 'Bhopal', imageUrl: 'https://placehold.co/600x400/8d8d8d/000000?text=Gond+Deer+Painting', rating: 4.6, artisan: 'Anand Kumar', description: 'A vibrant Gond painting of a deer, symbolizing strength and grace in tribal art.', isNew: false },
  { name: 'Kolhapuri Silver Necklace', category: 'Jewellery & Accessories', price: 2800, tags: ['Jewellery', 'Silver', 'Necklace'], location: 'Kolhapur', imageUrl: 'https://placehold.co/600x400/d7d7d7/000000?text=Kolhapuri+Silver+Necklace', rating: 4.7, artisan: 'Priya Sharma', description: 'A classic Kolhapuri silver necklace, with intricate designs inspired by local culture.', isNew: false },
  { name: 'Miniature Palace Scene', category: 'Handicrafts & Home Décor', price: 6000, tags: ['Painting', 'Miniature', 'Royal'], location: 'Udaipur', imageUrl: 'https://placehold.co/600x400/f3e8ff/000000?text=Miniature+Palace+Scene', rating: 4.9, artisan: 'Kavita Singh', description: 'A breathtaking miniature painting depicting a royal palace scene from Udaipur.', isNew: false },
  { name: 'Hand-Painted Silk Bookmark', category: 'Handicrafts & Home Décor', price: 350, tags: ['Miniature', 'Painting', 'Silk'], location: 'Udaipur', imageUrl: 'https://placehold.co/600x400/e9e3c9/000000?text=Hand-Painted+Silk+Bookmark', rating: 4.5, artisan: 'Kavita Singh', description: 'A delicate hand-painted silk bookmark, perfect for any book lover.', isNew: false },
  { name: 'Rajasthani Miniature Art', category: 'Handicrafts & Home Décor', price: 4500, tags: ['Painting', 'Miniature', 'Nature'], location: 'Udaipur', imageUrl: 'https://placehold.co/600x400/d1c4e9/000000?text=Rajasthani+Miniature+Art', rating: 4.8, artisan: 'Kavita Singh', description: 'A vibrant Rajasthani miniature painting, showcasing the rich flora and fauna of the region.', isNew: false },
  { name: 'Blue Pottery Mug', category: 'Pottery & Terracotta', price: 550, tags: ['Pottery', 'Ceramic', 'Handmade'], location: 'Jaipur', imageUrl: 'https://placehold.co/600x400/add8e6/000000?text=Blue+Pottery+Mug', rating: 4.4, artisan: 'Priya Sharma', description: 'A unique Blue Pottery mug, hand-painted with traditional geometric patterns.', isNew: false },
  { name: 'Terracotta T-Light Holder', category: 'Pottery & Terracotta', price: 400, tags: ['Pottery', 'Clay', 'Decor'], location: 'Bhuj', imageUrl: 'https://placehold.co/600x400/a07a61/000000?text=Terracotta+T-Light+Holder', rating: 4.6, artisan: 'Rahul Desai', description: 'A rustic terracotta T-light holder, perfect for creating a cozy atmosphere.', isNew: false },
  { name: 'Hand-Painted Ceramic Plate', category: 'Pottery & Terracotta', price: 800, tags: ['Pottery', 'Ceramics', 'Handmade'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/f0f8ff/000000?text=Hand-Painted+Ceramic+Plate', rating: 4.5, artisan: 'Sunita Verma', description: 'A beautifully hand-painted ceramic plate with intricate designs.', isNew: false },
  { name: 'Clay Wind Chime', category: 'Pottery & Terracotta', price: 700, tags: ['Pottery', 'Clay', 'Decor'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/e6e6fa/000000?text=Clay+Wind+Chime', rating: 4.7, artisan: 'Sunita Verma', description: 'A soothing clay wind chime, handmade to create a beautiful sound.', isNew: false },
  { name: 'Bhuj Pottery Vase', category: 'Pottery & Terracotta', price: 1200, tags: ['Pottery', 'Clay', 'Decor'], location: 'Bhuj', imageUrl: 'https://placehold.co/600x400/a56c5e/000000?text=Bhuj+Pottery+Vase', rating: 4.8, artisan: 'Rahul Desai', description: 'A unique Bhuj pottery vase, showcasing the traditional clay art of Gujarat.', isNew: false },
  { name: 'Ceramic Planter', category: 'Pottery & Terracotta', price: 950, tags: ['Pottery', 'Ceramics', 'Decor'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/b4c4c8/000000?text=Ceramic+Planter', rating: 4.6, artisan: 'Sunita Verma', description: 'A beautiful ceramic planter, perfect for adding a touch of green to your home.', isNew: false },
  { name: 'Gujarat Terracotta Figurine', category: 'Pottery & Terracotta', price: 600, tags: ['Pottery', 'Clay', 'Handmade'], location: 'Bhuj', imageUrl: 'https://placehold.co/600x400/c7a77e/000000?text=Gujarat+Terracotta+Figurine', rating: 4.5, artisan: 'Rahul Desai', description: 'A traditional Gujarat terracotta figurine, handcrafted with great detail.', isNew: false },
  { name: 'Miniature Elephant on Silk', category: 'Handicrafts & Home Décor', price: 3800, tags: ['Painting', 'Miniature', 'Silk'], location: 'Udaipur', imageUrl: 'https://placehold.co/600x400/f3e8ff/000000?text=Miniature+Elephant', rating: 4.7, artisan: 'Kavita Singh', description: 'An intricate miniature painting of an elephant on silk, a symbol of royalty.', isNew: false },
  { name: 'Hand-painted wooden bird', category: 'Handwoven & Natural Products', price: 400, tags: ['Wood', 'Toy', 'Handmade'], location: 'Channapatna', imageUrl: 'https://placehold.co/600x400/e9e3c9/000000?text=Wooden+Bird', rating: 4.5, artisan: 'Anand Kumar', description: 'A colorful hand-painted wooden bird, perfect as a small gift or decor piece.', isNew: false },
  { name: 'Bhuj Traditional Terracotta Lamp', category: 'Pottery & Terracotta', price: 750, tags: ['Pottery', 'Clay', 'Lighting'], location: 'Bhuj', imageUrl: 'https://placehold.co/600x400/d7e3a9/000000?text=Terracotta+Lamp', rating: 4.8, artisan: 'Rahul Desai', description: 'A traditional Bhuj terracotta lamp, perfect for creating a warm and inviting atmosphere.', isNew: false },
  { name: 'Indore Ceramic Dinner Set', category: 'Pottery & Terracotta', price: 2500, tags: ['Pottery', 'Ceramics', 'Dinnerware'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/b7c9d1/000000?text=Ceramic+Dinner+Set', rating: 4.6, artisan: 'Sunita Verma', description: 'A beautifully crafted ceramic dinner set, hand-painted with traditional patterns.', isNew: false },
  { name: 'Miniature Camel on Paper', category: 'Handicrafts & Home Décor', price: 1800, tags: ['Painting', 'Miniature', 'Paper'], location: 'Udaipur', imageUrl: 'https://placehold.co/600x400/f8bbd0/000000?text=Miniature+Camel', rating: 4.6, artisan: 'Kavita Singh', description: 'A charming miniature painting of a camel on paper, a classic Rajasthani motif.', isNew: false },
  { name: 'Chanderi Dupatta', category: 'Textiles & Handloom', price: 2800, tags: ['Silk', 'Cotton', 'Handloom'], location: 'Chanderi', imageUrl: 'https://placehold.co/600x400/f0f4c3/000000?text=Chanderi+Dupatta', rating: 4.7, artisan: 'Sanjay Kulkarni', description: 'A delicate Chanderi dupatta with a beautiful handloom weave.', isNew: false },
  { name: 'Handcrafted Wooden Clock', category: 'Handwoven & Natural Products', price: 1200, tags: ['Wood', 'Clock', 'Decor'], location: 'Channapatna', imageUrl: 'https://placehold.co/600x400/964B00/ffffff?text=Wooden+Clock', rating: 4.5, artisan: 'Anand Kumar', description: 'A beautifully designed Handcrafted Wooden Clock from Channapatna.', isNew: true },
  { name: 'Terracotta Planter Pot', category: 'Pottery & Terracotta', price: 400, tags: ['Pottery', 'Clay', 'Decor'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/e9d0b6/000000?text=Terracotta+Planter+Pot', rating: 4.7, artisan: 'Sunita Verma', description: 'A traditional Terracotta Planter Pot for your home garden.', isNew: true },
  { name: 'Hand-painted Ceramic Mug', category: 'Pottery & Terracotta', price: 450, tags: ['Pottery', 'Ceramics', 'Handmade'], location: 'Indore', imageUrl: 'https://placehold.co/600x400/f3f3f3/000000?text=Hand-Painted+Ceramic+Mug', rating: 4.6, artisan: 'Sunita Verma', description: 'A vibrant hand-painted ceramic mug, perfect for your morning coffee.', isNew: false },
  { name: 'Dokra Fish Figurine', category: 'Handicrafts & Home Décor', price: 1800, tags: ['Metalwork', 'Casting', 'Figurine'], location: 'Nagpur', imageUrl: 'https://placehold.co/600x400/b09289/ffffff?text=Dokra+Fish+Figurine', rating: 4.4, artisan: 'Jitendra Singh', description: 'A small Dokra fish figurine, perfect as a paperweight or decor.', isNew: true },
];

const topRatedProducts = allProducts.sort((a, b) => b.rating - a.rating).slice(0, 4);

const featuredArtisans = [
  {
    name: 'Jitendra Singh',
    specialty: 'Bidriware, Dhokra Art',
    location: 'Aurangabad, Maharashtra',
    imageUrl: 'https://placehold.co/100x100/f0f9ff/000000?text=JS',
    bio: 'Jitendra is a master of Bidriware, a traditional metal inlay craft. His family has practiced this art for generations, blending zinc with intricate silver and gold patterns to create breathtaking pieces of decor and utility. He also works with the ancient lost-wax casting technique of Dokra art.',
  },
  {
    name: 'Rekha Patil',
    specialty: 'Paithani Sarees, Terracotta',
    location: 'Paithan, Maharashtra',
    imageUrl: 'https://placehold.co/100x100/fffbe0/000000?text=RP',
    bio: 'Rekha is a skilled weaver of Paithani sarees, known for their elaborate peacock and floral motifs. She also explores her creativity in terracotta pottery, creating rustic yet elegant home decor inspired by local traditions.',
  },
  {
    name: 'Sanjay Kulkarni',
    specialty: 'Warli Art, Textiles',
    location: 'Palghar, Maharashtra',
    imageUrl: 'https://placehold.co/100x100/ffe4e1/000000?text=SK',
    bio: 'Sanjay brings the ancient art of Warli to life, depicting scenes of daily life, nature, and mythology through simple geometric shapes. His work is a tribute to the rich cultural heritage of the Warli tribe, often incorporating these patterns into textiles.',
  },
  {
    name: 'Anand Kumar',
    specialty: 'Wooden Toys, Folk Paintings',
    location: 'Channapatna, Karnataka',
    imageUrl: 'https://placehold.co/100x100/d8c199/000000?text=AK',
    bio: 'Anand is a renowned artist of Channapatna wooden toys, famous for their vibrant, non-toxic lacquer finish. He also practices various folk painting styles, including Gond and Patachitra, celebrating the diversity of Indian art through color and form.',
  },
  {
    name: 'Priya Sharma',
    specialty: 'Jewellery, Blue Pottery',
    location: 'Jaipur, Rajasthan',
    imageUrl: 'https://placehold.co/100x100/fce4ec/000000?text=PS',
    bio: 'Priya specializes in traditional Rajasthani Meenakari jewellery and Blue Pottery. She combines vibrant enamel colors with delicate silverwork and a traditional blue glaze to create unique and eye-catching pieces that tell a story of royal heritage.',
  },
  {
    name: 'Shweta Deshmukh',
    specialty: 'Textiles, Traditional Food',
    location: 'Mumbai, Maharashtra',
    imageUrl: 'https://placehold.co/100x100/b2dfdb/000000?text=SD',
    bio: 'Shweta is a versatile artisan who crafts intricate textiles like Jaipuri quilts and Kalamkari fabrics. She also has a passion for traditional food, preparing authentic Konkan-style delicacies that connect people to their roots through taste.',
  },
  {
    name: 'Manish Kumar',
    specialty: 'Pattachitra Painting',
    location: 'Puri, Odisha',
    imageUrl: 'https://placehold.co/100x100/e6e6fa/000000?text=MK',
    bio: 'Manish is a custodian of the ancient Pattachitra art form, creating detailed, narrative paintings on cloth. His work often depicts mythological stories and folklore with vibrant, natural colors, preserving a centuries-old tradition.',
  },
  {
    name: 'Ananya Roy',
    specialty: 'Bamboo Crafts, Musical Instruments',
    location: 'Guwahati, Assam',
    imageUrl: 'https://placehold.co/100x100/b7e4c7/000000?text=AR',
    bio: 'Ananya is an artisan dedicated to the craft of bamboo, creating not only beautiful home decor but also traditional musical instruments like flutes. Her work highlights the versatility and sustainability of bamboo as a material.',
  },
  {
    name: 'Laxmi Devi',
    specialty: 'Folk Paintings, Paper Art',
    location: 'Madurai, Tamil Nadu',
    imageUrl: 'https://placehold.co/100x100/d9b48c/000000?text=LD',
    bio: 'Laxmi is a master of several folk painting traditions from South India, including the exquisite Thanjavur art. She also specializes in Sanjhi paper cutting, creating delicate and intricate paper art depicting religious motifs.',
  },
  {
    name: 'Rahul Desai',
    specialty: 'Pottery, Terracotta',
    location: 'Bhuj, Gujarat',
    imageUrl: 'https://placehold.co/100x100/b0bec5/000000?text=RD',
    bio: 'Rahul practices the traditional pottery of Gujarat, known for its distinct styles and vibrant earth tones. He creates a range of terracotta products from functional pottery to decorative art pieces.',
  },
  {
    name: 'Kavita Singh',
    specialty: 'Miniature Painting',
    location: 'Udaipur, Rajasthan',
    imageUrl: 'https://placehold.co/100x100/8d8d8d/000000?text=KS',
    bio: 'Kavita is a skilled miniature painter, creating intricate and detailed paintings on various materials like paper and silk. Her work often depicts scenes from royal courts and nature with fine brushwork and natural pigments.',
  },
  {
    name: 'Sunita Verma',
    specialty: 'Clay & Ceramics',
    location: 'Indore, Madhya Pradesh',
    imageUrl: 'https://placehold.co/100x100/f1d7d0/000000?text=SV',
    bio: 'Sunita specializes in traditional clay and ceramic art, hand-shaping and painting each piece to perfection. Her creations range from functional dinnerware to beautiful decorative items, all inspired by the rich cultural heritage of Madhya Pradesh.',
  }
];

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    toast({
      title: "Wishlisted! ❤️",
      description: `${product.name} has been saved to your wishlist.`,
    });
  };

  return (
    <Card
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden shadow-gentle hover:shadow-craft transition-shadow duration-300 cursor-pointer group"
    >
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.isNew && (
          <Badge className="absolute top-2 left-2 bg-accent/90 text-primary-foreground font-semibold">New</Badge>
        )}
        <div
          className={cn(
            "absolute inset-0 bg-black/30 flex items-center justify-center gap-4 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="bg-primary/80 hover:bg-primary text-primary-foreground rounded-full transition-transform duration-300 scale-0 group-hover:scale-100"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Cart</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-card/80 hover:bg-card text-card-foreground rounded-full transition-transform duration-300 scale-0 group-hover:scale-100"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
            {/* The quick view button here is redundant since the whole card is now a trigger.
            I've commented it out to avoid confusion and follow best practices.
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-full transition-transform duration-300 scale-0 group-hover:scale-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                >
                  <Eye className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>
            */}
          </TooltipProvider>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm">{product.category}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {product.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-primary-soft/30">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2">
          {Array(Math.floor(product.rating)).fill(0).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">{product.rating.toFixed(1)}</span>
        </div>
        <div className="text-accent font-bold mt-2">₹{product.price.toLocaleString("en-IN")}</div>
        <p className="text-muted-foreground text-xs mt-1">Location: {product.location}</p>
      </CardContent>
    </Card>
  );
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    categories: [],
    price: [],
    location: [],
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsProductDialogOpen(true);
  };

  const applyFilters = useCallback(() => {
    let updatedProducts = [...allProducts];

    const artisanName = searchParams.get('artisan');
    const categoryName = searchParams.get('category');

    if (artisanName) {
      updatedProducts = updatedProducts.filter(product => product.artisan === artisanName);
    } else if (categoryName) {
      updatedProducts = updatedProducts.filter(product => product.category === categoryName);
    } else {
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
    }

    switch (sortBy) {
      case "price-asc":
        updatedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        updatedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        updatedProducts.sort((a, b) => (b.isNew ? 1 : a.isNew ? -1 : 0));
        break;
      case "relevance":
      default:
        break;
    }

    setFilteredProducts(updatedProducts);
  }, [filters, sortBy, searchParams]);

  const handleScrollToTop = useCallback(() => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  }, []);

  const handleFilterBarScroll = useCallback(() => {
    if (isMobile) return;
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
      setShowFilterBar(false);
    } else {
      setShowFilterBar(true);
    }
    setLastScrollY(window.scrollY);
  }, [isMobile, lastScrollY]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters, searchParams]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollToTop);
    if (!isMobile) {
      window.addEventListener('scroll', handleFilterBarScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScrollToTop);
      if (!isMobile) {
        window.removeEventListener('scroll', handleFilterBarScroll);
      }
    };
  }, [handleScrollToTop, handleFilterBarScroll, isMobile]);

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

  const handleArtisanClick = (artisan) => {
    setSelectedArtisan(artisan);
    setIsDialogOpen(true);
  };

  const FilterSection = () => (
    <>
      <div className="flex-1 min-w-[150px]">
        <Label htmlFor="sort-by" className="text-xs font-medium text-muted-foreground">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full text-sm mt-1">
            <SelectValue placeholder="Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-1 min-w-[150px] justify-between text-sm">
            Categories
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2" align="start">
          <ScrollArea className="h-60">
            <div className="grid gap-2">
              {[ 'Handicrafts & Home Décor', 'Textiles & Handloom', 'Traditional Food & Beverages', 'Jewellery & Accessories', 'Handwoven & Natural Products', 'Musical Instruments', 'Pottery & Terracotta', 'Metalware' ].map(category => (
                <div key={category} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <Checkbox
                    id={`cat-${category.replace(/[^a-zA-Z0-9]/g, '')}`}
                    value={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleFilterChange('categories', category)}
                  />
                  <Label htmlFor={`cat-${category.replace(/[^a-zA-Z0-9]/g, '')}`} className="font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-1 min-w-[150px] justify-between text-sm">
            Price
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2" align="start">
          <div className="grid gap-2">
            {[ { label: '₹0 - ₹500', value: '0-500' }, { label: '₹501 - ₹2,000', value: '501-2000' }, { label: '₹2,001 - ₹5,000', value: '2001-5000' }, { label: '₹5,001 - ₹10,000', value: '5001-10000' }, { label: '₹10,001+', value: '10001-999999' } ].map(price => (
              <div key={price.value} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                <Checkbox
                  id={`price-${price.value}`}
                  value={price.value}
                  checked={filters.price.includes(price.value)}
                  onCheckedChange={() => handleFilterChange('price', price.value)}
                />
                <Label htmlFor={`price-${price.value}`} className="font-normal cursor-pointer">{price.label}</Label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex-1 min-w-[150px] justify-between text-sm">
            Location
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2" align="start">
          <ScrollArea className="h-60">
            <div className="grid gap-2">
              {[ 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Palghar', 'Kolhapur', 'Paithan', 'Aurangabad', 'Channapatna', 'Srikalahasti', 'Moradabad', 'Bastar', 'Puri', 'Bhopal', 'Mathura', 'Assam', 'Jaipur', 'Tripura', 'Thanjavur', 'Kutch', 'Udaipur', 'Bhuj', 'Indore', 'Chanderi', 'Nathdwara' ].map(location => (
                <div key={location} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted">
                  <Checkbox
                    id={`loc-${location}`}
                    value={location}
                    checked={filters.location.includes(location)}
                    onCheckedChange={() => handleFilterChange('location', location)}
                  />
                  <Label htmlFor={`loc-${location}`} className="font-normal cursor-pointer">{location}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Button onClick={applyFilters} className="flex-1 min-w-[100px] text-sm">Apply</Button>
      <Button onClick={handleResetFilters} variant="outline" className="flex-1 min-w-[100px] text-sm">Clear All</Button>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* The scroll-to-top button is an independent fixed element */}
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-4 right-4 z-50 transition-all duration-300",
          showScrollToTop ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
        size="icon"
      >
        <ArrowUp className="w-6 h-6" />
        <span className="sr-only">Scroll to top</span>
      </Button>

      <div className="flex flex-col gap-8">
        {/* Horizontal Filter Bar for Desktop */}
        {!isMobile && (
          <div className={cn(
            "hidden lg:flex items-center gap-4 bg-card rounded-lg p-4 shadow-gentle sticky top-20 z-10 transition-opacity duration-300",
            showFilterBar ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <Filter className="w-5 h-5 text-primary" />
            <div className="flex items-center gap-4 flex-wrap">
              <FilterSection />
            </div>
          </div>
        )}

        {/* Mobile Filter Button and Sheet */}
        {isMobile && (
          <div className="flex justify-start lg:hidden mb-4 sticky top-16 z-10 bg-background/95 backdrop-blur py-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter & Sort
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filter & Sort</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div className="space-y-4">
                    <div className="w-full">
                      <Label htmlFor="sort-by-mobile" className="block text-sm font-medium text-foreground mb-2">Sort By</Label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Relevance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevance</SelectItem>
                          <SelectItem value="price-asc">Price: Low to High</SelectItem>
                          <SelectItem value="price-desc">Price: High to Low</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Categories</h3>
                      <div className="grid gap-2">
                        {[ 'Handicrafts & Home Décor', 'Textiles & Handloom', 'Traditional Food & Beverages', 'Jewellery & Accessories', 'Handwoven & Natural Products', 'Musical Instruments', 'Pottery & Terracotta', 'Metalware' ].map(category => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-mobile-${category.replace(/[^a-zA-Z0-9]/g, '')}`}
                              value={category}
                              checked={filters.categories.includes(category)}
                              onCheckedChange={() => handleFilterChange('categories', category)}
                            />
                            <Label htmlFor={`cat-mobile-${category.replace(/[^a-zA-Z0-9]/g, '')}`}>
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Price</h3>
                      <div className="grid gap-2">
                        {[ { label: '₹0 - ₹500', value: '0-500' }, { label: '₹501 - ₹2,000', value: '501-2000' }, { label: '₹2,001 - ₹5,000', value: '2001-5000' }, { label: '₹5,001 - ₹10,000', value: '5001-10000' }, { label: '₹10,001+', value: '10001-999999' } ].map(price => (
                          <div key={price.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`price-mobile-${price.value}`}
                              value={price.value}
                              checked={filters.price.includes(price.value)}
                              onCheckedChange={() => handleFilterChange('price', price.value)}
                            />
                            <Label htmlFor={`price-mobile-${price.value}`}>{price.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Location</h3>
                      <ScrollArea className="h-40 w-full rounded-md border p-4">
                        <div className="grid gap-2">
                          {[ 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Palghar', 'Kolhapur', 'Paithan', 'Aurangabad', 'Channapatna', 'Srikalahasti', 'Moradabad', 'Bastar', 'Puri', 'Bhopal', 'Mathura', 'Assam', 'Jaipur', 'Tripura', 'Thanjavur', 'Kutch', 'Udaipur', 'Bhuj', 'Indore', 'Chanderi', 'Nathdwara' ].map(location => (
                            <div key={location} className="flex items-center space-x-2">
                              <Checkbox
                                id={`loc-mobile-${location}`}
                                value={location}
                                checked={filters.location.includes(location)}
                                onCheckedChange={() => handleFilterChange('location', location)}
                              />
                              <Label htmlFor={`loc-mobile-${location}`}>{location}</Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <Button onClick={applyFilters} className="flex-1">Apply Filters</Button>
                      <Button onClick={handleResetFilters} variant="outline" className="flex-1">Clear All</Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        <main className="w-full space-y-12">
          {/* All Products Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => <ProductCard key={product.name} product={product} onQuickView={handleQuickView} />)
              ) : (
                <p className="text-center text-muted-foreground col-span-full">No products found matching your filters.</p>
              )}
            </div>
          </section>
          
          {/* Top-Rated Products Section (Marquee) */}
          <section className="overflow-hidden">
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">Top-Rated Products</h2>
            <div className="flex flex-nowrap gap-6 animate-marquee">
              {/* Duplicate content to create a seamless loop */}
              {topRatedProducts.map(product => (
                <div key={product.name} className="flex-none w-[300px]">
                  <ProductCard product={product} onQuickView={handleQuickView} />
                </div>
              ))}
              {topRatedProducts.map(product => (
                <div key={`${product.name}-clone`} className="flex-none w-[300px]">
                  <ProductCard product={product} onQuickView={handleQuickView} />
                </div>
              ))}
            </div>
          </section>

          {/* Featured Artisans Section (Marquee) */}
          <section className="overflow-hidden">
            <h2 className="text-2xl font-bold mb-6 text-primary text-center">Featured Artisans</h2>
            <div className="flex flex-nowrap gap-6 animate-marquee">
              {/* Duplicate content to create a seamless loop */}
              {featuredArtisans.map((artisan) => (
                <div
                  key={artisan.name}
                  onClick={() => handleArtisanClick(artisan)}
                  className="group flex-none w-[200px] cursor-pointer"
                >
                  <Card className="p-4 flex flex-col items-center text-center shadow-gentle hover:shadow-craft transition-shadow duration-300">
                    <img src={artisan.imageUrl} alt={artisan.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                    <h3 className="font-semibold text-sm text-card-foreground">{artisan.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {artisan.location}
                    </p>
                  </Card>
                </div>
              ))}
              {featuredArtisans.map((artisan) => (
                <div
                  key={`${artisan.name}-clone`}
                  onClick={() => handleArtisanClick(artisan)}
                  className="group flex-none w-[200px] cursor-pointer"
                >
                  <Card className="p-4 flex flex-col items-center text-center shadow-gentle hover:shadow-craft transition-shadow duration-300">
                    <img src={artisan.imageUrl} alt={artisan.name} className="w-16 h-16 rounded-full object-cover mb-2" />
                    <h3 className="font-semibold text-sm text-card-foreground">{artisan.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {artisan.location}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Artisan Products Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedArtisan && (
          <DialogContent className="sm:max-w-xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="flex flex-col md:flex-row items-center gap-4 border-b pb-4">
              <img src={selectedArtisan.imageUrl} alt={selectedArtisan.name} className="w-20 h-20 rounded-full object-cover" />
              <div className="text-center md:text-left">
                <DialogTitle className="text-3xl font-bold flex items-center gap-2">
                  <span>{selectedArtisan.name}'s Gallery</span>
                </DialogTitle>
                <DialogDescription className="text-sm">
                  <p className="text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {selectedArtisan.location}
                  </p>
                  <p className="text-foreground/80 mt-2">{selectedArtisan.bio}</p>
                  <Button variant="link" asChild className="p-0 h-auto text-sm mt-2">
                    <Link to={`/artisans/${selectedArtisan.name.toLowerCase().replace(' ', '-')}`}>
                      Visit Full Profile
                    </Link>
                  </Button>
                </DialogDescription>
              </div>
            </DialogHeader>

            <div className="py-4">
              <h3 className="text-xl font-semibold mb-4 text-primary">Artisan's Creations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.filter(p => p.artisan === selectedArtisan.name).length > 0 ? (
                  allProducts.filter(p => p.artisan === selectedArtisan.name).map(product => (
                    <ProductCard key={product.name} product={product} onQuickView={handleQuickView} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center text-center py-12">
                    <Info className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No products found for this artisan.</p>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Product Quick View Dialog */}
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
                  <Button className="w-full">Add to Cart</Button>
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

export default Products;