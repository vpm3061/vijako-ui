'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavShell from '@/components/shared/NavShell';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/auth/AuthProvider';

type Category = {
  id: number;
  name: string;
  icon?: string;
  color?: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Doctor', icon: '👨‍⚕️' },
  { id: 2, name: 'Lawyer', icon: '⚖️' },
  { id: 3, name: 'CA/Accountant', icon: '💰' },
  { id: 4, name: 'Fitness Trainer', icon: '💪' },
  { id: 5, name: 'Yoga Teacher', icon: '🧘' },
  { id: 6, name: 'Event Planner', icon: '🎉' },
  { id: 7, name: 'Catering', icon: '🍽️' },
  { id: 8, name: 'Photographer', icon: '📸' },
  { id: 9, name: 'Makeup Artist', icon: '💄' },
  { id: 10, name: 'Interior Designer', icon: '🏠' },
  { id: 11, name: 'Tuition Teacher', icon: '📚' },
  { id: 12, name: 'Music Teacher', icon: '🎵' },
  { id: 13, name: 'Electrician', icon: '🔌' },
  { id: 14, name: 'Plumber', icon: '🚰' },
  { id: 15, name: 'Carpenter', icon: '🪚' },
  { id: 16, name: 'Painter', icon: '🎨' },
  { id: 17, name: 'Driver', icon: '🚗' },
  { id: 18, name: 'Beautician', icon: '💅' },
  { id: 19, name: 'Astrologer', icon: '🔮' },
];

