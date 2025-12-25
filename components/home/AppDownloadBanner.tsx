'use client';

export default function AppDownloadBanner() {
  return (
    <div className="mx-4 mb-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">📱 Get the VIJAKO App</h3>
          <p className="text-sm opacity-90 mt-1">Book high-value services faster</p>
        </div>
        <button className="px-4 py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100">
          Download
        </button>
      </div>
    </div>
  );
}