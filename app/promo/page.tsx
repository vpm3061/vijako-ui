'use client';

import { useEffect, useState } from 'react';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase/client';

export default function PromoPage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('promo');
  const [activePromos, setActivePromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      // Fetch promotions (feed posts with offers)
      const { data: postsData } = await supabase
        .from('feed_posts')
        .select(`
          *,
          sellers (
            business_name
          )
        `)
        .or('post_type.eq.offer,is_promoted.eq.true')
        .order('created_at', { ascending: false });

      setActivePromos(postsData || []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyPromoCode = (title: string) => {
    const code = title.split(' ')[0].toUpperCase().replace(/[^A-Z]/g, '') + '10';
    navigator.clipboard.writeText(code);
    alert(`Promo code "${code}" copied!`);
  };

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Promotions & Offers</h1>
              <p className="text-gray-600 text-sm">Special deals from sellers</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white border border-purple-200 rounded-xl p-3 text-center">
              <div className="text-purple-700 font-bold text-lg">{activePromos.length}</div>
              <div className="text-purple-600 text-xs">Active Offers</div>
            </div>
            <div className="bg-white border border-green-200 rounded-xl p-3 text-center">
              <div className="text-green-700 font-bold text-lg">
                {activePromos.filter(p => p.discount_percent).length}
              </div>
              <div className="text-green-600 text-xs">With Discount</div>
            </div>
            <div className="bg-white border border-blue-200 rounded-xl p-3 text-center">
              <div className="text-blue-700 font-bold text-lg">
                {activePromos.filter(p => p.is_promoted).length}
              </div>
              <div className="text-blue-600 text-xs">Featured</div>
            </div>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🎁 Active Offers</h2>
          
          {loading ? (
            <div className="text-center py-8">Loading promotions...</div>
          ) : activePromos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-medium text-gray-900 mb-1">No active offers</h3>
              <p className="text-sm">Sellers will post promotions here</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>When available, you'll see:</p>
                <p>• Discount coupons</p>
                <p>• Limited time offers</p>
                <p>• Seasonal promotions</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {activePromos.map((promo) => (
                <div key={promo.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
                        <span className="text-xl">🎁</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{promo.title}</h3>
                          {promo.is_promoted && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{promo.content}</p>
                        <p className="text-xs text-gray-500">
                          by {promo.sellers?.business_name}
                        </p>
                        {promo.valid_until && (
                          <p className="text-xs text-gray-500 mt-1">
                            Valid till: {new Date(promo.valid_until).toLocaleDateString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                    {promo.discount_percent && (
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {promo.discount_percent}% OFF
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Active Now
                    </div>
                    <button 
                      onClick={() => copyPromoCode(promo.title)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90"
                    >
                      Get Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How to Use */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">📝 How to Use Offers</h3>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">1</div>
              <div>
                <h4 className="font-medium text-gray-900">Click "Get Offer"</h4>
                <p className="text-sm text-gray-600">Promo code will be copied</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">2</div>
              <div>
                <h4 className="font-medium text-gray-900">Book a Service</h4>
                <p className="text-sm text-gray-600">Go to the seller's service page</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">3</div>
              <div>
                <h4 className="font-medium text-gray-900">Apply at Checkout</h4>
                <p className="text-sm text-gray-600">Paste the code during booking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavShell>
  );
}