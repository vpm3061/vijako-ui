export default function FeedTips() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-4">
      <h3 className="font-bold text-gray-900 mb-3">📝 Feed Guidelines</h3>
      
      <div className="space-y-3">
        <div className="p-3 bg-white/80 rounded-lg">
          <div className="font-medium text-gray-900 text-sm mb-1">✅ Organic Content Only</div>
          <div className="text-xs text-gray-600">No paid promotions in feed</div>
        </div>
        
        <div className="p-3 bg-white/80 rounded-lg">
          <div className="font-medium text-gray-900 text-sm mb-1">🔒 Verified Sellers</div>
          <div className="text-xs text-gray-600">Blue/Gold tick required</div>
        </div>
        
        <div className="p-3 bg-white/80 rounded-lg">
          <div className="font-medium text-gray-900 text-sm mb-1">💡 Value Adding</div>
          <div className="text-xs text-gray-600">Helpful tips & genuine offers</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="text-xs text-gray-600">Only verified sellers can post</div>
        <button className="mt-2 w-full text-center text-blue-600 text-sm font-medium hover:text-blue-700">
          Become a seller →
        </button>
      </div>
    </div>
  );
}