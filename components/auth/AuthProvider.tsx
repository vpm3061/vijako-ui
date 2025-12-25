'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: any;
  profile: any;
  seller: any;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  seller: null,
  loading: true,
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    try {
      console.log('Loading user data...');
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        setUser(null);
        setProfile(null);
        setSeller(null);
        setLoading(false);
        return;
      }
      
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (!currentUser) {
        console.log('No user found');
        setProfile(null);
        setSeller(null);
        setLoading(false);
        return;
      }

      console.log('User found:', currentUser.id);

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (profileError) {
        console.error('Profile error:', profileError);
        setProfile(null);
      } else {
        console.log('Profile loaded:', profileData);
        setProfile(profileData || null);
      }

      if (profileData?.role === 'seller') {
        const { data: sellerData, error: sellerError } = await supabase
          .from('sellers')
          .select('*')
          .eq('id', currentUser.id)
          .maybeSingle();

        if (sellerError) {
          console.error('Seller error:', sellerError);
          setSeller(null);
        } else {
          console.log('Seller loaded:', sellerData);
          setSeller(sellerData || null);
        }
      } else {
        setSeller(null);
      }

    } catch (error) {
      console.error('AuthProvider error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('AuthProvider initializing...');
    
    loadUserData();

    // ✅ FIXED LINE - Added TypeScript types
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log('Auth event:', event);
        
        if (event === 'SIGNED_IN') {
          const currentUser = session?.user || null;
          setUser(currentUser);
          if (currentUser) {
            await loadUserData();
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setSeller(null);
          setLoading(false);
        } else if (event === 'USER_UPDATED') {
          await loadUserData();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const refresh = async () => {
    console.log('Refreshing auth data...');
    await loadUserData();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        seller,
        loading,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}