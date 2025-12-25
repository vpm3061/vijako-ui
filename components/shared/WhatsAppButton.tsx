'use client';

import { useAutoHideNav } from '@/lib/hooks/useAutoHideNav';

export default function WhatsAppButton() {
  const isNavVisible = useAutoHideNav();

  return (
    <a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-24 right-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all z-40 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-20'
      }`}
    >
      <span className="text-2xl text-white">💬</span>
    </a>
  );
}