import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Search, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { routes } from '@/lib/routes';

interface MobileBottomNavProps {
  onSearchClick: () => void;
  onMenuClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onSearchClick, onMenuClick }) => {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === routes.home) return pathname === href;
    return pathname?.startsWith(href);
  };

  const menuItems = [
    { label: 'Home', href: routes.home, icon: Home },
    { label: 'Shop', href: routes.products.all, icon: Grid },
    { label: 'Search', action: onSearchClick, icon: Search, highlight: true },
    { label: 'Wishlist', href: routes.account.wishlist, icon: Heart },
    { label: 'Account', action: onMenuClick, icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-gradient-to-r from-white via-orange-50/30 to-white backdrop-blur-md border-t-2 border-primary/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(251,146,60,0.15)]">
      <div className="flex items-center justify-around h-[60px] px-1">
        {menuItems.map((item: any, idx) => (
           item.href ? (
            <Link
              key={idx}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-[20%] h-full transition-all active:scale-95 touch-manipulation rounded-xl",
                isActive(item.href) 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive(item.href) && "bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
              )}>
                <item.icon 
                  className={cn(
                    "w-[22px] h-[22px]",
                    isActive(item.href) && "fill-primary/10 stroke-current"
                  )} 
                  strokeWidth={isActive(item.href) ? 2.5 : 2} 
                />
              </div>
              <span className={cn(
                "text-[9px] font-bold",
                isActive(item.href) ? "text-primary" : "text-gray-500"
              )}>{item.label}</span>
            </Link>
           ) : (
             <button
               key={idx}
               onClick={item.action}
               className={cn(
                 "flex flex-col items-center justify-center gap-1 w-[20%] h-full transition-all active:scale-95 touch-manipulation rounded-xl",
                 item.highlight ? "relative -top-5" : "text-gray-500 hover:text-gray-700"
               )}
               aria-label={item.label}
             >
               {item.highlight ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-primary via-accent to-primary-dark text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 border-4 border-white">
                      <Search className="w-6 h-6 stroke-[2.5]" />
                    </div>
                  </div>
               ) : (
                 <>
                  <div className="p-2 rounded-xl hover:bg-gray-100 transition-all">
                    <item.icon className="w-[22px] h-[22px]" strokeWidth={2.5} />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500">{item.label}</span>
                 </>
               )}
             </button>
           )
        ))}
      </div>
    </nav>

  );
};
