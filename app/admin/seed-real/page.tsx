'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function SeedRealPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
    console.log(msg);
  };

  const seedRealData = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      addLog('🚀 Starting VIJAKO real data seeding...');

      // 1. CHECK EXISTING CATEGORIES
      addLog('📂 Checking existing categories...');
      const { data: existingCats } = await supabase
        .from('categories')
        .select('name')
        .limit(5);

      if (existingCats && existingCats.length > 0) {
        addLog(`✅ ${existingCats.length} categories already exist`);
      } else {
        addLog('📂 Creating 18 categories...');
        const categories = [
          { name: 'Healthcare & Wellness', icon: '🏥', color: 'red', sort_order: 1 },
          { name: 'Events & Talent', icon: '🎟️', color: 'purple', sort_order: 2 },
          { name: 'Education & Skills', icon: '🎓', color: 'blue', sort_order: 3 },
          { name: 'Business Services', icon: '💼', color: 'green', sort_order: 4 },
          { name: 'Travel & Experiences', icon: '✈️', color: 'cyan', sort_order: 5 },
          { name: 'Food & Dining', icon: '🍕', color: 'orange', sort_order: 6 },
          { name: 'Grocery & Essentials', icon: '🛒', color: 'green', sort_order: 7 },
          { name: 'Beauty & Salon', icon: '💇', color: 'pink', sort_order: 8 },
          { name: 'Home Services', icon: '🏠', color: 'gray', sort_order: 9 },
          { name: 'Logistics & Delivery', icon: '🚚', color: 'blue', sort_order: 10 },
          { name: 'Creator Economy', icon: '🎬', color: 'purple', sort_order: 11 },
          { name: 'Jobs & Freelancing', icon: '💼', color: 'green', sort_order: 12 },
          { name: 'B2B Services', icon: '🤝', color: 'cyan', sort_order: 13 },
          { name: 'Security Services', icon: '🛡️', color: 'gray', sort_order: 14 },
          { name: 'Waste Management', icon: '🗑️', color: 'green', sort_order: 15 },
          { name: 'Parking & Transport', icon: '🅿️', color: 'blue', sort_order: 16 },
          { name: 'Emergency Services', icon: '🚨', color: 'red', sort_order: 17 },
          { name: 'Learn & Research', icon: '📚', color: 'indigo', sort_order: 18 }
        ];

        // Insert one by one
        for (const category of categories) {
          try {
            await supabase
              .from('categories')
              .upsert(category, { onConflict: 'name' });
          } catch (err) {
            console.log(`Category ${category.name} already exists`);
          }
        }
        addLog('✅ Categories created');
      }

      // 2. CREATE SELLERS
      addLog('🏪 Creating premium sellers...');
      const sellers = [
        {
          business_name: 'Max Healthcare Delhi',
          business_type: 'hospital',
          categories: ['Healthcare & Wellness'],
          service_areas: ['Delhi', 'Gurgaon', 'Noida'],
          is_verified: true,
          rating: 4.9,
          subscription_tier: 'premium',
          total_orders: 342
        },
        {
          business_name: 'Wedding Wala Events',
          business_type: 'event_company',
          categories: ['Events & Talent'],
          service_areas: ['Delhi NCR', 'Mumbai'],
          is_verified: true,
          rating: 4.8,
          subscription_tier: 'premium',
          total_orders: 189
        },
        {
          business_name: 'CareerShala Coaching',
          business_type: 'education_institute',
          categories: ['Education & Skills'],
          service_areas: ['Online', 'Delhi'],
          is_verified: true,
          rating: 4.7,
          subscription_tier: 'pro',
          total_orders: 567
        },
        {
          business_name: 'LegalEase Consultants',
          business_type: 'professional_services',
          categories: ['Business Services'],
          service_areas: ['All India'],
          is_verified: true,
          rating: 4.9,
          subscription_tier: 'premium',
          total_orders: 234
        }
      ];

      for (const seller of sellers) {
        await supabase
          .from('sellers')
          .upsert(seller, { onConflict: 'business_name' });
      }
      addLog('✅ 4 sellers created');

      // 3. CREATE SERVICES
      addLog('🛠️ Creating high-value services...');
      const services = [
        {
          seller_id: 1,
          title: 'Hospital OPD Booking - Max Healthcare',
          description: 'Book OPD appointments with top doctors.',
          category: 'Healthcare & Wellness',
          base_price: 799.00,
          price_type: 'fixed',
          is_active: true,
          rating: 4.9,
          tags: ['#Healthcare', '#Doctor'],
          view_count: 456
        },
        {
          seller_id: 2,
          title: 'Wedding Photography - Premium Package',
          description: 'Complete wedding coverage with photographers.',
          category: 'Events & Talent',
          base_price: 49999.00,
          price_type: 'fixed',
          is_active: true,
          rating: 4.8,
          tags: ['#Wedding', '#Photography'],
          view_count: 134
        },
        {
          seller_id: 3,
          title: 'MBA Entrance Coaching - CAT 2025',
          description: 'Complete online coaching with mentorship.',
          category: 'Education & Skills',
          base_price: 39999.00,
          price_type: 'fixed',
          is_active: true,
          rating: 4.7,
          tags: ['#MBA', '#Coaching'],
          view_count: 678
        },
        {
          seller_id: 4,
          title: 'Corporate Legal Consultation',
          description: 'Expert legal advice for businesses.',
          category: 'Business Services',
          base_price: 4999.00,
          price_type: 'hourly',
          is_active: true,
          rating: 4.9,
          tags: ['#Legal', '#Business'],
          view_count: 156
        }
      ];

      for (const service of services) {
        await supabase
          .from('services')
          .upsert(service);
      }
      addLog('✅ 4 services created');

      // 4. CREATE FEED POSTS
      addLog('📢 Creating feed posts...');
      const posts = [
        {
          seller_id: 1,
          post_type: 'tip',
          title: '🏥 Importance of Regular Health Checkups',
          content: 'Preventive healthcare can detect issues early.',
          like_count: 89,
          save_count: 45
        },
        {
          seller_id: 3,
          post_type: 'offer',
          title: '🎓 MBA Coaching - 30% Early Bird Discount',
          content: 'Register before Dec 31 for 30% discount.',
          discount_percent: 30,
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          like_count: 56,
          save_count: 23
        },
        {
          seller_id: 4,
          post_type: 'announcement',
          title: '⚖️ Online Legal Consultation Available',
          content: 'Get legal advice via video call.',
          like_count: 34,
          save_count: 12
        }
      ];

      for (const post of posts) {
        await supabase
          .from('feed_posts')
          .upsert(post);
      }
      addLog('✅ 3 feed posts created');

      // 5. CREATE ORDERS
      addLog('📦 Creating sample orders...');
      const orders = [
        {
          service_id: 1,
          customer_name: 'Rahul Sharma',
          service_name: 'Hospital OPD Booking',
          status: 'completed',
          total_amount: 799.00,
          payment_status: 'paid'
        },
        {
          service_id: 3,
          customer_name: 'Priya Singh',
          service_name: 'Wedding Photography',
          status: 'confirmed',
          total_amount: 49999.00,
          payment_status: 'pending'
        }
      ];

      for (const order of orders) {
        await supabase
          .from('orders')
          .upsert(order);
      }
      addLog('✅ 2 orders created');

      addLog('🎉 DATABASE SEEDING COMPLETE!');
      addLog('👉 Visit: http://localhost:3000/feed to see posts');
      addLog('👉 Visit: http://localhost:3000/services to see services');

    } catch (error: any) {
      addLog(`❌ ERROR: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">VIJAKO - Seed Real Data</h1>
      
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-green-800 font-bold">⚠️ This will add REAL data to your database</p>
      </div>

      <button
        onClick={seedRealData}
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg mb-6"
      >
        {loading ? 'Seeding...' : '🚀 SEED REAL DATA'}
      </button>

      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm h-96 overflow-y-auto">
        <div className="text-green-400 mb-2">=== VIJAKO SEEDER ===</div>
        {logs.length === 0 ? (
          <div className="text-gray-500">Click button to seed...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="mb-1">
              <span className="text-cyan-300">$ </span>
              <span className={log.includes('✅') ? 'text-green-400' : 
                             log.includes('❌') ? 'text-red-400' : 
                             'text-gray-300'}>
                {log}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}