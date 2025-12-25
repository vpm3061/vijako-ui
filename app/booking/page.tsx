'use client'

import { Calendar, Clock, MapPin, User, Phone, MessageSquare, ChevronRight, CheckCircle, Home, Briefcase, Star, Shield } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BookingPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string>('today')
  const [selectedTime, setSelectedTime] = useState<string>('16:00')
  const [selectedAddress, setSelectedAddress] = useState<string>('home')
  const [instructions, setInstructions] = useState<string>('')

  const service = {
    id: 'VI789456123',
    name: 'AC Repair Service',
    seller: 'Sharma Electrician',
    rating: 4.8,
    price: 300,
    duration: '30-45 mins'
  }

  const timeSlots = [
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: true },
    { time: '15:00', available: false },
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
  ]

  const addresses = [
    { id: 'home', type: 'Home', name: 'Home Address', address: '123 Main Street, Rajouri Garden, Delhi 110027', default: true },
    { id: 'office', type: 'Office', name: 'Office Address', address: '456 Business Park, Connaught Place, Delhi 110001', default: false },
    { id: 'other', type: 'Other', name: 'Other Location', address: 'Add new address', default: false },
  ]

  const bookingSteps = [
    { id: 1, name: 'Service', status: 'completed' },
    { id: 2, name: 'Time', status: 'completed' },
    { id: 3, name: 'Address', status: 'current' },
    { id: 4, name: 'Payment', status: 'pending' },
  ]

  const handleProceedToPayment = () => {
    router.push('/payment')
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Book Service</h1>
            <div className="text-sm text-gray-500">Step 3 of 4</div>
          </div>
        </div>
      </header>

      {/* MAIN START */}
      <main className="max-w-3xl mx-auto px-4 py-4">

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-8">
          {bookingSteps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                step.status === 'completed' ? 'bg-green-500 text-white' :
                step.status === 'current' ? 'bg-blue-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-bold">{step.id}</span>
                )}
              </div>

              <span className={`text-xs font-medium ${
                step.status === 'current' ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        {/* Service Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Service Summary</h2>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold">{service.name}</h3>

              <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {service.seller}
                </div>

                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                  {service.rating}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold">₹{service.price}</div>
              <div className="text-sm text-gray-500">{service.duration}</div>
            </div>
          </div>
        </div>

        {/* SELECT DATE */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            Select Date
          </h2>

          <div className="grid grid-cols-3 gap-3">
            {[ 
              { id: 'today', label: 'Today', date: '13 Dec' },
              { id: 'tomorrow', label: 'Tomorrow', date: '14 Dec' },
              { id: 'day3', label: 'Saturday', date: '15 Dec' },
            ].map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDate(day.id)}
                className={`p-4 rounded-lg border-2 transition ${
                  selectedDate === day.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-sm">{day.label}</div>
                  <div className="text-lg font-bold">{day.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SELECT TIME */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
            <Clock className="w-5 h-5 text-blue-600" />
            Select Time
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                className={`p-3 rounded-lg border-2 transition ${
                  !slot.available
                    ? 'border-gray-200 bg-gray-100 text-gray-400'
                    : selectedTime === slot.time
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="text-center">{slot.time}</div>
                {!slot.available && (
                  <div className="text-xs mt-1 text-gray-400">Booked</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* SELECT ADDRESS */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            Delivery Address
          </h2>

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer ${
                  selectedAddress === addr.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3">

                  <div className={`p-2 rounded-lg ${
                    addr.type === 'Home' ? 'bg-blue-100 text-blue-600' :
                    addr.type === 'Office' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100'
                  }`}>
                    {addr.type === 'Home' ? <Home className="w-5 h-5" /> :
                     addr.type === 'Office' ? <Briefcase className="w-5 h-5" /> :
                     <MapPin className="w-5 h-5" />}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{addr.name}</h3>
                    <p className="text-gray-600 text-sm">{addr.address}</p>

                    {selectedAddress === addr.id && (
                      <div className="mt-2 flex items-center text-blue-600 text-sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Selected
                      </div>
                    )}
                  </div>

                  {addr.default && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      Default
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Special Instructions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-medium mb-2">
              Special Instructions (Optional)
            </label>

            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows={3}
              placeholder="Any instructions for the professional..."
            />
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>

          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-medium">Rajesh Kumar</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium">+91 98765 43210</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRICE BREAKDOWN */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-28">
          <h2 className="text-lg font-bold mb-4">Price Breakdown</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Service Charge</span>
              <span>₹{service.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹15</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹56.70</span>
            </div>

            <div className="pt-3 border-t flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>₹371.70</span>
            </div>
          </div>
        </div>

      </main>

      {/* FIXED FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">₹371.70</div>
            <div className="text-sm text-gray-500">Total payable amount</div>
          </div>

          <button
            onClick={handleProceedToPayment}
            className="vijako-button-primary px-8 py-3 text-lg font-bold flex items-center gap-2"
          >
            Proceed to Payment
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

    </div>
  )
}
