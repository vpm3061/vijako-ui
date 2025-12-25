'use client';

export default function TrustBadgesSection() {
  const badges = [
    { icon: '✅', title: 'Verified Sellers', description: 'Background checked' },
    { icon: '💰', title: 'Best Price', description: 'Guaranteed' },
    { icon: '🛡️', title: 'Safe Payment', description: 'Secure & encrypted' },
    { icon: '🎯', title: 'On-time Service', description: 'Or money back' },
  ];

  return (
    <div className="px-4 py-6 bg-gray-50 mt-4">
      <h2 className="text-lg font-bold mb-4 text-center">Why Choose VIJAKO?</h2>
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge, index) => (
          <div key={index} className="bg-white p-4 rounded-xl border text-center">
            <div className="text-2xl mb-2">{badge.icon}</div>
            <div className="font-bold text-sm">{badge.title}</div>
            <div className="text-xs text-gray-600">{badge.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}