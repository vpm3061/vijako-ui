
'use client';

import { useEffect, useState } from 'react';
import { supabase, testConnection } from '@/lib/supabase/client';

export default function TesterPage() {
  const [status, setStatus] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const results: any = {};
      
      // Test 1: Connection
      const connected = await testConnection();
      results.connection = connected ? '✅ Connected' : '❌ Failed';
      
      // Test 2: List all tables
      const tables = ['profiles', 'sellers', 'services', 'categories', 'orders', 'feed_posts'];
      
      for (const table of tables) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .limit(2);
          
          results[table] = {
            exists: !error,
            count: data?.length || 0,
            error: error?.message
          };
        } catch (err) {
          results[table] = {
            exists: false,
            error: String(err)
          };
        }
      }
      
      setStatus(results);
      console.log('Test Results:', results);
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">VIJAKO Database Tester</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={runTests}
          disabled={loading}
          className="col-span-2 py-3 bg-blue-600 text-white rounded-lg font-bold"
        >
          {loading ? 'Testing...' : '🚀 Run All Tests'}
        </button>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-2">Env Variables:</h3>
          <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}</p>
          <p>Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}</p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-2">Instructions:</h3>
          <p className="text-sm">1. Check browser console (F12)</p>
          <p className="text-sm">2. Look for errors</p>
          <p className="text-sm">3. Test each table</p>
        </div>
      </div>

      {Object.keys(status).length > 0 && (
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-bold mb-3">Test Results:</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(status).map(([key, value]: [string, any]) => (
              <div key={key} className={`p-3 rounded border ${value.exists ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="font-bold">{key}</div>
                <div className={value.exists ? 'text-green-600' : 'text-red-600'}>
                  {typeof value === 'string' ? value : 
                   value.exists ? `✅ ${value.count} records` : `❌ ${value.error}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Query Section */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-bold mb-2">Quick Query Tester:</h3>
        <button
          onClick={async () => {
            const { data, error } = await supabase.from('profiles').select('*').limit(5);
            console.log('Profiles:', data, error);
            alert('Check console (F12) for results');
          }}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Test Profiles Table
        </button>
      </div>
    </div>
  );
}
