'use client'

export default function EmergencySection() {
  return (
    <section className="mt-10">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-red-700">
              🚨 Emergency Services
            </h2>
            <p className="text-sm text-red-600 mt-1">
              Doctor • Ambulance • Electrician • Police
            </p>
          </div>

          <button className="bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700">
            SOS
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { icon: '🩺', label: 'Doctor' },
            { icon: '🚑', label: 'Ambulance' },
            { icon: '⚡', label: 'Electrician' },
            { icon: '👮', label: 'Police' },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-gray-800">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
