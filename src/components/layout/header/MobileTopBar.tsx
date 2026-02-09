import React from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { routes } from '@/lib/routes';

interface MobileTopBarProps {
  scrolled: boolean;
  cartCount: number;
  onSearchClick: () => void;
  onMenuClick: () => void;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({ scrolled, cartCount, onSearchClick, onMenuClick }) => {
  return (
    <nav className="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-white via-orange-50/30 to-white backdrop-blur-md border-b-2 border-primary/10 shadow-lg pt-[env(safe-area-inset-top)]">
      <div className="flex items-center justify-between px-4 h-[56px] w-full gap-3">
         {/* Menu Toggle - Enhanced */}
         <button 
           onClick={onMenuClick}
           className="p-2 -ml-2 text-secondary hover:text-primary hover:bg-primary/5 rounded-full transition-all active:scale-95 border-2 border-transparent hover:border-primary/20"
           aria-label="Menu"
         >
           <Menu className="w-6 h-6" strokeWidth={2.5} />
         </button>

         {/* Brand - Enhanced */}
         <Link href={routes.home} className="flex items-center gap-2.5 mr-auto group">
           <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
             <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary via-accent to-primary-dark text-white flex items-center justify-center shadow-xl shadow-primary/30">
               <span className="font-extrabold text-sm">LS</span>
             </div>
           </div>
           <span className="text-lg font-black bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent tracking-tight uppercase">
             Luxury Store
           </span>
         </Link>

         {/* Right Actions - Enhanced */}
         <div className="flex items-center gap-1">
           <button 
            onClick={onSearchClick} 
            className="p-2 text-gray-600 hover:text-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 rounded-full transition-all active:scale-95 border-2 border-transparent hover:border-primary/20"
            aria-label="Search"
          >
             <Search className="w-5 h-5 stroke-[2]" />
           </button>
           <Link 
            href={routes.cart} 
            className="p-2 text-gray-600 hover:text-primary hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 rounded-full relative transition-all active:scale-95 border-2 border-transparent hover:border-primary/20"
            aria-label="Cart"
          >
             <ShoppingBag className="w-5 h-5 stroke-[2]" />
             {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-r from-primary to-accent text-white text-[9px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                    {cartCount}
                </span>
             )}
           </Link>
         </div>
      </div>
    </nav>
  );
};
