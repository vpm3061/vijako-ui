// app/payment/page.tsx
'use client'

import { Lock, Shield, CreditCard, Smartphone, Wallet, Banknote, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<string>('upi')
  const [couponCode, setCouponCode] = useState<string>('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState<boolean>(false)
  const [couponApplied, setCouponApplied] = useState<boolean>(false)

  const serviceDetails = {
    name: 'AC Repair Service',
    seller: 'Sharma Electrician',
    date: 'Today, 4:00 PM - 5:00 PM',
    address: '123 Main Street, Rajouri Garden, Delhi',
  }

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: Smartphone, color: 'text-blue-600 bg-blue-100', popular: true },
    { id: 'cards', name: 'Credit/Debit Card', icon: CreditCard, color: 'text-purple-600 bg-purple-100' },
    { id: 'wallet', name: 'Wallets', icon: Wallet, color: 'text-green-600 bg-green-100' },
    { id: 'netbanking', name: 'Net Banking', icon: Banknote, color: 'text-orange-600 bg-orange-100' },
    { id: 'cash', name: 'Pay After Service', icon: CreditCard, color: 'text-gray-600 bg-gray-100' },
  ]

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', icon: 'GPay' },
    { id: 'phonepe', name: 'PhonePe', icon: 'PhonePe' },
    { id: 'paytm', name: 'Paytm', icon: 'Paytm' },
    { id: 'other', name: 'Other UPI', icon: 'UPI' },
  ]

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return
    setIsApplyingCoupon(true)
    setTimeout(() => {
      setIsApplyingCoupon(false)
      setCouponApplied(true)
    }, 1000)
  }

  const handlePayment = () => {
    // In real app, this would integrate with payment gateway
    router.push('/tracking')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Complete Payment</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-900">{serviceDetails.name}</div>
                <div className="text-sm text-gray-500">by {serviceDetails.seller}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">₹300</div>
                <div className="text-sm text-gray-500">Service charge</div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <div>{serviceDetails.date}</div>
              <div>{serviceDetails.address}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Service Charge</span>
              <span>₹300.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Fee</span>
              <span>₹15.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹56.70</span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">₹371.70</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Apply Coupon Code</h2>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code (e.g., FIRST50)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || couponApplied || !couponCode.trim()}
              className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                couponApplied
                  ? 'bg-green-500 text-white'
                  : isApplyingCoupon
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'vijako-button-primary'
              }`}
            >
              {couponApplied ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Applied
                </div>
              ) : isApplyingCoupon ? (
                'Applying...'
              ) : (
                'Apply'
              )}
            </button>
          </div>

          {couponApplied && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Coupon Applied!</div>
                    <div className="text-sm text-green-700">You saved ₹50.00</div>
                  </div>
                </div>
                <div className="text-green-800 font-bold">-₹50.00</div>
              </div>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <div className="font-medium mb-2">Your Active Coupons:</div>
            <div className="space-y-2">
              {[
                { code: 'FIRST50', discount: '50% off', valid: 'First booking' },
                { code: 'FREEDEL', discount: 'Free delivery', valid: 'Above ₹300' },
              ].map((coupon) => (
                <button
                  key={coupon.code}
                  onClick={() => setCouponCode(coupon.code)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <div>
                    <span className="font-medium text-gray-900">{coupon.code}</span>
                    <span className="text-gray-600 ml-2">- {coupon.discount}</span>
                  </div>
                  <div className="text-sm text-gray-500">{coupon.valid}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600" />
            Select Payment Method
          </h2>

          <div className="space-y-3 mb-8">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    paymentMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${method.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{method.name}</div>
                        {method.popular && (
                          <div className="text-xs text-blue-600 font-medium mt-1">Most Popular</div>
                        )}
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === method.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* UPI Apps Selection */}
          {paymentMethod === 'upi' && (
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Select UPI App</h3>
              <div className="grid grid-cols-2 gap-3">
                {upiApps.map((app) => (
                  <button
                    key={app.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-center"
                  >
                    <div className="font-medium text-gray-900">{app.icon}</div>
                    <div className="text-sm text-gray-600 mt-1">{app.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card Details */}
          {paymentMethod === 'cards' && (
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pay After Service Info */}
          {paymentMethod === 'cash' && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-800 mb-2">Pay After Service</div>
                  <div className="text-sm text-yellow-700">
                    Pay cash or UPI to the professional after service completion. 
                    Please ensure you have sufficient cash available.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-gray-900">Secure & Encrypted Payment</div>
                <div className="text-sm text-gray-600">
                  256-bit SSL encryption • Your payment details are safe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Amount */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Final Amount</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">₹371.70</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount (FIRST50)</span>
                <span className="font-bold">-₹50.00</span>
              </div>
            )}
            
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-xl font-bold text-gray-900">Amount to Pay</span>
                <span className="text-3xl font-bold text-gray-900">
                  {couponApplied ? '₹321.70' : '₹371.70'}
                </span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              By completing payment, you agree to our Terms & Conditions
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {couponApplied ? '₹321.70' : '₹371.70'}
                </div>
                <div className="text-sm text-gray-500">Total payable amount</div>
              </div>
              <button
                onClick={handlePayment}
                className="w-full sm:w-auto vijako-button-primary px-8 py-3 text-lg font-bold"
              >
                Pay Now
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