export default function SellerRegistrationPage() {
  const router = useRouter();
  const { user, loading: authLoading, seller } = useAuth();

  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    business_name: '',
    category_id: null as number | null,
    other_description: '',
    hashtags: [] as string[],
    customTag: '',
  });

  /* ---------- AUTH GUARD ---------- */
  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.replace('/login');
      return;
    }
    
    if (seller) {
      router.replace('/seller/dashboard');
      return;
    }
  }, [user, authLoading, seller, router]);

  /* ---------- LOAD CATEGORIES FROM DB (Fallback to defaults) ---------- */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name, icon, color')
          .order('sort_order')
          .limit(30);

        if (error) {
          console.log('Using default categories:', error.message);
          setCategories(DEFAULT_CATEGORIES);
          return;
        }

        if (data && data.length > 0) {
          console.log('Loaded categories from DB:', data.length);
          setCategories(data);
        } else {
          setCategories(DEFAULT_CATEGORIES);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
        setCategories(DEFAULT_CATEGORIES);
      }
    };

    loadCategories();
  }, []);

  /* ---------- HASHTAG FUNCTIONS ---------- */
  const addTag = (tag: string) => {
    const clean = tag
      .toLowerCase()
      .replace(/#/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    if (!clean || clean.length < 2) {
      setError('Tag must be at least 2 characters');
      return;
    }
    
    if (form.hashtags.includes(clean)) {
      setError('Tag already added');
      setTimeout(() => setError(''), 2000);
      return;
    }
    
    if (form.hashtags.length >= 5) {
      setError('Maximum 5 tags allowed');
      setTimeout(() => setError(''), 2000);
      return;
    }

    setForm(prev => ({
      ...prev,
      hashtags: [...prev.hashtags, clean],
      customTag: '',
    }));
    setError('');
  };

  const removeTag = (tag: string) => {
    setForm(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(t => t !== tag),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (form.customTag.trim()) {
        addTag(form.customTag);
      }
    }
  };

  const addExampleTag = (tag: string) => {
    setForm(prev => ({ ...prev, customTag: tag }));
    addTag(tag);
  };

  /* ---------- VALIDATION ---------- */
  const validateStep = () => {
    if (step === 1) {
      if (!form.full_name.trim() || form.full_name.trim().length < 2) {
        setError('Please enter a valid full name (min 2 chars)');
        return false;
      }
      return true;
    }
    
    if (step === 2) {
      if (form.category_id === null && form.other_description.trim().length < 10) {
        setError('Please select a category OR describe your business (min 10 chars)');
        return false;
      }
      return true;
    }
    
    if (step === 3) {
      if (form.hashtags.length < 1) {
        setError('Please add at least 1 hashtag/keyword');
        return false;
      }
      return true;
    }
    
    return true;
  };

  /* ---------- SUBMIT REGISTRATION ---------- */
  const handleSubmit = async () => {
    if (!user) {
      setError('User not logged in');
      return;
    }

    // ✅ NEW: Double-check profile exists before seller registration
    const { data: userProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileCheckError || !userProfile) {
      console.error('Profile not found, creating now...');
      
      // Emergency profile creation
      const { error: emergencyProfileError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          phone: user.email?.replace('@vijako.dev', '').replace('+91', '') || user.id,
          full_name: form.full_name.trim() || 'Seller',
          role: 'seller',
          created_at: new Date().toISOString(),
        });

      if (emergencyProfileError) {
        setError('Cannot create profile. Please logout and login again.');
        return;
      }
    }

    // Continue with seller registration...
    if (!validateStep()) return;

    setSubmitLoading(true);
    setError('');

    try {
      console.log('Starting registration for user:', user.id);

      // 1️⃣ UPDATE PROFILE
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: form.full_name.trim(),
          email: form.email.trim() || user.email || `${user.id}@vijako.app`,
          role: 'seller',
          profile_completion: 80,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }

      // 2️⃣ CREATE SELLER RECORD
      const sellerData = {
        id: user.id,
        business_name: form.business_name.trim() || form.full_name.trim() + ' Services',
        category_id: form.category_id,
        other_description: form.category_id === null ? form.other_description.trim() : null,
        categories: form.category_id ? [form.category_id] : [],
        category_ids: form.category_id ? [form.category_id] : [],
        verification_status: 'pending',
        is_active: true,
        subscription_tier: 'free',
        is_online: false,
        handle: `seller-${user.id.slice(0, 8)}`,
        created_at: new Date().toISOString(),
      };

      const { error: sellerError } = await supabase
        .from('sellers')
        .insert(sellerData);

      if (sellerError) {
        // If seller already exists, update it
        if (sellerError.code === '23505') {
          const { error: updateError } = await supabase
            .from('sellers')
            .update(sellerData)
            .eq('id', user.id);
          
          if (updateError) throw updateError;
        } else {
          throw sellerError;
        }
      }

      // 3️⃣ INSERT HASHTAGS
      if (form.hashtags.length > 0) {
        const hashtagRows = form.hashtags.map(tag => ({
          seller_id: user.id,
          tag: tag,
        }));

        const { error: hashtagError } = await supabase
          .from('seller_hashtags')
          .upsert(hashtagRows, { onConflict: 'seller_id,tag' });

        if (hashtagError) {
          console.warn('Hashtag insert warning:', hashtagError);
          // Continue even if hashtags fail
        }
      }

      console.log('✅ Registration successful! Redirecting...');
      
      // 4️⃣ HARD REDIRECT TO DASHBOARD
      setTimeout(() => {
        window.location.href = '/seller/dashboard?status=pending';
      }, 500);

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ---------- UI LOADING ---------- */
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <NavShell>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* PROGRESS BAR */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm text-gray-500">
              {step === 1 ? 'Basic Info' : step === 2 ? 'Category' : 'Keywords'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Become a Verified Seller
          </h1>
          <p className="text-gray-500 mb-6">
            Complete your seller profile in 3 simple steps
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <div className="flex items-center">
                <span className="mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.full_name}
                  onChange={e => setForm({...form, full_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  autoFocus
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll send important updates to this email
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ramesh Fitness Center"
                  value={form.business_name}
                  onChange={e => setForm({...form, business_name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to use your name
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: CATEGORY SELECTION */}
          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose Your Service Category</h3>
              <p className="text-gray-600 mb-6">
                Select the category that best describes your business
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setForm({...form, category_id: cat.id, other_description: ''})}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      form.category_id === cat.id 
                        ? 'border-blue-500 bg-blue-50 scale-[1.02]' 
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{cat.icon || '📌'}</div>
                    <div className="font-medium text-sm">{cat.name}</div>
                  </button>
                ))}
                
                {/* OTHER OPTION */}
                <button
                  type="button"
                  onClick={() => setForm({...form, category_id: null})}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    form.category_id === null 
                      ? 'border-purple-500 bg-purple-50 scale-[1.02]' 
                      : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl mb-2">➕</div>
                  <div className="font-medium text-sm">Other</div>
                </button>
              </div>

              {form.category_id === null && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe Your Business *
                  </label>
                  <textarea
                    placeholder="e.g., I provide wedding planning services, corporate event management..."
                    value={form.other_description}
                    onChange={e => setForm({...form, other_description: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    minLength={10}
                  />
                  <div className="text-xs text-gray-500 mt-1 flex justify-between">
                    <span>Minimum 10 characters</span>
                    <span>{form.other_description.length}/10</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: HASHTAGS */}
          {step === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Add Keywords for Discovery</h3>
              <p className="text-gray-600 mb-4">
                Add 1-5 keywords that describe your services. Customers will find you using these.
              </p>
              
              {/* HASHTAG INPUT */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="e.g., doctor, fitness, wedding-planner"
                  value={form.customTag}
                  onChange={e => setForm({...form, customTag: e.target.value})}
                  onKeyDown={handleKeyPress}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => addTag(form.customTag)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              {/* EXAMPLE TAGS */}
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Quick add examples:</p>
                <div className="flex flex-wrap gap-2">
                  {['doctor', 'fitness-trainer', 'event-planner', 'catering', 'lawyer', 'ca', 'makeup', 'photographer'].map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => addExampleTag(tag)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* ADDED TAGS */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Added tags ({form.hashtags.length}/5):</p>
                <div className="flex flex-wrap gap-2 min-h-[60px] p-2 border border-gray-200 rounded-xl">
                  {form.hashtags.length === 0 ? (
                    <div className="text-gray-400 italic p-4 text-center w-full">
                      No tags added yet. Add keywords to help customers find you.
                    </div>
                  ) : (
                    form.hashtags.map(tag => (
                      <div
                        key={tag}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
                      >
                        <span className="font-medium">#{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* TIPS */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm font-medium text-yellow-800 mb-1">💡 Tips for better discovery:</p>
                <ul className="text-xs text-yellow-700 list-disc pl-4 space-y-1">
                  <li>Use specific keywords like <code>#delhi-events</code> instead of just <code>#events</code></li>
                  <li>Include location: <code>#gym-delhi</code>, <code>#doctor-mumbai</code></li>
                  <li>Use services: <code>#chinese-food</code>, <code>#waste-management</code></li>
                  <li>Maximum 5 tags allowed</li>
                </ul>
              </div>
            </div>
          )}

          {/* FOOTER NAVIGATION */}
          <div className="mt-8 pt-6 border-t flex justify-between items-center">
            <div>
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2 text-gray-600 hover:text-gray-900 font-medium"
                  type="button"
                >
                  ← Back
                </button>
              )}
            </div>

            <div>
              {step < 3 ? (
                <button
                  onClick={() => validateStep() ? setStep(step + 1) : null}
                  className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  type="button"
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  className="px-6 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 transition"
                  type="button"
                >
                  {submitLoading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Submitting...
                    </>
                  ) : (
                    'Finish & Go to Dashboard'
                  )}
                </button>
              )}
            </div>
          </div>

          {/* STEP INDICATORS */}
          <div className="flex justify-center mt-6 space-x-2">
            {[1, 2, 3].map(num => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full ${step === num ? 'bg-blue-600' : 'bg-gray-300'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </NavShell>
  );
}