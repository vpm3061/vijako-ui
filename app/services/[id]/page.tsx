'use client'

import { 
  ArrowLeft, Save, Plus, X, Upload, DollarSign, Clock, 
  Tag, Hash, FileText, CheckCircle, AlertCircle, Star 
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddServicePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    features: ['6 months warranty', 'Free diagnosis', 'Same day service'],
    whatsappMessage: 'Hi, I need {service} service. Please confirm availability.',
    images: [] as string[],
    tags: [] as string[],
    isFeatured: false,
    available: true,
  })

  const categories = [
    'AC Repair',
    'Electrical',
    'Plumbing',
    'Cleaning',
    'Home Services',
    'Beauty & Salon',
    'Education',
    'Healthcare',
    'Daily Essentials',
  ]

  const predefinedTags = [
    'emergency', '24x7', 'warranty', 'licensed', 'insured', 
    'same-day', 'free-diagnosis', 'professional', 'experienced'
  ]

  const handleAddFeature = () => {
    const newFeature = prompt('Enter a new feature:')
    if (newFeature && !formData.features.includes(newFeature)) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature]
      })
    }
  }

  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...formData.features]
    newFeatures.splice(index, 1)
    setFormData({ ...formData, features: newFeatures })
  }

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      })
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    })
  }

  const handleSubmit = () => {
    alert('Service added successfully!')
    router.push('/seller/dashboard/services')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <h1 className="text-xl font-bold text-gray-900">
              {step === 1 ? 'Basic Information' : step === 2 ? 'Pricing & Details' : 'Features & Settings'}
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Step {step} of 3</span>
            </div>

          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* Step Circles */}
        <div className="flex justify-center mb-8">
          {[1, 2, 3].map((stepNum) => (
            <button
              key={stepNum}
              onClick={() => setStep(stepNum)}
              className={`flex flex-col items-center mx-4 ${step >= stepNum ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step > stepNum ? 'bg-green-100 text-green-600' :
                step === stepNum ? 'bg-blue-100 text-blue-600' :
                'bg-gray-100 text-gray-400'
              }`}>
                {step > stepNum ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="font-bold">{stepNum}</span>
                )}
              </div>
              <span className="text-sm font-medium">
                {stepNum === 1 ? 'Basic' : stepNum === 2 ? 'Details' : 'Settings'}
              </span>
            </button>
          ))}
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Basic Information</h2>

              <div className="space-y-6">

                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="e.g., AC Repair Service, Home Cleaning, etc."
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Category *
                  </label>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setFormData({...formData, category})}
                        className={`p-3 border rounded-lg transition-all ${
                          formData.category === category
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>{category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    rows={5}
                    placeholder="Describe your service..."
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Service Images
                  </label>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Drag & drop or click to upload</p>
                    <button className="vijako-button-primary px-6">
                      Browse Images
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing & Details</h2>

              <div className="space-y-6">

                {/* PRICE */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* DURATION */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg"
                      placeholder="e.g., 30 mins, 1-2 hours"
                    />
                  </div>
                </div>

                {/* FEATURES */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service Features</label>

                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddFeature}
                    className="flex items-center gap-2 text-blue-600 mt-2"
                  >
                    <Plus className="w-4 h-4" /> Add Feature
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings & Tags</h2>

              <div className="space-y-6">

                {/* TAGS */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Tags</label>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)}>
                          <X className="w-3 h-3 text-blue-600" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {predefinedTags.filter(tag => !formData.tags.includes(tag)).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleAddTag(tag)}
                        className="px-3 py-1 border border-gray-300 rounded-full"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FEATURE TOGGLE */}
                <div className="p-4 border rounded-lg flex justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Feature This Service</p>
                      <p className="text-sm text-gray-600">Featured services show first</p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  />
                </div>

              </div>
            </div>
          )}

          {/* NEXT / PREVIOUS BUTTONS */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border rounded-lg"
              >
                Previous
              </button>
            ) : (
              <div></div>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="vijako-button-primary px-8 py-3"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="vijako-button-primary px-8 py-3 flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Save & Publish Service
              </button>
            )}
          </div>

        </div>

      </main>
    </div>
  )
}
