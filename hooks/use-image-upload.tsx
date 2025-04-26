import { useState } from "react";
import { toast } from "sonner";

export const useImageUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
    // handleImageUpload();
  };

  const handleImageUpload = async (): Promise<string | null> => {
    if (!file) {
      toast.error("No image selected!");
      return null;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Image upload failed!");
        return null;
      }

      const data = await res.json();
      const imageUrl = data.url;

      if (imageUrl) {
        toast.success("Image uploaded successfully!");
        setFile(null);
        setPreview(null);
        return imageUrl;
      } else {
        toast.error("No image URL returned.");
        return null;
      }
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Something went wrong during upload.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setFile(null);
    setPreview(null);
    setUploading(false);
  };

  return {
    file,
    preview,
    uploading,
    handleImageChange,
    handleImageUpload,
    clearPreview,
  };
};
