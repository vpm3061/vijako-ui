export interface Service {
  id: string;
  title: string;
  description: string | null;
  base_price: number;
  seller_id: string;
  created_at: string;
  is_active: boolean;
}
