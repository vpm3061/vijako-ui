import SellerBadges from './SellerBadges';

export default function SellerHeader({ seller }: { seller: any }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
        {seller.business_name?.charAt(0)}
      </div>

      <div>
        <h1 className="text-xl font-bold">{seller.business_name}</h1>

        <SellerBadges
          isVerified={seller.is_verified}
          tier={seller.subscription_tier}
        />
      </div>
    </div>
  );
}
