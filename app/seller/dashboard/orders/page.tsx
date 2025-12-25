// app/seller/dashboard/orders/page.tsx
'use client'

import { Package, Search, Filter, Clock, User, MapPin, DollarSign, CheckCircle, XCircle, MessageSquare, Phone, MoreVertical, Download, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function OrderManagement() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  
  const orders = [
    {
      id: 'VI789456123',
      customer: 'Rohan Sharma',
      service: 'AC Repair',
      date: 'Today, 2:00 PM',
      amount: '₹300',
      status: 'pending',
      address: 'Rajouri Garden, Delhi',
      phone: '+91 98765 43210',
      time: '10 mins ago'
    },
    {
      id: 'VI789456124',
      customer: 'Priya Patel',
      service: 'Electrical Wiring',
      date: 'Today, 3:30 PM',
      amount: '₹500',
      status: 'accepted',
      address: 'Tilak Nagar, Delhi',
      phone: '+91 98765 43211',
      time: '25 mins ago'
    },
    {
      id: 'VI789456125',
      customer: 'Amit Verma',
      service: 'Fan Repair',
      date: 'Today, 4:15 PM',
      amount: '₹150',
      status: 'completed',
      address: 'Janakpuri, Delhi',
      phone: '+91 98765 43212',
      time: '1 hour ago'
    },
    {
      id: 'VI789456126',
      customer: 'Neha Gupta',
      service: 'Home Checkup',
      date: 'Tomorrow, 10:00 AM',
      amount: '₹600',
      status: 'scheduled',
      address: 'Dwarka, Delhi',
      phone: '+91 98765 43213',
      time: '2 hours ago'
    },
    {
      id: 'VI789456127',
      customer: 'Raj Kumar',
      service: 'AC Repair',
      date: 'Today, 5:00 PM',
      amount: '₹300',
      status: 'cancelled',
      address: 'Uttam Nagar, Delhi',
      phone: '+91 98765 43214',
      time: '3 hours ago'
    },
    {
      id: 'VI789456128',
      customer: 'Sonia Mehta',
      service: 'Plumbing Repair',
      date: 'Today, 6:30 PM',
      amount: '₹350',
      status: 'enroute',
      address: 'Vikaspuri, Delhi',
      phone: '+91 98765 43215',
      time: '4 hours ago'
    },
  ]

  const statusTabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'accepted', label: 'Accepted', count: orders.filter(o => o.status === 'accepted').length },
    { id: 'scheduled', label: 'Scheduled', count: orders.filter(o => o.status === 'scheduled').length },
    { id: 'enroute', label: 'En Route', count: orders.filter(o => o.status === 'enroute').length },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ]

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-blue-100 text-blue-800',
    scheduled: 'bg-purple-100 text-purple-800',
    enroute: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  const statusIcons = {
    pending: Clock,
    accepted: CheckCircle,
    scheduled: Clock,
    enroute: Package,
    completed: CheckCircle,
    cancelled: XCircle,
  }

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab)

  const stats = {
    totalOrders: orders.length,
    todayOrders: orders.filter(o => o.date.includes('Today')).length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    totalRevenue: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + parseInt(order.amount.replace('₹', '')), 0)
  }

  const handleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id))
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Pending Confirmation',
      accepted: 'Accepted',
      scheduled: 'Scheduled',
      enroute: 'On the Way',
      completed: 'Completed',
      cancelled: 'Cancelled',
    }
    return statusMap[status] || status
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
            
            <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
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
                <div className="text-3xl font-bold text-gray-900">{stats.totalOrders}</div>
                <div className="text-gray-600">Total Orders</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.todayOrders}</div>
                <div className="text-gray-600">Today's Orders</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</div>
                <div className="text-gray-600">Pending</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-900">₹{stats.totalRevenue}</div>
                <div className="text-gray-600">Total Revenue</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search orders by ID, customer name, or service..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select className="border border-gray-300 rounded-lg px-3 py-2 bg-white">
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Advanced Filter
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {statusTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="font-medium text-gray-900">
                      {selectedOrders.length} orders selected
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                      Accept Selected
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">
                      Mark as Complete
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                      Cancel Selected
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedOrders([])}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons]
              
              return (
                <div key={order.id} className="border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                  <div className="p-6">
                    {/* Order Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          className="w-4 h-4 text-blue-600 rounded mt-1"
                        />
                        <div>
                          <div className="font-bold text-gray-900">{order.service}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-2">
                            <span>Order #{order.id}</span>
                            <span>•</span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {order.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{order.amount}</div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 mt-1 ${
                          statusColors[order.status as keyof typeof statusColors]
                        }`}>
                          <StatusIcon className="w-3 h-3" />
                          {getStatusText(order.status)}
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{order.customer}</div>
                          <div className="text-sm text-gray-600">{order.phone}</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-white rounded-lg">
                          <MessageSquare className="w-4 h-4 text-green-600" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg">
                          <Phone className="w-4 h-4 text-blue-600" />
                        </button>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Service Date</div>
                        <div className="font-medium text-gray-900">{order.date}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Location</div>
                        <div className="font-medium text-gray-900 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {order.address}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {order.status === 'pending' && (
                        <>
                          <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                            Accept Order
                          </button>
                          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600">
                            Reject
                          </button>
                        </>
                      )}
                      
                      {order.status === 'accepted' && (
                        <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600">
                          Mark as En Route
                        </button>
                      )}
                      
                      {order.status === 'enroute' && (
                        <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600">
                          Mark as Arrived
                        </button>
                      )}
                      
                      {order.status === 'scheduled' && (
                        <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                          Start Service
                        </button>
                      )}
                      
                      {(order.status === 'enroute' || order.status === 'scheduled') && (
                        <button className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600">
                          Mark Complete
                        </button>
                      )}
                      
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600 mb-6">You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Order Status Distribution</h3>
            <div className="space-y-3">
              {statusTabs.slice(1).map((tab) => (
                <div key={tab.id} className="flex items-center justify-between">
                  <span className="text-gray-600">{tab.label}</span>
                  <span className="font-bold text-gray-900">{tab.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {orders
                .filter(o => o.date.includes('Today') && o.status !== 'cancelled')
                .map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-600">{order.service}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{order.amount}</div>
                      <div className="text-sm text-gray-500">{order.date.split(', ')[1]}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50">
                <div className="font-medium text-gray-900">View Calendar</div>
                <div className="text-sm text-gray-600">See all upcoming appointments</div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50">
                <div className="font-medium text-gray-900">Send Bulk Messages</div>
                <div className="text-sm text-gray-600">Update multiple customers</div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50">
                <div className="font-medium text-gray-900">Generate Reports</div>
                <div className="text-sm text-gray-600">Download order analytics</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}