'use client';

import { usePathname, useRouter } from 'next/navigation';

interface BottomNavProps {
  selectedTab?: 'home' | 'feed' | 'trending' | 'promo';
  onTabChange?: (tab: 'home' | 'feed' | 'trending' | 'promo') => void;
}

export default function BottomNav({ selectedTab = 'home', onTabChange }: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { 
      id: 'saved', 
      label: 'Saved', 
      icon: '❤️',
      path: '/saved',
      onClick: () => router.push('/saved')
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: '📦',
      path: '/orders',
      onClick: () => router.push('/orders')
    },
    { 
      id: 'cart', 
      label: 'Cart', 
      icon: '🛒',
      path: '/cart',
      onClick: () => router.push('/cart')
    },
    { 
      id: 'Blog', 
      label: 'Blog', 
      icon: '📰',
      path: '/Blog',
      onClick: () => {
        if (onTabChange) onTabChange('Blog');
        router.push('/Blog');
      }
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-between items-center px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path || selectedTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center w-1/4 py-1 transition-all ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className={`text-xl mb-1 ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </span>
              <span className="text-xs font-medium leading-tight">
                {item.label}
              </span>
              {isActive && (
                <div className="w-5 h-0.5 bg-blue-600 rounded-full mt-1"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}