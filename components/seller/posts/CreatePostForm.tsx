'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import MediaUploader from '@/components/seller/media/MediaUploader';

export default function CreatePostForm({ sellerId }: { sellerId: string }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'image' | 'audio' | 'video' | null>(null);
  const [loading, setLoading] = useState(false);

  const submitPost = async () => {
    if (!title && !content && mediaUrls.length === 0) {
      alert('Post cannot be empty');
      return;
    }

    setLoading(true);

    const { error } = await supabase.from('feed_posts').insert({
      seller_id: sellerId,
      post_type: 'announcement',
      title,
      content,
      media_urls: mediaUrls,
      media_type: mediaType,
    });

    setLoading(false);

    if (error) {
      alert('Post failed');
    } else {
      alert('Post published');
      setTitle('');
      setContent('');
      setMediaUrls([]);
      setMediaType(null);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border space-y-4">
      <input
        className="w-full border p-2 rounded"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded"
        rows={4}
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <MediaUploader
        sellerId={sellerId}
        onUploadComplete={(urls, type) => {
          setMediaUrls(urls);
          setMediaType(type);
        }}
      />

      <button
        onClick={submitPost}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? 'Posting...' : 'Publish Post'}
      </button>
    </div>
  );
}
