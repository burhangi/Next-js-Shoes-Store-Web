import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronDown, Search, Heart, ShoppingBag, 
  Home, Flame, Star, Grid, Zap, ArrowRight, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { UserMenu } from './UserMenu';
import { routes } from '@/lib/routes';

interface DesktopNavProps {
  scrolled: boolean;
  cartCount: number;
  wishlistCount: number;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ scrolled, cartCount, wishlistCount }) => {
  const pathname = usePathname();
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoriesRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === routes.home) return pathname === href;
    return pathname?.startsWith(href);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${routes.search}?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { label: 'Home', href: routes.home, icon: Home },
    { label: 'New Arrivals', href: routes.products.newArrivals, icon: Flame, badge: 'NEW', badgeColor: 'bg-emerald-500' },
    { label: 'Best Sellers', href: routes.products.bestSellers, icon: Star, badge: 'HOT', badgeColor: 'bg-red-500' },
    { label: 'Categories', href: '#', icon: Grid, hasDropdown: true },
    { label: 'Sale', href: routes.products.onSale, icon: Zap, badge: 'SALE', badgeColor: 'bg-amber-500' },
  ];

  const categories = [
    { label: 'Men', href: routes.categories.men, count: 245, color: 'bg-blue-50 text-blue-600' },
    { label: 'Women', href: routes.categories.women, count: 189, color: 'bg-pink-50 text-pink-600' },
    { label: 'Kids', href: routes.categories.kids, count: 112, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Sports', href: routes.categories.sports, count: 76, color: 'bg-green-50 text-green-600' },
    { label: 'Formal', href: routes.categories.formal, count: 89, color: 'bg-purple-50 text-purple-600' },
    { label: 'Casual', href: routes.categories.casual, count: 156, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <nav className={cn(
      "hidden lg:block transition-all duration-300 bg-gradient-to-r from-white via-orange-50/30 to-white backdrop-blur-md border-b-2 border-primary/10 z-[50] sticky top-0 py-2 shadow-lg"
    )}>
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">
        <div className="flex items-center h-[56px] justify-between gap-4">
          {/* Logo Section - Compact */}
          <Link href={routes.home} className="flex items-center gap-2 group shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary via-accent to-primary-dark text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                <span className="font-extrabold text-base tracking-tight">LS</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent tracking-tight leading-none uppercase">
                Luxury Store
              </span>
              <span className="text-[8px] font-bold text-primary tracking-wider uppercase">
                Premium Footwear
              </span>
            </div>
          </Link>

          {/* Navigation Items - Compact */}
          <div className="flex items-center gap-0.5 shrink-0">
            {navItems.map((item) => (
              <div key={item.label} className="relative" ref={item.hasDropdown ? categoriesRef : null}>
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setShowCategories(!showCategories)}
                      className={cn(
                        "flex items-center gap-0.5 px-2.5 py-1.5 text-xs font-bold transition-all duration-300 rounded-full group border",
                        showCategories 
                          ? "text-white bg-gradient-to-r from-primary to-accent border-primary shadow-lg shadow-primary/30" 
                          : "text-secondary border-transparent hover:text-primary hover:border-primary/20 hover:bg-primary/5"
                      )}
                    >
                      {item.icon && <item.icon className="w-3 h-3" />}
                      <span className="tracking-tight">{item.label}</span>
                      <ChevronDown className={cn(
                        "w-3 h-3 transition-transform duration-300",
                        showCategories && "rotate-180"
                      )} />
                    </button>

                    {/* Categories Dropdown - Completely Revamped & Professional */}
                    {showCategories && (
                      <>
                        {/* Backdrop */}
                        <div 
                          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90]"
                          onClick={() => setShowCategories(false)}
                        />
                        
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[500px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl z-[100] animate-in fade-in slide-in-from-top-3 duration-300 overflow-hidden border border-gray-100">
                          {/* Header */}
                          <div className="px-4 py-3 bg-gradient-to-r from-secondary to-secondary/95 text-white">
                             <div className="flex items-center justify-between">
                               <div>
                                 <h3 className="text-sm font-bold mb-0.5">Browse Categories</h3>
                                 <p className="text-xs text-white/80">Find your perfect style</p>
                               </div>
                               <Link 
                                 href={routes.categories.all} 
                                 onClick={() => setShowCategories(false)}
                                 className="flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg text-xs font-bold transition-all duration-300"
                               >
                                 View All <ArrowRight className="w-3 h-3" />
                               </Link>
                             </div>
                          </div>

                          {/* Categories List */}
                          <div className="p-3 max-h-[400px] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2">
                              {categories.map((cat) => (
                                <Link
                                  key={cat.label}
                                  href={cat.href}
                                  onClick={() => setShowCategories(false)}
                                  className="group flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                                >
                                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold transition-all duration-300 group-hover:scale-110", cat.color)}>
                                    {cat.label[0]}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="block font-bold text-secondary text-sm group-hover:text-primary transition-colors">
                                      {cat.label}
                                    </span>
                                    <span className="text-xs text-gray-500">{cat.count} items</span>
                                  </div>
                                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-0.5 px-2.5 py-1.5 text-xs font-bold transition-all duration-300 rounded-full relative group whitespace-nowrap border",
                      isActive(item.href) 
                          ? "text-white bg-gradient-to-r from-primary to-accent border-primary shadow-lg shadow-primary/30" 
                          : "text-secondary border-transparent hover:text-primary hover:border-primary/20 hover:bg-primary/5"
                    )}
                  >
                    {item.icon && <item.icon className="w-3 h-3" />}
                    <span className="tracking-tight">{item.label}</span>
                    {item.badge && (
                      <span className={cn(
                        "absolute -top-1 -right-1 px-1 py-0.5 text-[7px] font-extrabold uppercase tracking-tight rounded-full text-white shadow-md ring-1 ring-white animate-pulse",
                        item.badgeColor || "bg-primary"
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Search Bar - Professional Style */}
          <div className="hidden xl:flex flex-1 max-w-lg ml-4">
            <form onSubmit={handleSearchSubmit} className="relative group w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-24 py-2.5 border-2 border-gray-200 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 text-sm font-medium shadow-sm"
                placeholder="Search for shoes, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute inset-y-0 right-1 my-1 flex items-center px-5 text-white bg-gradient-to-r from-primary to-accent hover:shadow-lg rounded-full transition-all duration-300 font-bold text-xs tracking-wide"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Actions - Professional */}
          <div className="flex items-center gap-2 shrink-0">
             <button 
               onClick={() => setShowCategories(!showCategories)} 
               className="xl:hidden p-2.5 text-gray-600 hover:text-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 rounded-full transition-all border-2 border-transparent hover:border-primary/20"
             >
                <Search className="w-5 h-5" />
             </button>

            <Link 
              href={routes.account.wishlist} 
              className="p-2.5 text-gray-600 hover:text-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 rounded-full transition-all duration-300 group relative border-2 border-transparent hover:border-primary/20"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[2] group-hover:scale-110 group-hover:fill-primary/20 transition-all" />
              {wishlistCount > 0 && (
                 <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-full ring-2 ring-white animate-pulse"></span>
              )}
            </Link>
            
            <Link 
              href={routes.cart} 
              className="p-2.5 text-gray-600 hover:text-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 rounded-full transition-all duration-300 relative group border-2 border-transparent hover:border-primary/20"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[2] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="w-px h-7 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-1"></div>
            
            {/* User Menu Component */}
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};
