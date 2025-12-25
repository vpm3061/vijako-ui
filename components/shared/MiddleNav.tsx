'use client';

import { useRouter } from 'next/navigation';

interface MiddleNavProps {
  selectedTab: 'home' | 'feed' | 'trending' | 'promo';
  onTabChange: (tab: 'home' | 'feed' | 'trending' | 'promo') => void;
}

export default function MiddleNav({ selectedTab, onTabChange }: MiddleNavProps) {
  const router = useRouter();

  const tabs = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: '🏠',
      path: '/',
      action: () => {
        onTabChange('home');
        router.push('/');
      }
    },
    { 
      id: 'feed', 
      label: 'Feed', 
      icon: '📰',
      path: '/feed',
      action: () => {
        onTabChange('feed');
        router.push('/feed');
      }
    },
    { 
      id: 'trending', 
      label: 'Trending', 
      icon: '🔥',
      path: '/trending',
      action: () => {
        onTabChange('trending');
        router.push('/trending');
      }
    },
    { 
      id: 'promo', 
      label: 'Promo', 
      icon: '🎉',
      path: '/promo',
      action: () => {
        onTabChange('promo');
        router.push('/promo');
      }
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-2 py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={tab.action}
            className={`flex flex-col items-center justify-center w-1/4 py-1 rounded-lg transition-all ${
              selectedTab === tab.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'
            }`}
          >
            <span className="text-sm mb-0.5">{tab.icon}</span>
            <span className="text-[9px] font-medium leading-tight">{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Active indicator */}
      <div className="flex justify-center px-2">
        <div className="w-1/4 flex justify-center">
          <div className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
            selectedTab === 'home' ? 'bg-blue-500' :
            selectedTab === 'feed' ? 'bg-blue-500 translate-x-[100%]' :
            selectedTab === 'trending' ? 'bg-blue-500 translate-x-[200%]' :
            selectedTab === 'promo' ? 'bg-blue-500 translate-x-[300%]' : 'bg-transparent'
          }`}></div>
        </div>
      </div>
    </div>
  );
}