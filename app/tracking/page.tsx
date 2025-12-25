// app/tracking/page.tsx - COMPLETE FILE
'use client'

import { MapPin, Clock, Phone, MessageCircle, CheckCircle, Truck, User, RefreshCw, Home, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TrackingPage() {
  const router = useRouter()
  const [orderStatus, setOrderStatus] = useState<'booked' | 'accepted' | 'enroute' | 'arrived' | 'servicing' | 'completed'>('enroute')
  const [timeRemaining, setTimeRemaining] = useState(15)

  const orderDetails = {
    id: 'VI789456123',
    service: 'AC Repair Service',
    seller: 'Sharma Electrician',
    professional: 'Ramesh Kumar',
    phone: '+91 98765 43210',
    price: '₹371.70',
    date: 'Today, 4:00 PM - 5:00 PM',
    address: '123 Main Street, Rajouri Garden, Delhi 110027',
    distance: '1.2km',
    eta: '15-20 mins'
  }

  const statusSteps = [
    { id: 'booked', label: 'Booked', time: '10:15 AM', description: 'Your booking is confirmed' },
    { id: 'accepted', label: 'Accepted', time: '10:20 AM', description: 'Professional accepted your booking' },
    { id: 'enroute', label: 'En Route', time: '3:45 PM', description: 'Professional is on the way' },
    { id: 'arrived', label: 'Arrived', time: '4:00 PM', description: 'Professional has arrived' },
    { id: 'servicing', label: 'Servicing', time: null, description: 'Service in progress' },
    { id: 'completed', label: 'Completed', time: null, description: 'Service completed successfully' },
  ]

  const chatMessages = [
    { id: 1, sender: 'system', message: 'Booking confirmed! Sharma Electrician will arrive between 4:00-5:00 PM', time: '10:15 AM' },
    { id: 2, sender: 'system', message: 'Ramesh has accepted your booking', time: '10:20 AM' },
    { id: 3, sender: 'system', message: 'Ramesh is on the way to your location', time: '3:45 PM' },
    { id: 4, sender: 'you', message: 'Hi, how much time?', time: '3:50 PM' },
    { id: 5, sender: 'professional', message: '10-15 mins, traffic is heavy', time: '3:51 PM' },
  ]

  // Simulate order progress
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(prev => prev - 1)
      }
    }, 60000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.id === orderStatus)
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Order Tracking</h1>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600">Live</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900 text-lg">{orderDetails.service}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {orderDetails.professional}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {orderDetails.distance} away
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{orderDetails.price}</div>
              <div className="text-sm text-gray-500">{orderDetails.date}</div>
            </div>
          </div>

          {/* Order ID */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-green-600 mr-2" />
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono font-bold ml-2">{orderDetails.id}</span>
            </div>
            <button className="text-blue-600 text-sm font-medium">Copy</button>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Status</h2>
          
          {/* Progress Bar */}
          <div className="relative mb-8">
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200"></div>
            <div 
              className="absolute top-5 left-0 h-1 bg-green-500 transition-all duration-500"
              style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
            ></div>
            
            <div className="flex justify-between relative">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 ${
                    index <= currentStepIndex
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index <= currentStepIndex ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-sm font-medium ${
                      index <= currentStepIndex ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.label}
                    </div>
                    {step.time && (
                      <div className="text-xs text-gray-500 mt-1">{step.time}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {statusSteps[currentStepIndex].label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {statusSteps[currentStepIndex].description}
                  </div>
                </div>
              </div>
              {orderStatus === 'enroute' && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{timeRemaining}</div>
                  <div className="text-sm text-gray-500">minutes away</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Your Professional</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{orderDetails.professional}</div>
                <div className="text-gray-600">{orderDetails.seller}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {orderDetails.eta} • {orderDetails.distance}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Home className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">Service Address</div>
                <div className="text-gray-600">{orderDetails.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Chat */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Live Chat</h2>
          
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-xl p-3 ${
                  msg.sender === 'you'
                    ? 'bg-blue-500 text-white'
                    : msg.sender === 'professional'
                    ? 'bg-green-100 text-gray-900'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="text-sm">{msg.message}</div>
                  <div className={`text-xs mt-1 ${
                    msg.sender === 'you' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="vijako-button-primary px-6">
              Send
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/profile')}
                className="flex-1 vijako-button-secondary py-3"
              >
                View Order Details
              </button>
              <button
                onClick={() => router.push('/review')}
                className="flex-1 vijako-button-primary py-3"
              >
                Rate Experience
              </button>
            </div>
          </div>
        </div>

        {/* Extra padding for fixed bottom bar */}
        <div className="h-20"></div>
      </main>
    </div>
  )
}