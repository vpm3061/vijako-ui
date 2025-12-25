export default function SellerBadges({
  isVerified,
  tier,
}: {
  isVerified?: boolean;
  tier?: string;
}) {
  return (
    <div className="flex gap-2 mt-1">
      {isVerified && (
        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
          ✔ Verified
        </span>
      )}

      {tier === 'premium' && (
        <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
          👑 Premium
        </span>
      )}

      {tier === 'pro' && (
        <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full">
          ⭐ Pro
        </span>
      )}
    </div>
  );
}
