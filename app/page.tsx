'use client';

import { useState, useEffect } from 'react';
import NavShell from '@/components/shared/NavShell';
import QuickSearchChips from '@/components/home/QuickSearchChips';
import HorizontalServiceRow from '@/components/home/HorizontalServiceRow';
import TrustBadgesSection from '@/components/home/TrustBadgesSection';
import AppDownloadBanner from '@/components/home/AppDownloadBanner';
import { supabase } from '@/lib/supabase/client';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [realServices, setRealServices] = useState<any[]>([]);
  const [realCategories, setRealCategories] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    setLoading(true);
    try {
      // 1. Fetch active services with seller info
      const { data: servicesData } = await supabase
        .from('services')
        .select(`
          *,
          sellers (
            business_name,
            rating
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(8);

      // 2. Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .limit(12);

      // 3. Fetch recent feed posts
      const { data: postsData } = await supabase
        .from('feed_posts')
        .select(`
          *,
          sellers!inner (
            business_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(3);

      setRealServices(servicesData || []);
      setRealCategories(categoriesData || []);
      setRecentPosts(postsData || []);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Top 5 categories (static - but based on your business focus)
  const preferredCategories = [
    { id: 1, name: '🏥 Health & Wellness', icon: '🏥', description: 'Doctors, Hospitals, Gym', color: 'bg-red-50 border-red-100' },
    { id: 2, name: '🎟️ Events & Talent', icon: '🎟️', description: 'Events, Photographers', color: 'bg-purple-50 border-purple-100' },
    { id: 3, name: '🎓 Education & Skills', icon: '🎓', description: 'Courses, Coaching', color: 'bg-blue-50 border-blue-100' },
    { id: 4, name: '💼 Business Services', icon: '💼', description: 'CA, Lawyers, IT', color: 'bg-green-50 border-green-100' },
    { id: 5, name: '✈️ Travel & Experiences', icon: '✈️', description: 'Hotels, Tours', color: 'bg-cyan-50 border-cyan-100' },
  ];

  // Function to create service rows from real data
  const createServiceRow = (categoryName: string, title: string, subtitle: string) => {
    const filteredServices = realServices.filter(service => 
      service.category === categoryName
    ).slice(0, 8);

    if (filteredServices.length === 0) return null;

    return (
      <HorizontalServiceRow 
        title={title}
        subtitle={subtitle}
        type="BOOK"
        services={filteredServices.map(service => ({
          id: service.id,
          name: service.title,
          icon: service.category === 'Healthcare & Wellness' ? '🏥' : 
                service.category === 'Events & Talent' ? '🎟️' : '💼',
          rating: service.rating || 4.0,
          price: `₹${service.base_price}`,
          time: 'Available',
          verified: true,
          color: 'bg-white border-gray-200',
          type: 'booking'
        }))}
      />
    );
  };

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      
      {/* HOME TAB CONTENT */}
      {selectedTab === 'home' ? (
        <>
          {/* TOP SECTION */}
          <div className="px-4 pt-4">
            {/* Location Bar */}
            <div className="flex items-center gap-2 mb-3">
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
            </div>

            {/* MAIN SEARCH BAR */}
            <div className="relative mb-4">
              <div className="flex bg-white border border-blue-300 rounded-2xl shadow-sm overflow-hidden">
                <input
                  type="text"
                  placeholder="Search for premium services (Doctor, Event, Course, Lawyer...)"
                  className="flex-1 px-6 py-4 text-gray-800 placeholder-gray-500 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 font-semibold hover:opacity-90 min-w-[120px]"
                >
                  Search
                </button>
              </div>
            </div>

            {/* HASHTAGS */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {['#Healthcare', '#Events', '#Education', '#Business', '#Travel', '#Premium'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 rounded-full text-sm text-gray-700 hover:text-blue-600"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="px-4 space-y-8 pb-24">
            <QuickSearchChips />
            
            {/* TOP 5 CATEGORIES */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">🎯 Premium Categories</h2>
                  <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full">
                    High-Value Focus
                  </span>
                </div>
              </div>
              
              <div className="flex overflow-x-auto gap-3 pb-4">
                {preferredCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className="flex-shrink-0 w-36 bg-white rounded-xl p-3 shadow-sm border hover:shadow-md"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{category.name}</span>
                      <span className="text-xs text-gray-500 mt-1">{category.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Healthcare Services Row (from real data) */}
            {createServiceRow('Healthcare & Wellness', '🏥 Healthcare Services', 'Doctors, Hospitals, Wellness')}
            
            {/* REAL SERVICES FROM DATABASE */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-gray-900">📍 Live Services Near You</h2>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {realServices.length} Available
                  </span>
                </div>
                {realServices.length > 0 && (
                  <button 
                    onClick={() => window.location.href = '/services'}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    View All →
                  </button>
                )}
              </div>
              
              {loading ? (
                <div className="text-center py-4">Loading services...</div>
              ) : realServices.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="font-medium text-gray-900 mb-1">No services available</h3>
                  <p className="text-sm">Services will appear here soon</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {realServices.map((service) => (
                    <div key={service.id} className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="font-bold text-gray-900 text-sm mb-1">{service.title}</div>
                      <div className="text-gray-600 text-xs mb-2 line-clamp-2">{service.description}</div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-blue-600">₹{service.base_price}</div>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-xs">⭐</span>
                          <span className="text-xs">{service.rating || 4.0}</span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        by {service.sellers?.business_name || 'Verified Seller'}
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-lg hover:from-blue-600 hover:to-blue-700">
                        Book Now
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RECENT FEED POSTS */}
            {recentPosts.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-gray-900">📢 Recent Updates</h2>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      From Sellers
                    </span>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/feed'}
                    className="text-blue-600 text-sm font-medium hover:text-blue-700"
                  >
                    View Feed →
                  </button>
                </div>
                
                <div className="space-y-3">
                  {recentPosts.slice(0, 2).map((post) => (
                    <div key={post.id} className="bg-white border rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-sm">🏪</span>
                        </div>
                        <div className="text-sm font-medium">{post.sellers?.business_name}</div>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{post.title}</h3>
                      <p className="text-gray-600 text-xs line-clamp-2">{post.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ALL CATEGORIES FROM DB */}
            {realCategories.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">🏆 All Categories</h2>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View All →
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {realCategories.slice(0, 12).map((category) => (
                    <button
                      key={category.id}
                      className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 text-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-1">
                        <span className="text-lg">{category.icon || '📌'}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-900">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <TrustBadgesSection />
            <AppDownloadBanner />
          </div>
        </>
      ) : selectedTab === 'trending' ? (
        <TrendingContent />
      ) : selectedTab === 'promo' ? (
        <PromoContent />
      ) : (
        <div className="px-4 py-12 text-center">
          <button 
            onClick={() => window.location.href = '/feed'}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
          >
            Go to Feed Page →
          </button>
        </div>
      )}
    </NavShell>
  );
}

// TRENDING CONTENT - WILL UPDATE NEXT
function TrendingContent() {
  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
            <span className="text-2xl">🔥</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Trending Now</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

// PROMO CONTENT - WILL UPDATE NEXT  
function PromoContent() {
  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
          </div>
        </div>
      </div>
    </div>
  );
}