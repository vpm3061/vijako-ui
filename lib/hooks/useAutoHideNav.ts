'use client';

import { useState, useEffect } from 'react';
import NavShell from '@/components/shared/NavShell';
import QuickSearchChips from '@/components/home/QuickSearchChips';
import HorizontalServiceRow from '@/components/home/HorizontalServiceRow';
import TrustBadgesSection from '@/components/home/TrustBadgesSection';
import AppDownloadBanner from '@/components/home/AppDownloadBanner';

// ✅ DATA VARIABLES KO COMPONENT KE BAHAR DEFINE KARO
const servicesRow1 = [
  { id: 1, name: 'AC Repair', icon: '❄️', rating: 4.8, price: '₹499', time: '30 min', verified: true, color: 'bg-blue-50 border-blue-100' },
  { id: 2, name: 'Electrician', icon: '⚡', rating: 4.9, price: '₹349', time: '45 min', verified: true, color: 'bg-yellow-50 border-yellow-100' },
  { id: 3, name: 'Plumber', icon: '🚰', rating: 4.7, price: '₹399', time: '1 hour', verified: true, color: 'bg-blue-50 border-blue-100' },
  { id: 4, name: 'Doctor Visit', icon: '👨‍⚕️', rating: 4.9, price: '₹999', time: '2 hours', verified: true, color: 'bg-green-50 border-green-100' },
  { id: 5, name: 'Salon at Home', icon: '💇', rating: 4.6, price: '₹299', time: '1 hour', verified: true, color: 'bg-pink-50 border-pink-100' },
  { id: 6, name: 'Home Cleaning', icon: '🧹', rating: 4.5, price: '₹799', time: '2 hours', verified: false, color: 'bg-gray-50 border-gray-100' },
  { id: 7, name: 'Carpenter', icon: '🪚', rating: 4.4, price: '₹599', time: '3 hours', verified: true, color: 'bg-orange-50 border-orange-100' },
  { id: 8, name: 'Painter', icon: '🎨', rating: 4.3, price: '₹1299', time: '1 day', verified: true, color: 'bg-purple-50 border-purple-100' },
];

const foodRow2 = [
  { id: 9, name: 'Pizza Delivery', icon: '🍕', rating: 4.9, price: '₹199+', time: '30 min', verified: true, color: 'bg-red-50 border-red-100' },
  { id: 10, name: 'Biryani', icon: '🍚', rating: 4.8, price: '₹249+', time: '40 min', verified: true, color: 'bg-orange-50 border-orange-100' },
  { id: 11, name: 'Chinese', icon: '🥡', rating: 4.7, price: '₹179+', time: '25 min', verified: true, color: 'bg-gray-50 border-gray-100' },
  { id: 12, name: 'South Indian', icon: '🥘', rating: 4.8, price: '₹149+', time: '20 min', verified: true, color: 'bg-green-50 border-green-100' },
  { id: 13, name: 'Street Food', icon: '🌮', rating: 4.4, price: '₹99+', time: '15 min', verified: false, color: 'bg-orange-50 border-orange-100' },
  { id: 14, name: 'Desserts', icon: '🍨', rating: 4.9, price: '₹149+', time: '25 min', verified: true, color: 'bg-pink-50 border-pink-100' },
  { id: 15, name: 'Healthy Food', icon: '🥗', rating: 4.5, price: '₹299+', time: '30 min', verified: true, color: 'bg-emerald-50 border-emerald-100' },
  { id: 16, name: 'North Indian', icon: '🍛', rating: 4.9, price: '₹299+', time: '35 min', verified: true, color: 'bg-yellow-50 border-yellow-100' },
];

