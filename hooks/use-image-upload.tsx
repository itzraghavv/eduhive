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
    setPreview(previewUrl); // Show the preview immediately
  };

  const handleImageUpload = async (
    prompt: string = ""
  ): Promise<string | null> => {
    if (!file) {
      toast.error("No image selected!");
      return null;
    }

    setUploading(true); // Set uploading state to true while the image is being uploaded

    const formData = new FormData();
    formData.append("file", file); // Make sure file is appended properly
    formData.append("prompt", prompt); // Make sure prompt is appended properly

    try {
      const res = await fetch("/api/chat", {
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
        return imageUrl; // Return the URL of the uploaded image
      } else {
        toast.error("No image URL returned.");
        return null;
      }
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Something went wrong during upload.");
      return null;
    } finally {
      setUploading(false); // Set uploading to false after the request is complete
      setFile(null); // Clear the file after upload
      setPreview(null); // Clear the preview after upload
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
