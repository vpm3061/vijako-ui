export function calculateProfileCompletion(
  profile: any,
  seller: any,
  addressesCount: number
): number {
  let score = 0;

  // Phone (OTP verified)
  if (profile?.phone) score += 20;

  // Basic profile
  if (profile?.full_name) score += 10;
  if (profile?.email) score += 10;
  if (profile?.avatar_url) score += 10;

  // Address
  if (addressesCount > 0) score += 20;

  // Seller bonus
  if (seller) {
    score += 20; // seller profile exists

    if (seller.business_name && seller.category_ids?.length > 0) {
      score += 10;
    }
  }

  return Math.min(score, 100);
}
