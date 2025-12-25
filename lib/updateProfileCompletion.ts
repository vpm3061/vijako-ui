import { supabase } from '@/lib/supabase';
import { calculateProfileCompletion } from '@/lib/profileCompletion';

export async function updateProfileCompletion(
  userId: string,
  profile: any,
  seller: any
) {
  const { count } = await supabase
    .from('addresses')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  const completion = calculateProfileCompletion(
    profile,
    seller,
    count || 0
  );

  await supabase
    .from('profiles')
    .update({ profile_completion: completion })
    .eq('id', userId);
}
