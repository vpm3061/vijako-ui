'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    console.log('Phone from URL:', phoneParam);
    
    if (!phoneParam) {
      router.push('/login');
      return;
    }
    
    setPhone(phoneParam);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParams, router]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || otp.length !== 6) {
      alert('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const fullPhone = `+91${phone}`;
      
      const { data, error } = await supabase.auth.verifyOtp({
        phone: fullPhone,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      console.log('OTP verified successfully:', data);
      
      // ✅ STEP 1: Get user ID from session
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error getting user:', userError);
        throw userError;
      }

      // ✅ STEP 2: Check if profile exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)  // ✅ CORRECT: auth.uid() se check
        .maybeSingle();     // ✅ maybeSingle() use karo

      // ✅ STEP 3: If profile doesn't exist, CREATE IT
      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,  // ✅ CORRECT: user.id from getUser()
            phone: fullPhone,
            full_name: `User${phone.slice(-4)}`,
            role: 'customer',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          console.error('❌ Profile creation failed:', profileError);
          
          // Agar duplicate entry hai (phone already exists), try update
          if (profileError.code === '23505') {
            console.log('Profile already exists, updating...');
            await supabase
              .from('profiles')
              .update({ phone: fullPhone })
              .eq('id', user.id);
          } else {
            // RLS policy error? Log it but continue
            console.warn('Profile insert error, but continuing...');
          }
        } else {
          console.log('✅ Profile created successfully');
        }
      } else {
        console.log('✅ Profile already exists:', existingProfile.id);
      }

      router.push('/');
      
    } catch (error: any) {
      console.error('OTP error:', error);
      alert(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!phone || !canResend) return;

    setLoading(true);
    setCanResend(false);
    setCountdown(30);
    
    try {
      const fullPhone = `+91${phone}`;
      const { error } = await supabase.auth.signInWithOtp({
        phone: fullPhone,
      });

      if (error) throw error;
      alert('OTP resent successfully!');
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!phone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 text-blue-600 hover:underline"
          >
            Go back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter 6-digit code sent to
          </p>
          <p className="mt-1 text-center text-lg font-semibold">
            +91 {phone}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleVerifyOtp}>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              6-digit OTP
            </label>
            <div className="mt-1">
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
                placeholder="123456"
                autoFocus
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend || loading}
              className="text-sm text-blue-600 hover:text-blue-500 disabled:text-gray-400"
            >
              {canResend ? 'Resend OTP' : `Resend in ${countdown}s`}
            </button>
            
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Change phone number
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}