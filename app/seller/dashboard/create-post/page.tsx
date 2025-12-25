'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import NavShell from '@/components/shared/NavShell';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  // TEMP: seller id (later auth se aayega)
  const sellerId = 'REPLACE_WITH_SELLER_UUID';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const uploadMedia = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const filePath = `sellers/${sellerId}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from('seller-media')
        .upload(filePath, file);

      if (error) {
        console.error(error);
        continue;
      }

      const { data } = supabase.storage
        .from('seller-media')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const detectMediaType = () => {
    if (files.some(f => f.type.startsWith('video'))) return 'video';
    if (files.some(f => f.type.startsWith('audio'))) return 'audio';
    if (files.length > 0) return 'image';
    return null;
  };

  const createPost = async () => {
    setLoading(true);

    const mediaUrls = await uploadMedia();
    const mediaType = detectMediaType();

    const { error } = await supabase.from('feed_posts').insert({
      seller_id: sellerId,
      post_type: 'post',
      title,
      content,
      media_urls: mediaUrls,
      media_type: mediaType,
    });

    setLoading(false);

    if (error) {
      alert('Error creating post');
      console.error(error);
    } else {
      alert('Post published 🚀');
      setTitle('');
      setContent('');
      setFiles([]);
    }
  };

  return (
    <NavShell selectedTab="home" onTabChange={() => {}}>
      <div className="max-w-xl mx-auto p-4">

        <h1 className="text-xl font-bold mb-4">Create Post</h1>

        <input
          className="w-full p-3 border rounded mb-3"
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-3 border rounded mb-3"
          placeholder="Write something..."
          rows={4}
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <input
          type="file"
          multiple
          accept="image/*,audio/*,video/*"
          onChange={handleFileChange}
          className="mb-4"
        />

        {files.length > 0 && (
          <p className="text-sm text-gray-600 mb-2">
            {files.length} file(s) selected
          </p>
        )}

        <button
          onClick={createPost}
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold"
        >
          {loading ? 'Posting…' : 'Publish Post'}
        </button>
      </div>
    </NavShell>
  );
}
