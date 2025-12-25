// components/home/CategoryGrid.tsx
export default function CategoryGrid() {
  const categories = [
    { icon: '🏠', name: 'Home Services', count: '240+' },
    { icon: '💊', name: 'Healthcare', count: '180+' },
    { icon: '💇', name: 'Beauty & Salon', count: '150+' },
    { icon: '📚', name: 'Education', count: '120+' },
    { icon: '💼', name: 'Professional', count: '95+' },
    { icon: '🛒', name: 'Daily Essentials', count: '300+' },
    { icon: '🚗', name: 'Transport', count: '75+' },
    { icon: '🎪', name: 'Events', count: '65+' },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Top Categories</h2>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">{category.icon}</div>
            <div className="font-semibold text-gray-900">{category.name}</div>
            <div className="text-sm text-gray-500 mt-1">{category.count} services</div>
          </div>
        ))}
      </div>
    </div>
  )
}