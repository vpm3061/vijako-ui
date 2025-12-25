'use client';

import { useState } from 'react';
import NavShell from '@/components/shared/NavShell';
import Link from 'next/link';

export default function SellerVerificationPage() {
  const [selectedTab, setSelectedTab] = useState<'home' | 'feed' | 'trending' | 'promo'>('home');
  const [verificationStep, setVerificationStep] = useState(1);
  const [documents, setDocuments] = useState({
    aadharFront: null as File | null,
    aadharBack: null as File | null,
    panCard: null as File | null,
    businessProof: null as File | null,
    bankStatement: null as File | null,
  });

  const steps = [
    { id: 1, title: 'Business Details', status: 'completed' },
    { id: 2, title: 'Document Upload', status: 'current' },
    { id: 3, title: 'Bank Details', status: 'pending' },
    { id: 4, title: 'Service Setup', status: 'pending' },
  ];

  return (
    <NavShell selectedTab={selectedTab} onTabChange={setSelectedTab}>
      <div className="px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔐</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Seller Verification</h1>
          <p className="text-gray-600">Complete these steps to start selling</p>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  step.status === 'completed' ? 'bg-green-500 text-white' :
                  step.status === 'current' ? 'bg-blue-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {step.status === 'completed' ? '✓' : step.id}
                </div>
                <div className="text-xs text-gray-600">{step.title}</div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 rounded-full">
            <div className="bg-green-500 h-1 rounded-full w-1/4"></div>
          </div>
        </div>

        {/* Step 2: Document Upload */}
        {verificationStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📄 Upload Required Documents</h2>
            
            <div className="space-y-4">
              {/* Aadhar Card */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Aadhar Card</div>
                    <div className="text-sm text-gray-600">Front & Back (Clear Image)</div>
                  </div>
                  <span className="text-xs text-red-500">Required</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400">
                    <input type="file" className="hidden" />
                    <span className="text-3xl">📷</span>
                    <div className="text-sm mt-2">Front Side</div>
                    {documents.aadharFront && (
                      <div className="text-xs text-green-600 mt-1">✓ Uploaded</div>
                    )}
                  </label>
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400">
                    <input type="file" className="hidden" />
                    <span className="text-3xl">📷</span>
                    <div className="text-sm mt-2">Back Side</div>
                    {documents.aadharBack && (
                      <div className="text-xs text-green-600 mt-1">✓ Uploaded</div>
                    )}
                  </label>
                </div>
              </div>

              {/* PAN Card */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">PAN Card</div>
                    <div className="text-sm text-gray-600">Clear image with visible details</div>
                  </div>
                  <span className="text-xs text-red-500">Required</span>
                </div>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 block">
                  <input type="file" className="hidden" />
                  <span className="text-3xl">💳</span>
                  <div className="text-sm mt-2">Upload PAN Card</div>
                  {documents.panCard && (
                    <div className="text-xs text-green-600 mt-1">✓ Uploaded</div>
                  )}
                </label>
              </div>

              {/* Business Proof */}
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium">Business Proof</div>
                    <div className="text-sm text-gray-600">GST, Shop Act, or Professional Certificate</div>
                  </div>
                  <span className="text-xs text-blue-500">Optional</span>
                </div>
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 block">
                  <input type="file" className="hidden" />
                  <span className="text-3xl">🏢</span>
                  <div className="text-sm mt-2">Upload Business Proof</div>
                  {documents.businessProof && (
                    <div className="text-xs text-green-600 mt-1">✓ Uploaded</div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <button 
                onClick={() => setVerificationStep(1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
              >
                ← Back
              </button>
              <button 
                onClick={() => setVerificationStep(3)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
              >
                Continue to Bank Details →
              </button>
            </div>
          </div>
        )}

        {/* Verification Status */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">⏳</span>
            <div>
              <div className="font-bold text-gray-900">Verification Pending</div>
              <div className="text-sm text-gray-600">Usually takes 24-48 hours</div>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            You can still explore the seller dashboard, but you won't be able to accept orders until verification is complete.
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8">
          <h3 className="font-bold text-gray-900 mb-4">Quick Start Guide</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/seller/dashboard" 
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium text-sm">View Dashboard</div>
            </Link>
            <Link href="/seller/post-offer"
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md">
              <div className="text-2xl mb-2">📢</div>
              <div className="font-medium text-sm">Learn Posting</div>
            </Link>
            <Link href="/seller/my-listings"
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium text-sm">Create Listings</div>
            </Link>
            <Link href="/help/seller-guide"
              className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md">
              <div className="text-2xl mb-2">📚</div>
              <div className="font-medium text-sm">Seller Guide</div>
            </Link>
          </div>
        </div>
      </div>
    </NavShell>
  );
}