// components/home/PopularNow.tsx
'use client';

export default function PopularNow() {
  const popularServices = [
    { id: 1, name: 'AC Repair', icon: '❄️', bookings: 45 },
    { id: 2, name: 'Doctor Visit', icon: '👨‍⚕️', bookings: 32 },
    { id: 3, name: 'Grocery Delivery', icon: '🛒', bookings: 128 },
    { id: 4, name: 'Electrician', icon: '⚡', bookings: 28 },
    { id: 5, name: 'Salon at Home', icon: '💇', bookings: 41 },
    { id: 6, name: 'Plumber', icon: '🚰', bookings: 36 },
    { id: 7, name: 'Carpenter', icon: '🪚', bookings: 19 },
    { id: 8, name: 'Home Cleaning', icon: '🧹', bookings: 67 },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">🔥 Popular Now</h2>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All →
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
        {popularServices.map((service) => (
          <div 
            key={service.id} 
            className="flex-shrink-0 w-28 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <span className="text-xl">{service.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm text-center mb-1">
                {service.name}
              </h3>
              <p className="text-xs text-gray-500 text-center">
                {service.bookings} bookings
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}