'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

type MediaUploaderProps = {
  sellerId: string;
  onUploadComplete: (urls: string[], type: 'image' | 'audio' | 'video') => void;
};

export default function MediaUploader({ sellerId, onUploadComplete }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mediaType, setMediaType] = useState<'image' | 'audio' | 'video' | null>(null);

  const handleFileChange = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const type = fileArray[0].type.startsWith('image')
      ? 'image'
      : fileArray[0].type.startsWith('audio')
      ? 'audio'
      : 'video';

    setMediaType(type);
    setUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      const filePath = `sellers/${sellerId}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from('seller-media')
        .upload(filePath, file, { upsert: false });

      if (error) {
        alert('Upload failed');
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from('seller-media')
        .getPublicUrl(filePath);

      uploadedUrls.push(data.publicUrl);
    }

    setPreviewUrls(uploadedUrls);
    onUploadComplete(uploadedUrls, type);
    setUploading(false);
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        multiple
        accept="image/*,audio/*,video/*"
        onChange={(e) => handleFileChange(e.target.files)}
      />

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}

      {/* Preview */}
      {previewUrls.map((url) => (
        <div key={url}>
          {mediaType === 'image' && <img src={url} className="rounded-lg mt-2" />}
          {mediaType === 'audio' && <audio src={url} controls className="w-full mt-2" />}
          {mediaType === 'video' && <video src={url} controls className="w-full rounded-lg mt-2" />}
        </div>
      ))}
    </div>
  );
}
