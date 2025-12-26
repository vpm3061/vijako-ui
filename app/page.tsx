'use client';

import { useState, useEffect } from 'react';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase/client';
import { Search, Star, MapPin, Clock, CheckCircle, TrendingUp, Award, Shield } from 'lucide-react';

export default function HomePage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [experts, setExperts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [trendingHashtags, setTrendingHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('Lucknow, Uttar Pradesh');

  // Fetch data from backend
  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch verified experts from database
      const { data: expertsData } = await supabase
        .from('sellers')
        .select(`
          id,
          business_name,
          handle,
          profession,
          rating,
          trust_score,
          subscription_tier,
          expert_type,
          categories,
          profile_image_url,
          is_verified,
          verification_status,
          business_type
        `)
        .eq('is_active', true)
        .order('trust_score', { ascending: false })
        .limit(12);

      // 2. Fetch categories (only 8 core ones)
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
        .limit(8);

      // 3. Fetch trending hashtags (from posts)
      const { data: hashtagsData } = await supabase
        .from('feed_posts')
        .select('hashtags')
        .not('hashtags', 'is', null)
        .limit(10);

      // Process hashtags
      const hashtags = new Set<string>();
      hashtagsData?.forEach(post => {
        if (post.hashtags && Array.isArray(post.hashtags)) {
          post.hashtags.forEach((tag: string) => hashtags.add(tag));
        }
      });

      setExperts(expertsData || []);
      setCategories(categoriesData || []);
      setTrendingHashtags(Array.from(hashtags).slice(0, 12));
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  // Core categories for horizontal line (अगर database में नहीं है)
  const coreCategories = [
    { id: 1, name: '🏥 Institute/Hospital', slug: 'hospitals', color: 'bg-red-50', icon: '🏥', type: 'hospital' },
    { id: 2, name: '💼 Law Firm', slug: 'law-firms', color: 'bg-blue-50', icon: '⚖️', type: 'law' },
    { id: 3, name: '📊 CA Firm', slug: 'ca-firms', color: 'bg-green-50', icon: '📊', type: 'ca' },
    { id: 4, name: '💪 Gym/Fitness', slug: 'gyms', color: 'bg-purple-50', icon: '💪', type: 'gym' },
    { id: 5, name: '🎬 Film Production', slug: 'film-production', color: 'bg-yellow-50', icon: '🎬', type: 'film' },
    { id: 6, name: '🏢 IT Firm', slug: 'it-firms', color: 'bg-cyan-50', icon: '💻', type: 'it' },
    { id: 7, name: '🎓 Coaching Institute', slug: 'coaching-institutes', color: 'bg-pink-50', icon: '🎓', type: 'coaching' },
    { id: 8, name: '🛠️ Repair Services', slug: 'repair-services', color: 'bg-indigo-50', icon: '🛠️', type: 'repair' },
  ];

  // Quick Search Chips (स्टैटिक डेटा)
  const quickSearchOptions = [
    { id: 1, text: 'Best Lawyer', icon: '⚖️' },
    { id: 2, text: 'Top Doctor', icon: '👨‍⚕️' },
    { id: 3, text: 'CA Near Me', icon: '📊' },
    { id: 4, text: 'Gym Trainer', icon: '💪' },
    { id: 5, text: 'Math Tutor', icon: '➕' },
    { id: 6, text: 'Event Planner', icon: '🎉' },
    { id: 7, text: 'Home Design', icon: '🏠' },
    { id: 8, text: 'Tax Consultant', icon: '💰' },
  ];

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      {/* MAIN CONTENT - Inside NavShell */}
      <div className="px-4 pb-24 pt-4">
        {/* ===== LOCATION SECTION ===== */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-white border border-blue-100 rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700">Current Location</div>
                <div className="font-bold text-gray-900">{location}</div>
              </div>
            </div>
            <button 
              onClick={() => {
                const newLocation = prompt('Enter your location:', location);
                if (newLocation) setLocation(newLocation);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:opacity-90"
            >
              Change
            </button>
          </div>
        </div>

        {/* ===== MAIN SEARCH BAR ===== */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="relative mb-4">
            <div className="flex bg-white border-2 border-blue-400 rounded-xl shadow-lg overflow-hidden">
              <input
                type="text"
                placeholder="🔍 Search institute, hospital, gym, lawyer, CA firm, film production..."
                className="flex-1 px-4 py-4 text-gray-800 placeholder-gray-600 focus:outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 font-bold hover:opacity-90 text-sm min-w-[100px]"
              >
                Search
              </button>
            </div>
          </form>

          {/* ===== HASHTAGS QUICK SEARCH ===== */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <div className="text-sm font-bold text-gray-900">Trending Hashtags</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingHashtags.length > 0 ? (
                trendingHashtags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(tag.replace('#', ''))}
                    className="px-3 py-2 bg-white border border-gray-300 hover:border-blue-500 rounded-lg text-xs font-medium text-gray-800 hover:text-blue-600 hover:shadow-md"
                  >
                    {tag}
                  </button>
                ))
              ) : (
                // Fallback hashtags
                ['#Hospital', '#LawFirm', '#CA', '#Gym', '#FilmProduction', '#ITCompany', '#Coaching', '#Startup', '#Consultant', '#Doctor', '#Lawyer', '#Designer'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag.replace('#', ''))}
                    className="px-3 py-2 bg-white border border-gray-300 hover:border-blue-500 rounded-lg text-xs font-medium text-gray-800 hover:text-blue-600 hover:shadow-md"
                  >
                    {tag}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ===== QUICK SEARCH CHIPS ===== */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-orange-600" />
              <div className="text-sm font-bold text-gray-900">Quick Search</div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickSearchOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSearchQuery(option.text)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 hover:border-blue-400 rounded-xl text-sm font-medium text-gray-800 hover:text-blue-700 hover:shadow-sm"
                >
                  <span className="text-base">{option.icon}</span>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== HORIZONTAL CATEGORIES LINE ===== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">🏢 Browse by Type</h2>
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full">
                Business Types
              </span>
            </div>
            <button className="text-blue-600 text-sm font-medium">View All</button>
          </div>
          
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-2 px-2">
            {(categories.length > 0 ? categories.map(cat => ({
              ...cat,
              icon: '🏢',
              color: 'bg-gray-50'
            })) : coreCategories).map((category) => (
              <button
                key={category.id}
                onClick={() => window.location.href = `/category/${category.slug || category.name.toLowerCase()}`}
                className="flex-shrink-0 w-40 bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-3 border-2 border-white shadow-sm`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm mb-1">{category.name}</span>
                  <span className="text-xs text-gray-500">Verified {category.type || 'Businesses'}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== TRENDING EXPERTS ===== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">⭐ Verified Experts</h2>
              <span className="text-xs px-2 py-1 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full">
                Book Directly
              </span>
            </div>
            <button className="text-blue-600 text-sm font-medium">See All</button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-3 text-sm">Loading verified experts...</p>
            </div>
          ) : experts.length === 0 ? (
            <div className="text-center py-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
              <div className="text-5xl mb-4">👨‍💼</div>
              <h3 className="font-bold text-gray-900 mb-2">No experts available yet</h3>
              <p className="text-sm text-gray-600 mb-4">Be the first verified expert in your city</p>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-sm">
                Become Verified Expert
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {experts.slice(0, 8).map((expert) => (
                <div key={expert.id} className="bg-white border rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    {/* Left: Expert Info */}
                    <div className="flex items-start gap-4 flex-1">
                      {/* Profile Avatar */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {expert.business_name?.[0] || 'E'}
                        </div>
                        {expert.is_verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* Details */}
                      <div className="flex-1">
                        {/* Name and Handle */}
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-base">{expert.business_name}</h3>
                          <span className="text-blue-600 font-medium text-sm">
                            @{expert.handle || expert.id.slice(0, 8)}
                          </span>
                        </div>
                        
                        {/* Profession & Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-sm text-gray-700 font-medium">{expert.profession || expert.business_type || 'Verified Expert'}</span>
                          <div className="flex items-center gap-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              expert.subscription_tier === 'elite' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' :
                              expert.subscription_tier === 'pro' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' :
                              'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                            }`}>
                              {expert.subscription_tier === 'elite' ? '⭐ Elite' :
                               expert.subscription_tier === 'pro' ? '🔥 Pro' : '✓ Verified'}
                            </span>
                            {expert.verification_status === 'verified' && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                                ✅ Trusted
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Stats Row */}
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                            <span className="font-medium">{expert.rating || '4.5'}</span>
                            <span className="text-gray-400">rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3.5 h-3.5 text-blue-500" />
                            <span className="font-medium">Trust: {expert.trust_score || 85}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>15 min response</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right: CTA Button */}
                    <button 
                      onClick={() => window.location.href = `/expert/${expert.handle || expert.id}`}
                      className="ml-4 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold rounded-xl hover:opacity-90 shadow-md hover:shadow-lg"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== POPULAR CATEGORIES (Second Horizontal Line) ===== */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">📈 Popular Right Now</h2>
          
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide -mx-2 px-2">
            {[
              { id: 1, name: '🏥 Multi-Speciality Hospitals', count: '45+ Verified', color: 'bg-gradient-to-r from-red-50 to-pink-50', icon: '🏥' },
              { id: 2, name: '⚖️ Corporate Law Firms', count: '38+ Verified', color: 'bg-gradient-to-r from-blue-50 to-cyan-50', icon: '⚖️' },
              { id: 3, name: '📊 CA & Tax Consultancies', count: '52+ Verified', color: 'bg-gradient-to-r from-green-50 to-emerald-50', icon: '📊' },
              { id: 4, name: '💪 Premium Gyms & Trainers', count: '28+ Verified', color: 'bg-gradient-to-r from-purple-50 to-violet-50', icon: '💪' },
              { id: 5, name: '🎬 Film & Media Studios', count: '19+ Verified', color: 'bg-gradient-to-r from-yellow-50 to-amber-50', icon: '🎬' },
              { id: 6, name: '💻 IT & Software Companies', count: '41+ Verified', color: 'bg-gradient-to-r from-indigo-50 to-blue-50', icon: '💻' },
            ].map((category) => (
              <div
                key={category.id}
                className="flex-shrink-0 w-56 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg hover:border-blue-300"
              >
                <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-3`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-gray-600 mb-3">{category.count}</p>
                <button className="w-full py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-800 text-xs font-bold rounded-lg border border-gray-300">
                  Browse All
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ===== APP DOWNLOAD BANNER ===== */}
        <div className="mb-8 bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-6"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <h3 className="text-xl font-bold">VIJAKO App Download Karein</h3>
                </div>
                <p className="text-blue-200 text-sm mb-6">
                  Verified experts se direct connect • Instant booking •<br/>
                  QR code se follow • Secure payments
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="px-5 py-3 bg-white text-blue-900 rounded-xl font-bold text-sm hover:bg-gray-100 flex items-center gap-2">
                    <span className="text-lg">📥</span>
                    Google Play
                  </button>
                  <button className="px-5 py-3 bg-black text-white rounded-xl font-bold text-sm hover:bg-gray-900 flex items-center gap-2">
                    <span className="text-lg">📱</span>
                    App Store
                  </button>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-3">📲</div>
                <div className="w-32 h-32 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <div className="text-4xl">🔳</div>
                </div>
                <p className="text-xs text-blue-300">Scan QR code to download app</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== TRUST BADGES ===== */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">VIJAKO Pe Bharosa Kyun?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">100% Verified</p>
              <p className="text-xs text-gray-600">Document Checked Experts</p>
            </div>
            <div className="text-center bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">₹</span>
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">Secure Payment</p>
              <p className="text-xs text-gray-600">Escrow Protection</p>
            </div>
            <div className="text-center bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-7 h-7 text-purple-600 fill-current" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">Genuine Reviews</p>
              <p className="text-xs text-gray-600">Booking Ke Baad Hi</p>
            </div>
            <div className="text-center bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md">
              <div className="w-14 h-14 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-7 h-7 text-orange-600" />
              </div>
              <p className="font-bold text-gray-900 text-sm mb-1">Quick Response</p>
              <p className="text-xs text-gray-600">Avg. 15 Minutes</p>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <div className="text-center mb-8">
          <h3 className="font-bold text-gray-900 text-lg mb-2">Ready to Book a Trusted Expert?</h3>
          <p className="text-gray-600 text-sm mb-6">Search, Verify, Book - All in One App</p>
          <button 
            onClick={handleSearch}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 shadow-lg hover:shadow-xl text-base"
          >
            🔍 Start Searching Now
          </button>
        </div>
      </div>
    </NavShell>
  );
}