const groceryRow3 = [
  { id: 17, name: 'Vegetables', icon: '🥦', rating: 4.8, price: '₹99+', time: '45 min', verified: true, color: 'bg-green-50 border-green-100' },
  { id: 18, name: 'Fruits', icon: '🍎', rating: 4.9, price: '₹149+', time: '40 min', verified: true, color: 'bg-red-50 border-red-100' },
  { id: 19, name: 'Dairy', icon: '🥛', rating: 4.7, price: '₹79+', time: '30 min', verified: true, color: 'bg-white border-gray-200' },
  { id: 20, name: 'Snacks', icon: '🍫', rating: 4.6, price: '₹59+', time: '25 min', verified: true, color: 'bg-yellow-50 border-yellow-100' },
  { id: 21, name: 'Beverages', icon: '🧃', rating: 4.5, price: '₹129+', time: '35 min', verified: true, color: 'bg-blue-50 border-blue-100' },
  { id: 22, name: 'Organic', icon: '🌿', rating: 4.9, price: '₹199+', time: '50 min', verified: true, color: 'bg-emerald-50 border-emerald-100' },
  { id: 23, name: 'Spices', icon: '🌶️', rating: 4.8, price: '₹89+', time: '40 min', verified: true, color: 'bg-red-50 border-red-100' },
  { id: 24, name: 'Frozen Food', icon: '🧊', rating: 4.4, price: '₹249+', time: '55 min', verified: true, color: 'bg-blue-50 border-blue-100' },
];

