import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  Search, 
  Menu, 
  Sparkles, 
  User, 
  Package, 
  Heart,
  MessageSquare,
  Home,
  LogIn
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
      // You can navigate to search results page or filter content
    }
  };

  const navigationItems = [
    {
      title: 'Home',
      href: '/',
      icon: Home,
    },
    {
      title: 'Artisans',
      href: '/artisans',
      icon: User,
      hasDropdown: true,
      items: [
        { title: 'Browse Artisans', href: '/artisans', description: 'Discover talented craftspeople' },
        { title: 'Featured Stories', href: '/stories', description: 'Read inspiring artisan journeys' },
        { title: 'Heritage Crafts', href: '/heritage', description: 'Traditional techniques and cultures' },
      ]
    },
    {
      title: 'Products',
      href: '/products',
      icon: Package,
      hasDropdown: true,
      items: [
        { title: 'All Products', href: '/products', description: 'Browse all handcrafted items' },
        { title: 'New Arrivals', href: '/products/new', description: 'Latest additions' },
        { title: 'Categories', href: '/categories', description: 'Shop by craft type' },
      ]
    },
    {
      title: 'Community',
      href: '/community',
      icon: Heart,
    },
    {
      title: 'Contact',
      href: '/contact',
      icon: MessageSquare,
    },
  ];

  const MobileNav = () => (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Artisan Companion
          </SheetTitle>
          <SheetDescription>
            Discover and connect with local artisans
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search artisans, products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>
          
          {/* Mobile Navigation Links */}
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.title}>
                <Link
                  to={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
                {item.items && (
                  <div className="ml-7 mt-1 space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.href}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 border-t space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link to="/dashboard">
                <User className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const DesktopNav = () => (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.hasDropdown ? (
              <>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to={item.href}
                        >
                          <item.icon className="h-6 w-6" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {item.title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our {item.title.toLowerCase()} section
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {item.items?.map((subItem) => (
                      <li key={subItem.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                            to={subItem.href}
                          >
                            <div className="text-sm font-medium leading-none">{subItem.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {subItem.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  to={item.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-foreground">Artisan Companion</span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search artisans, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px] lg:w-[300px]"
              />
            </form>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Navbar;