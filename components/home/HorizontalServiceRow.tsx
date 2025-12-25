'use client';

interface Service {
  id: number;
  name: string;
  icon: string;
  rating: number;
  price: string;
  time: string;
  verified: boolean;
  color: string;
  type?: string;
}

interface HorizontalServiceRowProps {
  title: string;
  subtitle?: string;
  type: 'BOOK' | 'PURCHASE';
  services: Service[];
}

export default function HorizontalServiceRow({ title, subtitle, type, services }: HorizontalServiceRowProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All →
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex-shrink-0 w-40 bg-white rounded-xl p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center`}>
                <span className="text-xl">{service.icon}</span>
              </div>
              {service.verified && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">✓</span>
              )}
            </div>
            
            <h3 className="font-bold text-gray-900 text-sm mb-1">{service.name}</h3>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xs">⭐</span>
                <span className="text-xs font-medium">{service.rating}</span>
              </div>
              <div className="text-xs text-gray-500">{service.time}</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="font-bold text-blue-600 text-sm">{service.price}</div>
              <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-lg hover:opacity-90">
                {type === 'BOOK' ? 'Book' : 'Buy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}