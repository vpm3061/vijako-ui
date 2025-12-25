// components/shared/NavVisibilityProvider.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type NavContextType = {
  isSideDrawerOpen: boolean;
  openSideDrawer: () => void;
  closeSideDrawer: () => void;
  toggleSideDrawer: () => void;
  isAnyNavOpen: boolean;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavVisibilityProvider({ children }: { children: ReactNode }) {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openSideDrawer = () => {
    console.log('Opening SideDrawer');
    setIsSideDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    console.log('Closing SideDrawer');
    setIsSideDrawerOpen(false);
  };

  const toggleSideDrawer = () => {
    console.log('Toggling SideDrawer');
    setIsSideDrawerOpen(prev => !prev);
  };

  const isAnyNavOpen = isSideDrawerOpen;

  return (
    <NavContext.Provider
      value={{
        isSideDrawerOpen,
        openSideDrawer,
        closeSideDrawer,
        toggleSideDrawer,
        isAnyNavOpen,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavVisibilityProvider');
  }
  return context;
}