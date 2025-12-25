'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Service } from '@/types/service';

export default function MyServices() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setServices(data as Service[]);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">My Services</h2>

      {services.length === 0 && (
        <p className="text-sm text-gray-500">No services added</p>
      )}

      {services.map((s) => (
        <div
          key={s.id}
          className="bg-white border rounded-xl p-3 flex justify-between"
        >
          <div>
            <div className="font-medium">{s.title}</div>
            <div className="text-sm text-gray-600">₹{s.base_price}</div>
          </div>

          <span className="text-xs text-green-600">
            {s.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      ))}
    </div>
  );
}
