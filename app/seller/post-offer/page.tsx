'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sellerId, setSellerId] = useState<string | null>(null);

  // 🔹 STEP 1: Logged-in seller ka ID lao
  useEffect(() => {
    const loadSeller = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert('Login required');
        return;
      }

      const { data: seller, error } = await supabase
        .from('sellers')
        .select('id')
        .eq('id', user.id)
        .single();

      if (error || !seller) {
        alert('Seller profile not found');
        return;
      }

      setSellerId(seller.id);
    };

    loadSeller();
  }, []);

  // 🔹 STEP 2: Post publish
  const submitPost = async () => {
    if (!sellerId) {
      alert('Seller not loaded yet');
      return;
    }

    const { error } = await supabase.from('feed_posts').insert({
      seller_id: sellerId,
      post_type: 'announcement',
      title,
      content,
    });

    if (error) {
      console.error(error);
      alert('Failed to publish post');
      return;
    }

    alert('✅ Post published');
    setTitle('');
    setContent('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Post</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Write your update..."
        rows={5}
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button
        onClick={submitPost}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Publish
      </button>
    </div>
  );
}
