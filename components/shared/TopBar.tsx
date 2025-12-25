'use client';

import { useRouter } from 'next/navigation';
import { useNav } from './NavVisibilityProvider';
import { useState } from 'react';

export default function TopBar() {
  const router = useRouter();
  const { openSideDrawer } = useNav();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-3 py-1.5">
      <div className="flex items-center justify-between gap-2">
        
        {/* Logo */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-1"
        >
          <div className="w-6 h-6 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">V</span>
          </div>
          <span className="font-bold text-gray-900 text-sm hidden sm:inline">
            VIJAKO
          </span>
        </button>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full bg-gray-100 rounded-full px-3 py-1 text-xs"
          />
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              console.log('PROFILE CLICKED');
              openSideDrawer();
            }}
            className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold"
          >
            A
          </button>
        </div>
      </div>
    </div>
  );
}
