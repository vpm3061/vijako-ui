// VIJAKO Fundamental Service Modes
export const SERVICE_MODES = {
  BOOKING: 'BOOKING',
  PURCHASE: 'PURCHASE',
  RENT: 'RENT',
} as const;

export type ServiceMode = keyof typeof SERVICE_MODES;

// Navigation Items
export const MIDDLE_NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'feed', label: 'Feed', icon: '📰' },
  { id: 'trending', label: 'Trending', icon: '🔥' },
  { id: 'promo', label: 'Promo', icon: '🎁' },
] as const;

export const BOTTOM_NAV_ITEMS = [
  { id: 'search', label: 'Search', icon: '🔍' },
  { id: 'saved', label: 'Saved', icon: '💾' },
  { id: 'cart', label: 'Cart', icon: '🛒' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'profile', label: 'Profile', icon: '👤' },
] as const;

// Quick Search Categories (MATCH YOUR CODE EXACTLY)
export const QUICK_SEARCH_CATEGORIES = [
  { id: 'ac_repair', label: 'AC Repair' },
  { id: 'doctor', label: 'Doctor' },
  { id: 'food', label: 'Food' },
  { id: 'grocery', label: 'Grocery' },
  { id: 'salon', label: 'Salon' },
  { id: 'electrician', label: 'Electrician' },
  { id: 'rental', label: 'Rental' },
] as const;

// Verification Badges
export const BADGES = {
  BLUE_TICK: { name: 'Verified', color: 'blue', paid: false },
  GOLD_TICK: { name: 'Vijako Verified', color: 'gold', paid: true },
} as const;

// Service Categories for Home Page
export const SERVICE_CATEGORIES = [
  {
    id: 'services',
    title: 'Services',
    mode: SERVICE_MODES.BOOKING,
    items: [
      { id: 'electrician', name: 'Electrician', icon: '⚡' },
      { id: 'plumber', name: 'Plumber', icon: '🚰' },
      { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
      { id: 'doctor', name: 'Doctor', icon: '👨‍⚕️' },
    ]
  },
  {
    id: 'food',
    title: 'Food & Grocery',
    mode: SERVICE_MODES.PURCHASE,
    items: [
      { id: 'grocery', name: 'Grocery', icon: '🛒' },
      { id: 'restaurant', name: 'Restaurant', icon: '🍕' },
      { id: 'tiffin', name: 'Tiffin', icon: '🍱' },
      { id: 'home_food', name: 'Home Food', icon: '🏠' },
    ]
  },
  {
    id: 'rentals',
    title: 'Rentals',
    mode: SERVICE_MODES.RENT,
    items: [
      { id: 'house', name: 'House', icon: '🏡' },
      { id: 'equipment', name: 'Equipment', icon: '🔧' },
      { id: 'vehicle', name: 'Vehicle', icon: '🚗' },
      { id: 'furniture', name: 'Furniture', icon: '🛋️' },
    ]
  }
] as const;