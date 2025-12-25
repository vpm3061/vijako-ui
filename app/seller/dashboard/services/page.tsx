// app/(seller)/dashboard/services/page.tsx
'use client'

import { Plus, Edit, Trash2, Eye, Search, Filter, Star, Clock, DollarSign, TrendingUp, Tag, CheckCircle, XCircle, MoreVertical, Copy, Upload, Download } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ServiceManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'home', name: 'Home Services' },
    { id: 'ac', name: 'AC Repair' },
    { id: 'electrical', name: 'Electrical' },
    { id: 'plumbing', name: 'Plumbing' },
    { id: 'cleaning', name: 'Cleaning' },
  ]

  const services = [
    {
      id: 'S001',
      name: 'AC Repair & Service',
      category: 'AC Repair',
      price: '₹300',
      duration: '30-45 mins',
      status: 'active',
      bookings: 124,
      rating: 4.8,
      featured: true,
      description: 'Complete AC repair and gas filling service'
    },
    {
      id: 'S002',
      name: 'Electrical Wiring',
      category: 'Electrical',
      price: '₹250',
      duration: '1-2 hours',
      status: 'active',
      bookings: 89,
      rating: 4.6,
      featured: true,
      description: 'Complete wiring solutions for homes'
    },
    {
      id: 'S003',
      name: 'Fan Repair',
      category: 'Electrical',
      price: '₹150',
      duration: '30 mins',
      status: 'active',
      bookings: 65,
      rating: 4.7,
      featured: false,
      description: 'Fan repair and installation'
    },
    {
      id: 'S004',
      name: 'MCB/DB Repair',
      category: 'Electrical',
      price: '₹400',
      duration: '1 hour',
      status: 'inactive',
      bookings: 42,
      rating: 4.9,
      featured: false,
      description: 'MCB and distribution board repair'
    },
    {
      id: 'S005',
      name: 'Full Home Checkup',
      category: 'Home Services',
      price: '₹600',
      duration: '2 hours',
      status: 'active',
      bookings: 31,
      rating: 4.8,
      featured: true,
      description: 'Complete home electrical checkup'
    },
    {
      id: 'S006',
      name: 'Plumbing Repair',
      category: 'Plumbing',
      price: '₹350',
      duration: '1 hour',
      status: 'draft',
      bookings: 0,
      rating: 0,
      featured: false,
      description: 'Basic plumbing repair services'
    },
  ]

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    draft: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800',
  }

  const handleSelectService = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId))
    } else {
      setSelectedServices([...selectedServices, serviceId])
    }
  }

  const handleSelectAll = () => {
    if (selectedServices.length === services.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(services.map(service => service.id))
    }
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalServices: services.length,
    activeServices: services.filter(s => s.status === 'active').length,
    totalBookings: services.reduce((sum, service) => sum + service.bookings, 0),
    avgRating: (services.reduce((sum, service) => sum + service.rating, 0) / services.length).toFixed(1),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/seller/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
                <span className="text-xl font-bold text-gray-900">←</span>
                <span className="ml-2">Back to Dashboard</span>
              </Link>
            </div>
            
            <h1 className="text-xl font-bold text-gray-900">Service Management</h1>
            
            <div className="flex items-center gap-4">
              <Link
                href="/seller/dashboard/services/new"
                className="vijako-button-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Service
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalServices}</div>
                <div className="text-gray-600">Total Services</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.activeServices}</div>
                <div className="text-gray-600">Active Services</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
                <div className="text-gray-600">Total Bookings</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.avgRating}</div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services by name or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Upload className="w-4 h-4" />
                Bulk Upload
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedServices.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedServices.length === services.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-medium text-gray-900">
                      {selectedServices.length} services selected
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                      Activate
                    </button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600">
                      Deactivate
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                      Delete
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      Duplicate
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedServices([])}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Services Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedServices.length === services.length && services.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Service</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Category</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Price</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Bookings</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Rating</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Status</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleSelectService(service.id)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Tag className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 flex items-center gap-2">
                            {service.name}
                            {service.featured && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {service.category}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="text-lg font-bold text-gray-900">{service.price}</div>
                      <div className="text-sm text-gray-500">per service</div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="text-lg font-bold text-gray-900">{service.bookings}</div>
                      <div className="text-sm text-gray-500">total</div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-900">{service.rating}</span>
                      </div>
                    </td>
                    
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[service.status as keyof typeof statusColors]}`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </td>
                    
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="View">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Edit">
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Duplicate">
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="Delete">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg" title="More">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-6">Try changing your search or filter criteria</p>
              <Link
                href="/seller/dashboard/services/new"
                className="vijako-button-primary inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Your First Service
              </Link>
            </div>
          )}
        </div>

        {/* Add Service CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">Add More Services</h2>
              <p className="text-blue-100">
                Increase your earnings by adding more services. Each new service can bring additional customers.
              </p>
            </div>
            
            <div className="flex gap-3">
              <Link
                href="/seller/dashboard/services/new"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Service
              </Link>
              <button className="border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-lg font-bold">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Optimize Your Listings</h3>
            <p className="text-gray-600 text-sm">
              Add clear photos, detailed descriptions, and competitive pricing to get more bookings.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Boost Your Visibility</h3>
            <p className="text-gray-600 text-sm">
              Featured services get 3x more views. Consider featuring your popular services.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Set Availability</h3>
            <p className="text-gray-600 text-sm">
              Keep your availability updated to avoid missed opportunities and cancellations.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}