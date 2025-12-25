'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if verify-otp page exists
    fetch('/verify-otp')
      .then(response => {
        if (response.status === 404) {
          console.error('❌ /verify-otp NOT FOUND');
          alert('/verify-otp page not found. Check file location.');
        } else {
          console.log('✅ /verify-otp page exists');
          router.push('/login');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Checking if /verify-otp page exists...</p>
    </div>
  );
}