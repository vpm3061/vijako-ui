'use client';

export default function MyPackages() {
  const plans = [
    { name: 'Free', price: '₹0', features: ['Basic profile'] },
    { name: 'Pro', price: '₹499/mo', features: ['Boost posts', 'Analytics'] },
    { name: 'Premium', price: '₹999/mo', features: ['Verified badge', 'Top ranking'] },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Packages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className="bg-white border rounded-xl p-4"
          >
            <div className="font-bold text-lg">{p.name}</div>
            <div className="text-xl text-blue-600">{p.price}</div>

            <ul className="text-sm mt-2 space-y-1">
              {p.features.map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
