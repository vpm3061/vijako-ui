// app/review/page.tsx
'use client'

import { Star, CheckCircle, MessageSquare, Clock, User, Home, ThumbsUp, Award, Send } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ReviewPage() {
  const router = useRouter()
  const [rating, setRating] = useState<number>(5)
  const [reviewText, setReviewText] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)

  const serviceDetails = {
    id: 'VI789456123',
    name: 'AC Repair Service',
    seller: 'Sharma Electrician',
    professional: 'Ramesh Kumar',
    date: 'Today, 5:30 PM',
    amount: '₹371.70',
    duration: '45 minutes'
  }

  const tags = [
    { id: 'punctual', label: 'Punctual', icon: Clock },
    { id: 'professional', label: 'Professional', icon: User },
    { id: 'good_work', label: 'Good Work', icon: ThumbsUp },
    { id: 'good_price', label: 'Good Price', icon: Award },
    { id: 'clean_work', label: 'Clean Work', icon: Home },
    { id: 'polite', label: 'Polite', icon: MessageSquare },
  ]

  const handleTagClick = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(tag => tag !== tagId))
    } else {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Review Submitted!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Thank you for your feedback. Your review helps improve services for everyone.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => router.push('/profile')}
              className="w-full vijako-button-primary py-3 text-lg"
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Rate Your Experience</h1>
            <div className="text-sm text-gray-500">
              Step 1 of 1
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Service Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">{serviceDetails.name}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {serviceDetails.seller}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {serviceDetails.date}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{serviceDetails.amount}</div>
              <div className="text-sm text-gray-500">{serviceDetails.duration}</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Service by {serviceDetails.professional}</div>
                <div className="text-sm text-gray-600">Your AC repair was handled by Ramesh</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How was the service?
            </h2>
            
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transform hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-14 h-14 ${
                      star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {rating === 5 ? 'Excellent!' : 
               rating === 4 ? 'Good!' : 
               rating === 3 ? 'Average' : 
               rating === 2 ? 'Poor' : 
               'Very Poor'}
            </div>
            <div className="text-gray-600">
              Tap stars to rate your experience
            </div>
          </div>

          {/* Quick Tags */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4">What went well? (Optional)</h3>
            
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => {
                const Icon = tag.icon
                const isSelected = selectedTags.includes(tag.id)
                
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all ${
                      isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tag.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label className="block font-bold text-gray-700 mb-4">
              Tell us more about your experience
            </label>
            
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share details of your experience with the service professional..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={5}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-sm text-gray-500">
                {reviewText.length}/500 characters
              </div>
              <div className="text-sm text-gray-500">
                Optional but helpful for others
              </div>
            </div>
          </div>
        </div>

        {/* Tips for Good Review */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Tips for a helpful review
          </h3>
          
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Was the professional punctual?</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Was the service quality good?</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Was the pricing fair and transparent?</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
              <span>Would you recommend this service to others?</span>
            </li>
          </ul>
        </div>

        {/* Privacy Note */}
        <div className="bg-gray-100 border border-gray-300 rounded-2xl p-4 mb-6">
          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-700 mb-1">Your review is public</div>
            <p>Your review will be visible to other users and the service provider. Please be honest and respectful.</p>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  {rating === 0 ? 'Select rating' : `${rating}.0 rating`}
                </div>
              </div>
              
              <button
                onClick={handleSubmitReview}
                disabled={rating === 0}
                className={`w-full sm:w-auto px-8 py-3 text-lg font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  rating === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'vijako-button-primary'
                }`}
              >
                <Send className="w-5 h-5" />
                Submit Review
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