'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useNav } from './NavVisibilityProvider';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/lib/supabase';

export default function SideDrawer() {
  const { isSideDrawerOpen, closeSideDrawer } = useNav();
  const { user, profile, seller, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Close drawer when route changes
  const handleLinkClick = () => {
    closeSideDrawer();
  };

  // ✅ Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    closeSideDrawer();
    window.location.href = '/'; // Hard redirect
  };

  // ✅ Don't render if not open
  if (!isSideDrawerOpen) return null;

  // ✅ Get user initials safely
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const initials = getInitials();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998]"
        onClick={closeSideDrawer}
      />

      {/* Drawer - LEFT SIDE with animation */}
      <div className="fixed inset-y-0 left-0 w-80 bg-white z-[9999] flex flex-col animate-slideIn">

        {/* PROFILE CARD */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
            <div>
              <div className="font-semibold">
                {profile?.full_name || user?.email || 'User'}
              </div>
              <div className="text-sm text-gray-600">
                {seller ? '✅ Seller Account' : '👤 Customer Account'}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              closeSideDrawer();
              router.push('/profile/edit');
            }}
            className="mt-4 w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
          >
            👤 View / Edit Profile
          </button>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">

          {/* ✅ CRITICAL: SELLER MENU CONDITION */}
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : user ? (
            <>
              {/* CUSTOMER MENU (if not seller) */}
              {!seller && (
                <>
                  <Link 
                    href="/my-orders" 
                    onClick={handleLinkClick} 
                    className="block p-3 rounded hover:bg-gray-100"
                  >
                    📦 My Orders
                  </Link>
                  <Link 
                    href="/wallet" 
                    onClick={handleLinkClick} 
                    className="block p-3 rounded hover:bg-gray-100"
                  >
                    💰 Wallet & Payments
                  </Link>

                  <button
                    onClick={() => {
                      closeSideDrawer();
                      router.push('/seller/registration');
                    }}
                    className="w-full mt-2 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-left hover:bg-green-100"
                  >
                    <span className="text-xl">🏪</span>
                    <span className="ml-2 font-bold">Become a Seller</span>
                    <p className="text-sm text-gray-600 mt-1">Start earning on VIJAKO</p>
                  </button>
                </>
              )}

              {/* SELLER MENU (if seller exists) */}
              {seller && (
                <>
                  <div className="mb-2 px-2 text-xs font-semibold text-gray-500">SELLER MENU</div>
                  <Link 
                    href="/seller/dashboard" 
                    onClick={handleLinkClick} 
                    className="block p-3 rounded hover:bg-gray-100"
                  >
                    📊 Seller Dashboard
                  </Link>
                  <Link 
                    href="/seller/services" 
                    onClick={handleLinkClick} 
                    className="block p-3 rounded hover:bg-gray-100"
                  >
                    📋 My Services
                  </Link>
                  <Link 
                    href="/seller/posts" 
                    onClick={handleLinkClick} 
                    className="block p-3 rounded hover:bg-gray-100"
                  >
                    📝 My Posts
                  </Link>
                  <Link 
                    href="/seller/orders" 
                    onClick={handleLinkClick} 
                    className="block p-3 rounded hover:bg-gray-100"
                  >
                    🛒 Orders
                  </Link>
                </>
              )}
            </>
          ) : (
            // Not logged in
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">You are not logged in</p>
              <button
                onClick={() => {
                  closeSideDrawer();
                  router.push('/login');
                }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
              >
                Login / Sign Up
              </button>
            </div>
          )}

          {/* COMMON MENU (always shown) */}
          <div className="mt-4 pt-4 border-t">
            <div className="px-2 text-xs font-semibold text-gray-500 mb-2">SUPPORT</div>
            <Link href="/help" onClick={handleLinkClick} className="block p-3 rounded hover:bg-gray-100">
              ❓ Help & Support
            </Link>
            <Link href="/refund-policy" onClick={handleLinkClick} className="block p-3 rounded hover:bg-gray-100">
              💸 Refund Policy
            </Link>
          </div>

          <div className="pt-4 border-t">
            <div className="px-2 text-xs font-semibold text-gray-500 mb-2">SETTINGS</div>
            <Link href="/settings" onClick={handleLinkClick} className="block p-3 rounded hover:bg-gray-100">
              ⚙️ Settings
            </Link>
          </div>

          {/* SOCIAL */}
          <div className="pt-4 border-t">
            <div className="px-2 text-xs font-semibold text-gray-500 mb-2">SOCIAL</div>
            <a
              href="https://twitter.com/vijako"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded hover:bg-gray-100"
            >
              🐦 Twitter
            </a>
            <a
              href="https://avaj.in"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded hover:bg-gray-100"
            >
              🔊 avaj.in
            </a>
          </div>

          {/* LOGOUT (only if logged in) */}
          {user && (
            <div className="pt-4 border-t">
              <button
                onClick={handleLogout}
                className="w-full p-3 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 font-medium"
              >
                🚪 Logout
              </button>
            </div>
          )}

          {/* FOOTER */}
          <div className="text-center text-xs text-gray-400 py-4 border-t">
            VIJAKO v1.0 • Made with ❤️ in India
          </div>
        </div>
      </div>
    </>
  );
}