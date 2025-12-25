'use client';

import { useState } from 'react';
import NavShell from '@/components/shared/NavShell';

export default function SellerOnboardingPage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [step, setStep] = useState(1);

  const onboardingSteps = [
    {
      id: 1,
      title: 'Welcome to Seller Dashboard',
      description: 'Learn how to manage your services and earn money',
      icon: '👋',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      id: 2,
      title: 'Create Your First Listing',
      description: 'Add services, set prices, and upload photos',
      icon: '📋',
      color: 'from-green-400 to-emerald-400',
    },
    {
      id: 3,
      title: 'Post Offers on Feed',
      description: 'Attract customers with special offers and discounts',
      icon: '📢',
      color: 'from-purple-400 to-pink-400',
    },
    {
      id: 4,
      title: 'Manage Orders & Earnings',
      description: 'Track orders, receive payments, and withdraw earnings',
      icon: '💰',
      color: 'from-orange-400 to-red-400',
    },
  ];

  const currentStep = onboardingSteps[step - 1];

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <div className="px-4 py-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-gray-900">Seller Onboarding</h1>
            <span className="text-sm font-medium text-gray-600">Step {step} of 4</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className={`bg-gradient-to-r ${currentStep.color} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Step Content */}
        <div className={`bg-gradient-to-r ${currentStep.color} text-white rounded-2xl p-6 mb-8`}>
          <div className="text-center">
            <div className="text-6xl mb-4">{currentStep.icon}</div>
            <h2 className="text-2xl font-bold mb-3">{currentStep.title}</h2>
            <p className="opacity-90">{currentStep.description}</p>
          </div>
        </div>

        {/* Step-specific Content */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">🚀 Start Selling in 3 Steps</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">1</div>
                  <div>
                    <div className="font-medium">Create Listings</div>
                    <div className="text-sm text-gray-600">Add your services with photos & pricing</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">2</div>
                  <div>
                    <div className="font-medium">Get Verified</div>
                    <div className="text-sm text-gray-600">Upload documents for trust badge</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">3</div>
                  <div>
                    <div className="font-medium">Start Earning</div>
                    <div className="text-sm text-gray-600">Accept orders & receive payments</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-3">📋 Listing Best Practices</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Use high-quality photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Write clear service description</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Set competitive prices</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Add all relevant categories</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
            >
              ← Previous
            </button>
          ) : (
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
            >
              ← Skip Onboarding
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
            >
              Next Step →
            </button>
          ) : (
            <button
              onClick={() => window.location.href = '/seller/dashboard'}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium"
            >
              🎉 Start Selling Now
            </button>
          )}
        </div>
      </div>
    </NavShell>
  );
}