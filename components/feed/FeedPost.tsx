'use client';

import { useState } from 'react';

interface FeedPostProps {
  post: {
    id: number;
    seller: {
      name: string;
      category: string;
      verified: 'blue' | 'gold';
      rating: number;
      followers: number;
      isFollowing: boolean;
    };
    postType: 'offer' | 'announcement' | 'tips';
    content: any;
    stats: {
      likes: number;
      saves: number;
      shares: number;
      isLiked: boolean;
      isSaved: boolean;
    };
    timestamp: string;
    location: string;
  };
}

export default function FeedPost({ post }: FeedPostProps) {
  const [liked, setLiked] = useState(post.stats.isLiked);
  const [saved, setSaved] = useState(post.stats.isSaved);
  const [following, setFollowing] = useState(post.seller.isFollowing);
  const [likeCount, setLikeCount] = useState(post.stats.likes);
  const [saveCount, setSaveCount] = useState(post.stats.saves);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
    setSaveCount(saved ? saveCount - 1 : saveCount + 1);
  };

  const handleFollow = () => {
    setFollowing(!following);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* SELLER HEADER */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="font-semibold text-blue-600">
                  {post.seller.name.charAt(0)}
                </span>
              </div>
              
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                post.seller.verified === 'gold' 
                  ? 'bg-yellow-500' 
                  : 'bg-blue-500'
              }`}>
                <span className="text-xs text-white">✓</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">{post.seller.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  post.seller.verified === 'gold'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {post.seller.verified === 'gold' ? 'Verified' : 'Basic'}
                </span>
              </div>
              
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-600">{post.seller.category}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-yellow-500">⭐</span>
                  <span className="text-xs text-gray-600">{post.seller.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleFollow}
            className={`px-3 py-1 rounded-lg text-sm ${
              following
                ? 'bg-gray-100 text-gray-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <span>{post.timestamp}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{post.location}</span>
          </div>
        </div>
      </div>

      {/* POST CONTENT */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{post.content.title}</h3>
        <p className="text-gray-700 mb-3">{post.content.description}</p>

        {/* POST SPECIFIC */}
        {post.postType === 'offer' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-bold text-green-700">{post.content.price}</div>
                <div className="text-sm text-green-600">{post.content.expiry}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Code:</div>
                <div className="font-bold text-gray-900">{post.content.offerCode}</div>
              </div>
            </div>
          </div>
        )}

        {post.postType === 'announcement' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="font-semibold text-blue-700">📢 {post.content.announcement}</div>
          </div>
        )}

        {post.postType === 'tips' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold text-purple-700">{post.content.tipType}</div>
                <div className="text-sm text-gray-600">{post.content.readTime}</div>
              </div>
              <span className="text-2xl">💡</span>
            </div>
          </div>
        )}

        {/* HASHTAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.content.hashtags.map((tag: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600"
            >
              <span className={`text-xl ${liked ? 'text-red-500' : ''}`}>
                {liked ? '❤️' : '🤍'}
              </span>
              <span className="text-sm">{likeCount}</span>
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <span className={`text-xl ${saved ? 'text-blue-500' : ''}`}>
                {saved ? '💾' : '📥'}
              </span>
              <span className="text-sm">{saveCount}</span>
            </button>
          </div>

          <button className={`px-4 py-2 rounded-lg font-medium ${
            post.postType === 'offer'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
            {post.postType === 'offer' ? 'View Offer' : 'Learn More'}
          </button>
        </div>
      </div>
    </div>
  );
}