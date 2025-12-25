'use client';

import { useEffect, useState } from 'react';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase/client';

export default function ServicesPage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, [selectedCategory, sortBy]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('services')
        .select(`
          *,
          sellers!inner (
            business_name,
            rating,
            subscription_tier
          )
        `)
        .eq('is_active', true);

      // Filter by category
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Sort
      switch (sortBy) {
        case 'price_low':
          query = query.order('base_price', { ascending: true });
          break;
        case 'price_high':
          query = query.order('base_price', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        default: // popular
          query = query.order('view_count', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleBookService = async (serviceId: number) => {
    // TODO: Implement booking logic
    console.log('Booking service:', serviceId);
    alert('Booking functionality coming soon!');
  };

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">All Services</h1>
          <p className="text-gray-600">Browse and book premium services</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Category Filter */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${selectedCategory === cat.name ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Sort By</div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { value: 'popular', label: 'Most Popular' },
                { value: 'rating', label: 'Highest Rated' },
                { value: 'price_low', label: 'Price: Low to High' },
                { value: 'price_high', label: 'Price: High to Low' }
              ].map((sort) => (
                <button
                  key={sort.value}
                  onClick={() => setSortBy(sort.value as any)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${sortBy === sort.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-medium text-gray-900 mb-1">No services found</h3>
            <p className="text-sm">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {service.category}
                  </span>
                  {service.sellers?.subscription_tier === 'premium' && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                      Premium
                    </span>
                  )}
                </div>
                
                {/* Service Info */}
                <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{service.title}</h3>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">{service.description}</p>
                
                {/* Price & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <div className="font-bold text-blue-600">₹{service.base_price}</div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-xs">⭐</span>
                    <span className="text-xs">{service.rating || 4.0}</span>
                  </div>
                </div>
                
                {/* Seller Info */}
                <div className="text-xs text-gray-500 mb-3">
                  by {service.sellers?.business_name || 'Verified Seller'}
                </div>
                
                {/* Action Button */}
                <button 
                  onClick={() => handleBookService(service.id)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-lg hover:from-blue-600 hover:to-blue-700"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && services.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Showing {services.length} services
          </div>
        )}
      </div>
    </NavShell>
  );
}