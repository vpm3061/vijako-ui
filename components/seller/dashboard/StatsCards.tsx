'use client';

export default function StatsCards() {
  const stats = [
    { label: 'Posts', value: 12 },
    { label: 'Services', value: 5 },
    { label: 'Orders', value: 27 },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white border rounded-xl p-4 text-center"
        >
          <div className="text-2xl font-bold">{s.value}</div>
          <div className="text-sm text-gray-600">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
