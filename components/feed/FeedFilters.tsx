'use client';

interface FeedFiltersProps {
  activeFilter: 'all' | 'offers' | 'announcements' | 'tips';
  setActiveFilter: (filter: 'all' | 'offers' | 'announcements' | 'tips') => void;
  followingOnly: boolean;
  setFollowingOnly: (value: boolean) => void;
}

export default function FeedFilters({ 
  activeFilter, 
  setActiveFilter, 
  followingOnly, 
  setFollowingOnly 
}: FeedFiltersProps) {
  const filters = [
    { id: 'all', label: 'All', icon: '📰', count: 45 },
    { id: 'offers', label: 'Offers', icon: '🎁', count: 18 },
    { id: 'announcements', label: 'Updates', icon: '📢', count: 12 },
    { id: 'tips', label: 'Tips', icon: '💡', count: 15 },
  ];

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* FILTER CHIPS */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
              <span className={`px-1 py-0.5 rounded text-xs ${
                activeFilter === filter.id
                  ? 'bg-white/30 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* FOLLOWING TOGGLE */}
        <div className="flex items-center gap-3">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={followingOnly}
                onChange={(e) => setFollowingOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`block w-10 h-6 rounded-full ${
                followingOnly ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
                followingOnly ? 'translate-x-4' : ''
              }`}></div>
            </div>
            <span className="ml-2 text-sm text-gray-700">
              Following Only
            </span>
          </label>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search in feed..."
            className="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
        </div>
      </div>
    </div>
  );
}