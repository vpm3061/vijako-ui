'use client';

import { useEffect, useState } from 'react';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase/client';

export default function FeedPage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('feed');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  const fetchFeedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('feed_posts')
        .select(`
          *,
          sellers (
            business_name,
            rating
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching posts:', error);
      }
      setPosts(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
            <span className="text-2xl">📰</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Seller Feed</h1>
            <p className="text-gray-600 text-sm">Updates from premium sellers</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="font-medium text-gray-900 mb-1">No posts yet</h3>
            <p className="text-sm">Sellers will post updates here soon</p>
            <div className="mt-4 text-sm text-gray-600">
              <p>When sellers create posts, you'll see:</p>
              <p>• Offers & Discounts</p>
              <p>• Service Announcements</p>
              <p>• Tips & Updates</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Seller Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">🏪</span>
                  </div>
                  <div>
                    <div className="font-bold">{post.sellers?.business_name || 'Seller'}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Post Content */}
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-3">{post.content}</p>
                
                {/* Offer Badge */}
                {post.post_type === 'offer' && post.discount_percent && (
                  <div className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold mb-3">
                    🎁 {post.discount_percent}% OFF
                  </div>
                )}
                
                {/* Promoted Badge */}
                {post.is_promoted && (
                  <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold ml-2">
                    🔥 Promoted
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                    <span>❤️</span>
                    <span>{post.like_count || 0}</span>
                  </button>
                  <button className="text-gray-600 hover:text-blue-500">
                    💬 Contact Seller
                  </button>
                  <button className="text-gray-600 hover:text-green-500">
                    🔖 Save ({post.save_count || 0})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NavShell>
  );
}