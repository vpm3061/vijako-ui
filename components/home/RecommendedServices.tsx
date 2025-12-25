'use client'

export default function RecommendedServices() {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        ⭐ Recommended for You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: 'AC Repair',
            desc: 'Verified technician • Same day service',
            price: '₹399',
          },
          {
            title: 'Electrician Visit',
            desc: '120+ booked today • 4.8⭐',
            price: '₹249',
          },
          {
            title: 'Doctor Consultation',
            desc: 'Verified doctor • 10 mins away',
            price: '₹499',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {item.desc}
                </p>
              </div>

              <span className="text-sm font-bold text-blue-600">
                {item.price}
              </span>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700">
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
