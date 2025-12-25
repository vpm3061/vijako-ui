'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';
import Link from 'next/link';

type Stats = {
  totalOrders: number;
  totalEarnings: number;
  activeServices: number;
  pendingOrders: number;
  publishedBlogs: number;
  totalViews: number;
};

type RecentActivity = {
  id: string;
  type: 'order' | 'service' | 'blog' | 'post';
  title: string;
  description: string;
  time: string;
  icon: string;
};

export default function SellerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  
  const { user, seller, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    totalEarnings: 0,
    activeServices: 0,
    pendingOrders: 0,
    publishedBlogs: 0,
    totalViews: 0,
  });
  
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickStats, setQuickStats] = useState({
    profileViews: 0,
    profileCompletion: 0,
  });

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.replace('/login');
      return;
    }
    
    if (!seller) {
      router.replace('/seller/registration');
      return;
    }
    
    loadDashboardData();
    loadRecentActivity();
    loadQuickStats();
  }, [user, seller, authLoading, router]);

  /* ---------------- LOAD DASHBOARD STATS ---------------- */
  const loadDashboardData = async () => {
    if (!seller) return;
    
    setLoading(true);
    try {
      // Load stats in parallel
      const [
        servicesRes,
        ordersRes,
        blogsRes,
        earningsRes,
        pendingOrdersRes,
        viewsRes,
      ] = await Promise.all([
        // Active services count
        supabase
          .from('services')
          .select('id', { count: 'exact' })
          .eq('seller_id', seller.id)
          .eq('is_active', true),

        // Total orders count
        supabase
          .from('orders')
          .select('id', { count: 'exact' })
          .eq('seller_id', seller.id),

        // Published blogs count
        supabase
          .from('blogs')
          .select('id', { count: 'exact' })
          .eq('seller_id', seller.id)
          .eq('status', 'published'),

        // Total earnings (sum of order amounts)
        supabase
          .from('orders')
          .select('total_amount')
          .eq('seller_id', seller.id),

        // Pending orders count
        supabase
          .from('orders')
          .select('id', { count: 'exact' })
          .eq('seller_id', seller.id)
          .eq('status', 'pending'),

        // Total views (services + blogs)
        supabase
          .from('services')
          .select('view_count')
          .eq('seller_id', seller.id),
      ]);

      // Calculate total earnings
      const totalEarnings = earningsRes.data?.reduce((sum, order) => 
        sum + (parseFloat(order.total_amount.toString()) || 0), 0
      ) || 0;

      // Calculate total views
      const serviceViews = viewsRes.data?.reduce((sum, service) => 
        sum + (service.view_count || 0), 0
      ) || 0;

      setStats({
        totalOrders: ordersRes.count || 0,
        totalEarnings,
        activeServices: servicesRes.count || 0,
        pendingOrders: pendingOrdersRes.count || 0,
        publishedBlogs: blogsRes.count || 0,
        totalViews: serviceViews,
      });

    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- LOAD RECENT ACTIVITY ---------------- */
  const loadRecentActivity = async () => {
    if (!seller) return;

    try {
      // Get recent orders
      const { data: recentOrders } = await supabase
        .from('orders')
        .select('id, order_number, status, created_at')
        .eq('seller_id', seller.id)
        .order('created_at', { ascending: false })
        .limit(3);

      // Get recent services
      const { data: recentServices } = await supabase
        .from('services')
        .select('id, title, created_at')
        .eq('seller_id', seller.id)
        .order('created_at', { ascending: false })
        .limit(2);

      // Get recent blogs
      const { data: recentBlogs } = await supabase
        .from('blogs')
        .select('id, title, created_at')
        .eq('seller_id', seller.id)
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(2);

      const activity: RecentActivity[] = [];

      // Add orders to activity
      recentOrders?.forEach(order => {
        activity.push({
          id: order.id,
          type: 'order',
          title: `New Order #${order.order_number}`,
          description: `Order ${order.status}`,
          time: new Date(order.created_at).toLocaleDateString(),
          icon: '📦',
        });
      });

      // Add services to activity
      recentServices?.forEach(service => {
        activity.push({
          id: service.id,
          type: 'service',
          title: 'Service Added',
          description: service.title,
          time: new Date(service.created_at).toLocaleDateString(),
          icon: '💼',
        });
      });

      // Add blogs to activity
      recentBlogs?.forEach(blog => {
        activity.push({
          id: blog.id,
          type: 'blog',
          title: 'Blog Published',
          description: blog.title,
          time: new Date(blog.created_at).toLocaleDateString(),
          icon: '📝',
        });
      });

      // Sort by time (newest first) and limit to 6
      setRecentActivity(
        activity
          .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
          .slice(0, 6)
      );

    } catch (error) {
      console.error('Error loading activity:', error);
    }
  };

  /* ---------------- LOAD QUICK STATS ---------------- */
  const loadQuickStats = async () => {
    if (!seller) return;

    try {
      // Calculate profile completion
      let completion = 40; // Base

      if (seller.business_name) completion += 10;
      if (seller.description) completion += 10;
      if (seller.category_id) completion += 10;
      if (seller.service_type) completion += 10;
      if (seller.price_min && seller.price_max) completion += 10;
      if (stats.activeServices > 0) completion += 10;

      setQuickStats({
        profileViews: Math.floor(Math.random() * 100) + 10, // Mock for now
        profileCompletion: Math.min(completion, 100),
      });

    } catch (error) {
      console.error('Error loading quick stats:', error);
    }
  };

  /* ---------------- RENDER LOADING ---------------- */
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  /* ---------------- RENDER NO ACCESS ---------------- */
  if (!user || !seller) {
    return null; // Will redirect from useEffect
  }

  return (
    <NavShell selectedTab="home">
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* ========== WELCOME BANNER ========== */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome, {seller.business_name || seller.handle || 'Seller'}!
              </h1>
              <p className="text-gray-600 mt-2">
                Here's your business overview. Manage services, track orders, and grow your business.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/seller/services/new')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                + Add Service
              </button>
              <button
                onClick={() => router.push('/seller/posts/new')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                📝 Create Post
              </button>
            </div>
          </div>

          {/* VERIFICATION STATUS BANNER */}
          {status === 'pending' && (
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="text-yellow-600 text-xl mr-3">⏳</div>
                <div>
                  <p className="font-medium text-yellow-800">Verification Pending</p>
                  <p className="text-sm text-yellow-700">
                    Your seller profile is under review. You can still add services and posts.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {seller.verification_status === 'verified' && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="text-green-600 text-xl mr-3">✅</div>
                <div>
                  <p className="font-medium text-green-800">Verified Seller</p>
                  <p className="text-sm text-green-700">
                    Your account is verified. You can now receive promoted listings.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========== QUICK STATS ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Completion */}
          <div className="bg-white rounded-xl p-5 shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Profile Completion</h3>
              <span className="text-2xl">📊</span>
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{quickStats.profileCompletion}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${quickStats.profileCompletion}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => router.push('/seller/profile/edit')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Complete Profile →
            </button>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-xl p-5 shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Profile Views</h3>
              <span className="text-2xl">👁️</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {quickStats.profileViews}
            </div>
            <p className="text-sm text-gray-500">Total views this month</p>
          </div>

          {/* Seller Rating */}
          <div className="bg-white rounded-xl p-5 shadow border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Seller Rating</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="text-3xl font-bold text-gray-900 mr-2">
                {seller.rating?.toFixed(1) || '0.0'}
              </div>
              <div className="text-yellow-500">★★★★★</div>
            </div>
            <p className="text-sm text-gray-500">
              {seller.total_orders || 0} orders completed
            </p>
          </div>
        </div>

        {/* ========== MAIN STATS CARDS ========== */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {/* Orders Card */}
          <Link 
            href="/seller/orders"
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-2">📦</div>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="text-sm opacity-90">Total Orders</div>
            <div className="text-xs mt-2 opacity-80">
              {stats.pendingOrders} pending
            </div>
          </Link>
          
          {/* Earnings Card */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</div>
            <div className="text-sm opacity-90">Total Earnings</div>
            <div className="text-xs mt-2 opacity-80">
              All time revenue
            </div>
          </div>
          
          {/* Services Card */}
          <Link 
            href="/seller/services"
            className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-2">💼</div>
            <div className="text-2xl font-bold">{stats.activeServices}</div>
            <div className="text-sm opacity-90">Active Services</div>
            <div className="text-xs mt-2 opacity-80">
              View all services
            </div>
          </Link>
          
          {/* Blogs Card */}
          <Link 
            href="/seller/blogs"
            className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-5 text-white hover:shadow-lg transition-shadow"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="text-2xl font-bold">{stats.publishedBlogs}</div>
            <div className="text-sm opacity-90">Published Blogs</div>
            <div className="text-xs mt-2 opacity-80">
              Your articles
            </div>
          </Link>
          
          {/* Views Card */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-5 text-white">
            <div className="text-2xl mb-2">👁️</div>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <div className="text-sm opacity-90">Total Views</div>
            <div className="text-xs mt-2 opacity-80">
              Service views
            </div>
          </div>
          
          {/* Completion Card */}
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-5 text-white">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-2xl font-bold">{seller.is_verified ? '✅' : '⏳'}</div>
            <div className="text-sm opacity-90">Verification</div>
            <div className="text-xs mt-2 opacity-80">
              {seller.verification_status || 'pending'}
            </div>
          </div>
        </div>

        {/* ========== QUICK ACTIONS ========== */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/seller/services/new"
              className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">➕</div>
              <div className="font-medium">Add Service</div>
              <p className="text-xs text-gray-500 mt-1">List a new service</p>
            </Link>
            
            <Link 
              href="/seller/posts/new"
              className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">📰</div>
              <div className="font-medium">Create Post</div>
              <p className="text-xs text-gray-500 mt-1">Share with followers</p>
            </Link>
            
            <Link 
              href="/seller/blogs/new"
              className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">✍️</div>
              <div className="font-medium">Write Blog</div>
              <p className="text-xs text-gray-500 mt-1">Publish an article</p>
            </Link>
            
            <Link 
              href="/seller/orders"
              className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">View Orders</div>
              <p className="text-xs text-gray-500 mt-1">Manage all orders</p>
            </Link>
          </div>
        </div>

        {/* ========== RECENT ACTIVITY + BUSINESS DETAILS ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>
                <Link 
                  href="/seller/activity"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View All →
                </Link>
              </div>
              
              {recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50"
                    >
                      <div className="text-xl mr-3">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="text-gray-500 mb-4">No recent activity yet</p>
                  <p className="text-sm text-gray-400">
                    Start by adding your first service or creating a post
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Business Details */}
          <div>
            <div className="bg-white rounded-xl shadow border p-6">
              <h2 className="text-xl font-bold mb-6">Business Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Business Name</p>
                  <p className="font-medium">{seller.business_name || 'Not set'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">
                    {seller.category_id 
                      ? categories.find(c => c.id === seller.category_id)?.name || 'Other'
                      : seller.other_description || 'Not set'
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-medium">{seller.service_type || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Pricing Range</p>
                  <p className="font-medium">
                    {seller.price_min && seller.price_max 
                      ? `₹${seller.price_min} - ₹${seller.price_max}`
                      : 'Not set'
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Hashtags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {seller.hashtags?.length > 0 ? (
                      seller.hashtags.map((tag: string, index: number) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No hashtags added</p>
                    )}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Link 
                    href="/seller/profile/edit"
                    className="w-full block text-center py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Edit Business Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 border rounded-xl p-6">
              <h3 className="font-bold mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get support for your seller account
              </p>
              <div className="space-y-3">
                <Link 
                  href="/seller/help"
                  className="block text-sm text-blue-600 hover:text-blue-800"
                >
                  📚 Seller Guide
                </Link>
                <Link 
                  href="/seller/support"
                  className="block text-sm text-blue-600 hover:text-blue-800"
                >
                  💬 Contact Support
                </Link>
                <Link 
                  href="/seller/verification"
                  className="block text-sm text-blue-600 hover:text-blue-800"
                >
                  ✅ Get Verified
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavShell>
  );
}