const allServiceCategories = [
  { id: 1, name: 'AC Repair', icon: '❄️', color: 'bg-blue-50 border-blue-100' },
  { id: 2, name: 'Doctor', icon: '👨‍⚕️', color: 'bg-green-50 border-green-100' },
  { id: 3, name: 'Electrician', icon: '⚡', color: 'bg-yellow-50 border-yellow-100' },
  { id: 4, name: 'Plumber', icon: '🚰', color: 'bg-blue-50 border-blue-100' },
  { id: 5, name: 'Cleaning', icon: '🧹', color: 'bg-gray-50 border-gray-100' },
  { id: 6, name: 'Salon', icon: '💇', color: 'bg-pink-50 border-pink-100' },
  { id: 7, name: 'Carpenter', icon: '🪚', color: 'bg-orange-50 border-orange-100' },
  { id: 8, name: 'Painter', icon: '🎨', color: 'bg-purple-50 border-purple-100' },
  { id: 9, name: 'Pest Control', icon: '🐜', color: 'bg-red-50 border-red-100' },
  { id: 10, name: 'Car Wash', icon: '🚗', color: 'bg-blue-50 border-blue-100' },
  { id: 11, name: 'Bike Repair', icon: '🏍️', color: 'bg-orange-50 border-orange-100' },
  { id: 12, name: 'Yoga Trainer', icon: '🧘', color: 'bg-purple-50 border-purple-100' },
  { id: 13, name: 'Home Tutor', icon: '📚', color: 'bg-indigo-50 border-indigo-100' },
  { id: 14, name: 'Event Planner', icon: '🎉', color: 'bg-pink-50 border-pink-100' },
  { id: 15, name: 'Catering', icon: '🍽️', color: 'bg-orange-50 border-orange-100' },
  { id: 16, name: 'Photographer', icon: '📷', color: 'bg-gray-50 border-gray-100' },
  { id: 17, name: 'Driver', icon: '🚘', color: 'bg-blue-50 border-blue-100' },
];

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'all',
    serviceType: 'all',
    rating: 'all',
    availability: 'now',
    verifiedOnly: false,
  });

  // Check URL for tab parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['home', 'feed', 'trending', 'promo'].includes(tab)) {
      setSelectedTab(tab as any);
    }
  }, []);

  const handleTabChange = (tab: 'home' | 'feed' | 'trending' | 'promo') => {
    setSelectedTab(tab);
    
    if (tab === 'feed') {
      window.location.href = '/feed';
    } else if (tab === 'trending' || tab === 'promo') {
      const newUrl = `${window.location.pathname}?tab=${tab}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const handleFilterChange = (filterType: string, value: string | boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    console.log('Applied Filters:', selectedFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSelectedFilters({
      priceRange: 'all',
      serviceType: 'all',
      rating: 'all',
      availability: 'now',
      verifiedOnly: false,
    });
  };

  return (
    <NavShell 
      selectedTab={selectedTab} 
     onTabChange={setSelectedTab} // ✅ Yeh pass karo
    >
      
      {/* 🏠 HOME TAB CONTENT */}
      {selectedTab === 'home' ? (
        <>
          {/* 🔝 TOP SECTION - FILTERS & LOCATION */}
          <div className="px-4 pt-4">
            {/* Location Bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-100 rounded-xl shadow-sm">
                  <span className="text-red-500">📍</span>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">Current Location</div>
                    <div className="text-xs text-gray-600">Delhi, India</div>
                  </div>
                  <button className="ml-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Change
                  </button>
                </div>
                
                <button className="p-3 bg-white border border-green-100 rounded-xl shadow-sm hover:bg-green-50">
                  <span className="text-lg">🎯</span>
                  <div className="text-xs mt-1 text-gray-600">Nearby</div>
                </button>
              </div>
              
              {/* Filter Toggle Button */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-purple-100 rounded-xl shadow-sm hover:bg-purple-50"
              >
                <span className="text-purple-600 text-lg">⚙️</span>
                <span className="font-medium text-sm text-purple-700">Filters</span>
                {Object.values(selectedFilters).some(val => 
                  val !== 'all' && val !== 'now' && val !== false
                ) && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
            </div>

            {/* FILTERS PANEL */}
            {showFilters && (
              <div className="mb-4 bg-white border border-blue-200 rounded-xl shadow-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">🔍 Search Filters</h3>
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">💰 Price Range</label>
                    <select 
                      value={selectedFilters.priceRange}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      className="w-full p-2 border border-blue-200 rounded-lg text-sm bg-white"
                    >
                      <option value="all">All Prices</option>
                      <option value="low">Budget (₹0-500)</option>
                      <option value="medium">Standard (₹500-2000)</option>
                      <option value="high">Premium (₹2000+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📦 Service Type</label>
                    <select 
                      value={selectedFilters.serviceType}
                      onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                      className="w-full p-2 border border-green-200 rounded-lg text-sm bg-white"
                    >
                      <option value="all">All Types</option>
                      <option value="booking">Booking Only</option>
                      <option value="purchase">Purchase Only</option>
                      <option value="rent">Rent Only</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">⭐ Rating</label>
                    <select 
                      value={selectedFilters.rating}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                      className="w-full p-2 border border-yellow-200 rounded-lg text-sm bg-white"
                    >
                      <option value="all">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">⏰ Availability</label>
                    <select 
                      value={selectedFilters.availability}
                      onChange={(e) => handleFilterChange('availability', e.target.value)}
                      className="w-full p-2 border border-orange-200 rounded-lg text-sm bg-white"
                    >
                      <option value="now">Available Now</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="anytime">Anytime</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="verifiedOnly"
                    checked={selectedFilters.verifiedOnly}
                    onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-blue-300"
                  />
                  <label htmlFor="verifiedOnly" className="ml-2 text-sm text-gray-700">
                    ✅ Show Verified Sellers Only
                  </label>
                </div>
                
                <button 
                  onClick={applyFilters}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90"
                >
                  Apply Filters
                </button>
              </div>
            )}

            {/* MAIN SEARCH BAR */}
            <div className="relative mb-6">
              <div className="flex bg-white border border-blue-300 rounded-2xl shadow-sm overflow-hidden">
                <input
                  type="text"
                  placeholder="What service do you need? (AC repair, doctor, grocery delivery, electrician...)"
                  className="flex-1 px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 font-semibold hover:opacity-90 min-w-[120px]">
                  Search
                </button>
              </div>
              
              {/* Quick Search Tips */}
              <div className="mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-blue-600 font-medium">🔥 Popular now:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { text: 'AC Repair Summer Special', tag: '⚡ 30% OFF' },
                    { text: 'Doctor Home Visit', tag: '🏥 24x7' },
                    { text: 'Instant Grocery Delivery', tag: '🚚 30 min' },
                    { text: 'Emergency Electrician', tag: '⚠️ Urgent' },
                  ].map((item, index) => (
                    <button 
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                    >
                      <span>{item.text}</span>
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="px-4 space-y-8 pb-24">
            <QuickSearchChips />
            
            {/* Active Filters Bar */}
            {Object.values(selectedFilters).some(val => val !== 'all' && val !== 'now' && val !== false) && (
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <span className="text-sm font-medium text-blue-700">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedFilters.priceRange !== 'all' && (
                    <span className="px-2 py-1 bg-white text-blue-600 text-xs rounded-full border border-blue-200">
                      💰 {selectedFilters.priceRange === 'low' ? 'Budget' : selectedFilters.priceRange === 'medium' ? 'Standard' : 'Premium'}
                    </span>
                  )}
                  {selectedFilters.serviceType !== 'all' && (
                    <span className="px-2 py-1 bg-white text-green-600 text-xs rounded-full border border-green-200">
                      📦 {selectedFilters.serviceType}
                    </span>
                  )}
                  {selectedFilters.rating !== 'all' && (
                    <span className="px-2 py-1 bg-white text-yellow-600 text-xs rounded-full border border-yellow-200">
                      ⭐ {selectedFilters.rating}+
                    </span>
                  )}
                  {selectedFilters.verifiedOnly && (
                    <span className="px-2 py-1 bg-white text-blue-600 text-xs rounded-full border border-blue-200">
                      ✅ Verified Only
                    </span>
                  )}
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 ml-2"
                  >
                    ✕ Clear all
                  </button>
                </div>
              </div>
            )}
            
            {/* 🚀 ROW 1: Top Services */}
            <HorizontalServiceRow 
              title="📍 Services in Your Area"
              type="BOOK"
              services={servicesRow1}
            />
            
            {/* 🍽️ ROW 2: Food & Dining */}
            <HorizontalServiceRow 
              title="🍽️ Food & Dining"
              type="PURCHASE"
              services={foodRow2}
            />
            
            {/* 🛒 ROW 3: Grocery Essentials */}
            <HorizontalServiceRow 
              title="🛒 Grocery Essentials"
              type="PURCHASE"
              services={groceryRow3}
            />
            
            {/* 🏆 ROW 4: 17 Categories - HORIZONTAL SCROLL */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">🏆 All Service Categories</h2>
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium">
                    17 Categories
                  </span>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  View All →
                </button>
              </div>
              
              {/* HORIZONTAL SCROLL FOR 17 CATEGORIES */}
              <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
                {allServiceCategories.map((category) => (
                  <button
                    key={category.id}
                    className="flex-shrink-0 w-28 bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-full ${category.color.split(' ')[0]} border ${category.color.split('border ')[1]} flex items-center justify-center mb-2`}>
                        <span className="text-xl">{category.icon}</span>
                      </div>
                      <span className="font-medium text-gray-900 text-xs">{category.name}</span>
                    </div>
                  </button>
                ))}
                
                {/* View All Card */}
                <div className="flex-shrink-0 w-28 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-2 border border-blue-300">
                    <span className="text-xl text-blue-600">→</span>
                  </div>
                  <span className="font-semibold text-gray-900 text-xs text-center">View All</span>
                </div>
              </div>
            </div>
            
            <TrustBadgesSection />
            <AppDownloadBanner />
          </div>
        </>
      ) : selectedTab === 'trending' ? (
        <TrendingContent />
      ) : selectedTab === 'promo' ? (
        <PromoContent />
      ) : (
        // Feed redirect
        <div className="px-4 py-12 text-center">
          <div className="text-4xl mb-4">📰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Going to Seller Feed</h2>
          <button 
            onClick={() => window.location.href = '/feed'}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Go to Feed Page →
          </button>
        </div>
      )}
    </NavShell>
  );
}

