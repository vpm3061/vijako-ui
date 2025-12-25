'use client';

import { useState } from 'react';

export default function TrendingSellers() {
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: 'CoolAir AC',
      category: 'AC Repair',
      rating: 4.9,
      followers: 1890,
      trend: '🔥',
      isFollowing: false
    },
    {
      id: 2,
      name: 'HealthFirst',
      category: 'Pharmacy',
      rating: 4.8,
      followers: 2450,
      trend: '📈',
      isFollowing: true
    },
    {
      id: 3,
      name: 'FreshDaily',
      category: 'Grocery',
      rating: 4.7,
      followers: 1678,
      trend: '⭐',
      isFollowing: false
    }
  ]);

  const handleFollow = (id: number) => {
    setSellers(sellers.map(seller => 
      seller.id === id 
        ? { ...seller, isFollowing: !seller.isFollowing }
        : seller
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900">🔥 Trending Sellers</h3>
        <button className="text-blue-600 text-sm hover:text-blue-700">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {sellers.map((seller) => (
          <div key={seller.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">
                  {seller.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900 text-sm">{seller.name}</div>
                <div className="text-xs text-gray-600">{seller.category}</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg">{seller.trend}</span>
              <button
                onClick={() => handleFollow(seller.id)}
                className={`text-xs px-3 py-1 rounded-full ${
                  seller.isFollowing
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {seller.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}