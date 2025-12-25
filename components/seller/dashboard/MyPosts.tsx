'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import PostCard from '@/components/seller/posts/PostCard';

export default function MyPosts() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('feed_posts')
      .select('*')
      .order('created_at', { ascending: false });

    setPosts(data || []);
  };

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;

    await supabase.from('feed_posts').delete().eq('id', id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">My Posts</h2>

      {posts.length === 0 && (
        <p className="text-sm text-gray-500">No posts yet</p>
      )}

      {posts.map((post) => (
        <div key={post.id} className="relative">
          <PostCard post={post} />

          <button
            onClick={() => deletePost(post.id)}
            className="absolute top-2 right-2 text-xs bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
