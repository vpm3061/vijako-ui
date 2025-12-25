'use client';

export default function QuickSearchChips() {
  const chips = [
    { label: '🏥 Doctor', value: 'doctor' },
    { label: '🎓 Course', value: 'course' },
    { label: '⚖️ Lawyer', value: 'lawyer' },
    { label: '📸 Photographer', value: 'photographer' },
    { label: '💻 IT Services', value: 'it' },
    { label: '✈️ Travel', value: 'travel' }
  ];

  return (
    <div className="mb-6">
      <div className="text-sm font-medium text-gray-700 mb-2">🎯 Quick Search:</div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip.value}
            className="px-3 py-1.5 bg-white border border-gray-200 hover:border-blue-300 rounded-full text-sm text-gray-700 hover:text-blue-600 hover:shadow-sm transition-colors"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}