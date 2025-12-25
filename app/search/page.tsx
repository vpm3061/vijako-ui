'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NavShell from '@/components/shared/NavShell';
import Link from 'next/link';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [query, setQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get search query from URL
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery) {
      setQuery(decodeURIComponent(urlQuery));
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (!query.trim()) return;
    // Update URL without reloading
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'hi-IN,en-IN';
    recognition.start();
    setIsVoiceActive(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsVoiceActive(false);
      router.push(`/search?q=${encodeURIComponent(transcript)}`);
    };

    recognition.onerror = () => {
      setIsVoiceActive(false);
    };

    recognition.onend = () => {
      setIsVoiceActive(false);
    };
  };

  // Popular searches
  const popularSearches = [
    { term: 'AC Repair', category: 'Service', icon: '❄️' },
    { term: 'Doctor Home Visit', category: 'Medical', icon: '👨‍⚕️' },
    { term: 'Pizza Delivery', category: 'Food', icon: '🍕' },
    { term: 'Electrician', category: 'Service', icon: '⚡' },
    { term: 'Groceries', category: 'Shopping', icon: '🛒' },
    { term: 'Salon at Home', category: 'Beauty', icon: '💇' },
    { term: 'Plumber', category: 'Service', icon: '🚰' },
    { term: 'Home Cleaning', category: 'Service', icon: '🧹' },
  ];

  // Search categories
  const searchCategories = [
    { name: 'Services', icon: '🔧', color: 'from-blue-500 to-cyan-500' },
    { name: 'Food', icon: '🍽️', color: 'from-red-500 to-orange-500' },
    { name: 'Grocery', icon: '🛒', color: 'from-green-500 to-emerald-500' },
    { name: 'Medical', icon: '🏥', color: 'from-red-500 to-pink-500' },
    { name: 'Beauty', icon: '💄', color: 'from-pink-500 to-purple-500' },
    { name: 'Home', icon: '🏠', color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <NavShell 
      selectedTab={selectedTab} 
      onTabChange={(tab) => {
        if (tab === 'feed') {
          router.push('/feed');
        } else {
          setSelectedTab(tab);
        }
      }}
    >
      <div className="px-4 pt-4 pb-24">
        {/* 🔍 MAIN SEARCH SECTION */}
        <div className="mb-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Search Vijako</h1>
            <p className="text-gray-600">Find services, food, products & more</p>
          </div>

          <div className="relative mb-4">
            {/* Search Container */}
            <div className="bg-gradient-to-r from-white to-indigo-50 border-2 border-indigo-200 rounded-2xl p-1 shadow-lg">
              <div className="flex items-center">
                {/* Search Icon */}
                <div className="pl-3 pr-2">
                  <span className="text-xl text-indigo-600">🔍</span>
                </div>
                
                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="What do you need? (AC repair, doctor, food, grocery...)"
                  className="flex-1 px-3 py-4 text-gray-800 placeholder-gray-500 focus:outline-none bg-transparent text-lg"
                  autoFocus
                />
                
                {/* Voice Search Button */}
                <button
                  onClick={handleVoiceSearch}
                  type="button"
                  className={`p-3 mr-2 rounded-full transition-all ${
                    isVoiceActive ? 'bg-red-100 animate-pulse' : 'hover:bg-gray-100'
                  }`}
                  title="Voice Search"
                >
                  <span className={`text-xl ${isVoiceActive ? 'text-red-600' : 'text-gray-600'}`}>
                    🎤
                  </span>
                </button>
                
                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  type="button"
                  disabled={!query.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Recent Searches - Only show if there's query */}
            {query && (
              <div className="absolute w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
                <div className="p-3 border-b border-gray-100">
                  <div className="text-sm text-gray-500 font-medium">Search results for "{query}"</div>
                </div>
                <div className="p-2">
                  <div className="text-sm text-gray-500 p-3">Searching for {query}...</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 🔥 POPULAR SEARCHES */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">🔥 Popular Searches</h2>
            <Link href="/trending" className="text-blue-600 text-sm font-medium hover:text-blue-700">
              See all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {popularSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setQuery(item.term);
                  router.push(`/search?q=${encodeURIComponent(item.term)}`);
                }}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-200 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.term}</div>
                  <div className="text-xs text-gray-500">{item.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 📁 BROWSE BY CATEGORY */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📁 Browse by Category</h2>
          
          <div className="grid grid-cols-3 gap-3">
            {searchCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => router.push(`/category/${category.name.toLowerCase()}`)}
                className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all"
              >
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-2`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div className="font-medium text-gray-900 text-sm text-center">{category.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ℹ️ SEARCH TIPS */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span>💡</span>
            <span>Search Tips</span>
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Try specific terms like "AC repair near me" or "24x7 doctor"</li>
            <li>• Use voice search for faster results</li>
            <li>• Filter by category for better results</li>
            <li>• Bookmark your favorite searches</li>
          </ul>
        </div>
      </div>
    </NavShell>
  );
}