export default function JoinRunner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Become a VIJAKO Runner</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Delivery Partner Registration</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-600 mb-2">Earn ₹25,000+ Monthly</h3>
              <p className="text-sm text-gray-600">Flexible hours, work when you want</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-600 mb-2">Daily Payouts</h3>
              <p className="text-sm text-gray-600">Withdraw earnings daily to your bank</p>
            </div>
          </div>
          
          <button className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600">
            Start Earning Today
          </button>
        </div>
      </div>
    </div>
  )
}