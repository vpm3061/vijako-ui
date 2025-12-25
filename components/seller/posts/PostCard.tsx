type Post = {
  id: string;
  title: string;
  content: string;
  media_type?: 'image' | 'audio' | 'video';
  media_urls?: string[];
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <>
      {/* MEDIA CONTENT */}
      {Array.isArray(post.media_urls) &&
        post.media_urls.map((url, index) => (
          <div key={index}>
            {post.media_type === 'image' && (
              <img
                src={url}
                alt="Post media"
                className="w-full rounded-xl mt-3 border"
              />
            )}

            {post.media_type === 'audio' && (
              <audio controls className="w-full mt-3">
                <source src={url} />
              </audio>
            )}

            {post.media_type === 'video' && (
              <video controls className="w-full rounded-xl mt-3 border">
                <source src={url} />
              </video>
            )}
          </div>
        ))}
    </>
  );
}
