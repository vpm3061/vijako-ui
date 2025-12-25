'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase/client';
import { Star, BadgeCheck, MapPin } from 'lucide-react';

type Tab = 'posts' | 'services' | 'packages' | 'about';

export default function SellerPublicProfile() {
  const { slug } = useParams<{ slug: string }>();

  const [seller, setSeller] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('posts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchSeller();
  }, [slug]);

  const fetchSeller = async () => {
    setLoading(true);

    const { data: sellerData } = await supabase
      .from('sellers')
      .select('*')
      .eq('slug', slug)
      .single();

    if (!sellerData) return setLoading(false);

    setSeller(sellerData);

    const [{ data: posts }, { data: services }, { data: packages }] =
      await Promise.all([
        supabase.from('feed_posts').select('*').eq('seller_id', sellerData.id),
        supabase.from('services').select('*').eq('seller_id', sellerData.id),
        supabase.from('packages').select('*').eq('seller_id', sellerData.id),
      ]);

    setPosts(posts || []);
    setServices(services || []);
    setPackages(packages || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <NavShell selectedTab="home" onTabChange={() => {}}>
        <div className="h-screen flex items-center justify-center">Loading…</div>
      </NavShell>
    );
  }

  if (!seller) {
    return (
      <NavShell selectedTab="home" onTabChange={() => {}}>
        <div className="h-screen flex items-center justify-center">
          Seller not found
        </div>
      </NavShell>
    );
  }

  return (
    <NavShell selectedTab="home" onTabChange={() => {}}>
      <div className="max-w-3xl mx-auto pb-24">

        {/* HEADER */}
        <div className="bg-white p-5 border-b">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl flex items-center justify-center">
              {seller.business_name?.[0]}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{seller.business_name}</h1>
                {seller.is_verified && (
                  <BadgeCheck className="text-blue-600 w-5 h-5" />
                )}
                {seller.subscription_tier === 'premium' && (
                  <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">
                    PREMIUM
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                @{seller.slug}
              </p>

              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-500" />
                  {seller.rating || 4.5}
                </span>
                {seller.service_areas && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {seller.service_areas.join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* BIO */}
          <p className="mt-4 text-gray-700">
            {seller.description || 'Verified professional on Vijako'}
          </p>
        </div>

        {/* TABS */}
        <div className="flex border-b bg-white sticky top-0 z-10">
          {['posts', 'services', 'packages', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`flex-1 py-3 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-4">

          {/* POSTS */}
          {activeTab === 'posts' &&
            (posts.length ? posts.map(post => (
              <div key={post.id} className="bg-white p-4 rounded-xl border">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-gray-700 mt-1">{post.content}</p>

                {post.media_urls?.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {post.media_urls.map((url: string) => (
                      <img key={url} src={url} className="rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
            )) : <p>No posts yet</p>)
          }

          {/* SERVICES */}
          {activeTab === 'services' &&
            services.map(service => (
              <div key={service.id} className="bg-white p-4 rounded-xl border">
                <h3 className="font-bold">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p className="mt-2 font-semibold text-blue-600">
                  ₹{service.base_price}
                </p>
              </div>
            ))
          }

          {/* PACKAGES */}
          {activeTab === 'packages' &&
            packages.map(pkg => (
              <div key={pkg.id} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border">
                <h3 className="font-bold">{pkg.title}</h3>
                <p className="text-sm">{pkg.description}</p>
                <p className="mt-2 font-bold">₹{pkg.price}</p>
              </div>
            ))
          }

          {/* ABOUT */}
          {activeTab === 'about' && (
            <div className="bg-white p-4 rounded-xl border">
              <p><b>Profession:</b> {seller.profession}</p>
              <p className="mt-2"><b>Categories:</b> {seller.categories?.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </NavShell>
  );
}
