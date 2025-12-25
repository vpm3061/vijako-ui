'use client';

import { useEffect, useState } from 'react';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase/client';

export default function TrendingPage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('trending');
  const [trendingServices, setTrendingServices] = useState<any[]>([]);
  const [trendingSellers, setTrendingSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingData();
  }, []);

  const fetchTrendingData = async () => {
    try {
      // Fetch services (trending = most viewed/recent)
      const { data: servicesData } = await supabase
        .from('services')
        .select(`
          *,
          sellers (
            business_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(8);

      // Fetch top sellers
      const { data: sellersData } = await supabase
        .from('sellers')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setTrendingServices(servicesData || []);
      setTrendingSellers(sellersData || []);
    } catch (error) {
      console.error('Error fetching trending:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trending Now</h1>
              <p className="text-gray-600 text-sm">Popular services & sellers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-blue-700 font-bold text-lg">{trendingServices.length}</div>
              <div className="text-blue-600 text-sm">Active Services</div>
            </div>
            <div className="bg-white border border-green-200 rounded-xl p-4 text-center">
              <div className="text-green-700 font-bold text-lg">{trendingSellers.length}</div>
              <div className="text-green-600 text-sm">Verified Sellers</div>
            </div>
          </div>
        </div>

        {/* Trending Services */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">🔥 Trending Services</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : trendingServices.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-medium text-gray-900 mb-1">No trending services yet</h3>
              <p className="text-sm">Services will appear as they gain popularity</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {trendingServices.map((service) => (
                <div key={service.id} className="bg-white border rounded-xl p-3 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{service.title}</h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{service.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-blue-600 text-sm">₹{service.base_price}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-xs">⭐</span>
                      <span className="text-xs">{service.rating || 4.0}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {service.sellers?.business_name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Sellers */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">⭐ Top Sellers</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : trendingSellers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="font-medium text-gray-900 mb-1">No sellers yet</h3>
              <p className="text-sm">Sellers will appear after registration</p>
            </div>
          ) : (
            <div className="space-y-3">
              {trendingSellers.map((seller) => (
                <div key={seller.id} className="bg-white border rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600">🏪</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{seller.business_name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                            {seller.business_type}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-500 text-xs">⭐</span>
                            <span className="text-xs">{seller.rating || 4.0}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-600">{seller.total_orders || 0} orders</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </NavShell>
  );
}