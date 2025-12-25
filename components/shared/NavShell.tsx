'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import TopBar from './TopBar';
import MiddleNav from './MiddleNav';
import BottomNav from './BottomNav';
import SideDrawer from './SideDrawer';

interface NavShellProps {
  children: ReactNode;
  selectedTab?: 'home' | 'feed' | 'trending' | 'promo';
  onTabChange?: (tab: 'home' | 'feed' | 'trending' | 'promo') => void;
}

export default function NavShell({ 
  children, 
  selectedTab = 'home',
  onTabChange
}: NavShellProps) {
  const [navsVisible, setNavsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide navs on scroll down, show on scroll up
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setNavsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setNavsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ ALL NAVS HIDE/SHOW TOGETHER */}
      
      {/* TopBar */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
        navsVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <TopBar />
      </div>

      {/* MiddleNav */}
      {onTabChange && (
        <div className={`fixed left-0 right-0 z-30 transition-transform duration-300 ${
          navsVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: '48px' }}
        >
          <MiddleNav selectedTab={selectedTab} onTabChange={onTabChange} />
        </div>
      )}

      {/* ✅ MAIN CONTENT - FIXED PADDING */}
      <div className="pt-28 pb-16">
        {children}
      </div>

      {/* BottomNav */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        navsVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <BottomNav />
      </div>

      {/* ✅ SIDEDRAWER (FIXED POSITION, NOT AFFECTED BY SCROLL) */}
      <SideDrawer />
    </div>
  );
}