"use client";

export default function HeroSearch() {
  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <input
        placeholder="Search services, products, rent near you"
        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-2 text-sm text-gray-500">📍 Lucknow</div>
    </div>
  );
}