// 🔥 TRENDING CONTENT COMPONENT - COMPLETE VERSION
function TrendingContent() {
  const trendingServices = [
    { id: 1, name: 'Monsoon AC Service', category: 'AC Repair', trendingScore: '🔥 98%', deals: '50+ booked today', icon: '❄️', color: 'bg-blue-50 border-blue-100' },
    { id: 2, name: 'Emergency Electrician', category: 'Electrician', trendingScore: '⚡ 95%', deals: '40+ booked', icon: '⚡', color: 'bg-yellow-50 border-yellow-100' },
    { id: 3, name: 'Home Cleaning Package', category: 'Cleaning', trendingScore: '🧹 92%', deals: '80+ booked', icon: '🧹', color: 'bg-gray-50 border-gray-100' },
    { id: 4, name: 'Pizza Mania', category: 'Food', trendingScore: '🍕 96%', deals: '120+ orders', icon: '🍕', color: 'bg-red-50 border-red-100' },
    { id: 5, name: 'Vegetable Combo', category: 'Grocery', trendingScore: '🥦 90%', deals: '200+ orders', icon: '🥦', color: 'bg-green-50 border-green-100' },
    { id: 6, name: 'Doctor Video Consult', category: 'Healthcare', trendingScore: '👨‍⚕️ 97%', deals: '60+ bookings', icon: '👨‍⚕️', color: 'bg-emerald-50 border-emerald-100' },
  ];

  const trendingSellers = [
    { id: 1, name: 'CoolAC Services', category: 'AC Repair', rating: 4.9, verified: true, trending: true, deals: 'Summer Special 30% OFF' },
    { id: 2, name: 'Foodie Express', category: 'Food Delivery', rating: 4.8, verified: true, trending: true, deals: 'Free Delivery' },
    { id: 3, name: 'Green Grocers', category: 'Grocery', rating: 4.7, verified: true, trending: true, deals: 'Fresh Vegetables Daily' },
    { id: 4, name: 'HealthFirst Doctors', category: 'Healthcare', rating: 4.9, verified: true, trending: false, deals: '24/7 Available' },
    { id: 5, name: 'QuickFix Electricians', category: 'Electrician', rating: 4.6, verified: true, trending: true, deals: 'Emergency Service' },
  ];

  return (
    <div className="px-4 py-6">
      {/* Trending Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trending Now</h1>
            <p className="text-gray-600 text-sm">Most popular services & sellers in your area</p>
          </div>
        </div>

        {/* Trending Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="text-blue-700 font-bold text-lg">150+</div>
            <div className="text-blue-600 text-sm">Trending Services</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="text-green-700 font-bold text-lg">89%</div>
            <div className="text-green-600 text-sm">Positive Growth</div>
          </div>
        </div>
      </div>

      {/* Trending Services */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">🔥 Hot Services Right Now</h2>
          <button className="text-blue-600 text-sm font-medium">View All →</button>
        </div>
        
        <div className="space-y-4">
          {trendingServices.map((service) => (
            <div key={service.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${service.color} flex items-center justify-center`}>
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-orange-600 font-bold">{service.trendingScore}</div>
                  <div className="text-xs text-gray-500">{service.deals}</div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-lg hover:opacity-90">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Sellers */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">⭐ Top Trending Sellers</h2>
          <button className="text-blue-600 text-sm font-medium">View All →</button>
        </div>
        
        <div className="space-y-4">
          {trendingSellers.map((seller) => (
            <div key={seller.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-lg">🏪</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{seller.name}</h3>
                      {seller.verified && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">✓ Verified</span>
                      )}
                      {seller.trending && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">🔥 Trending</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{seller.category}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-medium">{seller.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-600 font-medium">{seller.deals}</div>
                  <button className="mt-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Categories */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">📈 Trending Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {['AC Repair', 'Food Delivery', 'Grocery', 'Healthcare', 'Home Cleaning', 'Electrician'].map((category, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md">
              <div className="text-2xl mb-2">
                {index === 0 ? '❄️' : index === 1 ? '🍕' : index === 2 ? '🛒' : index === 3 ? '👨‍⚕️' : index === 4 ? '🧹' : '⚡'}
              </div>
              <h3 className="font-medium text-gray-900">{category}</h3>
              <p className="text-xs text-gray-500 mt-1">+{Math.floor(Math.random() * 50) + 30}% growth</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 🎉 PROMO CONTENT COMPONENT - COMPLETE VERSION
function PromoContent() {
  const activePromos = [
    { 
      id: 1, 
      title: 'Summer AC Special', 
      discount: '30% OFF', 
      code: 'ACCOOL30', 
      valid: 'Valid till 30 June', 
      description: 'On all AC repair & servicing',
      color: 'bg-gradient-to-r from-blue-100 to-cyan-100',
      icon: '❄️',
      category: 'Services'
    },
    { 
      id: 2, 
      title: 'First Food Order', 
      discount: '₹100 OFF', 
      code: 'FOOD100', 
      valid: 'For new users', 
      description: 'Minimum order ₹299',
      color: 'bg-gradient-to-r from-red-100 to-orange-100',
      icon: '🍕',
      category: 'Food'
    },
    { 
      id: 3, 
      title: 'Grocery Welcome Offer', 
      discount: '20% OFF', 
      code: 'GROCERY20', 
      valid: 'Today only', 
      description: 'On all grocery orders',
      color: 'bg-gradient-to-r from-green-100 to-emerald-100',
      icon: '🛒',
      category: 'Grocery'
    },
    { 
      id: 4, 
      title: 'Doctor Home Visit', 
      discount: '₹200 OFF', 
      code: 'DOC200', 
      valid: 'Weekend special', 
      description: 'On doctor home consultation',
      color: 'bg-gradient-to-r from-purple-100 to-pink-100',
      icon: '👨‍⚕️',
      category: 'Healthcare'
    },
    { 
      id: 5, 
      title: 'Salon at Home', 
      discount: '25% OFF', 
      code: 'SALON25', 
      valid: 'Limited time', 
      description: 'On all salon services',
      color: 'bg-gradient-to-r from-pink-100 to-rose-100',
      icon: '💇',
      category: 'Beauty'
    },
    { 
      id: 6, 
      title: 'Electrician Emergency', 
      discount: '₹150 OFF', 
      code: 'FIXIT150', 
      valid: '24/7 available', 
      description: 'On emergency electrician service',
      color: 'bg-gradient-to-r from-yellow-100 to-amber-100',
      icon: '⚡',
      category: 'Services'
    },
  ];

  const featuredPromos = [
    { id: 1, title: 'Monsoon Cleaning Package', discount: '40% OFF', tag: 'Most Popular', icon: '🧹' },
    { id: 2, title: 'Healthy Food Combo', discount: 'Buy 1 Get 1', tag: 'Limited Offer', icon: '🥗' },
    { id: 3, title: 'Annual Maintenance', discount: 'Save ₹2000', tag: 'Best Value', icon: '🔧' },
  ];

  return (
    <div className="px-4 py-6">
      {/* Promo Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Promotions & Offers</h1>
            <p className="text-gray-600 text-sm">Exclusive deals and discounts for you</p>
          </div>
        </div>

        {/* Promo Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-purple-200 rounded-xl p-3 text-center">
            <div className="text-purple-700 font-bold text-lg">12</div>
            <div className="text-purple-600 text-xs">Active Offers</div>
          </div>
          <div className="bg-white border border-green-200 rounded-xl p-3 text-center">
            <div className="text-green-700 font-bold text-lg">₹850</div>
            <div className="text-green-600 text-xs">Total Savings</div>
          </div>
          <div className="bg-white border border-blue-200 rounded-xl p-3 text-center">
            <div className="text-blue-700 font-bold text-lg">5</div>
            <div className="text-blue-600 text-xs">Used Today</div>
          </div>
        </div>
      </div>

      {/* Featured Promos */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ Featured Promotions</h2>
        <div className="grid grid-cols-1 gap-4">
          {featuredPromos.map((promo) => (
            <div key={promo.id} className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">{promo.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{promo.title}</h3>
                    <p className="text-sm opacity-90">{promo.discount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-white/30 px-2 py-1 rounded-full">{promo.tag}</span>
                  <button className="mt-2 px-4 py-1.5 bg-white text-purple-600 text-sm font-bold rounded-lg hover:bg-gray-100">
                    Grab Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Active Promos */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">🎁 All Active Offers</h2>
          <button className="text-blue-600 text-sm font-medium">View All →</button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {activePromos.map((promo) => (
            <div key={promo.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full ${promo.color} flex items-center justify-center`}>
                    <span className="text-xl">{promo.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{promo.category}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{promo.description}</p>
                    <p className="text-xs text-gray-500">{promo.valid}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{promo.discount}</div>
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-900 mb-1">Use Code:</div>
                    <div className="text-lg font-bold text-purple-600">{promo.code}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  Active Now
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50">
                    Save
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use Promo Codes */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">📝 How to Use Promo Codes</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">1</div>
            <div>
              <h4 className="font-medium text-gray-900">Copy the promo code</h4>
              <p className="text-sm text-gray-600">Tap on the code to copy it automatically</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">2</div>
            <div>
              <h4 className="font-medium text-gray-900">Add services to cart</h4>
              <p className="text-sm text-gray-600">Choose the service you want to book</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">3</div>
            <div>
              <h4 className="font-medium text-gray-900">Apply at checkout</h4>
              <p className="text-sm text-gray-600">Paste the code in the promo code section</p>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Promo Tips</h4>
            <p className="text-sm text-gray-700">
              • Only one promo code can be applied per order<br/>
              • Promo codes have expiry dates<br/>
              • Some codes are category-specific<br/>
              • Check minimum order value requirements
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}